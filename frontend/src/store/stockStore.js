import { createStore } from "./useStore.js";

// Initial state
const initialState = {
  stocks: [],
  selectedStock: null,
  loading: false,
  error: null,
};

// Create store
const useStockStoreBase = createStore("stockStore", initialState);

// Custom hook
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

  const addStock = (stock) => {
    setState((prev) => ({
      ...prev,
      stocks: [...prev.stocks, stock],
    }));
  };

  const updateStock = (updatedStock) => {
    setState((prev) => ({
      ...prev,
      stocks: prev.stocks.map((s) =>
        s.id === updatedStock.id ? updatedStock : s
      ),
    }));
  };

  const deleteStock = (id) => {
    setState((prev) => ({
      ...prev,
      stocks: prev.stocks.filter((s) => s.id !== id),
    }));
  };

  const setSelectedStock = (stock) => {
    setState((prev) => ({
      ...prev,
      selectedStock: stock,
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
    }));
  };

  return {
    ...state,
    setStocks,
    addStock,
    updateStock,
    deleteStock,
    setSelectedStock,
    setLoading,
    setError,
  };
}
