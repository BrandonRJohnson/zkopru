import React, { useEffect, useState } from "react";
import './App.css';
import axios from 'axios';
 
const App = () => {
  // we need to use the api key in order to figure out the data that is actually being imported from the API
  const [ info, setInfo ] = useState([])

  useEffect(() => {
    axios
      .get('https://zkopru.goerli.rollupscan.io/instant-withdraw', {mode: 'cors'})
      .then((response) => {
        console.log(response);
        setInfo(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }, [])
  // Convert status from number in data to display words in browser (4 is available, 5 Not Available, 6 Fulfilled )
  const statusData = info.map((item, index) => {
    if ( info[index].withdrawal.status === 4 ) {
      return (
        <tr className="status" >
          <td>Available</td>
        </tr>
      )
    }

    else if ( info[index].withdrawal.status === 6 ) {
      return (
        <tr>Fulfilled</tr>
      )
    }

    else {
      return (
        <tr>Not Available</tr>
      )
    }
  })

  // Reward: Should be calculated based on withdrawal.eth - prepayFeeInEther
  // should use the BN math library in order to do these calculations


  // expiration: unix time (seconds), convert to milliseconds to use in javascript (e.g. new Date(expiration * 1000)
  const getDate = (index) = {
    let expiration = new Date(info[index].expiration * 1000)
  } 
  const expirationData = info.map((item, index) => {
    return (
      <tr>
        <td>{expiration}</td>
      </tr>
    )
  })

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
        <tbody>
          <tc> {statusData} </tc>
          <tc> {expirationData} </tc>
        </tbody>
      </table>
    </div>
  )
}

export default App;
