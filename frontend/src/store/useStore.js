import { useState, useEffect } from "react";

const globalState = {};
const listeners = {};

export function createStore(key, initialValue) {
  if (!(key in globalState)) {
    globalState[key] = initialValue;
    listeners[key] = [];
  }

  return function useStore() {
    const [state, setState] = useState(globalState[key]);

    useEffect(() => {
      listeners[key].push(setState);

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

      listeners[key].forEach((listener) =>
        listener(newValue)
      );
    }

    return [state, update];
  };
}
