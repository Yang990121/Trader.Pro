import {
  TOGGLE_SIDEMENU,
  SET_LOADING,
  UNSET_LOADING,
  DISPLAY_TOAST,
  HIDE_TOAST,
} from "../actions/types";

const initialState = {
  sideMenuCollapsed: true,
  isLoading: false,
  toast: {},
};

export default function uiReducer (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEMENU:
      return {
        ...state,
        sideMenuCollapsed: !action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case UNSET_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case DISPLAY_TOAST:
      return {
        ...state,
        toast: action.payload,
      };
    case HIDE_TOAST:
      return {
        ...state,
        toast: {},
      };
    default:
      return state;
  }
}
