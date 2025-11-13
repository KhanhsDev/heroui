"use client";
import React, { useRef, useMemo, useEffect } from "react";
import * as Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { getChartConfig } from "./config";
import { useTheme } from "next-themes";
import "./style.css";

interface MinuteChartProps {
  symbol?: string;
  inPro?: boolean;
}

// Fake data generator
const generateFakeData = (refPrice: number) => {
  const points: number[][] = [];
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const date = new Date().getDate();

  // Generate data from 9:00 to 15:00 (every 1 minute for smooth line)
  for (let hour = 9; hour <= 15; hour++) {
    const maxMinute = hour === 15 ? 0 : 59;
    for (let minute = 0; minute <= maxMinute; minute += 1) {
      const time = new Date(year, month, date, hour, minute).getTime();
      // Random price variation around reference price (+/- 3%)
      const variation = (Math.random() - 0.5) * 0.06;
      const price = refPrice * (1 + variation);
      points.push([time, price]);
    }
  }

  return points;
};

const MinuteChart = (props: MinuteChartProps) => {
  const { theme } = useTheme();

  // Hard-coded fake data
  const refPrice = 15000; // Reference price (giá tham chiếu)
  const fakeData = useMemo(() => generateFakeData(refPrice), [refPrice]);

  const min = Math.min(...fakeData.map((p) => p[1]));
  const max = Math.max(...fakeData.map((p) => p[1]));

  const chartRef = useRef<{
    chart: Highcharts.Chart;
    container: React.RefObject<HTMLDivElement>;
  } | null>(null);

  const chartOption = useMemo(() => {
    console.log("Generating chart with data:", {
      dataLength: fakeData.length,
      min,
      max,
      refPrice,
      firstPoint: fakeData[0],
      lastPoint: fakeData[fakeData.length - 1],
    });

    return getChartConfig({
      chartName: props.symbol || "VN30",
      data: fakeData,
      max: max,
      min: min,
      ref: refPrice,
      volData: [],
      theme: theme as any,
      lang: "vi" as any,
      inPro: props.inPro,
    });
  }, [fakeData, max, min, refPrice, theme, props.symbol, props.inPro]);

  useEffect(() => {
    console.log("MinuteChart mounted, chartOption:", chartOption);
    console.log("Chart data:", fakeData);
    console.log("Chart series:", chartOption.series);
  }, [chartOption, fakeData]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: props.inPro ? "300px" : "200px",
      }}
    >
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOption}
        allowChartUpdate={true}
        constructorType={"stockChart"}
        ref={chartRef}
      />
    </div>
  );
};

export default MinuteChart;
