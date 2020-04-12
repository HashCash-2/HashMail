import React from "react";
import { Mail } from "react-feather";

const NewEmailButton = () => {
  return (
    <div
      className="fadeInUp button telegram"
      style={{ animationDelay: "1s" }}
    >
      <Mail />
      <span>Send New Hash Mail</span>
    </div>
  );
};

export default NewEmailButton;
