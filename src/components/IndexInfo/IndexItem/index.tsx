'use client';

import { useState } from 'react';
import MinuteChart from '@/components/MinuteChart';
import ChevronDownIcon from '@/assets/svg/ChevronDownIcon';
import ArrowUpLargeIcon from '@/assets/svg/ArrowUpLargeIcon';
import ArrowDownLargeIcon from '@/assets/svg/ArrowDownLargeIcon';

export default function IndexItem() {
  // TODO: Sẽ lấy từ API sau
  const [indexName] = useState('VN-INDEX');
  const [indexValue] = useState('1224.64');
  const [indexChange] = useState('0.51');
  const [indexChangePercent] = useState('0.12');
  const [totalValue] = useState('309.32tr');
  const [totalVolume] = useState('239,024,235');
  const [upCount] = useState('32');
  const [upCountChange] = useState('7');
  const [ceilCount] = useState('80');
  const [downCount] = useState('34');
  const [downCountChange] = useState('6');
  const [sessionType] = useState('Phiên ATC');

  const isPositive = parseFloat(indexChange) >= 0;

  return (
    <div className="bg-[var(--bg-primary)] w-[31rem] h-[16.5rem] rounded-[0.8rem] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)] p-[1.2rem] flex flex-col gap-[1.2rem]">
      {/* MinuteChart Section */}
      <div className="flex flex-col gap-[0.6rem]">
        {/* <div className="h-[4.957rem]">
                    <MinuteChart symbol={indexName} inPro={false} />
                </div> */}

        {/* Time Labels */}
        <div className="flex items-center justify-between text-[1rem] font-[400] leading-[1.4] text-[var(--text-tertiary)]">
          <span>9h</span>
          <span>10h</span>
          <span>11h</span>
          <span>12h</span>
          <span>13h</span>
          <span>14h</span>
          <span>15h</span>
        </div>
      </div>

      {/* Index Info Row */}
      <div className="flex items-center justify-between">
        {/* Index Name & Dropdown */}
        <div className="flex items-center gap-[0.4rem]">
          <span className="text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)]">
            {indexName}
          </span>
          <div className="w-[1.6rem] h-[1.6rem] text-[var(--text-primary)]">
            <ChevronDownIcon />
          </div>
        </div>

        {/* Index Change */}
        <div className="flex items-center">
          <div
            className={
              isPositive ? 'text-[var(--index-up)]' : 'text-[var(--index-down)]'
            }
          >
            {isPositive ? <ArrowUpLargeIcon /> : <ArrowDownLargeIcon />}
          </div>
          <span
            className={`text-[1.5rem] font-[400] leading-[1.4] ${isPositive ? 'text-[var(--index-up)]' : 'text-[var(--index-down)]'}`}
          >
            <span className="font-[600]">{indexValue} </span>
            <span>
              ({indexChange} {indexChangePercent}%)
            </span>
          </span>
        </div>
      </div>

      {/* Value & Volume Row */}
      <div className="flex items-center justify-between">
        {/* Main Value */}
        <div className="flex items-center gap-[0.4rem]">
          <span className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
            {totalValue}
          </span>
          <span className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-tertiary)]">
            CP
          </span>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-[0.4rem]">
          <span className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
            {totalVolume}
          </span>
          <span className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-tertiary)]">
            Tỷ
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between">
        {/* Up Count */}
        <div className="flex items-center gap-[0.4rem]">
          <div className="text-[var(--index-up)]">
            <ArrowUpLargeIcon />
          </div>
          <span className="text-[1.4rem] font-[500] leading-[1.4] text-[var(--index-up)]">
            {upCount}
            <span className="font-[400] leading-[1.3]">({upCountChange})</span>
          </span>
        </div>

        {/* Ceil Count */}
        <div className="flex items-center">
          <div className="w-[1.6rem] h-[1.6rem] flex items-center justify-center">
            <div className="w-[0.8rem] h-[0.8rem] bg-[var(--index-ceiling)] rounded-[0.4rem]" />
          </div>
          <span className="text-[1.4rem] font-[500] leading-[1.4] text-[var(--index-ceiling)]">
            {' '}
            {ceilCount}
          </span>
        </div>

        {/* Down Count */}
        <div className="flex items-center gap-[0.4rem]">
          <div className="text-[var(--index-down)]">
            <ArrowDownLargeIcon />
          </div>
          <span className="text-[1.4rem] font-[500] leading-[1.4] text-[var(--index-down)]">
            {downCount}
            <span className="font-[400] leading-[1.3]">
              ({downCountChange})
            </span>
          </span>
        </div>

        {/* Session Type */}
        <span className="text-[1.4rem] font-[500] leading-[1.4] text-[var(--text-primary)]">
          {sessionType}
        </span>
      </div>
    </div>
  );
}
