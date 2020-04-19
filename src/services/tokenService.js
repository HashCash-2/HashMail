import http from "./httpService";
import APIURL from "./apiUrl";

const fetchAllTokens = async () => {
  http.setAuthToken(localStorage.getItem("HCtoken"));
  const res = http.get(APIURL.FETCH_ALL_TOKENS);
  return res;
};

const fetchUserTokens = async userid => {
  http.setAuthToken(localStorage.getItem("HCtoken"));
  const res = http.get(APIURL.FETCH_ALL_TOKENS + `/${userid}`);
  return res;
};

const addNewToken = async tokens => {
  http.setAuthToken(localStorage.getItem("HCtoken"));
  const res = await http.post(APIURL.ADD_TOKEN, tokens);
  return res;
};

export { fetchAllTokens, addNewToken, fetchUserTokens };
