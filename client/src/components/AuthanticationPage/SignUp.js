import React from "react";
import Joi from "@hapi/joi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import MaterialLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PasswordField from "../common/PasswordField";
import useForm from "../customHooks/useForm";
import { registerUser } from "../actions/authActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch(); //method to update a redux store state -> triggers a state change
  const isLoading = useSelector((state) => state.uiState.isLoading); //allows you to extract data from the redux store state

  const validationSchema = { //basically conditions that have to be met to pass the validation
    userName: Joi.string().min(3).max(255).required().label("First Name"),
    email: Joi.string().email({tlds : { allow : false}}).required().label("Email Address"),
    password: Joi.string().min(6).max(255).required().label("Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .error(() => "Passwords do not match")
      .required(),
  };

  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    handleFocus,
  } = useForm({ //form that can be submitted if it meets the validation schema, done through doSubmit
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      
    },
    validationSchema,
    doSubmit,
  });

  function doSubmit() {
    const userData = { ...values };
    delete userData.confirmPassword;
    dispatch(registerUser(userData));
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="userName"
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                autoFocus
                value={values.userName}
                error={errors.userName !== undefined}
                helperText={errors.userName}
                onChange={handleChange}
                onFocus={handleFocus} //mouse in the box
                onBlur={handleBlur}//mouse out of box
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={values.email}
                error={errors.email !== undefined}
                helperText={errors.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                error={errors.password !== undefined}
                helperText={errors.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                autoComplete="current-password"
                value={values.confirmPassword}
                error={errors.confirmPassword !== undefined}
                helperText={errors.confirmPassword}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submit}
            onMouseDown={handleMouseDown} //press the mouse down
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" onMouseDown={handleMouseDown}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" align="center">
          {"Copyright © "} {new Date().getFullYear()} {" | Find me on "}
          <MaterialLink
            onMouseDown={handleMouseDown}
            target="_blank"
            href=""
          >
            GitHub
          </MaterialLink>
          {"."}
        </Typography>
      </Box>
    </Container>
  );
}
