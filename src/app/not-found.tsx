"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[var(--bg-primary)] px-[2.4rem]">
      {/* Logo */}
      <div className="mb-[4.8rem] flex items-center gap-[0.9rem]">
        <div className="relative h-[5.2rem] w-[5.2rem] flex-shrink-0">
          <Image
            alt="WiseTrade Logo"
            className="object-contain"
            fill
            priority
            src="/assets/png/logo-wisetrade.png"
          />
        </div>
        <p className="text-[2.34rem] font-[600] leading-[1.222]">
          <span className="text-[#55b657]">WISE</span>
          <span className="text-[var(--text-primary)]">TRADE</span>
        </p>
      </div>

      {/* 404 Content */}
      <div className="flex flex-col items-center gap-[2.4rem] text-center">
        {/* 404 Number */}
        <h1 className="text-[12rem] font-[700] leading-[1] text-[var(--text-primary)]">
          404
        </h1>

        {/* Error Message */}
        <div className="flex flex-col gap-[0.8rem]">
          <h2 className="text-[3.2rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
            Trang không tồn tại
          </h2>
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-tertiary)]">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-[2.4rem] flex items-center gap-[1.6rem]">
          <Button
            as={Link}
            className="h-[4.8rem] rounded-[1.6rem] bg-gradient-to-b from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] px-[2.4rem] py-[1.2rem] text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]"
            href="/home"
          >
            Về trang chủ
          </Button>

          <Button
            as={Link}
            className="h-[4.8rem] rounded-[1.6rem] border-[0.1rem] border-[var(--border-secondary)] bg-transparent px-[2.4rem] py-[1.2rem] text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]"
            href="javascript:history.back()"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            Quay lại
          </Button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] opacity-5 blur-[10rem]" />
      </div>
    </div>
  );
}
