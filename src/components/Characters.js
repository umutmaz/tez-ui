import React from "react";
import Character from "./Character";
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useState, useEffect } from "react";

function Characters({ characters, address, resetWeb3, fetchAccountChars, web3, transact, setShowLoader, setLoaderMessage }) {

 const handleOrder = (characters) =>{

  characters.sort((a, b) => a.created_at.localeCompare(b.created_at));

  return characters.map((c) =>{ return (
    <Character charID={c.id} name={c.name} hash={c.cid} transactionHash={c.hash} address={address} resetWeb3={resetWeb3} web3={web3} transact={transact} fetchAccountChars={fetchAccountChars}  setShowLoader={setShowLoader}  setLoaderMessage={setLoaderMessage}/>
  )})
 }

  return characters.length?(
    <div className="col-8 pr-0 character-container m-0 ">

      {handleOrder(characters)}

    </div>

    

  ):(<div className="col-8 pr-0 character-container m-0 ">
        <h3 className="mt-5">You don't have any characters. Yet.</h3>
    </div>);
}

export default Characters;
