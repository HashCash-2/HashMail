import http from "./httpService";
import APIURL from "./apiUrl";

const loginUser = async (email, password) => {
  const data = await http.post(APIURL.USER_LOGIN, {
    email: email,
    password: password
  });

  const { token } = data.data;
  localStorage.setItem("HCtoken", token);
  http.setAuthToken(token);

  return data;
};

const signupUser = async (fname, lname, email, password) => {
  const data = await http.post(APIURL.USER_SIGNUP, {
    name: fname + " " + lname,
    email: email,
    password: password
  });

  return data;
};

export { loginUser, signupUser };
