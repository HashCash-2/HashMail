import React, { useState, useEffect } from "react";
import EachMail from "./eachMail";
import { useStoreState } from "easy-peasy";
import Axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { URL } from "../../globalvariables";
import { Loader } from "semantic-ui-react";

const MailList = props => {
  const whichBox = props.whichBox;
  const inbox = useStoreState(state => state.emails.inbox);
  const outbox = useStoreState(state => state.emails.sent);

  const [mails, setMails] = useState([]);
  const [mailobj, setMailobj] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (whichBox === "inbox") {
      Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "HCtoken"
      );
      setLoading(true);
      Axios.get(`${URL}/api/email/inbox`).then(data => {
        console.log(data.data.emails);
        setMailobj(data.data.emails);
        setLoading(false);
      });
      // setMails(inbox);
    } else if (whichBox === "outbox") {
      Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "HCtoken"
      );
      setLoading(true);
      Axios.get(`${URL}/api/email/read`).then(data => {
        console.log(data);
        setMailobj(data.data.emails);
        setLoading(false);
      });
      // setMails(outbox);
    }
    return () => {
      setMails([]);
      setMailobj([]);
    };
    //eslint-disable-next-line
  }, [whichBox]);

  return (
    <div className="updates">
      {loading ? (
        <Loader active inline />
      ) : (
        mailobj.map((mail, index) => {
          return (
            <EachMail
              key={index}
              index={index}
              box={whichBox}
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
