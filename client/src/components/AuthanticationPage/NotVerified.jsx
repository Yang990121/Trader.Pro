import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { sendConfirmationEmail } from "../services/authService";
import toastify from "../utils/toastNotification";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 30,
    marginBottom: 10,
    color: "#9251B5",
  },
});

function NotVerified() {
  const classes = useStyles();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleClick = () => {
    console.log("Handling click...")
    sendConfirmationEmail().then((res) => toastify(res.data, "success"))
      .catch((err) => toastify(err.response.data, "error"));
  };

  // if user is not authenticated then Navigate to login page
  if (!isAuthenticated) return <Navigate to="/login" />;

  // if user is authenticated and verified then Navigate to user page
  if (isAuthenticated && user.isVerified) return <Navigate to="/user" />;

  return (
    <div className={classes.root}>
      <h1>Please try logging in again after verifying your email address.</h1>
      <p className={classes.text}>Didn't get the email?</p>
      {/* <Button
        variant="outlined"
        size="large"
        color="primary"
        onClick={handleClick}
      >
        Resend Confirmation Email
      </Button> */}
      Check your junk folder
    </div>
  );
}

export default NotVerified;
