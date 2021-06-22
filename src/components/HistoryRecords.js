import React from 'react'
import CharHistory from "./CharHistory"

function HistoryRecords({records}) {

const handleOrder = (records) =>{
    records.sort((a, b) => a.created_at.localeCompare(b.created_at));
    return records.map((c) =>{ return (
      <CharHistory  hash={c.cid} txHash={c.hash} prevTxHash={c.previous_hash} />
    )})
   }   
    return (
        <div>
            {handleOrder(records)}
        </div>
    )
}

export default HistoryRecords
