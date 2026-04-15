import React, { useEffect } from "react";

// 🧠 STORE
import { useStocks, useSelectedStock } from "./store/stockStore";
import {
  useTheme,
  useChartType,
  useTimeframe,
  useSpeed
} from "./store/uiStore";
import { useEngineRunning } from "./store/engineStore";

// 🌐 SERVICES
import { fetchStocks } from "./services/stockService";

// 🧩 COMPONENTS
import MainLayout from "./components/layout/MainLayout";
import ChartCanvas from "./components/chart/ChartCanvas";
import ControlsPanel from "./components/controls/ControlsPanel";

// 🧰 UTILS
import { generateData } from "./utils/chartUtils";

export default function App() {

  // ================= STATE =================

  const [stocks, setStocks] = useStocks();
  const [selectedStock, setSelectedStock] = useSelectedStock();

  const [theme, setTheme] = useTheme();
  const [chartType, setChartType] = useChartType();
  const [timeframe, setTimeframe] = useTimeframe();
  const [speed, setSpeed] = useSpeed();

  const [running, setRunning] = useEngineRunning();

  // ================= FETCH STOCKS =================

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const res = await fetchStocks();

        if (res && res.success !== false && isMounted) {
          const data = res.data || [];

          setStocks(data);

          // set default selected stock safely
          if (data.length > 0) {
            setSelectedStock(prev => prev || data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to load stocks:", err);
      }
    }

    load();

    // 🔁 auto refresh
    const interval = setInterval(load, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // ================= THEME =================

  useEffect(() => {
    document.body.className = theme || "dark";
  }, [theme]);

  // ================= CHART DATA =================

  const chartData = selectedStock
    ? generateData(60).map(v => v + selectedStock.price * 0.1)
    : [];

  // ================= RENDER =================

  return (
    <MainLayout
      stocks={stocks}
      selectedStock={selectedStock}
      setSelectedStock={setSelectedStock}
    >

      {/* 🎛 CONTROLS PANEL */}
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

      {/* 📊 CHART */}
      <div className="fade-in">
        <ChartCanvas data={chartData} />
      </div>

    </MainLayout>
  );
}