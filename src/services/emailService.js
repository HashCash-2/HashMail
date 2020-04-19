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

export { fetchMails, fetchMailDetails };
