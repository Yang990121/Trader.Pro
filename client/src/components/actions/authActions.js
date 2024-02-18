import http from "../services/httpService";
import auth from "../services/authService";
import { saveUser } from "../services/userService";
import { SET_CURRENT_USER } from "./types";
import toastify from "../utils/toastNotification";
import createAsyncAction from "../utils/createAsyncAction";

// Register User
export const registerUser = createAsyncAction(saveUser, (succcessResponse) => { //handles successful and unsuccessful run of the function saveUser
  toastify(succcessResponse.data, "success");
  setTimeout(() => (window.location = "/login"), 3000);
});

// Login User
export const loginUser = createAsyncAction(auth.login, () => {
  window.location = "/user";
});

// Set logged in User
export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

// LogOut User
export const logoutUser = () => (dispatch) => {
  // Remove jwt token from http headers
  http.setJwt(false);

  // Set current user to empty object
  dispatch(setCurrentUser({}));

  auth.logout();
};
