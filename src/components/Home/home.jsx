import React, { useEffect } from "react";
import Tabs from "./tabs";
import NewEmailButton from "./newEmailButton";
import CustomHeader from "../Common/customHeader";
import MailList from "./mailList";
import { Route, Switch, useHistory } from "react-router-dom";
import LogoutButton from "./logoutButton";

const Home = () => {
  let history = useHistory();

  useEffect(() => {
    history.push("/inbox");
  }, []);

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
          <LogoutButton />
        </div>
        <div className="home-right">
          <Switch>
            <Route path="/inbox">
              <CustomHeader title={"Inbox"} />
              <MailList whichBox={"inbox"} />
            </Route>
            <Route path="/outbox">
              <CustomHeader title={"Outbox"} />
              <MailList whichBox={"outbox"} />
            </Route>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
