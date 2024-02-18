import { GET_ERRORS, RESET_ERRORS } from "./types";

export const getErrors = (message) => ({
  type: GET_ERRORS,
  payload: message,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});
