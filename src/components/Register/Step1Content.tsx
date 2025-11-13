import { useState } from "react";
import InputField from "./InputField";
import { MailIcon, PhoneIcon, UserIcon } from "../icons";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/button";

interface Step1ContentProps {
  onNext: () => void;
}

export default function Step1Content({ onNext }: Step1ContentProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    // TODO: Add validation
    onNext();
  };

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="flex flex-col gap-[0.8rem] mb-[4.8rem]">
        <h1 className="text-[2.4rem] text-[var(--text-primary)]">
          Đăng ký tài khoản
        </h1>
        <div className="flex items-center gap-[1.3rem]">
          <p className="text-[1.8rem] text-[var(--text-tertiary)]">
            Bạn đã có tài khoản?
          </p>
          <Button
            onClick={() => router.push("/login")}
            variant="flat"
            className="px-[1.2rem] py-[1rem] rounded-[1.2rem] bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card)] via-[var(--bg-tertiary)] h-fit"
          >
            <span className="text-[1.6rem] text-[var(--text-primary)] underline">
              Đăng nhập
            </span>
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-[2.4rem] mb-[4.8rem]">
        <div className="flex flex-col gap-[1.2rem]">
          <label className="text-[1.8rem] text-[var(--text-primary)]">
            Họ và tên
          </label>
          <InputField
            icon={UserIcon}
            placeholder="Họ và tên"
            value={fullName}
            onChange={setFullName}
          />
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <label className="text-[1.8rem] text-[var(--text-primary)]">
            Số điện thoại
          </label>
          <InputField
            icon={PhoneIcon}
            placeholder="Số điện thoại"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div className="flex flex-col gap-[1.2rem]">
          <label className="text-[1.8rem] text-[var(--text-primary)]">
            Email
          </label>
          <InputField
            icon={MailIcon}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />
        </div>
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

      {/* Terms */}
      <p className="text-[1.5rem] text-[var(--text-tertiary)] text-center">
        Bằng cách nhấn nút đăng ký, tôi đồng ý với các điều khoản sử dụng và
        chính sách bảo mật.
      </p>
    </div>
  );
}
