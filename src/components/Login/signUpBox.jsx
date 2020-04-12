import React, { useState } from "react";
import CustomHeader from "../Common/customHeader";
import { Form, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const SignUpBox = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async () => {
    if (email.match(`[a-zA-Z0-9._-]+@[a-z]+.(com|in|net|org|edu)`) === null) {
      swal(
        "Invalid Email",
        "Please enter your email in the correct format",
        "error"
      );
    } else if (password.length < 8) {
      swal(
        "Password Too Short",
        "Password must be greater than 8 characters",
        "error"
      );
    } else {
      setLoading(true);
      //   const response = await login(email, password);
      console.log("signup", fname, lname, email, password);
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
      history.push("/inbox");
    }
  };

  return (
    <div className="sign-up">
      <CustomHeader title={"or Sign-Up"} />

      <Form className="fadeInUp" style={{ animationDelay: "1.2s" }}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
          />
          <Form.Input
            fluid
            label="Last name"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </Form.Group>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="eg : joe@gmail.com"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Min. 8 Characters"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button
          floated="right"
          color="linkedin"
          onClick={handleSubmit}
          loading={loading}
        >
          Sign-Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUpBox;
