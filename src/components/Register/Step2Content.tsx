import { useState } from "react";
import { Link } from "@heroui/link";
import OtpInput from "./OtpInput";
import { ChevronLeftIcon, LockIcon } from "../icons";
import { Button } from "@heroui/button";

interface Step2ContentProps {
  onNext: () => void;
}

export default function Step2Content({ onNext }: Step2ContentProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOtpChange = (index: number, value: string) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (index < 5) {
        setActiveIndex(index + 1);
      }
    }
  };

  const handleSubmit = () => {
    // TODO: Add OTP validation and API call
    console.log("OTP:", otp.join(""));
    // Proceed to next step after successful validation
    onNext();
  };

  const handleResend = () => {
    // TODO: Add resend OTP API call
    setOtp(["", "", "", "", "", ""]);
    setActiveIndex(0);
  };

  return (
    <div className="flex flex-col">
      {/* Success Icon */}
      <div className="flex justify-center mb-[1.6rem]">
        <div className="relative size-[6.4rem] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7DF5AA66] to-[#31BD6500] opacity-40" />
          <div className="size-[3.4rem] flex items-center justify-center z-10">
            <LockIcon />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-[0.8rem] items-center mb-[4.8rem]">
        <h1 className="text-[2.4rem] text-[var(--text-primary)] text-center">
          Nhập mã OTP
        </h1>
        <p className="text-[1.6rem] text-[var(--text-tertiary)] text-center">
          Chúng tôi đã gửi mã xác nhận qua số điện thoại 096***9649. Vui lòng
          nhập mã vào ô bên dưới.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex gap-[1.7rem] justify-center mb-[4.8rem]">
        {otp.map((digit, index) => (
          <OtpInput
            key={index}
            value={digit}
            isActive={index === activeIndex}
            onChange={(value) => handleOtpChange(index, value)}
            onFocus={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        variant="flat"
        className="w-full h-[5.6rem] rounded-[1.6rem] bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] mb-[2.4rem] hover:opacity-90 transition-opacity"
      >
        <span className="text-[1.8rem] text-[var(--text-primary)]">
          Đăng ký
        </span>
      </Button>

      {/* Resend */}
      <div className="flex items-center gap-[0.8rem] justify-center mb-[4.8rem]">
        <p className="text-[1.8rem] text-[var(--text-tertiary)]">
          Không nhận được OTP?
        </p>
        <Button
          onClick={handleResend}
          variant="flat"
          className="px-[1.2rem] py-[1rem] rounded-[1.2rem] bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card)] via-[var(--bg-tertiary)] hover:opacity-80 transition-opacity"
        >
          <span className="text-[1.6rem] text-[var(--text-primary)] underline">
            Gửi lại
          </span>
        </Button>
      </div>

      {/* Back to Login */}
      <Link
        href="/login"
        className="flex items-center gap-[1.6rem] justify-center hover:opacity-80 transition-opacity cursor-pointer"
      >
        <div className="flex items-center justify-center size-[4rem] rounded-[1.6rem] bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-tertiary)] to-[var(--bg-primary)]">
          <ChevronLeftIcon />
        </div>
        <p className="text-[1.8rem] text-[var(--text-primary)]">
          Quay trở lại màn đăng nhập
        </p>
      </Link>
    </div>
  );
}
