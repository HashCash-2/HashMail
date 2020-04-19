import React from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { LogOut } from "react-feather";

const LogoutButton = () => {
  let history = useHistory();
  return (
    <div
      className="fadeInUp button is-purple"
      style={{ animationDelay: "1.4s" }}
      onClick={() => {
        localStorage.removeItem("HCtoken");
        delete Axios.defaults.headers.common["Authorization"];
        history.push("/login");
      }}
    >
      <LogOut />
      <span>Logout</span>
    </div>
  );
};

export default LogoutButton;
