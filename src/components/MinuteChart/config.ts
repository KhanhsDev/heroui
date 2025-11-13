"use client";
import Highcharts from "highcharts";

// Simple number formatter (temporary replacement)
const formatNumber = (
  value: number,
  options?: { digit?: number; offsetRate?: number; toFixed?: boolean }
) => {
  const digit = options?.digit ?? 2;
  return value.toFixed(digit);
};

const HIGHCHART_AREA_CONFIG = {
  increase: {
    line: "#2ebd85", // Green line for increase
    gradient: [
      [0, "rgba(46, 189, 133, 0.5)"],
      [1, "rgba(9, 37, 26, 0)"],
    ],
  },
  decrease: {
    line: "#f5465c", // Red line for decrease
    gradient: [
      [0, "rgba(49, 14, 18, 0)"],
      [1, "rgba(245, 70, 92, 0.5)"],
    ],
  },
};

export const minOffset = 0.9996;
export const maxOffset = 1;
export function getChartConfig({
  chartName,
  data,
  min,
  max,
  ref,
  lang,
  inPro,
}: {
  chartName: string;
  data: number[][];
  max: number;
  min: number;
  ref: number;
  volData: number[][];
  theme?: any;
  lang: any;
  inPro?: boolean;
}): Highcharts.Options {
  console.log("getChartConfig called with:", {
    chartName,
    dataLength: data.length,
    min,
    max,
    ref,
    inPro,
  });

  // Get xAxis max min by adding time zone offset
  const lastTradingDate = data?.[0]?.[0] ?? new Date().getTime();

  const year = new Date(lastTradingDate).getFullYear();
  const month = new Date(lastTradingDate).getMonth();
  const date = new Date(lastTradingDate).getDate();
  let startTime = new Date(year, month, date, 9, 0, 0, 0);
  let endTime = new Date(year, month, date, 15, 0, 0, 0);

  const timezoneDelay = -startTime.getTimezoneOffset() * 60 * 1000;
  startTime = new Date(startTime.getTime() + timezoneDelay);
  endTime = new Date(endTime.getTime() + timezoneDelay);

  // Check if data is null
  let minData = min || ref;
  let maxData = max || ref;

  if (minData >= ref) {
    minData = ref;
  }
  if (maxData <= ref) {
    maxData = ref;
  }

  const chartData =
    data.length > 0
      ? [[startTime.getTime(), ref], [data[0][0], ref], ...data]
      : [[startTime.getTime(), ref]];

  const minValue = minData * minOffset;
  const maxValue = maxData * maxOffset;

  console.log("Chart config:", {
    chartDataLength: chartData.length,
    minValue,
    maxValue,
    startTime: startTime.getTime(),
    endTime: endTime.getTime(),
    firstData: chartData[0],
    lastData: chartData[chartData.length - 1],
    sampleData: chartData.slice(0, 5),
    lineColor: HIGHCHART_AREA_CONFIG.increase.line,
  });

  // Return HighChart Option
  return {
    // Disable all text
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    // Config chart
    chart: {
      plotBackgroundColor: "transparent",
      backgroundColor: "transparent",
      ...(inPro
        ? { margin: [10, 10, 30, 50], spacing: [0, 0, 0, 0] }
        : {
            margin: [10, 10, 30, 50],
            spacing: [0, 0, 2, 0],
          }),
      type: "area",
      animation: false,
      height: inPro ? 300 : 200,

      className: "minute-chart-pro",
    },
    plotOptions: {
      series: {
        enableMouseTracking: true,
        lineWidth: 1.5,
        shadow: false,
        color: HIGHCHART_AREA_CONFIG.increase.line,
        pointPlacement: "on",
        marker: {
          radius: 0,
          enabled: false,
        },
        animation: false,
      },
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: HIGHCHART_AREA_CONFIG.increase.gradient as any,
        },
        zones: [
          {
            value: ref,
            color: HIGHCHART_AREA_CONFIG.decrease.line,
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0,
              },
              stops: HIGHCHART_AREA_CONFIG.decrease.gradient as any,
            },
          },
        ],

        marker: {
          enabled: false,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    tooltip: {
      enabled: true,
      shadow: false,
      borderWidth: 0,
      backgroundColor: "rgba(255,255,255,0.8)",
      split: false,
      shared: true,
      style: {
        zIndex: 999,
        fontSize: "1.2rem",
      },
      xDateFormat: "%d/%m/%Y %H:%M:%S",
      pointFormatter: function () {
        return (
          '<span style="color:' +
          this.color +
          '">\u25CF</span>' +
          this.series.name +
          ": <b>" +
          formatNumber(this.y ?? 0, { digit: 2 }) +
          "</b><br/>"
        );
      },
    },
    // X Axis
    xAxis: {
      ordinal: false,
      minPadding: 0,
      type: "datetime",
      min: startTime.getTime(),
      max: endTime.getTime(),
      tickInterval: 3600000,
      tickWidth: 0,
      lineColor: "#242631",
      gridLineWidth: 1,
      gridLineDashStyle: "Dash",
      gridLineColor: "#242631",
      startOnTick: true,
      endOnTick: true,
      dateTimeLabelFormats: {
        hour: {
          main: lang === "vi" ? "%Hg" : "%Hh",
        },
      },
      labels: {
        style: {
          fontSize: "10px",
          color: "#929196", // minute-label color
        },
        x: 0,
        y: 10,
      },
    },
    // Y Axis
    yAxis: [
      {
        min: minValue,
        max: maxValue,
        endOnTick: false,
        startOnTick: false,
        gridLineWidth: 1,
        gridLineDashStyle: "Dash",
        gridLineColor: "#242631",
        lineColor: "#242631",
        opposite: true,

        labels: {
          enabled: true,
          formatter() {
            if (!this.value) {
              return "";
            }
            return formatNumber(this.value as number, {
              digit: 2,
              offsetRate: 1000,
              toFixed: true,
            });
          },
          style: {
            color: "#ede8e8", // text-1 color
            fontSize: "10px",
          },
        },
        plotLines: [
          {
            color: "#fbbf24", // Yellow color for reference line
            width: 1,
            value: ref,
            dashStyle: "ShortDash",
            zIndex: 100,
          },
        ],
      },
    ],
    // Data
    series: [
      {
        type: "area",
        name: chartName,
        data: chartData,
        pointStart: 0,
        boostThreshold: 1,
        dataGrouping: {
          enabled: false,
        },
        threshold: ref,
        negativeColor: HIGHCHART_AREA_CONFIG.decrease.line,
      } as any,
    ],
    // Disable stock chart tool
    navigator: {
      enabled: false,
    },
    rangeSelector: {
      enabled: false,
    },
    scrollbar: {
      enabled: false,
    },
    boost: {
      useGPUTranslations: true,
    },
  };
}
