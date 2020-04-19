import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  response => {
    if (response && response.data && response.data.status === "FAILED") {
      const error = new Error("API response FAILED");
      const request = response.config && response.config.data;
      const apiUrl = response.config && response.config.url;
      // logService.error(error, { response: response.data, request, apiUrl });
      console.log(error, { response: response.data, request, apiUrl });
    }
    return response;
  },
  error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      // logService.error(error, { response: error.response });
      console.log(error, { response: error.response });
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(function(config) {
  config.baseURL = process.env.REACT_APP_API_URL;
  //need to configure default req body params.
  return config;
});

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setAuthToken: setAuthToken
};
