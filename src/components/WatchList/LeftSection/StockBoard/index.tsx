"use client";
import React, { useRef } from "react";
import { ColDef } from "ag-grid-community";
import SymbolCell from "./CellRender/SymbolCell";
import BuySellCell from "./CellRender/BuySellCell";
import MatchPriceCell from "./CellRender/MatchPriceCell";
import PriceChangeCell from "./CellRender/PriceChangeCell";
import CeilingRefFloorCell from "./CellRender/CeilingRefFloorCell";
import ForeignCell from "./CellRender/ForeignCell";
import StatusCell from "./CellRender/StatusCell";
import "./style.scss";
import DataGrid, { DataGridHandle } from "@/components/DataGrid";

interface StockData {
  symbol: string;
  buy3: number;
  buy2: number;
  buy1: number;
  matchPrice: number;
  priceChange: number;
  sell1: number;
  sell2: number;
  sell3: number;
  totalVolume: number;
  totalValue: number;
  ceiling: number;
  floor: number;
  reference: number;
  foreignBuy: number;
  foreignSell: number;
  status: "ceiling" | "floor" | "reference" | "up" | "down";
}

const StockBoard = () => {
  const gridRef = useRef<DataGridHandle | null>(null);

  const columnDefs = useRef<Array<ColDef<StockData>>>([
    {
      headerName: "Mã",
      field: "symbol",
      minWidth: 74,
      maxWidth: 74,
      headerClass: "header text-center",
      cellClass: "cell-symbol",
      cellRenderer: SymbolCell,
      pinned: "left",
    },
    {
      headerName: "Mua 3",
      field: "buy3",
      minWidth: 70,
      maxWidth: 70,
      headerClass: "header text-center",
      cellClass: "cell-buy-sell",
      cellRenderer: BuySellCell,
    },
    {
      headerName: "Mua 2",
      field: "buy2",
      minWidth: 70,
      maxWidth: 70,
      headerClass: "header text-center",
      cellClass: "cell-buy-sell",
      cellRenderer: BuySellCell,
    },
    {
      headerName: "Mua 1",
      field: "buy1",
      minWidth: 70,
      maxWidth: 70,
      headerClass: "header text-center",
      cellClass: "cell-buy-sell",
      cellRenderer: BuySellCell,
    },
    {
      headerName: "Khớp",
      field: "matchPrice",
      minWidth: 84,
      maxWidth: 84,
      headerClass: "header text-center",
      cellClass: "cell-match",
      cellRenderer: MatchPriceCell,
    },
    {
      headerName: "+/-",
      field: "priceChange",
      minWidth: 76,
      maxWidth: 76,
      headerClass: "header text-center",
      cellClass: "cell-change",
      cellRenderer: PriceChangeCell,
    },
    {
      headerName: "Bán 1",
      field: "sell1",
      minWidth: 70,
      maxWidth: 70,
      headerClass: "header text-center",
      cellClass: "cell-buy-sell",
      cellRenderer: BuySellCell,
    },
    {
      headerName: "Bán 2",
      field: "sell2",
      minWidth: 70,
      maxWidth: 70,
      headerClass: "header text-center",
      cellClass: "cell-buy-sell",
      cellRenderer: BuySellCell,
    },
    {
      headerName: "Bán 3",
      field: "sell3",
      minWidth: 70,
      maxWidth: 70,
      headerClass: "header text-center",
      cellClass: "cell-buy-sell",
      cellRenderer: BuySellCell,
    },
    {
      headerName: "Tổng KL",
      field: "totalVolume",
      minWidth: 105,
      maxWidth: 105,
      headerClass: "header text-center",
      cellClass: "cell text-end",
      valueFormatter: (params) => {
        if (!params.value) return "";
        return (params.value / 1000).toFixed(1) + "K";
      },
    },
    {
      headerName: "Tổng GT",
      field: "totalValue",
      minWidth: 104,
      maxWidth: 104,
      headerClass: "header text-center",
      cellClass: "cell text-end",
      valueFormatter: (params) => {
        if (!params.value) return "";
        return (params.value / 1000).toFixed(1) + "B";
      },
    },
    {
      headerName: "C/TB/T",
      field: "ceiling",
      minWidth: 80,
      maxWidth: 80,
      headerClass: "header text-center",
      cellClass: "cell-ctf",
      cellRenderer: CeilingRefFloorCell,
    },
    {
      headerName: "NN m/b",
      field: "foreignBuy",
      minWidth: 90,
      maxWidth: 90,
      headerClass: "header text-center",
      cellClass: "cell-foreign",
      cellRenderer: ForeignCell,
    },
    {
      headerName: "T/TC/S",
      minWidth: 69,
      maxWidth: 69,
      headerClass: "header text-center",
      cellClass: "cell-status",
      cellRenderer: StatusCell,
    },
  ]);

  // Fake data - 15 stocks with all 5 status cases
  const generateFakeData = (): StockData[] => {
    const symbols = [
      "VNM",
      "VIC",
      "VHM",
      "HPG",
      "TCB",
      "VPB",
      "MBB",
      "ACB",
      "CTG",
      "VCB",
      "BID",
      "STB",
      "MSN",
      "FPT",
      "VRE",
    ];

    // Ensure we have at least 3 of each status for variety
    const statusPattern: Array<
      "ceiling" | "floor" | "reference" | "up" | "down"
    > = [
      "ceiling",
      "ceiling",
      "ceiling", // 3 ceiling
      "floor",
      "floor",
      "floor", // 3 floor
      "reference",
      "reference",
      "reference", // 3 reference
      "up",
      "up",
      "up", // 3 up
      "down",
      "down",
      "down", // 3 down
    ];

    return symbols.map((symbol, index) => {
      const reference = 50 + Math.random() * 50; // 50-100
      const ceiling = reference * 1.07;
      const floor = reference * 0.93;

      // Use predefined status pattern
      const status = statusPattern[index];
      let matchPrice: number;
      let priceChange: number;

      switch (status) {
        case "ceiling":
          matchPrice = ceiling;
          priceChange = matchPrice - reference;
          break;
        case "floor":
          matchPrice = floor;
          priceChange = matchPrice - reference;
          break;
        case "reference":
          matchPrice = reference;
          priceChange = 0;
          break;
        case "up":
          // Random increase between reference and ceiling (but not touching ceiling)
          matchPrice =
            reference + (ceiling - reference) * (0.2 + Math.random() * 0.5);
          priceChange = matchPrice - reference;
          break;
        case "down":
          // Random decrease between floor and reference (but not touching floor)
          matchPrice =
            floor + (reference - floor) * (0.2 + Math.random() * 0.5);
          priceChange = matchPrice - reference;
          break;
      }

      return {
        symbol,
        buy3: matchPrice - 0.3,
        buy2: matchPrice - 0.2,
        buy1: matchPrice - 0.1,
        matchPrice,
        priceChange,
        sell1: matchPrice + 0.1,
        sell2: matchPrice + 0.2,
        sell3: matchPrice + 0.3,
        totalVolume: 1000000 + Math.random() * 5000000,
        totalValue: 50000 + Math.random() * 200000,
        ceiling,
        floor,
        reference,
        foreignBuy: 50000 + Math.random() * 100000,
        foreignSell: 50000 + Math.random() * 100000,
        status,
      };
    });
  };

  const rowData = generateFakeData();

  return (
    <div className="w-full h-full flex flex-col">
      {/* DataGrid */}
      <div className="flex-1">
        <DataGrid
          className="stock-board"
          ref={gridRef}
          defaultColDef={{
            sortable: false,
            suppressMovable: true,
            resizable: false,
          }}
          rowHeight={62}
          rowData={rowData}
          columnDefs={columnDefs.current}
        />
      </div>
    </div>
  );
};

export default StockBoard;
