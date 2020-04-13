import React, { useState, useEffect } from "react";
import CustomHeader from "../Common/customHeader";
import { useStoreState } from "easy-peasy";
import ReplyEmailButton from "./replyEmail";
import Axios from 'axios'
import {URL} from '../../globalvariables';

const DetailView = ({ match }) => {
  let { box, mailid } = match.params;

  const inbox = useStoreState((state) => state.emails.inbox);
  const outbox = useStoreState((state) => state.emails.sent);

  const [mail, setMail] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    if (box === "inbox") {
      Axios.defaults.headers.common['Authorization'] = localStorage.getItem('HCtoken');
      Axios.get(`${URL}/api/email/inbox/${mailid}`).then(data =>{
        setMail(data.data.email)
        setLoading(false)
        console.log(data);
      })
      
      // const email = inbox.filter((items) => {
      //   return items.id === parseInt(mailid);
      // })[0];
      // setMail(email);
    } else if (box === "outbox") {
      Axios.defaults.headers.common['Authorization'] = localStorage.getItem('HCtoken');
      Axios.get(`${URL}/api/email/read/${mailid}`).then(data =>{
        setMail(data.data.email)
        setLoading(false)
        console.log(data);
      })
      
      // const email = outbox.filter((items) => {
      //   return items.id === parseInt(mailid);
      // })[0];
      // setMail(email);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="mailDetail">
      {loading?null:<>
      <CustomHeader title={mail.subject} subtitle={mail.from} />

      <div className="mailbody fadeInUp" style={{ animationDelay: "0.7s" }}>
        {mail.text}
        <br />
        <br />
        <br />
        <b>HashKey :</b>{mail.hashKey}
        {box === "inbox" ? <ReplyEmailButton mail={mail.from} /> : null}
      </div>
      </>
      }
    </div>
  );
};

export default DetailView;
