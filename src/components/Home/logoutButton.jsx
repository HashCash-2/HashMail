import React from "react";
import { LogOut } from "react-feather";
import { useHistory } from "react-router-dom";
import  Axios from 'axios'
const LogoutButton = () => {
  let history = useHistory();
  return (
    <div
      className="fadeInUp button is-purple"
      style={{ animationDelay: "1s" }}
      onClick={() => {        
        localStorage.removeItem("HCtoken")
        delete Axios.defaults.headers.common['Authorization'];
        history.push("/login")
      }}
    >
      <LogOut />
      <span>Logout</span>
    </div>
  );
};

export default LogoutButton;
