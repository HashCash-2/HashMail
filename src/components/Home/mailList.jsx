import React, { useState, useEffect } from "react";
import EachMail from "./eachMail";
import { useStoreState } from "easy-peasy";

const MailList = (props) => {
  const whichBox = props.whichBox;
  const inbox = useStoreState((state) => state.emails.inbox);
  const outbox = useStoreState((state) => state.emails.sent);

  const [mails, setMails] = useState([]);

  useEffect(() => {
    if (whichBox === "inbox") {
      setMails(inbox);
    } else if (whichBox === "outbox") {
      setMails(outbox);
    }
    return () => {
      setMails([]);
    };
  }, [whichBox]);

  return (
    <div className="updates">
      {mails.map((mail, index) => {
        return (
          <EachMail
            key={index}
            index={index}
            box={whichBox}
            id={mail.id}
            date={mail.date}
            sender={mail.from}
            subject={mail.subject}
          />
        );
      })}
    </div>
  );
};

export default MailList;
