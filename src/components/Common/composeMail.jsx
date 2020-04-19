import React, { useState, useEffect } from "react";
import swal from "sweetalert";

import Web3 from "web3";
import * as contractInteraction from "../../utils/contractInteractions";
import { formatDate } from "../../utils/helpers";

import Stepper from "react-stepper-horizontal";
import { Form, Button, TextArea, Icon } from "semantic-ui-react";
import { Mail } from "react-feather";

import { toast } from "react-toastify";
import { fetchUserTokens } from "../../services/tokenService";
import { sendMail } from "../../services/emailService";
var web3Instance = new Web3();

const ComposeMail = props => {
  const [email, setEmail] = useState(props.mail ? props.mail : "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [selectedTokenAddress, setSelectedTokenAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [expiry, setExpiry] = useState(formatDate(new Date()));
  const [rate, setRate] = useState("");
  const [tokenName, setTokenName] = useState("");

  const [tokens, setTokens] = useState([]);
  const [activeStep, setActiveStep] = useState(1);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
    } catch (e) {
      toast.error("Unable to approve tokens");
      setActiveStep(2);
    }
    setLoading(false);
  };

  const fetchTokens = async () => {
    setLoading(true);
    if (email) {
      try {
        const res = await fetchUserTokens(email);
        if (res.data.message === "success") {
          let tokensarr = [];
          res.data.data.tokens.forEach((obj, index) => {
            tokensarr.push({
              key: index,
              text: obj.name,
              value: obj.address
            });
          });
          setTokens(tokensarr);
          setActiveStep(2);
        } else {
          setTokens([
            {
              key: "no tokens",
              text: "no tokens",
              value: "0"
            }
          ]);
          swal("No tokens", "No Receiver tokens for this email", "error");
        }
      } catch (error) {
        swal("Couldnt fetch", "Receiver tokens cant be fetched", "error");
      }
    } else {
      swal("Please enter Email", "To fetch the receiver tokens", "error");
    }
    setLoading(false);
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
        var streamID = await contractInteraction.StartReverseStream(
          web3Instance,
          amount,
          stopTime,
          selectedTokenAddress,
          account[0]
        );
        setActiveStep(3);
        setLoading(false);

        try {
          const res = await sendMail(
            email,
            "random@gmail.com",
            subject,
            body,
            amount,
            selectedTokenAddress,
            streamID,
            rate,
            expiry,
            tokenName
          );
          await swal("Email Sent", "Click OK to go back!", "success");
          window.location.reload();
        } catch (error) {
          swal("Error", "Couldnt send email right now", "error");
        }
        toast.success("Created new stream " + streamID);
      } catch (e) {
        toast.error("Unable to attach stream to email");
        setLoading(false);
      }
    }
  };

  const goBack = () => {
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
                  onChange={(e, d) => {
                    setSelectedTokenAddress(d.value);
                    setTokenName(e.target.textContent);
                  }}
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
