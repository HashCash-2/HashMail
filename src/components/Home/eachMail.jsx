import React from "react";

const EachMail = (props) => {
  return (
    <div
      className="email fadeInUp"
      style={{ animationDelay: `${1 + props.index / 10}s` }}
    >
      <div className="email-right">
        <h5>HashCash</h5>
        <h1>₹500</h1>
      </div>
      <div className="update email-left">
        <div className="left">
          <h4>SUBJECT:</h4>
          <h2>{props.subject}</h2>
        </div>
        <div className="right">
          <h5>{props.sender}</h5>
          <h4>{props.date}</h4>
        </div>
      </div>
    </div>
  );
};

export default EachMail;
