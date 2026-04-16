import { createStore } from "./useStore.js";

const initialState = {
  running: false
};

const useEngineStoreBase = createStore("engineStore", initialState);

export function useEngineRunning() {
  const [state, setState] = useEngineStoreBase();

  const setRunning = (running) => {
    setState(prev => ({
      ...prev,
      running
    }));
  };

  return [state.running, setRunning];
}
