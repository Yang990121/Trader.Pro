import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PasswordField from "../common/PasswordField";
import useForm from "../customHooks/useForm";
import Joi from "@hapi/joi";

import toastify from "../utils/toastNotification";
import { resetPassword } from "../services/authService";

const useStyles = makeStyles({
  root: {
    width: "70%",
    margin: [[20, "auto"]],
  },
  text: {
    margin: [[20, 0]],
  },
  block: {
    display: "block",
  },
});

function ResetPassword() {
  const classes = useStyles();
  const { token } = useParams();

  // Schema for validating input fields
  const schema = {
    password: Joi.string().min(6).max(255).required().label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .error(() => "Passwords do not match")
      .required(),
  };

  // Custom Hook for handling form
  const { values, errors, handleSubmit, handleChange, handleFocus } = useForm({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    doSubmit, // passed reference of function, it will call in useForm hook
  });

  function doSubmit() {
    resetPassword(token, values.password)
      .then((res) => {
        toastify(res.data, "success");
        setTimeout(() => (window.location = "/login"), 2000);
      })
      .catch((err) => {
        if (err.response && err.response.status < 500)
          toastify(err.response.data, "error");
      });
  }

  return (
    <div className={classes.root}>
      <h1 className={classes.text}>Reset your password here</h1>
      <form onSubmit={handleSubmit} noValidate>
        <PasswordField
          variant="outlined"
          margin="normal"
          required
          name="password"
          label="New Password"
          id="password"
          autoComplete="current-password"
          className={classes.block}
          value={values.password}
          onChange={handleChange}
          onFocus={handleFocus}
          error={errors.password !== undefined}
          helperText={errors.password}
        />
        <PasswordField
          variant="outlined"
          margin="normal"
          required
          name="confirmPassword"
          label="Confirm New Password"
          id="confirmPassword"
          autoComplete="current-password"
          className={classes.block}
          value={values.confirmPassword}
          onChange={handleChange}
          onFocus={handleFocus}
          error={errors.confirmPassword !== undefined}
          helperText={errors.confirmPassword}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.block}
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default ResetPassword;
