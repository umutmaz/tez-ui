import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import HistoryRecords from "./HistoryRecords"

import { authHeader, http } from "../http";


function Character({ charID, name, hash, transactionHash, address, resetWeb3, fetchAccountChars, web3, transact, setLoaderMessage, setShowLoader}) {

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleClose = () => setShowModal(false);
  const handleFileSelect = (e) => setSelectedFile(e.target.files[0]);
  const saveChanges = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", selectedFile)
    formData.append("address", address)
    const header = authHeader();
    header['Content-Type'] = 'multipart/form-data'

    setShowLoader(true);
    setLoaderMessage("Character is being published on IPFS")
    http.put(`/v0/character/${charID}`, formData,{headers: header}).then(async (res)=>{
      setLoaderMessage("Blockchain transaction is pending")
      console.log(res)
      const receipt = await transact(res.data.data.cid)
        http.post(`/v0/transaction/${res.data.data.cid}`, {accountAddress: address, hash:receipt.transactionHash}, {headers: authHeader()}).then((res)=>{
          setShowLoader(false)
          fetchAccountChars();
        })
      
    })
    setShowModal(false);
  }

  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [charHistoryRecords, setCharHistoryRecords] = useState([]);
  const handleCloseHistory = () => setShowHistoryModal(false);
  const openCharHistoryModal = async()=>{

    setShowHistoryModal(true)
  }
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    const getCharHistory = () =>{
      http.get(`/v0/character/${charID}`, {headers: authHeader()}).then((res)=>{
        setCharHistoryRecords(res.data.data);
      })
    }
   
      if(showHistoryModal){

        getCharHistory()
      }
  
  }, [showHistoryModal])

  return (
    <div className="card mb-2 character-card card-border-radius">
      <div className="card-title character-card-title border-bottom m-0 text-center row-border-radius ">
        <div className="card-info">
          <h4 className="m-0 pr-10">{name}</h4>
          <div onClick={openCharHistoryModal}>
          <FaInfoCircle size="20px" />

          </div>
        </div>
      </div>
      <div className="card-body character-card-body align-items-center d-flex p-0 ">
        <ul>
        <li>IPFS Link:  <a href={`https://ipfs.infura.io/ipfs/${hash}`} target="_blank"> {hash}</a> </li> 
        <li>Transaction Link: <a href={`https://ropsten.etherscan.io/tx/${transactionHash}`} target="_blank">{transactionHash}</a>  </li>
        </ul>
      </div>
      <div className="d-flex flex-column m-0 ">
        <div className="d-flex align-items-end ">
          <button className="btn flex-grow-1 btn-dark button-color btn-border-radius" onClick={handleShow}>
            Progress
          </button>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title>Progress!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="progress-form">
        <input
          type="file"
          onChange={handleFileSelect}
        />
      </form>
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" form="progress-form" onClick={saveChanges}>
            Save Progress
          </Button>
        </Modal.Footer>
      </Modal>
    <Modal show={showHistoryModal} onHide={handleCloseHistory}  size={"xl"}>
      <Modal.Title>
        <div className="text-center pt-3">

          {name}'s History (From Birth to Current)
        </div>
      </Modal.Title>
      <Modal.Body>
        <HistoryRecords records={charHistoryRecords}/>
      </Modal.Body>
    </Modal>
    </div>
  );
}

export default Character;
