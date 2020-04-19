import React, { useState, useEffect } from "react";
import Axios from "axios";
import { URL } from "../../globalvariables";

const MyTokens = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "HCtoken"
    );
    Axios.get(`${URL}/api/token/user`)
      .then(data => {
        setTokens(data.data.data.tokens);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="all-tokens fadeInUp" style={{ animationDelay: "1.3s" }}>
      <ul>
        {tokens.length !== 0
          ? tokens.map((tk, index) => {
              return (
                <li key={index}>
                  <h2>{tk.name}</h2>
                </li>
              );
            })
          : "> No Tokens Added"}
      </ul>
    </div>
  );
};

export default MyTokens;
