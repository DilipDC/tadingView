import { useState, useEffect } from "react";

const globalState = {};
const listeners = {};

export function createStore(key, initialValue) {
  // initialize store only once
  if (!(key in globalState)) {
    globalState[key] = initialValue;
    listeners[key] = [];
  }

  return function useStore() {
    const [state, setState] = useState(globalState[key]);

    useEffect(() => {
      // register listener
      listeners[key].push(setState);

      // cleanup on unmount
      return () => {
        listeners[key] = listeners[key].filter(
          (l) => l !== setState
        );
      };
    }, []);

    function update(value) {
      const newValue =
        typeof value === "function"
          ? value(globalState[key])
          : value;

      globalState[key] = newValue;

      // notify all listeners (ONLY ONCE)
      listeners[key].forEach((listener) =>
        listener(newValue)
      );
    }

    return [state, update];
  };
}
