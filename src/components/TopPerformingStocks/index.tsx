"use client";
import React, { useRef, useState } from "react";
import { ColDef } from "ag-grid-community";
import { Select, SelectItem } from "@heroui/select";
import DataGrid, { DataGridHandle } from "../DataGrid";
import BuyCellRenderer from "./BuyCellRenderer";
import SellCellRenderer from "./SellCellRenderer";
import "./style.scss";

const TopPerformingStocks = () => {
  const gridRef = useRef<DataGridHandle | null>(null);
  const [timePeriod, setTimePeriod] = useState("3months");

  const querying = useRef(false);
  const hasMore = useRef(false);
  const fetchCount = 30;
  const lastRow = useRef<any | null>(null);

  const timeOptions = [
    { key: "1month", label: "1 tháng" },
    { key: "3months", label: "3 tháng" },
    { key: "6months", label: "6 tháng" },
    { key: "1year", label: "1 năm" },
  ];

  const columnDefs = useRef<Array<ColDef<any>>>([
    {
      headerName: "Mã",
      field: "sybol",
      minWidth: 75,
      maxWidth: 75,
      headerClass: "header text-center",
      cellClass: "cell text-center",
    },
    {
      headerName: "Mua",
      field: "buyRange",
      flex: 1,
      headerClass: "header text-center",
      cellClass: "cell-custom",
      cellRenderer: BuyCellRenderer,
    },
    {
      headerName: "Bán",
      field: "sellRange",
      flex: 1,
      headerClass: "header text-center",
      cellClass: "cell-custom",
      cellRenderer: SellCellRenderer,
    },
    {
      headerName: "%Lãi/lỗ",
      field: "profitLossPercent",
      flex: 1,
      headerClass: "header text-center",
      cellClass: "cell text-center",
      cellClassRules: {
        "text-up": (params) => params.value > 0,
        "text-down": (params) => params.value < 0,
      },
      valueFormatter: (params) => {
        if (params.value == null) return "";
        const percent = (params.value * 100).toFixed(1);
        return `${percent}%`;
      },
    },
    {
      headerName: "Hiệu suất",
      field: "performance",
      flex: 1,
      headerClass: "header text-center",
      cellClass: "cell text-center",
      // valueFormatter: (params) => {
      //     return ``;
      // },
    },
  ]);

  const requestData = async (more?: boolean) => {
    if (querying.current || !gridRef.current) {
      return;
    }
    if (!more || hasMore.current) {
      gridRef.current?.showLoadingOverlay();
      try {
        querying.current = true;

        // Fake data - 10 bản ghi, mỗi bản ghi chỉ có mua HOẶC bán
        const rowData: any[] = [
          {
            sybol: "AAA",
            buyRange: "33.7-33.8",
            buyTime: "17:00 02/20/2025",
            sellRange: null,
            sellTime: null,
            profitLossPercent: 0.615,
            performance: 85.2,
          },
          {
            sybol: "BBB",
            buyRange: null,
            buyTime: null,
            sellRange: "45.8-46.3",
            sellTime: "16:50 02/20/2025",
            profitLossPercent: -0.523,
            performance: 78.5,
          },
          {
            sybol: "CCC",
            buyRange: "28.5-29.0",
            buyTime: "15:30 02/20/2025",
            sellRange: null,
            sellTime: null,
            profitLossPercent: 0.487,
            performance: 72.1,
          },
          {
            sybol: "DDD",
            buyRange: null,
            buyTime: null,
            sellRange: "55.5-56.8",
            sellTime: "14:25 02/20/2025",
            profitLossPercent: -0.412,
            performance: 68.9,
          },
          {
            sybol: "EEE",
            buyRange: "18.3-19.1",
            buyTime: "13:10 02/20/2025",
            sellRange: null,
            sellTime: null,
            profitLossPercent: 0.356,
            performance: 45.3,
          },
          {
            sybol: "FFF",
            buyRange: null,
            buyTime: null,
            sellRange: "73.0-73.8",
            sellTime: "12:05 02/20/2025",
            profitLossPercent: -0.421,
            performance: 38.7,
          },
          {
            sybol: "GGG",
            buyRange: "41.2-42.0",
            buyTime: "11:30 02/20/2025",
            sellRange: null,
            sellTime: null,
            profitLossPercent: 0.485,
            performance: 32.4,
          },
          {
            sybol: "HHH",
            buyRange: null,
            buyTime: null,
            sellRange: "63.8-64.5",
            sellTime: "10:50 02/20/2025",
            profitLossPercent: -0.553,
            performance: 28.1,
          },
          {
            sybol: "III",
            buyRange: "25.8-26.5",
            buyTime: "09:30 02/20/2025",
            sellRange: null,
            sellTime: null,
            profitLossPercent: 0.615,
            performance: 22.6,
          },
          {
            sybol: "JJJ",
            buyRange: null,
            buyTime: null,
            sellRange: "39.2-39.8",
            sellTime: "09:05 02/20/2025",
            profitLossPercent: -0.682,
            performance: 15.8,
          },
        ];

        gridRef.current?.api?.applyTransaction({
          add: rowData,
          addIndex: gridRef.current.api.getDisplayedRowCount(),
        });
        lastRow.current = rowData[rowData.length - 1];

        if (rowData.length < fetchCount) {
          hasMore.current = false;
        } else {
          hasMore.current = true;
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        querying.current = false;
        gridRef.current?.hideOverlay();
      }
    }
  };

  const refreshData = () => {
    gridRef.current?.api?.setGridOption("rowData", []);
    lastRow.current = null;
    hasMore.current = false;
    querying.current = false;
    requestData();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-[1.6rem] pb-[0.6rem] pt-[1.3rem]">
        <h2 className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
          Top mã hiệu quả
        </h2>

        <div className="flex items-center gap-[1.6rem]">
          <Select
            selectedKeys={[timePeriod]}
            onChange={(e) => setTimePeriod(e.target.value)}
            classNames={{
              trigger:
                "cursor-pointer bg-gradient-to-r from-[var(--bg-gradient-icon-from)] from-[-17.67%] via-[var(--bg-gradient-icon-via)] via-[44.55%] to-[var(--bg-gradient-icon-to)] to-[125.21%] rounded-[5.4rem] h-[3.6rem] min-h-[3.6rem] px-[1.2rem] py-[1rem] gap-[1rem] w-[11.8rem]",
              value:
                "text-[1.5rem] font-[500] leading-[1.4] text-[var(--text-primary)]",
              listboxWrapper:
                "bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)]",
              popoverContent:
                "bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)] rounded-[1.2rem] w-[11.8rem]",
            }}
            aria-label="Chọn thời gian"
          >
            {timeOptions.map((option) => (
              <SelectItem
                key={option.key}
                classNames={{
                  base: "text-[1.5rem] font-[500] leading-[1.4] text-[var(--text-primary)] h-[4rem] min-h-[4rem] py-[1rem] px-[1.2rem]",
                  title:
                    "text-[1.5rem] font-[500] leading-[1.4] text-[var(--text-primary)]",
                }}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* DataGrid */}
      <div className="flex-1">
        <DataGrid
          className="top-perform-stock"
          ref={gridRef}
          defaultColDef={{
            sortable: false,
            suppressMovable: true,
          }}
          onGridReady={() => requestData()}
          onScrollToBottom={() => requestData(true)}
          columnDefs={columnDefs.current}
        />
      </div>
    </div>
  );
};

export default TopPerformingStocks;
