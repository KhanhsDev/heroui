'use client';
import React, { useRef } from 'react';
import { ColDef } from 'ag-grid-community';
import DataGrid, { DataGridHandle } from '@/components/DataGrid';
import SellCellRenderer from '@/components/TopPerformingStocks/SellCellRenderer';
import SearchIcon from '@/assets/svg/SearchIcon';
import './style.scss';

const SellSignals = () => {
  const gridRef = useRef<DataGridHandle | null>(null);

  const querying = useRef(false);
  const hasMore = useRef(false);
  const fetchCount = 30;
  const lastRow = useRef<any | null>(null);

  const columnDefs = useRef<Array<ColDef<any>>>([
    {
      headerName: 'Mã',
      field: 'symbol',
      flex: 1,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
    },
    {
      headerName: 'Tín hiệu',
      field: 'signal',
      flex: 1,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
    },
    {
      headerName: 'Giá bán',
      field: 'sellPrice',
      flex: 1,
      headerClass: 'header text-left',
      cellClass: 'cell-custom',
      cellRenderer: SellCellRenderer,
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
        const rowData: any[] = [
          {
            symbol: 'AAA',
            signal: 'Bán',
            sellRange: '45.8-46.3',
            sellTime: '17:00 02/20/2025',
          },
          {
            symbol: 'BBB',
            signal: 'Bán',
            sellRange: '55.5-56.8',
            sellTime: '16:30 02/20/2025',
          },
          {
            symbol: 'CCC',
            signal: 'Bán',
            sellRange: '73.0-73.8',
            sellTime: '15:45 02/20/2025',
          },
          {
            symbol: 'DDD',
            signal: 'Bán',
            sellRange: '63.8-64.5',
            sellTime: '14:20 02/20/2025',
          },
          {
            symbol: 'EEE',
            signal: 'Bán',
            sellRange: '39.2-39.8',
            sellTime: '13:00 02/20/2025',
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
        console.log('error', error);
      } finally {
        querying.current = false;
        gridRef.current?.hideOverlay();
      }
    }
  };

  const refreshData = () => {
    gridRef.current?.api?.setGridOption('rowData', []);
    lastRow.current = null;
    hasMore.current = false;
    querying.current = false;
    requestData();
  };

  return (
    <div className="w-full h-full flex flex-col bg-[var(--bg-primary)] rounded-[0.8rem] overflow-hidden p-[1.6rem]">
      {/* Header with Title and Search */}
      <div className="flex items-center justify-between pb-[1.6rem]">
        <h2 className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
          Bán
        </h2>

        <div className="relative">
          <div className="flex items-center gap-[1rem] bg-gradient-to-r from-[#111313] from-[-17.67%] via-[#222622] via-[44.55%] to-[#111313] to-[125.21%] border border-[var(--border-primary)] rounded-[1.6rem] px-[1.2rem] py-[1rem] w-[26.8rem] h-[4.4rem]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Tìm kiếm mã..."
              className="flex-1 bg-transparent text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)] placeholder:text-[var(--text-primary)] outline-none border-none"
            />
          </div>
        </div>
      </div>

      {/* DataGrid */}
      <div className="flex-1">
        <DataGrid
          className="sell-signals-grid"
          ref={gridRef}
          defaultColDef={{
            sortable: false,
            suppressMovable: true,
          }}
          headerHeight={53}
          rowHeight={81}
          onGridReady={() => requestData()}
          onScrollToBottom={() => requestData(true)}
          columnDefs={columnDefs.current}
        />
      </div>
    </div>
  );
};

export default SellSignals;
