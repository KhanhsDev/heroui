import { useState } from "react";
import { ChevronLeftIcon, LockIcon } from "../icons";
import PasswordInputField from "./PasswordInputField";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/link";

interface Step3ContentProps {
  onNext: () => void;
}

export default function Step3Content({ onNext }: Step3ContentProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    // TODO: Add password validation
    onNext();
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-[1.6rem]">
        <div className="relative size-[6.4rem] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7DF5AA66] to-[#31BD6500] opacity-40" />
          <div className="size-[3.4rem] flex items-center justify-center z-10">
            <LockIcon />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center mb-[4.8rem]">
        <h1 className="text-[2.4rem] text-[var(--text-primary)] text-center">
          Nhập mật khẩu
        </h1>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[2.4rem] mb-[4.8rem]">
        <div className="flex flex-col gap-[1.2rem]">
          <label className="text-[1.8rem] text-[var(--text-primary)]">
            Mật khẩu
          </label>
          <PasswordInputField
            value={password}
            onChange={setPassword}
            placeholder="********"
          />
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <label className="text-[1.8rem] text-[var(--text-primary)]">
            Mật khẩu xác nhận
          </label>
          <PasswordInputField
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="********"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        variant="flat"
        className="w-full h-[5.6rem] rounded-[1.6rem] bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] mb-[4.8rem] hover:opacity-90 transition-opacity"
      >
        <span className="text-[1.8rem] text-[var(--text-primary)]">
          Đăng nhập
        </span>
      </Button>

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
