import React from "react";

const CustomHeader = (props) => {
  return (
    <div className="header fadeInUp" style={{ animationDelay: "0.5s" }}>
      <div className="header-mid">
        <div className="titles">
          <h1>{props.title}</h1>
          <h6 style={{ fontWeight: 600 }}>{props.subtitle}</h6>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
