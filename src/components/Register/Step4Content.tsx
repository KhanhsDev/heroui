import { MailIconLarge } from "../icons";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function Step4Content() {
  const router = useRouter();

  const handleVerify = () => {
    // TODO: Add email verification API call
    console.log("Email verification requested");
  };

  const handleSkip = () => {
    // TODO: Add skip logic
    console.log("Email verification skipped");
  };

  return (
    <div className="flex flex-col">
      {/* Email Icon */}
      <div className="flex justify-center mb-[1.6rem]">
        <div className="relative size-[6.4rem] flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#7DF5AA66] to-[#31BD6500] opacity-40" />
          <div className="size-[3.4rem] flex items-center justify-center z-10">
            <MailIconLarge />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex flex-col items-center mb-[4rem]">
        <h1 className="text-[2.4rem] text-[var(--text-primary)] text-center mb-[3rem]">
          Xác thực email
        </h1>
        <p className="text-[1.6rem] text-[var(--text-tertiary)] text-center leading-[1.4] w-[52.2rem]">
          Bạn có muốn nhận thông báo giao dịch qua email? Nếu có, vui lòng nhấn
          nút <span className="text-[var(--text-primary)]">Xác thực</span> và
          kiểm tra tài khoản email giangt***@gmail.com để tìm liên kết xác nhận.
          Nếu không muốn sử dụng tính năng này, bạn có thể chọn Bỏ qua
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-[1.6rem] items-center w-full">
        <Button
          onClick={handleSkip}
          variant="flat"
          className="bg-gradient-to-r from-[#111313] from-[17.671%] to-[#111313] to-[125.21%] via-[#222622] via-[44.546%] h-[5.6rem] rounded-[1.6rem] w-[27rem] hover:opacity-80 transition-opacity"
        >
          <span className="text-[1.8rem] text-[var(--text-primary)]">
            Bỏ qua
          </span>
        </Button>
        <Button
          onClick={handleVerify}
          variant="flat"
          className="bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] h-[5.6rem] rounded-[1.6rem] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] w-[27.2rem] hover:opacity-90 transition-opacity"
        >
          <span className="text-[1.8rem] text-[var(--text-primary)]">
            Xác thực
          </span>
        </Button>
      </div>
    </div>
  );
}
