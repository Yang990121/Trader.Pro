import React, { useState } from "react";
import Joi from "@hapi/joi";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import MaterialLink from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import PasswordField from "../common/PasswordField";
import useForm from "../customHooks/useForm";
import { loginUser } from "../actions/authActions";
import config from "../config.json"
import axios from "axios";
import { useEffect } from "react";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "} {new Date().getFullYear()} {" | Find me on "}
      <MaterialLink target="_blank" href="https://github.com/Yang990121/Trader.Pro">
        GitHub
      </MaterialLink>
      {"."}
    </Typography>
  );
}

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
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.uiState.isLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [users, setUsers] = useState([]);
  
  

  // Schema for validating input fields
  const schema = {
    email: Joi.string().email({tlds : { allow : false}}).max(255).required().label("Email Address"),
    password: Joi.string().max(255).required().label("Password"),
  };

  // Custom Hook for handling form
  const { values, errors, handleSubmit, handleChange, handleFocus } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    doSubmit, // passed reference of function, it will call in useForm hook
  });

 

  function doSubmit() {
    dispatch(loginUser(values));
  }

  //Finding if user isVerified or not
  const frontURL = config.URL
  var finalURL = frontURL + "/api/users/find/"

  useEffect(() => {
    axios.get(finalURL).then((response) => {
      setUsers(response.data);
      
    });
  }, [values]);

  function isVerified(email) {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        
        return users[i].isVerified;
        
      }
    }
  }
  console.log(isVerified(values.email));

  // if user is authenticated then Navigate to user page
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
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
          <PasswordField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onFocus={handleFocus}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submit}
          >
            {isLoading ? "Loading..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
