import React, { useState,useEffect } from "react";
import { Database } from "react-feather";
import { Modal, Form, Button } from "semantic-ui-react";
import swal from "sweetalert";
import Axios from 'axios';
import {URL} from '../../globalvariables'


const AddTokenButton = () => {
  const [token, setToken] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokens,setTokens] = useState([])

  useEffect(() => {
    Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "HCtoken"
    );
    Axios.get(`${URL}/api/token/add/user`).then(data => {
        setTokens(data.data.data.tokens)      
    })
  },[])


  const handleSubmit = async () => {
    setLoading(true);
    console.log(token, address);
    
    let obj={
      name:token,
      address:address
    }
    tokens.push(obj);
    let Data={}
    Data.tokens = tokens
    console.log(Data)

      Axios.defaults.headers.common["Authorization"] = localStorage.getItem(
        "HCtoken"
      );

      Axios.post(`${URL}/api/token/add/user`, Data)
        .then(data => {
          console.log(data);
          window.location.reload();
        })
        .catch(error => {
          setLoading(false);

          swal("Error", "Couldnt send email right now", "error");
        });
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
