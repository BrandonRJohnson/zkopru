import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
import fromWei from './fromWei.js';

const App = () => {
  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(async () => {
    try {
      const { data } = await axios('https://zkopru.goerli.rollupscan.io/instant-withdraw')
      setInfo(data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }, [])

  console.log()
  // Status: convert status from number in data to display words in browser (4 is available, 5 Not Available, 6 Fulfilled )
  const Data = info.map((item) => {
    return (
      <tbody>
        <tr>
          <td>
            {(() => {
              if (item.withdrawal.status === 4 ) {
                return 'Available'
              }
              else if ( item.withdrawal.status === 5 ) {
                return 'Fulfulled'
              }
              else if ( item.withdrawal.statsus === 6 ) {
                return 'Not Available'
              }
            })()}
          </td>
          <td>{fromWei(item.prepayFeeInEth)} ETH</td>
          <td>TBD</td>
          <td>{Date(item.expiration * 1000)}</td>
          <td>{item.withdrawal.proposal.canonicalNum}</td>
          <td>{item.withdrawal.proposal.proposedAt}</td>
          <td>{Date(item.withdrawal.proposal.timestamp * 1000)}</td>
          <td>ETH</td>
          <td>TODO</td>
        </tr>
      </tbody>
    )
  })


  // Reward: Should be calculated based on withdrawal.eth - prepayFeeInEther
  // should use the BN math library in order to do these calculations
  // Paid:

  // Expiration: unix time (seconds) convert to milliseconds to use in javascript (e.g. new Date(expiration * 1000)

  // Creation

  // Asset

  // Amount
  return (
    <div>
      <h1>
        Market
      </h1>
      <h2>
      </h2>
      <table className="content-table">
        <thead>
          <tr>
            <th className="status">Status</th>
            <th>Reward</th>
            <th>Paid</th>
            <th>Expires</th>
            <th>L2 Block</th>
            <th>L1</th>
            <th>Creation</th>
            <th>Asset</th>
            <th>Amount</th>
          </tr>
        </thead>
        {Data}
      </table>
    </div>
  )

}

export default App;
