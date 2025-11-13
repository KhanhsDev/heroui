"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import Extend from "@/svg/Extend";

type Props = {
  onRenewClick: () => void;
};

export default function UpdatePackage({ onRenewClick }: Props) {
  // TODO: Sẽ lấy từ API hoặc store sau
  const [planName] = useState("Gói tiêu chuẩn");
  const [expiryDate] = useState("13:02:24 23/09/2025");

  return (
    <div className="w-full h-[27rem] rounded-[1.6rem] overflow-hidden relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          alt="Background pattern"
          className="object-cover"
          fill
          src="/assets/png/subscription-bg.png"
        />
      </div>

      {/* Extend Icon */}
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full p-[2rem] flex flex-col">
        <div className="w-[5.9rem] h-[5.9rem]">
          <Extend />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[1.2rem] mt-[1.3rem]">
          <p className="text-[2rem] font-[700] leading-[1.2] text-[var(--text-primary)]">
            {planName}
          </p>
          <div className="mt-[1.2rem]">
            <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
              <span>Sẽ hết hạn vào </span>
              <span className="font-[500]">{expiryDate}</span>
            </p>
          </div>
        </div>

        {/* Renewal Button */}
        <Button
          onPress={onRenewClick}
          className="mt-[2.7rem] w-[24.6rem] h-[4.4rem] min-w-[24.6rem] rounded-[1.6rem] bg-gradient-to-b from-[#55b657] to-[#08ae77] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] p-0"
        >
          <p className="text-[1.6rem] font-[600] leading-[1.4] text-[#ede8e8]">
            Gia hạn ngay
          </p>
        </Button>
      </div>
    </div>
  );
}
