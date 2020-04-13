import React, { useState } from "react";
import { Database } from "react-feather";
import { Modal, Form, Button } from "semantic-ui-react";
import swal from "sweetalert";

const AddTokenButton = () => {
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    console.log(token, address);
    //   //   const response = await login(email, password);
    //   let obj = {};
    //   obj.receiver_email = email;
    //   obj.sender_email = "random@gmail.com";
    //   obj.subject = subject;
    //   obj.text = body;
    //   obj.hashKey = hashkey;
    //   obj.html = " ";
    //   console.log("body", email, subject, body, hashkey, obj);
    //   Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
    //     "HCtoken"
    //   );
    //   Axios.post(`${URL}/api/email/send`, obj)
    //     .then(data => {
    //       console.log(data);

    //       window.location.reload();
    //     })
    //     .catch(error => {
    //       setLoading(false);

    //       swal("Error", "Couldnt send email right now", "error");
    //     });
    setLoading(false);
  };

  return (
    <Modal
      centered={false}
      trigger={
        <div
          className="fadeInUp button orange-button"
          style={{ animationDelay: "1.3s" }}
        >
          <Database />
          <span>Add a Token</span>
        </div>
      }
    >
      <Modal.Content>
        <React.Fragment>
          <div className="titles">
            <h1>Add Token to accept</h1>
            <br />
            <br />
          </div>
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                type="text"
                onChange={e => setToken(e.target.value)}
                placeholder="DAI"
                name="token"
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                type="text"
                onChange={e => setAddress(e.target.value)}
                name="subject"
              />
            </Form.Field>
            <Button
              floated="right"
              color="linkedin"
              onClick={handleSubmit}
              loading={loading}
            >
              Add
            </Button>
          </Form>
          <br />
          <br />
          <br />
        </React.Fragment>
      </Modal.Content>
    </Modal>
  );
};

export default AddTokenButton;
