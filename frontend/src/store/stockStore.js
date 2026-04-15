import { createStore } from "./useStore";

// global stock list
export const useStocks = createStore("stocks", []);

// selected stock
export const useSelectedStock = createStore("selectedStock", null);