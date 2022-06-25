import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useForm from "../customHooks/useForm";
import Joi from "@hapi/joi";

import { sendForgotPasswordEmail } from "../services/authService";
import toastify from "../utils/toastNotification";

const useStyles = makeStyles({
  root: {
    maxWidth: 900,
    margin: [[20, "auto"]],
    padding: 20,
  },
  text: {
    margin: [[20, 0]],
  },
});

function ForgotPassword() {
  const classes = useStyles();

  // Schema for validating input field
  const schema = {
    email: Joi.string().email({tlds : {allow : false} }).max(255).required().label("Email Address"),
  };

  // Custom Hook for handling form
  const { values, errors, handleSubmit, handleChange, handleFocus } = useForm({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    doSubmit, // passed reference of function, it will call in useForm hook
  });

  function doSubmit() {
    sendForgotPasswordEmail(values.email)
      .then((res) => {toastify(res.data, "success")
      setTimeout(() => (window.location = "/login"), 3000)})
      .catch((err) => {
        if (err.response && err.response.status < 500)
          toastify(err.response.data, "error");
      });
  }
  
  return (
    <div className={classes.root}>
      <h1>Send link for resetting password</h1>
      <p className={classes.text}>
        Please Enter your email address and we will send you link for resetting
        your password
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={values.email}
          onChange={handleChange}
          onFocus={handleFocus}
          error={errors.email !== undefined}
          helperText={errors.email}
        />
        <Button
          style={{ display: "block" }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Send
        </Button>
      </form>
    </div>
  );
}

export default ForgotPassword;
