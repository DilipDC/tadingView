import { createStore } from "./useStore";

// engine running
export const useEngineRunning = createStore("engineRunning", true);

// engine status
export const useEngineStatus = createStore("engineStatus", "running");