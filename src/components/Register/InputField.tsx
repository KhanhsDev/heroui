import { Input } from "@heroui/input";

interface InputFieldProps {
  icon: React.ComponentType;
  placeholder: string;
  value?: string;
  type?: string;
  onChange?: (value: string) => void;
}

export default function InputField({
  icon: Icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputFieldProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      startContent={<Icon />}
      classNames={{
        input:
          "text-[1.8rem] font-normal text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] font-wix !pl-[1rem] ",
        inputWrapper:
          "h-[6rem] bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card)] via-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-[1.6rem] px-[1.6rem]",
      }}
    />
  );
}
