import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

function Toast() {
  const [open, setOpen] = useState(false);

  const toastData = useSelector((state) => state.uiState.toast);
  const { message, type, openToast } = toastData;

  useEffect(() => {
    setOpen(openToast);
  }, [setOpen, openToast]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Toast;
