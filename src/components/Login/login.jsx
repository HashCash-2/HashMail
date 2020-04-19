import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import CustomHeader from "../Common/customHeader";
import LoginBox from "./loginBox";
import SignUpBox from "./signUpBox";

const Login = () => {
  let history = useHistory();

  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("HCtoken")) {
      history.push("/");
    }
  });

  return (
    <React.Fragment>
      <div className="Home">
        <div className="home-left">
          <CustomHeader subtitle={"Priority Emails for SuperHumans"} />
          <iframe
            src="https://giphy.com/embed/sIIhZliB2McAo"
            width="200"
            height="100"
            frameBorder="0"
            className="giphy-embed fadeInUp"
            title="NyanCat"
            style={{ animationDelay: "0.5s" }}
          ></iframe>
        </div>

        <div className="home-right">
          <div className="small-width">
            <LoginBox />
            <a
              href="#signup"
              role="button"
              className="fadeInUp"
              style={{ cursor: "pointer", animationDelay: "1s" }}
              onClick={() => {
                setShowSignUp(true);
              }}
            >
              Create Account
            </a>
            <br />
            <br />
            <br />

            {showSignUp ? <SignUpBox /> : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
