import React, { useState, useEffect } from "react";
import { Form, Button, TextArea, Icon } from "semantic-ui-react";
import swal from "sweetalert";
import Axios from "axios";
import { URL } from "../../globalvariables";
import { formatDate } from "../../utils/helpers";
import { Mail } from "react-feather";

import Web3 from "web3";
import * as contractInteraction from "../../utils/contractInteractions";
import Stepper from "react-stepper-horizontal";

import { toast } from "react-toastify";
var web3Instance = new Web3();
const ComposeMail = props => {
  const [email, setEmail] = useState(props.mail ? props.mail : "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [selectedTokenAddress, setSelectedTokenAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [expiry, setExpiry] = useState(formatDate(new Date()));
  const [streamId, setStreamId] = useState("");
  const [rate, setRate] = useState("");

  const [tokens, setTokens] = useState([]);
  const [activeStep, setActiveStep] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(amount, expiry, selectedTokenAddress);
    const adate = new Date(expiry);
    const today = new Date();
    const diffTime = Math.abs(adate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setRate(`${(amount / diffDays).toFixed(2)} tokens/day`);
  }, [amount, expiry, selectedTokenAddress]);

  const approveToken = async () => {
    setLoading(true);
    var account = await window.ethereum.enable();
    try {
      await contractInteraction.ApproveTokens(
        web3Instance,
        account[0],
        amount,
        selectedTokenAddress
      );
      setActiveStep(3);
      setLoading(false);
    } catch (e) {
      console.log("error while approve token", e);
      toast.error("Unable to approve tokens");
      setActiveStep(2);
      setLoading(false);
    }
  };

  const fetchTokens = async () => {
    setLoading(true);
    if (email) {
      Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "HCtoken"
      );
      Axios.get(`${URL}/api/token/user/${email}`)
        .then(data => {
          //   console.log(data);
          if (data.data.message == "success") {
            // console.log(data.data.data.tokens);
            let tokensarr = [];
            data.data.data.tokens.map((obj, index) => {
              tokensarr.push({
                key: index,
                text: obj.name,
                value: obj.address
              });
            });
            setTokens(tokensarr);
            setLoading(false);
            setActiveStep(2);
          } else {
            // no token for this account
            setTokens([
              {
                key: "no tokens",
                text: "no tokens",
                value: "0"
              }
            ]);
            swal("No tokens", "No Receiver tokens for this email", "error");
            setLoading(false);
          }
        })
        .catch(err => {
          swal("Couldnt fetch", "Receiver tokens cant be fetched", "error");
          setLoading(false);
        });
    } else {
      swal(
        "Please enter Email",
        "To fetch the tokens receiver can receive",
        "error"
      );
      setLoading(false);
    }
  };

  const handleSign = () => {
    console.log("signed");
    setStreamId("0x8f51a68052a3e1d56d145092da42ba13b02146bb");
  };

  const handleSubmit = async () => {
    if (email.match(`[a-zA-Z0-9._-]+@[a-z]+.(com|in|net|org|edu)`) === null) {
      swal(
        "Invalid Email",
        "Please enter your email in the correct format",
        "error"
      );
    } else {
      setLoading(true);

      const getUnixTimeUtc = (dateString = new Date()) =>
        Math.round(new Date(dateString).getTime() / 1000);
      var stopTime = getUnixTimeUtc() + 3600;
      var account = await window.ethereum.enable();
      try {
        const streamId = await contractInteraction.StartReverseStream(
          web3Instance,
          amount,
          stopTime,
          selectedTokenAddress,
          account[0]
        );
        setActiveStep(3);
        setLoading(false);
        //   const response = await login(email, password);
        let obj = {};
        obj.receiver_email = email;
        obj.sender_email = "random@gmail.com";
        obj.subject = subject;
        obj.text = body;
        obj.html = " ";
        obj.amount = amount;
        obj.tokens = selectedTokenAddress;
        obj.streamId = streamId;
        obj.rate = rate;
        obj.expiryDate = expiry;
        //   console.log("body", email, subject, body, obj);
        Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
          "HCtoken"
        );
        Axios.post(`${URL}/api/email/send`, obj)
          .then(data => {
            swal("Email Sent", "Click OK to go back!", "success").then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            setLoading(false);
            swal("Error", "Couldnt send email right now", "error");
          });
        toast.success("Created new stream", streamId);
      } catch (e) {
        console.log("error attaching stream");
        toast.error("Unable to attach stream to email");
      }
    }
  };

  const goBack = () => {
    // console.log(email, body, subject);
    if (activeStep === 2) {
      setActiveStep(1);
    } else if (activeStep === 3) {
      setActiveStep(2);
    }
  };

  return (
    <React.Fragment>
      <div className="titles">
        <h1>
          {activeStep === 1 ? null : (
            <Icon
              name="arrow left"
              onClick={() => goBack()}
              style={{ cursor: "pointer" }}
            />
          )}
          Compose HashMail
        </h1>
        <div>
          <Stepper
            steps={[
              { title: "Write Email" },
              { title: "Attach Tokens" },
              { title: "Approve and Send" }
            ]}
            activeStep={activeStep - 1}
          />
        </div>
        <br />
        <br />
      </div>
      <Form>
        {activeStep === 1 ? (
          <>
            <Form.Field>
              <label>Email</label>
              <input
                type="text"
                onChange={e => setEmail(e.target.value)}
                placeholder="eg : joe@gmail.com"
                name="email"
                disabled={props.mail ? true : false}
                value={props.mail ? props.mail : email}
              />
            </Form.Field>
            <Form.Field>
              <label>Subject</label>
              <input
                type="text"
                onChange={e => setSubject(e.target.value)}
                name="subject"
                value={subject}
              />
            </Form.Field>
            <Form.Field>
              <label>Body</label>
              <TextArea
                style={{ minHeight: 100 }}
                onChange={e => setBody(e.target.value)}
                value={body}
              />
              <br />
              <br />
              <Button
                color="linkedin"
                onClick={fetchTokens}
                floated="right"
                loading={loading}
              >
                Continue
              </Button>
            </Form.Field>
            <br />
          </>
        ) : null}

        {activeStep === 2 ? (
          <>
            <Form.Field>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Token"
                  options={tokens}
                  placeholder="Token"
                  onChange={(e, data) => setSelectedTokenAddress(data.value)}
                  value={selectedTokenAddress}
                />
                <Form.Input
                  fluid
                  label="Amount"
                  placeholder="Amount"
                  onChange={e => setAmount(e.target.value)}
                  value={amount}
                />
                <Form.Input
                  fluid
                  label="Valid Till"
                  placeholder="Valid Till"
                  type="date"
                  value={expiry}
                  onChange={e => {
                    // console.log(e.target.value);
                    if (new Date(e.target.value) - new Date() <= 0) {
                      swal(
                        "Invalid Date",
                        "Please select a future date",
                        "error"
                      );
                    } else {
                      setExpiry(e.target.value);
                    }
                  }}
                />
                <Form.Field>
                  <label>Rate of return</label>
                  <br />
                  {rate}
                </Form.Field>
              </Form.Group>
              <br />
              <br />
              <Form.Field>
                <Button
                  color="linkedin"
                  onClick={approveToken}
                  floated="right"
                  loading={loading}
                >
                  Approve Token
                </Button>
              </Form.Field>
            </Form.Field>
            <br />
          </>
        ) : null}

        {activeStep === 3 ? (
          <>
            {/* <Button color="green" onClick={handleSign} loading={loading}>
              3. Sign Txn
            </Button> */}
            {/* <p>{streamId}</p> */}
            <div className="preview-mail">
              <div>
                <Mail />
              </div>
              <div>
                <h2>Preview Email</h2>
              </div>
            </div>

            <h4>to: {email}</h4>
            <h4>subject: {subject}</h4>
            <p>{body}</p>
            <br />

            <Button
              color="linkedin"
              floated="right"
              onClick={handleSubmit}
              loading={loading}
            >
              Send
            </Button>

            <br />

            <div className="stream-details">
              <h6>
                <strong>TOKEN ADDRESS: </strong>
                {selectedTokenAddress}
              </h6>
              <h6>
                <strong>STREAM ADDRESS: </strong>
                {selectedTokenAddress}
              </h6>
              <h6>
                <strong>AMOUNT: </strong>
                {amount}
              </h6>
              <h6>
                <strong>EXPIRY: </strong>
                {expiry}
              </h6>
              <h6>
                <strong>RETURN RATE: </strong>
                {rate}
              </h6>
            </div>
          </>
        ) : null}
      </Form>
      <br />
    </React.Fragment>
  );
};

export default ComposeMail;
