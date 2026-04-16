import { createStore } from "./useStore.js";

const initialState = {
  theme: "dark",
  chartType: "line",
  timeframe: "1m",
  speed: 1
};

const useUIStoreBase = createStore("uiStore", initialState);

export function useTheme() {
  const [state, setState] = useUIStoreBase();
  return [state.theme, (theme) => setState(p => ({ ...p, theme }))];
}

export function useChartType() {
  const [state, setState] = useUIStoreBase();
  return [state.chartType, (chartType) => setState(p => ({ ...p, chartType }))];
}

export function useTimeframe() {
  const [state, setState] = useUIStoreBase();
  return [state.timeframe, (timeframe) => setState(p => ({ ...p, timeframe }))];
}

export function useSpeed() {
  const [state, setState] = useUIStoreBase();
  return [state.speed, (speed) => setState(p => ({ ...p, speed }))];
}
