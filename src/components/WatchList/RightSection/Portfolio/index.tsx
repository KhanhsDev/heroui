"use client";
import React, { useRef } from "react";
import { ColDef } from "ag-grid-community";
import DataGrid, { DataGridHandle } from "@/components/DataGrid";
import IncreaseIcon from "@/svg/IncreaseIcon";
import "./style.scss";
import ActionCellRenderer from "./ActionCellRenderer";

const Portfolio = () => {
  const gridRef = useRef<DataGridHandle | null>(null);

  const querying = useRef(false);
  const hasMore = useRef(false);
  const fetchCount = 30;
  const lastRow = useRef<any | null>(null);

  const columnDefs = useRef<Array<ColDef<any>>>([
    {
      headerName: "Mã CK",
      field: "symbol",
      minWidth: 105,
      maxWidth: 105,
      headerClass: "header text-center",
      cellClass: "cell text-center",
    },
    {
      headerName: "Giá mua TB",
      field: "avgBuyPrice",
      flex: 1,
      minWidth: 163,
      headerClass: "header text-center",
      cellClass: "cell text-center",
    },
    {
      headerName: "Giá TT",
      field: "currentPrice",
      flex: 1,
      minWidth: 166,
      headerClass: "header text-center",
      cellClass: "cell text-center",
    },
    {
      headerName: "Khối lượng",
      field: "volume",
      flex: 1,
      minWidth: 165,
      headerClass: "header text-center",
      cellClass: "cell text-center",
      valueFormatter: (params) => {
        if (params.value == null) return "";
        return params.value.toLocaleString("en-US");
      },
    },
    {
      headerName: "% lãi/lỗ",
      field: "profitLossPercent",
      flex: 1,
      minWidth: 88,
      headerClass: "header text-center",
      cellClass: "cell text-center",
      cellClassRules: {
        "text-up": (params) => params.value > 0,
        "text-down": (params) => params.value < 0,
      },
      valueFormatter: (params) => {
        if (params.value == null) return "";
        const sign = params.value > 0 ? "+" : "";
        return `${sign}${params.value}%`;
      },
    },
    {
      headerName: "",
      field: "action",
      flex: 1,
      minWidth: 80,
      maxWidth: 80,
      headerClass: "header",
      cellClass: "cell-action",
      cellRenderer: ActionCellRenderer,
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

        // Fake data - portfolio holdings
        const rowData: any[] = [
          {
            symbol: "AAA",
            avgBuyPrice: "8,000",
            currentPrice: "7,500",
            volume: 100000,
            profitLossPercent: 20.3,
            action: "buy",
          },
          {
            symbol: "AAA",
            avgBuyPrice: "8,000",
            currentPrice: "7,500",
            volume: 100000,
            profitLossPercent: 20.3,
            action: "buy",
          },
          {
            symbol: "AAA",
            avgBuyPrice: "8,000",
            currentPrice: "7,500",
            volume: 100000,
            profitLossPercent: 20.3,
            action: "buy",
          },
          {
            symbol: "AAA",
            avgBuyPrice: "8,000",
            currentPrice: "7,500",
            volume: 100000,
            profitLossPercent: 20.3,
            action: "buy",
          },
          {
            symbol: "AAA",
            avgBuyPrice: "8,000",
            currentPrice: "7,500",
            volume: 100000,
            profitLossPercent: 20.3,
            action: "sell",
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
      {/* Portfolio Summary Card */}
      <div className="pb-[1.6rem]">
        <div className="bg-[var(--bg-secondary)] rounded-[1.2rem] p-[1.6rem] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)]">
          {/* Net Asset Value */}
          <div className="flex flex-col gap-[0.8rem] mb-[1.6rem]">
            <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
              Tài sản ròng
            </p>
            <div className="flex items-center justify-between">
              <p className="text-[2rem] font-[700] leading-[1.2] text-[var(--text-secondary)]">
                10,000,000,000
              </p>
              <div className="flex items-center gap-[0.4rem]">
                <IncreaseIcon />
                <p className="text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-buy)]">
                  100.000.000
                </p>
                <p className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-buy)]">
                  (+0.12%)
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-[1.3rem]">
            <div className="bg-[var(--bg-primary)] rounded-[0.8rem] p-[0.8rem] h-[9rem] flex flex-col gap-[1.2rem] justify-center">
              <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-tertiary)] text-center">
                Tổng nợ
              </p>
              <p className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-secondary)] text-center">
                0
              </p>
            </div>
            <div className="bg-[var(--bg-primary)] rounded-[0.8rem] p-[0.8rem] h-[9rem] flex flex-col gap-[1.2rem] justify-center">
              <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-tertiary)] text-center">
                Sức mua
              </p>
              <p className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-secondary)] text-center">
                500,000,000
              </p>
            </div>
            <div className="bg-[var(--bg-primary)] rounded-[0.8rem] p-[0.8rem] h-[9rem] flex flex-col gap-[1.2rem] justify-center">
              <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-tertiary)] text-center">
                Giá trị CK
              </p>
              <p className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-secondary)] text-center">
                500,000,000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DataGrid */}
      <div className="flex-1">
        <DataGrid
          className="portfolio-grid"
          ref={gridRef}
          headerHeight={53}
          rowHeight={44}
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

export default Portfolio;
