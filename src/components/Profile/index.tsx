'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhoneIcon from '@/assets/svg/PhoneIcon';
import MailIcon from '@/assets/svg/MailIcon';
import LogOutIcon from '@/assets/svg/LogOutIcon';
import ShoppingCart from '@/assets/svg/ShoppingCart';
import { formatNumber } from '@/utils/common';
type Props = {
  onLogout?: () => void;
};

export default function Profile({ onLogout }: Props) {
  // TODO: Sẽ lấy từ API hoặc store sau
  const [userName] = useState('Bùi Văn Khánh');
  const [userPlan] = useState('Tiêu chuẩn');
  const [userPhone] = useState('0392672182');
  const [userEmail] = useState('buivankhanh2k4@gmail.com');
  const [avatarUrl] = useState('/assets/png/profile-avatar.png');

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    // TODO: Xử lý đăng xuất
    console.log('Logout clicked');
  };

  return (
    <div className="bg-[var(--bg-secondary)] rounded-[0.8rem] overflow-hidden w-full h-full relative">
      {/* User Avatar & Name Section */}
      <div className="absolute top-[1.2rem] left-1/2 -translate-x-1/2 w-[28rem] h-[15.2rem]">
        <div className="flex flex-col gap-[0.7rem] items-center justify-center h-full border-b border-dashed border-[var(--border-secondary)]">
          {/* Avatar */}
          <div className="relative rounded-[4.9rem] size-[5.6rem] overflow-hidden">
            <Image
              src={avatarUrl}
              alt={userName}
              fill
              className="object-cover"
            />
          </div>

          {/* Name & Plan Badge */}
          <div className="flex flex-col gap-[0.4rem] items-center justify-center w-full">
            <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)] whitespace-nowrap">
              {userName}
            </p>
            <div className="bg-[var(--bg-success-alpha)] border border-[var(--border-success-alpha)] rounded-[0.8rem] px-0 py-[0.2rem] h-[2.3rem] w-[8.6rem] flex items-center justify-center">
              <p className="text-[1.3rem] font-[400] leading-[1.3] text-[var(--bg-success)] whitespace-nowrap">
                {userPlan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Section */}
      <p className="absolute left-[2rem] top-[18rem] text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)] whitespace-nowrap">
        Thông tin cá nhân
      </p>

      <div className="absolute left-[2rem] top-[21.8rem] flex flex-col items-start justify-center w-full">
        {/* Phone */}
        <div className="flex gap-[0.8rem] h-[4.8rem] items-center px-0 py-[0.8rem] rounded-[1.2rem] w-[16.2rem]">
          <div className="bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)] flex items-center justify-center rounded-[1.6rem] size-[4rem]">
            <PhoneIcon />
          </div>
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)] whitespace-nowrap">
            {userPhone}
          </p>
        </div>

        {/* Email */}
        <div className="flex gap-[0.8rem] h-[4.8rem] items-center px-0 py-[0.8rem] rounded-[1.2rem] w-[22.4rem]">
          <div className="bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)] flex items-center justify-center rounded-[1.6rem] size-[4rem]">
            <MailIcon />
          </div>
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)] whitespace-nowrap">
            {userEmail}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute left-[2rem] bottom-[2rem] bg-[var(--bg-danger-alpha)] flex gap-[0.8rem] h-[4.7rem] items-center px-[0.8rem] py-[1rem] rounded-[0.8rem] w-[28rem] cursor-pointer"
      >
        <LogOutIcon />
        <p className="text-[2rem] font-[500] leading-[1.2] text-[var(--text-danger)] whitespace-nowrap">
          Đăng xuất
        </p>
      </button>
    </div>
  );
}
