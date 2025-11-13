"use client";
import React, { useRef, useState } from "react";
import { ColDef, IRowNode } from "ag-grid-community";
import { Button } from "@heroui/button";
import DataGrid, { DataGridHandle } from "@/components/DataGrid";
import DeleteCellRenderer from "./CellRender/DeleteCellRenderer";
import StatusCellRenderer from "./CellRender/StatusCellRenderer";
import CheckBoxCell from "@/components/DataGrid/CheckBoxCell";
import HeaderCheckbox from "@/components/DataGrid/HeaderCheckbox";
import StopSignalWarningModal from "./ModalConfirm/StopSignalWarningModal";
import StopSignalModal from "./ModalConfirm/StopSignalModal";
import DeleteConfirmModal from "./ModalConfirm/DeleteConfirmModal";
import "./style.scss";

type StockItem = {
  id: string;
  code: string;
  name: string;
  status: "pending" | "active";
};

const AutoSignalWatchlist = () => {
  const gridRef = useRef<DataGridHandle | null>(null);
  const [selectedRows, setSelectedRows] = useState<StockItem[]>([]);

  // Modal states
  const [isStopSignalWarningOpen, setIsStopSignalWarningOpen] = useState(false);
  const [isStopSignalOpen, setIsStopSignalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const querying = useRef(false);
  const hasMore = useRef(false);
  const fetchCount = 30;
  const lastRow = useRef<any | null>(null);

  const columnDefs = useRef<Array<ColDef<StockItem>>>([
    {
      minWidth: 60,
      maxWidth: 60,
      cellClass: "text-center",
      headerClass: "text-center only-checkbox header-box",
      cellRenderer: CheckBoxCell,
      headerComponent: HeaderCheckbox,
    },
    {
      headerName: "Mã chứng khoán",
      field: "code",
      flex: 1,
      headerClass: "header",
      cellClass: "cell",
      cellRenderer: (params: any) => {
        if (!params.data) return <div />;
        return (
          <div className="flex flex-col gap-[0.4rem] justify-center w-full h-full">
            <p className="text-[1.4rem] font-[500] leading-[1.4] text-[var(--text-secondary)]">
              {params.data.code}
            </p>
            <p className="text-[1.4rem] font-[400] leading-[1.3] text-[var(--text-tertiary)]">
              {params.data.name}
            </p>
          </div>
        );
      },
    },
    {
      headerName: "Trạng thái",
      field: "status",
      minWidth: 140,
      maxWidth: 140,
      headerClass: "header text-center",
      cellClass: "cell-custom text-center",
      cellRenderer: StatusCellRenderer,
    },
    {
      headerName: "",
      field: "id",
      minWidth: 95,
      maxWidth: 95,
      headerClass: "header text-center",
      cellClass: "cell-custom",
      cellRenderer: DeleteCellRenderer,
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

        // Mock data
        const rowData: StockItem[] = [
          {
            id: "1",
            code: "AAA",
            name: "Công ty cổ phần nhựa An Phát Xanh",
            status: "pending",
          },
          {
            id: "2",
            code: "BBB",
            name: "Công ty cổ phần nhựa An Phát Xanh",
            status: "pending",
          },
          {
            id: "3",
            code: "CCC",
            name: "Công ty cổ phần nhựa An Phát Xanh",
            status: "active",
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

  const onSelectionChanged = () => {
    const selectedNodes = gridRef.current?.api?.getSelectedRows() || [];
    setSelectedRows(selectedNodes);
  };

  const handleStopSignal = () => {
    // Check if selected rows contain any pending status
    const hasPendingStatus = selectedRows.some(
      (row) => row.status === "pending"
    );

    // Show warning modal if contains pending, otherwise show simple modal
    if (hasPendingStatus) {
      setIsStopSignalWarningOpen(true);
    } else {
      setIsStopSignalOpen(true);
    }
  };

  const handleStopSignalConfirm = () => {
    console.log("Stop signal confirmed for:", selectedRows);
    // TODO: Implement API call to stop signals
    setIsStopSignalWarningOpen(false);
    setIsStopSignalOpen(false);
  };

  const handleApplySignal = () => {
    console.log("Apply signal for:", selectedRows);
    // TODO: Implement apply signal logic
  };

  const handleDeleteClick = (stockId: string) => {
    console.log("Delete clicked for:", stockId);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete confirmed for selected rows");
    // TODO: Implement API call to delete stocks
    setIsDeleteConfirmOpen(false);
  };

  const isRowSelectable = (node: IRowNode<StockItem>) => {
    return false;
  };

  return (
    <div className="w-full h-full flex flex-col gap-[2.4rem]">
      {/* DataGrid */}
      <div className="flex-1">
        <DataGrid
          className="auto-signal-watchlist"
          ref={gridRef}
          defaultColDef={{
            sortable: false,
            suppressMovable: true,
          }}
          context={{
            onDeleteClick: handleDeleteClick,
          }}
          onSelectionChanged={onSelectionChanged}
          selection={{
            mode: "multiRow",
            enableClickSelection: false,
            checkboxes: false,
            headerCheckbox: false,
          }}
          onGridReady={() => requestData()}
          onScrollToBottom={() => requestData(true)}
          columnDefs={columnDefs.current}
        />
      </div>

      {/* Action Buttons */}
      <div className="w-full flex items-center justify-end gap-[1.6rem]">
        <Button
          className="bg-[var(--bg-secondary)] border border-[var(--border-secondary)] h-[4.8rem] px-[1.6rem] rounded-[1.6rem] min-w-[20.9rem]"
          onPress={handleStopSignal}
          isDisabled={selectedRows.length === 0}
        >
          <span className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]">
            Dừng tín hiệu
          </span>
        </Button>
        <Button
          className="bg-gradient-to-b from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] h-[4.8rem] px-[1.6rem] rounded-[1.6rem] min-w-[21.1rem] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)]"
          onPress={handleApplySignal}
          isDisabled={selectedRows.length === 0}
        >
          <span className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]">
            Áp dụng tín hiệu
          </span>
        </Button>
      </div>

      {/* Modals */}
      <StopSignalWarningModal
        isOpen={isStopSignalWarningOpen}
        onClose={() => setIsStopSignalWarningOpen(false)}
        onConfirm={handleStopSignalConfirm}
      />
      <StopSignalModal
        isOpen={isStopSignalOpen}
        onClose={() => setIsStopSignalOpen(false)}
        onConfirm={handleStopSignalConfirm}
      />
      <DeleteConfirmModal
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default AutoSignalWatchlist;
