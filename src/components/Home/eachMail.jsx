import React from "react";

const EachMail = (props) => {
  return (
    <div className="email fadeInUp" style={{ animationDelay: "1.7s" }}>
      <div className="update email-left">
        <h2>SUBJECT : {props.subject}</h2>
        <br />
        <h2>{props.sender}</h2>
        <h4>{props.date}</h4>
      </div>
      <div className="email-right">
        <h5>HashCash</h5>
        <h1>₹500</h1>
      </div>
    </div>
  );
};

export default EachMail;
