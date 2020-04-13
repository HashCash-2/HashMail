import React, { useState } from "react";
import { Form, Button, TextArea } from "semantic-ui-react";
import swal from "sweetalert";

const ComposeMail = (props) => {
  const [email, setEmail] = useState(props.mail ? props.mail : "");
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
      //   const response = await login(email, password);
      console.log("body", email, subject, body);
      setLoading(false);
      //   if (response.status === 200) {
      //     setToken(response.data.token);
      //     history.push("/");
      //   } else if (
      //     response.status === 400 &&
      //     response.data.non_field_errors[0] ===
      //       "Unable to log in with provided credentials."
      //   ) {
      //     swal("Error", "Email or Password seems incorrect!", "error");
      //   } else {
      //     swal("Oops!", "Something went wrong! Please Retry", "error");
      //   }
      window.location.reload();
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setSubject(e.target.value)}
            name="subject"
          />
        </Form.Field>
        <Form.Field>
          <label>Body</label>
          <TextArea
            style={{ minHeight: 100 }}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Field>
        <Button
          floated="right"
          color="linkedin"
          onClick={handleSubmit}
          loading={loading}
        >
          Send Mail
        </Button>
      </Form>
      <br />
      <br />
      <br />
    </React.Fragment>
  );
};

export default ComposeMail;
