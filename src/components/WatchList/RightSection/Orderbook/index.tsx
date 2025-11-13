'use client';
import React, { useRef, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { Select, SelectItem } from '@heroui/select';
import { Input } from '@heroui/input';
import DataGrid, { DataGridHandle } from '@/components/DataGrid';
import StatusCellRenderer from './CellRender/StatusCellRenderer';
import ActionsCellRenderer from './CellRender/ActionsCellRenderer';
import OrderTypeCellRenderer from './CellRender/OrderTypeCellRenderer';
import CancelAllHeaderRenderer from './CellRender/CancelAllHeaderRenderer';
import SearchIcon from '@/assets/svg/SearchIcon';
import './style.scss';

const OrderBook = () => {
  const gridRef = useRef<DataGridHandle | null>(null);
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const querying = useRef(false);
  const hasMore = useRef(false);
  const fetchCount = 30;
  const lastRow = useRef<any | null>(null);

  const orderTypeOptions = [
    { key: 'all', label: 'Tất cả' },
    { key: 'buy', label: 'Mua' },
    { key: 'sell', label: 'Bán' },
  ];

  const statusOptions = [
    { key: 'all', label: 'Tất cả' },
    { key: 'matched', label: 'Khớp toàn bộ' },
    { key: 'partial', label: 'Khớp một phần' },
    { key: 'pending', label: 'Chờ khớp' },
    { key: 'cancelled', label: 'Đã huỷ' },
  ];

  const columnDefs = useRef<Array<ColDef<any>>>([
    {
      headerName: 'Mã CK',
      field: 'symbol',
      flex: 1,
      minWidth: 115,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
      pinned: 'left',
    },
    {
      headerName: 'Loại lệnh',
      field: 'orderType',
      flex: 1,
      minWidth: 105,
      headerClass: 'header text-center',
      cellClass: 'cell-custom',
      cellRenderer: OrderTypeCellRenderer,
    },
    {
      headerName: 'Cài đặt',
      field: 'price',
      flex: 1,
      minWidth: 135,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
      valueFormatter: params => {
        if (params.value == null) return '';
        return params.value.toLocaleString('vi-VN');
      },
    },
    {
      headerName: 'Khối lượng đặt',
      field: 'volume',
      flex: 1,
      minWidth: 150,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
      valueFormatter: params => {
        if (params.value == null) return '';
        return params.value.toLocaleString('vi-VN');
      },
    },
    {
      headerName: 'Trạng thái',
      field: 'status',
      flex: 1,
      minWidth: 165,
      headerClass: 'header text-center',
      cellClass: 'cell-custom',
      cellRenderer: StatusCellRenderer,
    },
    {
      headerName: 'Thời gian đặt',
      field: 'orderTime',
      flex: 1,
      minWidth: 150,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
    },
    {
      headerName: 'Thời gian khớp',
      field: 'matchTime',
      flex: 1,
      minWidth: 150,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
    },
    {
      headerName: 'Khối lượng khớp',
      field: 'matchedVolume',
      flex: 1,
      minWidth: 150,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
      valueFormatter: params => {
        if (params.value == null) return '';
        return params.value.toLocaleString('vi-VN');
      },
    },
    {
      headerName: 'Giá khớp TB',
      field: 'avgPrice',
      flex: 1,
      minWidth: 140,
      headerClass: 'header text-left',
      cellClass: 'cell text-left',
      valueFormatter: params => {
        if (params.value == null) return '';
        return params.value.toLocaleString('vi-VN');
      },
    },
    {
      headerName: '',
      field: 'actions',
      minWidth: 120,
      maxWidth: 120,
      pinned: 'right',
      headerComponent: CancelAllHeaderRenderer,
      headerClass: 'header text-center',
      cellClass: 'cell-custom',
      cellRenderer: ActionsCellRenderer,
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

        // Fake data - Sample orderbook data
        const rowData: any[] = [
          {
            symbol: 'AAA',
            orderType: 'buy',
            price: 8000,
            volume: 100000,
            status: 'matched',
            orderTime: '13:27:43',
            matchTime: '13:27:43',
            matchedVolume: 100000,
            avgPrice: 8000,
          },
          {
            symbol: 'BBB',
            orderType: 'sell',
            price: 15500,
            volume: 50000,
            status: 'partial',
            orderTime: '13:25:12',
            matchTime: '13:25:15',
            matchedVolume: 25000,
            avgPrice: 15500,
          },
          {
            symbol: 'CCC',
            orderType: 'buy',
            price: 22000,
            volume: 75000,
            status: 'matched',
            orderTime: '13:20:30',
            matchTime: '13:20:30',
            matchedVolume: 75000,
            avgPrice: 22000,
          },
          {
            symbol: 'DDD',
            orderType: 'buy',
            price: 35000,
            volume: 120000,
            status: 'pending',
            orderTime: '13:18:45',
            matchTime: '',
            matchedVolume: 0,
            avgPrice: 0,
          },
          {
            symbol: 'EEE',
            orderType: 'sell',
            price: 12500,
            volume: 80000,
            status: 'cancelled',
            orderTime: '13:15:20',
            matchTime: '',
            matchedVolume: 0,
            avgPrice: 0,
          },
          {
            symbol: 'FFF',
            orderType: 'buy',
            price: 18000,
            volume: 95000,
            status: 'matched',
            orderTime: '13:10:55',
            matchTime: '13:10:55',
            matchedVolume: 95000,
            avgPrice: 18000,
          },
          {
            symbol: 'GGG',
            orderType: 'sell',
            price: 42000,
            volume: 60000,
            status: 'matched',
            orderTime: '13:08:30',
            matchTime: '13:08:30',
            matchedVolume: 60000,
            avgPrice: 42000,
          },
          {
            symbol: 'HHH',
            orderType: 'buy',
            price: 9500,
            volume: 110000,
            status: 'partial',
            orderTime: '13:05:15',
            matchTime: '13:05:18',
            matchedVolume: 55000,
            avgPrice: 9500,
          },
          {
            symbol: 'III',
            orderType: 'buy',
            price: 28000,
            volume: 85000,
            status: 'matched',
            orderTime: '13:02:40',
            matchTime: '13:02:40',
            matchedVolume: 85000,
            avgPrice: 28000,
          },
          {
            symbol: 'JJJ',
            orderType: 'sell',
            price: 16500,
            volume: 70000,
            status: 'pending',
            orderTime: '13:00:10',
            matchTime: '',
            matchedVolume: 0,
            avgPrice: 0,
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
    <div className="w-full h-full flex flex-col">
      {/* Search Bar */}
      <div className="pb-[1.6rem]">
        <Input
          placeholder="Tìm kiếm mã CK"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          startContent={<SearchIcon />}
          classNames={{
            base: 'w-full',
            mainWrapper: 'w-full',
            inputWrapper:
              'bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[1.2rem] h-[4.8rem] px-[1.2rem] py-[1rem]',
            input:
              'text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]',
          }}
        />
      </div>

      {/* Filters */}
      <div className="pb-[2.4rem] flex gap-[2.4rem]">
        <div className="flex-1 flex flex-col gap-[1.2rem]">
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
            Loại lệnh
          </p>
          <Select
            selectedKeys={[orderTypeFilter]}
            onChange={e => setOrderTypeFilter(e.target.value)}
            classNames={{
              trigger:
                'bg-transparent border border-[var(--border-secondary)] rounded-[1.2rem] h-[4.8rem] px-[1.6rem] py-[1.6rem]',
              value:
                'text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-secondary)]',
              listboxWrapper: 'bg-[var(--bg-secondary)]',
              popoverContent:
                'bg-[var(--bg-secondary)] rounded-[1.2rem] border border-[var(--border-secondary)]',
            }}
            aria-label="Chọn loại lệnh"
          >
            {orderTypeOptions.map(option => (
              <SelectItem
                key={option.key}
                classNames={{
                  base: 'text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-primary)]',
                  title:
                    'text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-primary)]',
                }}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex-1 flex flex-col gap-[1.2rem]">
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
            Trạng thái
          </p>
          <Select
            selectedKeys={[statusFilter]}
            onChange={e => setStatusFilter(e.target.value)}
            classNames={{
              trigger:
                'bg-transparent border border-[var(--border-secondary)] rounded-[1.2rem] h-[4.8rem] px-[1.6rem] py-[1.6rem]',
              value:
                'text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-secondary)]',
              listboxWrapper: 'bg-[var(--bg-secondary)]',
              popoverContent:
                'bg-[var(--bg-secondary)] rounded-[1.2rem] border border-[var(--border-secondary)]',
            }}
            aria-label="Chọn trạng thái"
          >
            {statusOptions.map(option => (
              <SelectItem
                key={option.key}
                classNames={{
                  base: 'text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-primary)]',
                  title:
                    'text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-primary)]',
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
          className="orderbook-grid"
          ref={gridRef}
          defaultColDef={{
            sortable: false,
            suppressMovable: true,
            // resizable: true,
          }}
          headerHeight={53}
          rowHeight={44}
          onGridReady={() => requestData()}
          onScrollToBottom={() => requestData(true)}
          columnDefs={columnDefs.current}
        />
      </div>
    </div>
  );
};

export default OrderBook;
