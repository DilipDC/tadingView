import React from "react";

import TimeframeSelector from "./TimeframeSelector";
import ChartTypeSelector from "./ChartTypeSelector";
import PlayPauseControl from "./PlayPauseControl";
import SpeedControl from "./SpeedControl";
import ThemeToggle from "./ThemeToggle";

export default function ControlsPanel({
  timeframe = "1m",
  setTimeframe = () => {},

  chartType = "line",
  setChartType = () => {},

  running = true,
  setRunning = () => {},

  speed = 1,
  setSpeed = () => {},

  theme = "dark",
  setTheme = () => {}
}) {

  return (
    <div className="controls-panel fade-in">

      {/* TIMEFRAME */}
      <TimeframeSelector
        value={timeframe}
        onChange={setTimeframe}
      />

      {/* CHART TYPE */}
      <ChartTypeSelector
        type={chartType}
        setType={setChartType}
      />

      {/* PLAY / PAUSE */}
      <PlayPauseControl
        running={running}
        setRunning={setRunning}
      />

      {/* SPEED */}
      <SpeedControl
        speed={speed}
        setSpeed={setSpeed}
      />

      {/* THEME */}
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
      />

    </div>
  );
}