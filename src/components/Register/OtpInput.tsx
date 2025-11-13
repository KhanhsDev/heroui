import { useRef, useEffect } from "react";

interface OtpInputProps {
  value?: string;
  isActive?: boolean;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

export default function OtpInput({
  value,
  isActive,
  onChange,
  onFocus,
}: OtpInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  return (
    <div
      className={`size-[6rem] rounded-[1.6rem] flex items-center justify-center ${
        isActive
          ? "border-2 border-[var(--border-active)]"
          : "border border-[var(--border-secondary)]"
      }`}
    >
      {onChange ? (
        <input
          ref={inputRef}
          type="text"
          maxLength={1}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          className="w-full h-full bg-transparent text-[1.8rem] text-[var(--text-primary)] text-center outline-none"
        />
      ) : (
        value && (
          <p className="text-[1.8rem] text-[var(--text-primary)]">{value}</p>
        )
      )}
    </div>
  );
}
