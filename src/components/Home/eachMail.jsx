import React from "react";
import { useHistory } from "react-router-dom";

const EachMail = props => {
  let history = useHistory();

  return (
    <div
      className="email fadeInUp"
      style={{ animationDelay: `${0.1 + props.index / 10}s` }}
      onClick={() => history.push(`/${props.box}/${props.id}`)}
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
          <h5>{props.box === "inbox" ? props.sender : props.reciever}</h5>
          <h4>{props.date}</h4>
        </div>
      </div>
    </div>
  );
};

export default EachMail;
