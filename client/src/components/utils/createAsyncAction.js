import { setLoading, unSetLoading } from "../actions/uiActions";
import toastify from "./toastNotification";

export default function createAsync (asyncFunction, handleSuccessResponse) {
  return (data) => (dispatch) => {
    dispatch(setLoading());
    asyncFunction(data).then(
      (res) => {
        dispatch(unSetLoading());
        handleSuccessResponse(res);
      }, //basically set loading then call function on data then unload *(this is the success response)
      (err) => {
        if (
          err.response &&
          (err.response.status >= 400 || err.response.status < 405)
        ) {
          return toastify(err.response.data, "error");
        }
        dispatch(unSetLoading());
      }
    );
  };
}
