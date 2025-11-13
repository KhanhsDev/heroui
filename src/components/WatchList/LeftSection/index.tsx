'use client';
import React, { useState } from 'react';
import { Select, SelectItem } from '@heroui/select';
import ChevronDownIcon from '@/assets/svg/ChevronDownIcon';
import StockBoard from './StockBoard';
import BuySignals from './BuySignals';
import SellSignals from './SellSignals';
import SearchSymbol from './SearchSymbol';

const LeftSection = () => {
  const [selectedMenu, setSelectedMenu] = useState('my-portfolio');
  const [activeTab, setActiveTab] = useState('watch-list');

  const menuOptions = [
    { key: 'my-portfolio', label: 'Danh mục của tôi' },
    { key: 'favorite-stocks', label: 'Cổ phiếu yêu thích' },
    { key: 'top-stocks', label: 'Top cổ phiếu' },
  ];

  const gradientBg =
    'bg-[linear-gradient(90deg,#111313_-17.67%,#222622_44.55%,#111313_125.21%)]';

  return (
    <div className="flex flex-col gap-[1.2rem] pr-[1.6rem]">
      <div className="flex flex-row gap-[2rem] items-center">
        <div className="w-[46rem] flex items-center gap-[1.2rem] px-[0.8rem] py-[0.8rem] bg-[var(--bg-primary)] rounded-[1.2rem]">
          {/* Dropdown Menu */}
          <Select
            selectedKeys={[selectedMenu]}
            onChange={e => {
              setSelectedMenu(e.target.value);
              setActiveTab('watch-list');
            }}
            classNames={{
              trigger: `cursor-pointer bg-transparent ${activeTab === 'my-portfolio' ? gradientBg : ''} rounded-[1.2rem] h-[3.6rem] min-h-[3.6rem] px-[1.2rem] py-[1rem] gap-[1rem]`,
              value: `text-[1.5rem] font-[600] leading-[1.4] ${activeTab === 'my-portfolio' ? 'text-[var(--text-primary)]' : 'text-[var(--text-quaternary)]'}`,
              listboxWrapper: gradientBg,
              popoverContent: `${gradientBg} rounded-[1.2rem]`,
              innerWrapper: 'gap-[1rem]',
            }}
            selectorIcon={<ChevronDownIcon />}
            aria-label="Chọn danh mục"
          >
            {menuOptions.map(option => (
              <SelectItem
                key={option.key}
                classNames={{
                  base: 'text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)] h-[4rem] min-h-[4rem] py-[1rem] px-[1.2rem]',
                  title:
                    'text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)]',
                }}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>

          {/* Tab: Tín hiệu mua */}
          <button
            onClick={() => setActiveTab('buy-signal')}
            className={`flex items-center cursor-pointer h-[3.6rem] px-[1.2rem] py-[1rem] rounded-[1.2rem] text-[1.5rem] font-[500] leading-[1.4] whitespace-nowrap text-center ${
              activeTab === 'buy-signal'
                ? `${gradientBg} text-[var(--text-primary)]`
                : 'text-[var(--text-quaternary)]'
            }`}
          >
            Tín hiệu mua
          </button>

          {/* Tab: Tín hiệu bán */}
          <button
            onClick={() => setActiveTab('sell-signal')}
            className={`flex items-center cursor-pointer h-[3.6rem] px-[1.2rem] py-[1rem] rounded-[1.2rem] text-[1.5rem] font-[500] leading-[1.4] whitespace-nowrap text-center ${
              activeTab === 'sell-signal'
                ? `${gradientBg} text-[var(--text-primary)]`
                : 'text-[var(--text-quaternary)]'
            }`}
          >
            Tín hiệu bán
          </button>
        </div>
        {activeTab === 'watch-list' && (
          <SearchSymbol
            onStockSelect={stock => console.log('Selected stock:', stock)}
          />
        )}
      </div>

      {/* Content based on active tab */}
      <div className="w-full flex-1">
        {activeTab === 'watch-list' && <StockBoard />}
        {activeTab === 'buy-signal' && <BuySignals />}
        {activeTab === 'sell-signal' && <SellSignals />}
      </div>
    </div>
  );
};

export default LeftSection;
