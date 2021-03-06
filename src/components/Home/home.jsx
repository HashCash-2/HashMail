import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Tabs from "./tabs";
import NewEmailButton from "./newEmailButton";
import CustomHeader from "../Common/customHeader";
import MailList from "../Emails/mailList";
import LogoutButton from "./logoutButton";
import DetailView from "../Emails/detailView";
import AddTokenButton from "./addTokenButton";
import MyTokens from "./myTokens";

const Home = () => {
  let history = useHistory();

  useEffect(() => {
    const checkMetaMask = async () => {
      await window.ethereum.enable();
    };

    checkMetaMask();

    if (!localStorage.getItem("HCtoken")) {
      history.push("/login");
    } else {
      history.push("/inbox");
    }
    //eslint-disable-next-line
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

          <h5 className="fadeInUp" style={{ animationDelay: "1.2s" }}>
            Currently Accepting:
          </h5>
          <MyTokens />
          <AddTokenButton />

          <br />
          <LogoutButton />
        </div>
        <div className="home-right">
          <Switch>
            <Route exact path="/inbox">
              <CustomHeader title={"Inbox"} />
              <MailList whichBox={"inbox"} />
            </Route>

            <Route exact path="/outbox">
              <CustomHeader title={"Outbox"} />
              <MailList whichBox={"outbox"} />
            </Route>

            <Route path="/:box/:mailid" component={DetailView} />
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
