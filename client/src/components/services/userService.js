import http from "./httpService";

export function saveUser(user) {
  return http.post("/api/users/add", user);
}

export function getUser() {
  return http.get("/api/users/me");
}
