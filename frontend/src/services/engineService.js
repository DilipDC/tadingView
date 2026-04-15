import { get, post } from "./api";

// START ENGINE
export function startEngine() {
  return post("/api/engine/start");
}

// STOP ENGINE
export function stopEngine() {
  return post("/api/engine/stop");
}

// STATUS
export function getEngineStatus() {
  return get("/api/engine/status");
}