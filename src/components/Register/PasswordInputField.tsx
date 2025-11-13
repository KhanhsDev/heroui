import { useState } from "react";
import { EditHideIcon, EditShowIcon, LockIconSmall } from "../icons";

interface PasswordInputFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function PasswordInputField({
  value,
  onChange,
  placeholder = "********",
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#111313] from-[17.671%] to-[#111313] to-[125.21%] via-[#222622] via-[44.546%] h-[6rem] relative rounded-[1.6rem] w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="flex items-center justify-between p-[1.6rem] relative w-full h-[6rem]">
          <div className="flex gap-[1rem] items-center">
            <LockIconSmall />
            {onChange ? (
              <input
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent text-[1.8rem] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] outline-none"
              />
            ) : (
              <p className="text-[1.8rem] text-[var(--text-tertiary)]">
                {placeholder}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="hover:opacity-70 transition-opacity"
          >
            {showPassword ? <EditShowIcon /> : <EditHideIcon />}
          </button>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#1a1c1c] border-solid inset-0 pointer-events-none rounded-[1.6rem]"
      />
    </div>
  );
}
