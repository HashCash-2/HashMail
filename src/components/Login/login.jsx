import React from "react";
import CustomHeader from "../Common/customHeader";
import LoginBox from "./loginBox";
import SignUpBox from "./signUpBox";

const Login = () => {
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
            style={{ animationDelay: "1s" }}
          ></iframe>
        </div>

        <div className="home-right">
          <div className="small-width">
            <LoginBox />
            <br />
            <br />
            <br />
            <SignUpBox />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
