"use client";
import React, { useRef, useState } from "react";
import { ColDef } from "ag-grid-community";
import DataGrid, { DataGridHandle } from "@/components/DataGrid";
import BackIcon from "@/svg/BackIcon";
import StatusCellRenderer from "./StatusCellRenderer";
import ActionCellRenderer from "./ActionCellRenderer";
import "./style.scss";

interface Props {
  onBack: () => void;
}

const AccountManagement = (props: Props) => {
  const gridRef = useRef<DataGridHandle | null>(null);

  const querying = useRef(false);
  const hasMore = useRef(false);
  const fetchCount = 30;
  const lastRow = useRef<any | null>(null);

  const columnDefs = useRef<Array<ColDef<any>>>([
    {
      headerName: "Tài khoản",
      field: "accountNumber",
      minWidth: 120,
      maxWidth: 120,
      headerClass: "header",
      cellClass: "cell",
    },
    {
      headerName: "Công ty CK",
      field: "company",
      minWidth: 120,
      flex: 1,
      headerClass: "header",
      cellClass: "cell",
    },
    {
      headerName: "Chủ tài khoản",
      field: "accountOwner",
      minWidth: 180,
      flex: 1,
      headerClass: "header",
      cellClass: "cell",
    },
    {
      headerName: "Trạng thái",
      field: "status",
      minWidth: 130,
      flex: 1,
      headerClass: "header",
      cellClass: "cell-center",
      cellRenderer: StatusCellRenderer,
    },
    {
      headerName: "Thời gian",
      field: "timestamp",
      minWidth: 160,
      flex: 1,
      headerClass: "header",
      cellClass: "cell",
    },
    {
      headerName: "",
      field: "action",
      minWidth: 140,
      maxWidth: 140,
      headerClass: "header",
      cellClass: "cell-center",
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

        // TODO: Replace with actual API call
        // Fake data - dựa trên Figma design
        const rowData: any[] = [
          {
            accountNumber: "020343555",
            company: "DSC",
            accountOwner: "Nguyễn Thu Hiền",
            status: "linked", // 'pending' | 'linked' | 'cancelled'
            timestamp: "10:30 02/20/2025",
          },
          {
            accountNumber: "020343555",
            company: "DSC",
            accountOwner: "Nguyễn Thu Hiền",
            status: "linked",
            timestamp: "10:30 02/20/2025",
          },
          {
            accountNumber: "020343555",
            company: "DSC",
            accountOwner: "Nguyễn Thu Hiền",
            status: "unlinked",
            timestamp: "10:30 02/20/2025",
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

  const handleLinkAccount = () => {
    // TODO: Implement link account logic
    console.log("Link account clicked");
  };

  return (
    <div className="account-management w-full h-full flex flex-col">
      {/* Header with back button and title */}
      <div className="flex items-center gap-[1.6rem] mb-[2.4rem]">
        <button
          onClick={props.onBack}
          className="flex items-center justify-center cursor-pointer"
        >
          <BackIcon />
        </button>
        <h2 className="text-[var(--text-primary)] text-[1.6rem] font-[700] leading-[1.4]">
          Quản lý tài khoản
        </h2>
      </div>

      {/* DataGrid */}
      <div className="grid-container flex-1">
        <DataGrid
          className="account-mng-grid"
          ref={gridRef}
          defaultColDef={{
            sortable: false,
            suppressMovable: true,
          }}
          headerHeight={53}
          rowHeight={63}
          onGridReady={() => requestData()}
          onScrollToBottom={() => requestData(true)}
          columnDefs={columnDefs.current}
        />
      </div>

      {/* Footer with Link Account button */}
      <div className="footer">
        <button onClick={handleLinkAccount} className="link-account-btn">
          Liên kết tài khoản
        </button>
      </div>
    </div>
  );
};

export default AccountManagement;
