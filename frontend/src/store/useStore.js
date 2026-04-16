import { useState, useEffect } from "react";

const stores = {};

export function createStore(key, initialState) {
  if (!stores[key]) {
    stores[key] = {
      state: initialState,
      listeners: new Set()
    };
  }

  return function useStore() {
    const [, setTick] = useState(0);
    const store = stores[key];

    useEffect(() => {
      const listener = () => setTick(t => t + 1);
      store.listeners.add(listener);

      return () => {
        store.listeners.delete(listener);
      };
    }, []);

    const setState = (update) => {
      const nextState =
        typeof update === "function"
          ? update(store.state)
          : update;

      store.state = { ...store.state, ...nextState };

      store.listeners.forEach((l) => l());
    };

    return [store.state, setState];
  };
}
