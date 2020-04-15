import React, { useState, useEffect } from "react";
import CustomHeader from "../Common/customHeader";
import { useStoreState } from "easy-peasy";
import ReplyEmailButton from "./replyEmail";
import Axios from "axios";
import { URL } from "../../globalvariables";
import { Loader } from "semantic-ui-react";

const DetailView = ({ match }) => {
  let { box, mailid } = match.params;

  const [sliderValue, setSliderValue] = useState(0);

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
                {mail.amount || "N/A"} {mail.TokenName || "N/A"}
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

            <div
              className="slider-div fadeInUp"
              style={{ animationDelay: "0.8s" }}
            >
              <div>
                <h6 className="slider-label">BURN</h6>
              </div>
              <div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  name="percentage"
                  step="20"
                  onChange={e => setSliderValue(e.target.value)}
                  value={sliderValue}
                  list="tickmarks"
                />
                <datalist id="tickmarks">
                  <option>20</option>
                  <option>40</option>
                  <option>60</option>
                  <option>80</option>
                </datalist>
              </div>
              <div>
                <h6 className="slider-label">RETURN</h6>
              </div>
              <div className="percentage">
                <h4>
                  BURN: {(mail.amount * ((100 - sliderValue) / 100)).toFixed(2)}{" "}
                  {mail.TokenName || "N/A"}
                </h4>
                <h4>
                  RETURN: {(mail.amount * (sliderValue / 100)).toFixed(2)}{" "}
                  {mail.TokenName || "N/A"}
                </h4>
              </div>
            </div>

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
