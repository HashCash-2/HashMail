import React, { useState } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import swal from "sweetalert";
import Axios from "axios";
import { URL } from "../../globalvariables";
import Web3 from "web3";
import * as contractInteraction from "../../utils/contractInteractions";
var web3Instance = new Web3();
const ComposeReply = props => {
  const [email, setEmail] = useState(props.mail.from ? props.mail.from : "");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [loading, setLoading] = useState(false);

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
      await contractInteraction.CloseStream(
        web3Instance,
        streamId,
        1,
        1,
        account[0]
      );

      //   const response = await login(email, password);
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
