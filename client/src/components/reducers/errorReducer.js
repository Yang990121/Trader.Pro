import { GET_ERRORS, RESET_ERRORS } from "../actions/types";

const initialState = {};

export default function errorReducer (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        message: action.payload
      };
    case RESET_ERRORS:
      return {};
    default:
      return state;
  }
}
