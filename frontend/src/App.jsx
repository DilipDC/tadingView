import React, { useEffect } from "react";

// STORE
import { useStockStore } from "./store/stockStore.js";
import {
  useTheme,
  useChartType,
  useTimeframe,
  useSpeed
} from "./store/uiStore.js";
import { useEngineRunning } from "./store/engineStore.js";

// SERVICES
import { fetchStocks } from "./services/stockService.js";

// COMPONENTS
import MainLayout from "./components/layout/MainLayout.jsx";
import ChartCanvas from "./components/chart/ChartCanvas.jsx";
import ControlsPanel from "./components/controls/ControlsPanel.jsx";

// UTILS
import { generateData } from "./utils/chartUtils.js";

export default function App() {

  const {
    stocks,
    setStocks,
    selectedStock,
    setSelectedStock
  } = useStockStore();

  const [theme, setTheme] = useTheme();
  const [chartType, setChartType] = useChartType();
  const [timeframe, setTimeframe] = useTimeframe();
  const [speed, setSpeed] = useSpeed();
  const [running, setRunning] = useEngineRunning();

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetchStocks();

        if (res && res.success !== false && isMounted) {
          const data = res.data || [];

          setStocks(data);

          if (data.length > 0) {
            setSelectedStock(prev => prev || data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load stocks:", err);
      }
    }

    load();
    const interval = setInterval(load, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    document.body.className = theme || "dark";
  }, [theme]);

  const chartData = selectedStock
    ? generateData(60).map(v => v + selectedStock.price * 0.1)
    : [];

  return (
    <MainLayout
      stocks={stocks}
      selectedStock={selectedStock}
      setSelectedStock={setSelectedStock}
    >
      <ControlsPanel
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        chartType={chartType}
        setChartType={setChartType}
        running={running}
        setRunning={setRunning}
        speed={speed}
        setSpeed={setSpeed}
        theme={theme}
        setTheme={setTheme}
      />

      <div className="fade-in">
        <ChartCanvas data={chartData} />
      </div>
    </MainLayout>
  );
}
