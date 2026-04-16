import { createStore } from "./useStore.js";

const initialState = {
  stocks: [],
  loading: false,
  error: null,
};

const useStockStoreBase = createStore("stockStore", initialState);

export function useStockStore() {
  const [state, setState] = useStockStoreBase();

  const setStocks = (stocks) => {
    setState((prev) => ({
      ...prev,
      stocks,
      loading: false,
      error: null,
    }));
  };

  const setLoading = (loading) => {
    setState((prev) => ({
      ...prev,
      loading,
    }));
  };

  const setError = (error) => {
    setState((prev) => ({
      ...prev,
      error,
      loading: false,
    }));
  };

  return {
    ...state,
    setStocks,
    setLoading,
    setError,
  };
}
