import React, { useState } from "react";
import swal from "sweetalert";

import { useStoreState, useStoreActions } from "easy-peasy";

import { Modal, Form, Button } from "semantic-ui-react";
import { Database } from "react-feather";
import { addNewToken, fetchAllTokens } from "../../services/tokenService";

const AddTokenButton = () => {
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const tokens = useStoreState(state => state.tokens.allTokens);
  const setTokens = useStoreActions(action => action.tokens.setTokens);

  const handleSubmit = async () => {
    setLoading(true);
    const newTokens = [...tokens, { name: token, address: address }];

    try {
      await addNewToken({ tokens: newTokens });
      const res = await fetchAllTokens();
      setTokens(res.data.data.tokens);
    } catch (error) {
      swal("Error", "Couldnt add token right now", "error");
    }
    setLoading(false);
    setModalOpen(false);
    swal("Success", `You are now accepting ${token}`, "success");
  };

  return (
    <Modal
      open={modalOpen}
      centered={false}
      trigger={
        <div
          className="fadeInUp button orange-button"
          style={{ animationDelay: "1.3s" }}
          onClick={() => {
            setModalOpen(true);
          }}
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
