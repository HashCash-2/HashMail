import React, { useState, useEffect } from "react";
import EachMail from "./eachMail";

const MailList = (props) => {
  const whichBox = props.whichBox;

  return (
    <div className="updates">
      {[...Array(5)].map((item) => {
        return (
          <EachMail
            date={"5 minutues Ago"}
            sender={"Kautuk Kundan"}
            subject={`This email is in ${whichBox}`}
          />
        );
      })}
    </div>
  );
};

export default MailList;
