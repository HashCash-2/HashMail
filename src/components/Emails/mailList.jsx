import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";

import { Loader } from "semantic-ui-react";
import EachMail from "./eachMail";
import { fetchMails } from "../../services/emailService";

const MailList = props => {
  const whichBox = props.whichBox;
  const inbox = useStoreState(state => state.emails.inbox);
  const outbox = useStoreState(state => state.emails.sent);

  const setInbox = useStoreActions(action => action.emails.setInbox);
  const setOutbox = useStoreActions(action => action.emails.setOutbox);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMails = async () => {
      setLoading(true);
      try {
        const { inbox, outbox } = await fetchMails();
        setInbox(inbox.emails);
        setOutbox(outbox.emails);
      } catch (error) {}
      setLoading(false);
    };

    fetchAllMails();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="updates">
      {loading ? (
        <Loader active inline />
      ) : (
        (whichBox === "inbox" ? inbox : outbox).map((mail, index) => {
          return (
            <EachMail
              key={index}
              index={index}
              box={whichBox}
              amount={mail.amount}
              streamId={mail.streamId}
              tokenName={mail.tokenname}
              expiry={mail.expiryDate}
              id={mail._id}
              date={mail.date}
              sender={mail.from}
              reciever={mail.to}
              subject={mail.subject}
            />
          );
        })
      )}
    </div>
  );
};

export default MailList;
