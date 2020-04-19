import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Web3 from "web3";
import * as contractInteraction from "../../utils/contractInteractions";

import Countdown from "react-countdown-now";
import { Loader } from "react-feather";

var web3Instance = new Web3();

const EachMail = props => {
  let history = useHistory();
  const [remainingFund, setRemainingFund] = useState(0);
  const [loading, setLoading] = useState(true);

  const Completionist = () => <span>Email Expired!</span>;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return (
        <span>
          {days} days {hours} hours {minutes} minutes
        </span>
      );
    }
  };

  useEffect(() => {
    const getBalance = async () => {
      const balance = await contractInteraction.BalanceOfStream(
        web3Instance,
        props.streamId
      );
      setRemainingFund(balance);
      setLoading(false);
    };

    getBalance();
    //eslint-disable-next-line
  }, []);

  return (
    <div
      className="email fadeInUp"
      style={{ animationDelay: `${0.1 + props.index / 10}s` }}
      onClick={() => history.push(`/${props.box}/${props.id}`)}
    >
      {props.streamId ? (
        <>
          <div className="email-right">
            <h5>{props.tokenName || "N/A"}</h5>
            <h1>
              {loading ? (
                <Loader />
              ) : props.box === "inbox" ? (
                (props.amount - remainingFund).toFixed(3)
              ) : (
                remainingFund.toFixed(3)
              )}
            </h1>{" "}
          </div>
        </>
      ) : null}
      <div className="update email-left">
        <div className="left">
          <h4>SUBJECT:</h4>
          <h2>{props.subject}</h2>
        </div>
        <div className="right">
          <h5>{props.box === "inbox" ? props.sender : props.reciever}</h5>
          <h4>
            Expires in :{" "}
            <Countdown date={new Date(props.expiry)} renderer={renderer} />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default EachMail;
