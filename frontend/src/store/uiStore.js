import { createStore } from "./useStore";

// theme
export const useTheme = createStore("theme", "dark");

// chart type
export const useChartType = createStore("chartType", "line");

// timeframe
export const useTimeframe = createStore("timeframe", "1m");

// speed
export const useSpeed = createStore("speed", 1);