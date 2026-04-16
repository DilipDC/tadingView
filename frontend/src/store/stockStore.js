import { useState } from "react";

const stores = {};

export function createStore(key, initialState) {
  if (!stores[key]) {
    stores[key] = {
      state: initialState,
      listeners: new Set()
    };
  }

  return function useStore() {
    const [, forceRender] = useState({});

    const store = stores[key];

    const setState = (update) => {
      const nextState =
        typeof update === "function"
          ? update(store.state)
          : update;

      store.state = { ...store.state, ...nextState };

      store.listeners.forEach((listener) => listener({}));
    };

    const subscribe = (listener) => {
      store.listeners.add(listener);
      return () => store.listeners.delete(listener);
    };

    // subscribe on mount
    useState(() => {
      const unsubscribe = subscribe(forceRender);
      return unsubscribe;
    });

    return [store.state, setState];
  };
}
