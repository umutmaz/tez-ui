import React from "react";
import Account from "./Account";
import Characters from "./Characters";
import { useState, useEffect } from "react";
import {http, authHeader} from "../http"
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import Web3 from "web3";

function Content() {
  const [Id, setId] = useState(null);
  const [Web3Obj, setWeb3Obj] = useState(null);

  const [Address, setAddress] = useState(null);
  const [userCharacters, setUserCharacters] = useState([]);

  const [showRegisterAccountModal, setShowRegisterAccountModal] = useState(false)



  const [showLoader, setShowLoader] = useState(false);
  const [loaderMessage, setLoaderMessage] = useState("")
  const handleCloseRegisterAccountModal = ()=>{
   setShowRegisterAccountModal(false);
  }
  const registerAccountAddress = () =>{
   http.post("/v0/account", {address:Address},{headers:authHeader()}).then((res)=>{console.log(res); setShowRegisterAccountModal(false)}).catch(err=>console.error(err))
  }
  useEffect(() => {
    enableWeb3();
    fetchAccountChars();
  }, [Address]);

  useEffect(() => {
    function getNetworkID() {
      return Web3Obj.currentProvider.chainId;
    }
    function getAccountAddress() {
      console.log(Web3Obj.currentProvider.selectedAddress);
      return Web3Obj.currentProvider.selectedAddress;
    }
    const handleAccountStuff = () => {
      if (Web3Obj) {
        const id = getNetworkID();
        const address = getAccountAddress();
        if(address){
          setId(id);
          setAddress(address);
          //check whether account is registered
          http.get(`/v0/account/check/${address}`, {headers:authHeader()}).then((res)=>{
            //accounts in data.data
            console.log(res)
            switch (res.data.message) {
              case "Account is registered to user":
                break;
              case "Account is not registered":
                setShowRegisterAccountModal(true);
                break;
              case "Account is registered to another user":
                alert(res.data.message)
                break;
            }
          })
        }
      }
    };


    handleAccountStuff();
  }, [Web3Obj]);
  const resWeb3 = () => {
    console.log("called");
    enableWeb3();

    fetchAccountChars();
  };

  const enableWeb3 = () => {
    let web3 = new Web3();
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable();
        console.log(web3);
        setWeb3Obj(web3);
      } catch (e) {
        alert(e);
      }
    }

  };

  const fetchAccountChars = () => {
    console.log("address", Address)
    if(Address){

      http.get(`/v0/character/account/${Address}`, {headers: authHeader()}).then((data)=>{
        const tmp = data.data.data;
        console.log("chars fetched")
        console.log(tmp)
        setUserCharacters(tmp);
      })
    }

  };

  const transact = async ( cid) =>{
    const abi = [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_ipfsHash",
            "type": "string"
          }
        ],
        "name": "createNewChar",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "charID",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_charID",
            "type": "uint256"
          }
        ],
        "name": "getCharacterWithID",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_charID",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "_ipfsHash",
            "type": "string"
          }
        ],
        "name": "progressChar",
        "outputs": [
          {
            "internalType": "string[]",
            "name": "",
            "type": "string[]"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]

    const contract = await new Web3Obj.eth.Contract(abi,'0xbdBFcB94B53a809faa36e171CD7bbAa70ee5376F');

    return contract.methods.createNewChar(cid).send({from: Address}).then((hash)=>{
      console.log(hash)
      return hash;
    })

  }

  return (
    <div className="container-fluid  d-flex flex-column flex-grow-1 ">
      <div className="row flex-grow-1 ">
        <Account id={Id} address={Address} resetWeb3={resWeb3} web3={Web3Obj} transact={transact} fetchAccountChars={fetchAccountChars} showLoader={showLoader} setShowLoader={setShowLoader} loaderMessage={loaderMessage} setLoaderMessage={setLoaderMessage}/>
        <Characters characters={userCharacters} address={Address} resetWeb3={resWeb3} web3={Web3Obj} transact={transact} fetchAccountChars={fetchAccountChars} setShowLoader={setShowLoader}  setLoaderMessage={setLoaderMessage}/>
        <Modal show={showRegisterAccountModal} onHide={handleCloseRegisterAccountModal}>
        <Modal.Header >
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your current account is not registered, please register it by clicking the button below
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegisterAccountModal}>
            Close
          </Button>
          <Button variant="primary" type="button"  onClick={registerAccountAddress}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
    
      </div>
    </div>
  );
}

export default Content;
