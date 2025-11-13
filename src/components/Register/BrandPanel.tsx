import Image from "next/image";

export default function BrandPanel() {
  return (
    <div className="relative w-full bg-[var(--bg-primary)] rounded-[1.6rem] overflow-hidden shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)]">
      <Image
        alt=""
        width={768}
        height={980}
        className="max-w-none w-full h-full object-contain"
        src={"/assets/png/brand-panel.png"}
      />

      <div className="absolute w-full top-[13rem] left-0 flex flex-col gap-[1.7rem] items-center">
        <p className="text-[2.4rem] text-[var(--text-primary)] whitespace-nowrap">
          Hãy bắt đầu ngay
        </p>

        {/* Subtitle */}
        <div className="text-[1.6rem] text-[var(--text-primary)] flex flex-row items-center gap-[1.5rem]">
          {/* Logo Text */}
          <div className="flex items-center gap-[0.693rem]">
            <p className="text-[1.782rem] leading-[2.178rem]">
              <span className="text-[var(--text-brand-green)]">WISE</span>
              <span className="text-[var(--text-secondary)]">TRADE</span>
            </p>
          </div>
          <span>- Đồng hàng cùng thành công</span>
        </div>
      </div>
    </div>
  );
}
