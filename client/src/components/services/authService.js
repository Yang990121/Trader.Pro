import jwtDecode from "jwt-decode";
import http from "./httpService";

const tokenKey = "token";

export async function login(loginDetails) {
  const { data } = await http.post("/api/auth", loginDetails);
  setToken(data.token);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function setToken(token) {
  localStorage.setItem(tokenKey, token);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function sendConfirmationEmail() {
  return http.get("/api/auth/sendConfirmationEmail");
}

export function sendConfirmationEmail2(emailAddress) {
  return http.get(`/api/auth/sendConfirmationEmail/${emailAddress}`);
}

export function confirmEmail(token) {
  return http.get(`/api/auth/emailConfirmation/${token}`);
}

export function sendForgotPasswordEmail(emailAddress) {
  return http.get(`/api/auth/forgotPassword/${emailAddress}`);
}

export function resetPassword(token, password) {
  return http.post(`/api/auth/resetPassword`, { token, password });
}

const authService = {
  login,
  logout,
  getCurrentUser,
  getJwt,
};

export default authService;