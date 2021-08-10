import { useEffect, useState } from "react";
import axios from 'axios';
import useAxios from "./axios";

// NOTE: will start with only one component. simple web app no need to overcomplicate it.

// 
const App = () => {
  // set up state for withdrawals
  const [ withdrawals, setWithdrawals ] = useState([]);
  const [data, setData] = useState([]);

  const { response, loading, error } = useAxios({
    method: 'placeholder'
    url: "placeholder"
    headers: 'placeholder'
    body: JSON.stringify({
      x
      y
      z
    })
  })

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);

  setWithdrawals({...withdrawals, data})

  // need a map function
  const info = withdrawals.map((item) =>
    <div>
      <h2>
      {key}
      {amount}
      {date}
      </h2>
    </div>
  )
  return (
    <div>
      <h1>Zkopru withdrawals</h1>
      {info}
    </div>
  )
}
export default App;
