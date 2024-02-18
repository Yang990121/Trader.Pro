import { useEffect } from "react";
import { useParams } from "react-router-dom";
import toastify from "../utils/toastNotification";
import { confirmEmail, setToken } from "../services/authService";

function ConfirmEmail() {
  const { token } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await confirmEmail(token);
        setToken(data.token); // Set token to local storage
        localStorage.setItem("email", data.message); // Set success message to local storage so that we can show it in user component
        window.location = "/user";
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toastify(error.response.data, "error");
        }
        setTimeout(() => (window.location = "/login"), 1000);
      }
    })();
  });
  return null;
}

export default ConfirmEmail;
