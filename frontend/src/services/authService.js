import { post, get } from "./api";

// LOGIN
export function login(username, password) {
  return post("/api/login", { username, password });
}

// LOGOUT
export function logout() {
  return post("/api/logout");
}

// CHECK LOGIN
export function checkAuth() {
  return get("/api/check");
}