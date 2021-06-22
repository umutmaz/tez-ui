
import React from 'react'

function CharHistory({hash, txHash, prevTxHash}) {
    return (
        <div>
            <hr className="solid"></hr>
            <div className=" align-items-center d-flex p-0 ">
                <ul>
                    <li>IPFS Link: <a href={`https://ipfs.io/ipfs/${hash}`} target="_blank">{hash}</a>  </li>
                    <li>Transaction Link: <a href={`https://ropsten.etherscan.io/tx/${txHash}`} target="_blank">{txHash}</a>  </li>
                    <li>Previous Transaction Link:  {prevTxHash!=="none"?<a href={`https://ropsten.etherscan.io/tx/${prevTxHash}`} target="_blank">{prevTxHash}</a>:prevTxHash}  </li>                    
                </ul>             
            </div>
        </div>
    )
}

export default CharHistory
