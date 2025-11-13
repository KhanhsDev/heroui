"use client";

import EmptyLinkedAccountBgIcon from "@/svg/EmptyLinkedAccountBgIcon";
import EmptyLinkedAccountIcon from "@/svg/EmptyLinkedAccountIcon";

interface EmptyLinkedAccountProps {
  onAddAccount?: () => void;
}

export default function EmptyLinkedAccount({
  onAddAccount,
}: EmptyLinkedAccountProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative size-[12.3rem] mb-[2rem] mt-[-2rem]">
        {/* Background gradient circle */}
        <div className="absolute inset-0">
          <EmptyLinkedAccountBgIcon />
        </div>
        {/* Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <EmptyLinkedAccountIcon />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-[1.2rem] items-center text-center mb-[4rem]">
        <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)] w-full">
          Bạn chưa có tài khoản liên kết.
        </p>
        <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-tertiary)] w-[35.7rem]">
          Hãy thêm tài khoản chứng khoán để có thể <br /> sử dụng chức năng này.
        </p>
      </div>

      {/* Add account button */}
      <button
        onClick={onAddAccount}
        className="cursor-pointer w-[25.7rem] h-[4.8rem] rounded-[1.6rem] bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] flex items-center justify-center shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] hover:opacity-90 active:opacity-80 transition-opacity"
      >
        <span className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]">
          Thêm tài khoản
        </span>
      </button>
    </div>
  );
}
