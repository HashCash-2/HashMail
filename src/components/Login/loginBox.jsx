import React, { useState } from "react";
import CustomHeader from "../Common/customHeader";
import { Form, Button } from "semantic-ui-react";
import swal from "sweetalert";

const LoginBox = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log("login", email, password);
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
    }
  };

  return (
    <div className="login">
      <CustomHeader title={"Login"} />
      <Form className="fadeInUp" style={{ animationDelay: "1.2s" }}>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eg : joe@gmail.com"
            name="username"
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
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
