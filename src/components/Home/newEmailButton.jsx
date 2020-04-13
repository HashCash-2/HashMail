import React from "react";
import { Mail } from "react-feather";
import { Modal } from "semantic-ui-react";
import ComposeMail from "../Common/composeMail";

const NewEmailButton = () => {
  return (
    <Modal
      centered={false}
      trigger={
        <div
          className="fadeInUp button telegram"
          style={{ animationDelay: "1s" }}
        >
          <Mail />
          <span>Send New Hash Mail</span>
        </div>
      }
    >
      <Modal.Content>
        <ComposeMail />
      </Modal.Content>
    </Modal>
  );
};

export default NewEmailButton;
