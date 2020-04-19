import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import { Form, Button } from "semantic-ui-react";
import CustomHeader from "../Common/customHeader";
import { loginUser } from "../../services/authServices";

const LoginBox = () => {
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

      await window.ethereum.enable();

      try {
        const res = await loginUser(email, password);
        if (res.data.success === true) {
          setLoading(false);
          history.push("/inbox");
        }
      } catch (error) {
        setLoading(false);
        swal("Error", "Email or password incorrect", "error");
      }
    }
  };

  return (
    <div className="login">
      <CustomHeader title={"Login"} />
      <Form className="fadeInUp" style={{ animationDelay: "0.8s" }}>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            onChange={e => setEmail(e.target.value)}
            placeholder="eg : jenna@gmail.com"
            name="username"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Min. 8 Characters"
            name="password"
          />
        </Form.Field>
        <Button
          floated="right"
          color="linkedin"
          onClick={handleSubmit}
          loading={loading}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginBox;
