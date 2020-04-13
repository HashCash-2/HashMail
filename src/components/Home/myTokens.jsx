import React,{useState, useEffect} from "react";
import Axios from 'axios'
import {URL} from '../../globalvariables'

const MyTokens = () => {

  const [tokens, setTokens] = useState([])


  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem("HCtoken");
    Axios.get(`${URL}/api/token/user`).then(data => {
      console.log(data.data.data.tokens)
      setTokens(data.data.data.tokens)
    }).catch(err => {
      console.log(err)
    })
  },[])


  return (
    <div className="all-tokens fadeInUp" style={{ animationDelay: "1.3s" }}>
      <ul>
        {
         tokens != null? tokens.map(tk =>{
            return <li>
          <h2>{tk.name}</h2>
            </li>    
          }):null
        }
        {/* <li>
          <h2>DAI</h2>
        </li>
        <li>
          <h2>ETH</h2>
        </li> */}
      </ul>
    </div>
  );
};

export default MyTokens;
