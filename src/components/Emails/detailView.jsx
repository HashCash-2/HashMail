import React, { useState, useEffect } from "react";

import { Loader } from "semantic-ui-react";
import CustomHeader from "../Common/customHeader";
import ReplyEmailButton from "./replyEmail";
import { fetchMailDetails } from "../../services/emailService";

const DetailView = ({ match }) => {
  let { box, mailid } = match.params;

  const [mail, setMail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMail = async () => {
      setLoading(true);
      try {
        const email = await fetchMailDetails(box, mailid);
        setMail(email);
      } catch (error) {}
      setLoading(false);
    };

    getMail();
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
