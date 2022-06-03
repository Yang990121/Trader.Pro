import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from 'react-redux';
import store from "./components/store";

import http from "./components/services/httpService";
import { getJwt, getCurrentUser, logout } from "./components/services/authService";
import * as serviceWorker from "./serviceWorker";
import { setCurrentUser } from "./components/actions/authActions"




// Check for Token
if (getJwt()) {
  // Set auth token in http headers
  // http.setJwt(getJwt());
  // Decode token and get user info and expression
  const decoded = getCurrentUser();
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded && decoded.exp < currentTime) {
    // Logout User
    logout();
  }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  
);