import React from "react";
import { Send, Inbox } from "react-feather";
import { Link } from "react-router-dom";
import { useStoreState } from "easy-peasy";

const Tabs = () => {
  const inbox = useStoreState((state) => state.emails.inbox);
  const outbox = useStoreState((state) => state.emails.sent);

  return (
    <div className="MapExplorer fadeInUp" style={{ animationDelay: "1.2s" }}>
      <Link to="/inbox">
        <div className="map-stats">
          <div
            className="stats fadeInUp is-green"
            style={{ animationDelay: "1s" }}
          >
            <h5>
              <Inbox size={15} /> INBOX{" "}
            </h5>
            <div className="stats-bottom">
              <h1>{inbox.length}</h1>
              {/* <h6></h6> */}
            </div>
          </div>
        </div>
      </Link>

      <Link to="/outbox">
        <div className="map-stats">
          <div
            className="stats fadeInUp is-gray"
            style={{ animationDelay: "1s" }}
          >
            <h5>
              <Send size={15} /> SENT
            </h5>
            <div className="stats-bottom">
              <h1>{outbox.length}</h1>
              {/* <h6></h6> */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Tabs;
