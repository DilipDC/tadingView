import { useState, useEffect } from "react";

// ================= GLOBAL STORAGE =================

const globalState = {};
const listeners = {};

// ================= CREATE STORE =================

export function createStore(key, initialValue) {

  // prevent re-creating same store
  if (!(key in globalState)) {
    globalState[key] = initialValue;
    listeners[key] = [];
  }

  return function useStore() {

    const [state, setState] = useState(globalState[key]);

    useEffect(() => {
      // register listener
      listeners[key].push(setState);

      return () => {
        // cleanup listener (VERY IMPORTANT)
        listeners[key] = listeners[key].filter(l => l !== setState);
      };
    }, []);

    // ================= UPDATE =================

    function update(value) {
      const newValue =
        typeof value === "function"
          ? value(globalState[key])
          : value;

      globalState[key] = newValue;

      // notify all components
      listeners[key].forEach(listener => {
        try {
          listener(newValue);
        } catch (err) {
          console.error("Store update error:", err);
        }
      });
    }

    return [state, update];
  };
}