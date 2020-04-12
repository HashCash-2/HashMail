import React from "react";
import { CornerUpRight } from "react-feather";

const ReplyEmailButton = () => {
  return (
    <div
      className="fadeInUp button telegram"
      style={{ animationDelay: "1s" }}
    >
      <CornerUpRight />
      <span>Reply</span>
    </div>
  );
};

export default ReplyEmailButton;
