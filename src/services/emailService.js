import http from "./httpService";
import APIURL from "./apiUrl";

const fetchMails = async () => {
  http.setAuthToken(localStorage.getItem("HCtoken"));
  const inbox = await http.get(APIURL.GET_INBOX);
  const outbox = await http.get(APIURL.GET_OUTBOX);

  return { inbox: inbox.data, outbox: outbox.data };
};

const fetchMailDetails = async (box, id) => {
  http.setAuthToken(localStorage.getItem("HCtoken"));
  if (box === "inbox") {
    const res = await http.get(APIURL.GET_INBOX + `/${id}`);
    return res.data.email;
  } else if (box === "outbox") {
    const res = await http.get(APIURL.GET_OUTBOX + `/${id}`);
    return res.data.email;
  }
};

const sendMail = async (
  receiver_email,
  sender_email,
  subject,
  text,
  amount,
  tokens,
  streamId,
  rate,
  expiryDate,
  tokenname
) => {
  http.setAuthToken(localStorage.getItem("HCtoken"));

  const res = await http.post(APIURL.SEND_MAIL, {
    receiver_email: receiver_email,
    sender_email: sender_email,
    subject: subject,
    text: text,
    html: " ",
    amount: amount,
    tokens: tokens,
    streamId: streamId,
    rate: rate,
    expiryDate,
    tokenname: tokenname
  });

  return res;
};

const sendReply = async (receiver_email, sender_email, subject, text) => {
  http.setAuthToken(localStorage.getItem("HCtoken"));
  const res = await http.post(APIURL.SEND_MAIL, {
    receiver_email: receiver_email,
    sender_email: sender_email,
    subject: subject,
    text: text,
    html: " "
  });

  return res;
};

export { fetchMails, fetchMailDetails, sendMail, sendReply };
