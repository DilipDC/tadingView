import { createStore } from "./useStore.js";

const initialState = {
  stocks: [],
  selectedStock: null,
  loading: false,
  error: null
};

const useStockStoreBase = createStore("stockStore", initialState);

export function useStockStore() {
  const [state, setState] = useStockStoreBase();

  const setStocks = (stocks) => {
    setState({
      stocks,
      loading: false,
      error: null
    });
  };

  const setSelectedStock = (stock) => {
    setState({ selectedStock: stock });
  };

  return {
    stocks: state.stocks,
    selectedStock: state.selectedStock,
    setStocks,
    setSelectedStock
  };
}
