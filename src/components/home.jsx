import React from "react";
import * as Icon from "react-feather";

const Home = () => {
  return (
    <React.Fragment>
      <div className="Home">
        <div className="home-left">
          <div className="header fadeInUp" style={{ animationDelay: "1s" }}>
            <div className="header-mid">
              <div className="titles">
                <h1>Hash Mail</h1>
                <h6 style={{ fontWeight: 600 }}>
                  Works on HashCash 2.0 protocol
                </h6>
              </div>
            </div>
          </div>

          <div
            className="MapExplorer fadeInUp"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="map-stats">
              <div
                className="stats fadeInUp is-green"
                style={{ animationDelay: "1s" }}
              >
                <h5>
                  <Icon.Inbox size={15} /> INBOX{" "}
                </h5>
                <div className="stats-bottom">
                  <h1>{200}</h1>
                  <h6></h6>
                </div>
              </div>
            </div>

            <div className="map-stats">
              <div
                className="stats fadeInUp is-gray"
                style={{ animationDelay: "1s" }}
              >
                <h5>
                  <Icon.Send size={15} /> SENT
                </h5>
                <div className="stats-bottom">
                  <h1>{200}</h1>
                  <h6></h6>
                </div>
              </div>
            </div>
          </div>

          <div style={{ animationDelay: "1s" }}>
            <a
              href="https://bit.ly/covid19crowd"
              className="button telegram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon.Mail />
              <span>Send New Hash Mail</span>
            </a>
          </div>
        </div>
        <div className="home-right">B</div>
      </div>
    </React.Fragment>
  );
};

export default Home;
