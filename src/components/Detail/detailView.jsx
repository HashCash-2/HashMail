import React, { useState, useEffect } from "react";
import CustomHeader from "../Common/customHeader";
import { useStoreState } from "easy-peasy";
import ReplyEmailButton from "./replyEmail";

const DetailView = ({ match }) => {
  let { box, mailid } = match.params;

  const inbox = useStoreState((state) => state.emails.inbox);
  const outbox = useStoreState((state) => state.emails.sent);

  const [mail, setMail] = useState([]);

  useEffect(() => {
    if (box === "inbox") {
      const email = inbox.filter((items) => {
        return items.id === parseInt(mailid);
      })[0];
      setMail(email);
    } else if (box === "outbox") {
      const email = outbox.filter((items) => {
        return items.id === parseInt(mailid);
      })[0];
      setMail(email);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="mailDetail">
      <CustomHeader title={mail.subject} subtitle={mail.from} />

      <div className="mailbody fadeInUp" style={{ animationDelay: "0.7s" }}>
        {mail.body}
        <br />
        <br />
        <br />
        {box === "inbox" ? <ReplyEmailButton mail={mail.from} /> : null}
      </div>
    </div>
  );
};

export default DetailView;