import {
  TOGGLE_SIDEMENU,
  SET_LOADING,
  UNSET_LOADING,
  DISPLAY_TOAST,
  HIDE_TOAST,
} from "./types";

export const toggleSideMenu = (state) => ({
  type: TOGGLE_SIDEMENU,
  payload: state,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const unSetLoading = () => ({
  type: UNSET_LOADING,
});

export const displayToast = (message, type) => ({ //alert box
  type: DISPLAY_TOAST,
  payload: {
    message,
    type,
    openToast: true,
  },
});

export const hideToast = () => ({
  type: HIDE_TOAST,
});
