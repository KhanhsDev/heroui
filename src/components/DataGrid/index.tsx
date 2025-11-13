"use client";
import React, {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { AgGridReact, AgGridReactProps } from "ag-grid-react"; // React Grid Logic
import {
  BodyScrollEvent,
  GridApi,
  GridReadyEvent,
  ViewportChangedEvent,
} from "ag-grid-community";
import clsx from "clsx";
import NoRowsOverlay from "./NoRowsOverlay";
import { getGridRowSize } from "@/utils/common";
import Preload from "../Preload";
import "./style.scss";

interface DataGridProps extends AgGridReactProps {
  loading?: boolean;
  color?: "dark";
  onScrollToBottom?: () => void;
  scrollOffset?: number;
  loadMoreThreshold?: number;
}

export interface DataGridHandle {
  api?: GridApi;
  hideOverlay(): void;
  showLoadingOverlay(): void;
}

const DataGrid = forwardRef(
  (
    props: DataGridProps,
    ref:
      | ((instance: DataGridHandle) => void)
      | React.MutableRefObject<DataGridHandle | null | undefined>
      | Ref<DataGridHandle | null | undefined>
      | null
  ) => {
    const {
      defaultColDef,
      onGridReady,
      onScrollToBottom,
      loadMoreThreshold = 0,
      scrollOffset = 0.95,
      ...rest
    } = props;
    const [gridInit, setGridInit] = useState<boolean>(false);
    const loadingRef = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const dataGridRef = useRef<{
      api?: GridApi;
      loading: boolean;
    }>({
      loading: false,
    });

    const handleGridReady = (event: GridReadyEvent) => {
      dataGridRef.current.api = event.api;
      setGridInit(true);

      setTimeout(() => {
        onGridReady?.(event);
      }, 100);
    };

    const hideOverlay = () => {
      if (dataGridRef.current.api) {
        dataGridRef.current.api.hideOverlay();
        dataGridRef.current.api.setGridOption("loading", false);
        dataGridRef.current.loading = false;
        loadingRef.current = false;
      }
    };

    const showLoadingOverlay = () => {
      if (dataGridRef.current.api) {
        dataGridRef.current.api.setGridOption("loading", true);
        dataGridRef.current.loading = true;
      }
    };

    const onBodyScroll = async (event: BodyScrollEvent) => {
      if (event.direction === "vertical") {
        if (dataGridRef.current.api) {
          const lastDisplayedRow =
            dataGridRef.current.api.getLastDisplayedRowIndex() + 1;
          const totalRows = dataGridRef.current.api.getDisplayedRowCount();

          if (
            lastDisplayedRow / (totalRows - loadMoreThreshold) >
            scrollOffset
          ) {
            if (
              onScrollToBottom &&
              !dataGridRef.current.loading &&
              !loadingRef.current
            ) {
              loadingRef.current = true;
              console.log("onScrollToBottom");
              onScrollToBottom();
            }
          }
        }
      }
    };

    const onViewportChanged = (event: ViewportChangedEvent) => {
      if (containerRef.current && event.lastRow !== -1) {
        const agBodyViewport: HTMLElement = containerRef.current.querySelector(
          ".ag-body-viewport"
        ) as HTMLElement;
        if (agBodyViewport) {
          if (agBodyViewport.scrollHeight <= agBodyViewport.clientHeight) {
            if (
              onScrollToBottom &&
              !dataGridRef.current.loading &&
              !loadingRef.current
            ) {
              console.log("onViewportChanged onScrollToBottom");
              onScrollToBottom();
              loadingRef.current = true;
            }
          }
        }
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        api: dataGridRef.current.api,
        hideOverlay,
        showLoadingOverlay,
      }),
      [gridInit]
    );

    useEffect(() => {
      if (gridInit) {
        if (props.loading) {
          dataGridRef.current.api?.showLoadingOverlay();
        } else {
          dataGridRef.current.api?.hideOverlay();
        }
      }
    }, [props.loading]);

    const sizeGrid = getGridRowSize();

    return (
      <div
        ref={containerRef}
        className={clsx("ag-theme-quartz h-full data-grid", props.color)}
      >
        <AgGridReact
          onGridReady={handleGridReady}
          onBodyScroll={onBodyScroll}
          onViewportChanged={onViewportChanged}
          defaultColDef={{
            resizable: false,
            minWidth: 60,
            ...defaultColDef,
            headerValueGetter: (params) => {
              return params.colDef.headerName ? params.colDef.headerName : "";
            },
          }}
          suppressDragLeaveHidesColumns
          suppressCellFocus
          headerHeight={sizeGrid.headerHeight}
          rowHeight={sizeGrid.rowHeight}
          noRowsOverlayComponent={NoRowsOverlay}
          loadingOverlayComponent={Preload}
          maintainColumnOrder={true}
          loadingOverlayComponentParams={{
            size: "md",
          }}
          {...rest}
        />
      </div>
    );
  }
);

DataGrid.displayName = "DataGrid";

export default DataGrid;
