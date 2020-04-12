import React from "react";
import { Send, Inbox } from "react-feather";

const Tabs = () => {
  return (
    <div className="MapExplorer fadeInUp" style={{ animationDelay: "1.5s" }}>
      <div className="map-stats">
        <div
          className="stats fadeInUp is-green"
          style={{ animationDelay: "1s" }}
        >
          <h5>
            <Inbox size={15} /> INBOX{" "}
          </h5>
          <div className="stats-bottom">
            <h1>{200}</h1>
            {/* <h6></h6> */}
          </div>
        </div>
      </div>

      <div className="map-stats">
        <div
          className="stats fadeInUp is-gray"
          style={{ animationDelay: "1s" }}
        >
          <h5>
            <Send size={15} /> SENT
          </h5>
          <div className="stats-bottom">
            <h1>{200}</h1>
            {/* <h6></h6> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
