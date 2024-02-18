import { combineReducers } from "redux";
import uiReducer from "./uiReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  uiState: uiReducer,
  auth: authReducer,
  errors: errorReducer,
});
