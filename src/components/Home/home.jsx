import React from "react";
import Tabs from "./tabs";
import NewEmailButton from "./newEmailButton";
import CustomHeader from "../Common/customHeader";
import MailList from "./mailList";

const Home = () => {
  return (
    <React.Fragment>
      <div className="Home">
        <div className="home-left">
          <CustomHeader
            title={"Hash Mail"}
            subtitle={"Works on HashCash 2.0 Protocol"}
          />
          <Tabs />
          <NewEmailButton />
        </div>
        <div className="home-right">
          <CustomHeader title={"Inbox"} />
          <MailList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
