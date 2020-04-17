import React, { useState, useEffect } from "react";
import CustomHeader from "../Common/customHeader";
import ReplyEmailButton from "./replyEmail";
import Axios from "axios";
import { URL } from "../../globalvariables";
import { Loader } from "semantic-ui-react";

const DetailView = ({ match }) => {
  let { box, mailid } = match.params;

  const [mail, setMail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "HCtoken"
    );
    if (box === "inbox") {
      Axios.get(`${URL}/api/email/inbox/${mailid}`).then(data => {
        setMail(data.data.email);
        setLoading(false);
      });
    } else if (box === "outbox") {
      Axios.get(`${URL}/api/email/read/${mailid}`).then(data => {
        setMail(data.data.email);
        setLoading(false);
      });
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="mailDetail">
      {loading ? (
        <Loader active inline />
      ) : (
        <>
          <CustomHeader title={mail.subject} subtitle={`From : ${mail.from}`} />

          <div className="mailbody fadeInUp" style={{ animationDelay: "0.7s" }}>
            <h3>
              Email Value :{" "}
              <strong>
                {mail.amount || "N/A"} {mail.tokenname || "N/A"}
              </strong>
              <br />
              Expires :{" "}
              <strong>{new Date(mail.expiryDate).toLocaleString()}</strong>
            </h3>
            <br />
            {mail.text}
            <br />
            <br />

            <br />
            {box === "inbox" ? <ReplyEmailButton mail={mail} /> : null}
            <h4 className="fadeInUp" style={{ animationDelay: "1.2s" }}>
              Stream ID: {mail.streamId || "N/A"}
            </h4>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailView;
