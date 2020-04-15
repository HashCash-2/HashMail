import React, { useState, useEffect } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import swal from "sweetalert";
import Axios from "axios";
import { URL } from "../../globalvariables";
import { formatDate } from "../../utils/helpers";
import Web3 from "web3";
import * as contractInteraction from "../../utils/contractInteractions";
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

  const [attachActive, setAttachActive] = useState(false);
  const [signActive, setSignActive] = useState(false);
  const [sendActive, setSendActive] = useState(false);
  const [approveActive, setApproveActive] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(amount, expiry, selectedTokenAddress);
    if (amount !== 0 && selectedTokenAddress !== "" && expiry !== "") {
      setSendActive(true);
      setApproveActive(true);
    }
  }, [amount, expiry, selectedTokenAddress]);

  const approveToken = async () => {
    var account = await window.ethereum.enable();
    await contractInteraction.ApproveTokens(
      web3Instance,
      account[0],
      amount,
      selectedTokenAddress
    );

    const getUnixTimeUtc = (dateString = new Date()) =>
      Math.round(new Date(dateString).getTime() / 1000);
    var stopTime = getUnixTimeUtc + 3600;
    await contractInteraction.StartReverseStream(
      web3Instance,
      amount,
      stopTime,
      selectedTokenAddress
    );
    setSignActive(true);
  };

  const fetchTokens = async () => {
    if (email) {
      Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "HCtoken"
      );
      Axios.get(`${URL}/api/token/user/${email}`)
        .then(data => {
          console.log(data);
          if (data.data.message == "success") {
            console.log(data.data.data.tokens);
            let tokensarr = [];
            data.data.data.tokens.map(obj => {
              tokensarr.push({
                key: obj.name,
                text: obj.name,
                value: obj.address
              });
            });
            console.log(tokensarr);
            setTokens(tokensarr);
            setTokenVisible(true);
            setApproveActive(true);
          } else {
            // no token for this account
            console.log(data.data);
            setTokens([
              {
                key: "no tokens",
                text: "no tokens",
                value: "0"
              }
            ]);
            swal("No tokens", "No Receiver tokens for this email", "error");
            setTokenVisible(false);
          }
        })
        .catch(err => {
          swal("Couldnt fetch", "Receiver tokens cant be fetched", "error");
        });
    } else {
      swal(
        "Please enter Email",
        "To fetch the tokens receiver can receive",
        "error"
      );
    }
  };

  const handleSign = () => {
    console.log("signed");
    setStreamId("0x8f51a68052a3e1d56d145092da42ba13b02146bb");
    setSendActive(true);
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
    }
  };

  return (
    <React.Fragment>
      <div className="titles">
        <h1>Compose HashMail</h1>
        <br />
        <br />
      </div>
      <Form>
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
          />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <TextArea
            style={{ minHeight: 100 }}
            onChange={e => setBody(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <Button color="linkedin" onClick={fetchTokens}>
            1. Attach Stream
          </Button>
          <Button
            color="yellow"
            onClick={approveToken}
            disabled={!approveActive}
            floated="right"
          >
            2. Approve Token
          </Button>
        </Form.Field>
        <br />

        {tokenVisible ? (
          <>
            <Form.Field>
              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="Token"
                  options={tokens}
                  placeholder="Token"
                  onChange={(e, data) => setSelectedTokenAddress(data.value)}
                />
                <Form.Input
                  fluid
                  label="Amount"
                  placeholder="Amount"
                  onChange={e => setAmount(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Valid Till"
                  placeholder="Valid Till"
                  type="date"
                  value={expiry}
                  onChange={e => {
                    console.log(e.target.value);
                    if (new Date(e.target.value) - new Date() <= 0) {
                      swal(
                        "Invalid Date",
                        "Please select a future date",
                        "error"
                      );
                    } else {
                      setExpiry(e.target.value);
                      const adate = new Date(e.target.value);
                      const today = new Date();
                      const diffTime = Math.abs(adate - today);
                      const diffDays = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                      setRate(`${(amount / diffDays).toFixed(2)} tokens/day`);
                    }
                  }}
                />
                <Form.Field>
                  <label>Rate of return</label>
                  <br />
                  {rate}
                </Form.Field>
              </Form.Group>
            </Form.Field>
          </>
        ) : null}

        <br />
        <Button
          color="green"
          onClick={handleSign}
          loading={loading}
          disabled={!signActive}
        >
          3. Sign Txn
        </Button>
        <Button
          color="google plus"
          floated="right"
          onClick={handleSubmit}
          loading={loading}
          disabled={!sendActive}
        >
          4. Send Mail
        </Button>
        <p>{streamId}</p>
      </Form>
      <br />
    </React.Fragment>
  );
};

export default ComposeMail;
