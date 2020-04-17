import React, { useState, useEffect } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import swal from "sweetalert";
import Axios from "axios";
import { URL } from "../../globalvariables";
import Web3 from "web3";
import * as contractInteraction from "../../utils/contractInteractions";
import { toast } from "react-toastify";

var web3Instance = new Web3();

const ComposeReply = props => {
  const [email, setEmail] = useState(props.mail.from);
  const [subject, setSubject] = useState(props.mail.subject);
  const [body, setBody] = useState("");

  const [burnAmount, setBurnAmount] = useState(0);
  const [returnAmount, setReturnAmount] = useState(0);

  const [sliderValue, setSliderValue] = useState(0);

  const [loading, setLoading] = useState(false);

  const setRatio = value => {
    setSliderValue(value);
    const burn = props.mail.amount * ((100 - sliderValue) / 100);
    setBurnAmount(burn);
    const returnVal = props.mail.amount * (sliderValue / 100);
    setReturnAmount(returnVal);
    console.log(burnAmount, returnAmount);

    setTimeout(() => {
      setSliderValue(0);
      toast.info("Feature Coming Soon!", { toastId: 1 });
    }, 1000);
  };

  useEffect(() => {
    const burn = props.mail.amount * ((100 - sliderValue) / 100);
    setBurnAmount(burn);
    const returnVal = props.mail.amount * (sliderValue / 100);
    setReturnAmount(returnVal);
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    if (email.match(`[a-zA-Z0-9._-]+@[a-z]+.(com|in|net|org|edu)`) === null) {
      swal(
        "Invalid Email",
        "Please enter your email in the correct format",
        "error"
      );
    } else {
      setLoading(true);
      var account = await window.ethereum.enable();
      const streamId = props.mail.streamId;
      try {
        await contractInteraction.CloseStream(
          web3Instance,
          streamId,
          burnAmount,
          returnAmount,
          account[0]
        );
        let obj = {};
        obj.receiver_email = email;
        obj.sender_email = "random@gmail.com";
        obj.subject = subject;
        obj.text = body;
        obj.html = " ";
        console.log("body", email, subject, body, obj);
        Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "HCtoken"
        );
        Axios.post(`${URL}/api/email/send`, obj)
          .then(data => {
            console.log(data);

            window.location.reload();
          })
          .catch(error => {
            setLoading(false);
            swal("Error", "Couldnt send email right now", "error");
          });

        toast.success("Stream closed successfully!");
      } catch (e) {
        console.log("error closing stream", e);
        toast.error("Error closing stream");
      }

      // console.log(burnAmount, returnAmount);
    }
  };

  return (
    <React.Fragment>
      <div className="titles">
        <h1>Compose Reply</h1>
        <br />
        <br />
      </div>
      <Form>
        <Form.Field>
          <label>Email</label>
          <input type="text" name="email" disabled value={email} />
        </Form.Field>
        <Form.Field>
          <label>Subject</label>
          <input type="text" value={subject} name="subject" disabled />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <TextArea
            style={{ minHeight: 100 }}
            onChange={e => setBody(e.target.value)}
          />
        </Form.Field>
        <div className="slider-div fadeInUp" style={{ animationDelay: "0.2s" }}>
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
              onChange={e => setRatio(e.target.value)}
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
              BURN: {props.mail.amount * ((100 - sliderValue) / 100).toFixed(2)}{" "}
              {props.mail.tokenname || "N/A"}
            </h4>
            <h4>
              RETURN: {props.mail.amount * (sliderValue / 100).toFixed(2)}{" "}
              {props.mail.tokenname || "N/A"}
            </h4>
          </div>
        </div>
        <br />
        <Button
          color="google plus"
          floated="right"
          onClick={handleSubmit}
          loading={loading}
        >
          Send Reply
        </Button>
      </Form>
      <br />
      <br />
    </React.Fragment>
  );
};

export default ComposeReply;
