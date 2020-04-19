import React, { useState, useEffect } from "react";

import { fetchAllTokens } from "../../services/tokenService";
import { useStoreState, useStoreActions, action } from "easy-peasy";

const MyTokens = () => {
  const tokens = useStoreState(state => state.tokens.allTokens);
  const setTokens = useStoreActions(action => action.tokens.setTokens);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const res = await fetchAllTokens();
        setTokens(res.data.data.tokens);
      } catch (error) {}
    };

    fetchTokens();
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
