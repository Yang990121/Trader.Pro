import Axios from "axios";
import toastify from "../utils/toastNotification";

Axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Unexpected Error", error);
    toastify("An Unexpected Error Occured!", "error");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  if (jwt) {
    Axios.defaults.headers.common["x-auth-token"] = jwt;
  } else {
    delete Axios.defaults.headers.common["x-auth-token"];
  }
}

const exportedObject = { 
  get: Axios.get,
  post: Axios.post,
  put: Axios.put,
  delete: Axios.delete,
  setJwt,
};

export default exportedObject;
