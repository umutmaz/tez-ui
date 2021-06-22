import React from "react";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import LoadingOverlay from 'react-loading-overlay';
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";
import Web3 from "web3";

import networks from "../constants/network.id.constants";
import { authHeader, http } from "../http";
function Account({ id, address, resetWeb3, fetchAccountChars, web3, transact, showLoader, setShowLoader, loaderMessage, setLoaderMessage }) {
  const [showModal, setShowModal] = useState(false)
  const [selectedFile, setSelectedFile] = useState("");
  const [inputName, setInputName] = useState("");

  const handleCloseShowModal = () => setShowModal(false);
  const handleOpenShowModal = () => setShowModal(true);
  const handleFileSelect = (e) => setSelectedFile(e.target.files[0]);
  const handleInputChange = (e)=>setInputName(e.target.value);
  const saveChanges = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", selectedFile)
    formData.append("name", inputName);
    formData.append("address", address)
    const header = authHeader();
    header['Content-Type'] = 'multipart/form-data'
    setShowLoader(true);
    setLoaderMessage("Character is being published on IPFS")
    http.post("/v0/character/", formData,{headers: header}).then(async (res)=>{
      setLoaderMessage("Blockchain transaction is pending")

      const receipt = await transact(res.data.data.cid)
        http.post(`/v0/transaction/${res.data.data.cid}`, {accountAddress: address, hash:receipt.transactionHash}, {headers: authHeader()}).then((res)=>{
          setShowLoader(false)
          console.log('accounts fetching again')
          fetchAccountChars();
        })
      
    })
    setShowModal(false);
  }
  return (
    <div className="col-4  account-container account-border-radius">
      <div className="row mt-3 row-border-radius ">
          <h3>
            Network 
          </h3> 
        <span>{networks[id]}</span>
      </div>
      <hr className="solid"></hr>
      <div className="row mt-4 row-border-radius ">
        <h3>Account Address</h3>
        <span>{address}</span>
      </div>
      <hr className="solid"></hr>
      <div className="d-flex align-items-end ">
        <button
          className="btn flex-grow-1 btn-dark button-color "
          onClick={resetWeb3}
        >
          Reconnect
        </button>
      </div>
      <hr className="solid"></hr>
      <div className="d-flex align-items-end ">
        <button
          className="btn flex-grow-1 btn-dark button-color "
          onClick={handleOpenShowModal}
        >
          Create New Character
        </button>
      </div>
      <hr className="solid"></hr>
      <div className="pt-5 row d-flex flex-grow-1 align-items-end ">

        <LoadingOverlay
          active={showLoader}

          spinner={<HashLoader/>} 
          text={<div className="pl-5 pt-5">{loaderMessage}</div>}>

        </LoadingOverlay>

      </div>
 
      <Modal  show={showModal} onHide={handleCloseShowModal}>
        <Modal.Header >
          <Modal.Title>Let's Make a Story!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form id="create-form">
        <input
          className="mb-3 col-12 d-flex flex-grow-1 "
          type="text"
          placeholder="Character Name"
          value={inputName}
          onChange={handleInputChange}
        />
        <input
          type="file"
          onChange={handleFileSelect}
        />
      </form>
     
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseShowModal}>
            Close
          </Button>
          <Button variant="primary" type="button"  onClick={saveChanges}>
            Create Character
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Account;
