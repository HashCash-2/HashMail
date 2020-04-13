import React from "react";
import { CornerUpRight } from "react-feather";
import { Modal } from "semantic-ui-react";
import ComposeMail from "../Common/composeMail";

const ReplyEmailButton = (props) => {
  return (
    <Modal
      centered={false}
      trigger={
        <div className="fadeInUp button excel" style={{ animationDelay: "1s" }}>
          <CornerUpRight />
          <span>Reply</span>
        </div>
      }
    >
      <Modal.Content>
        <ComposeMail mail={props.mail} />
      </Modal.Content>
    </Modal>
  );
};

export default ReplyEmailButton;
