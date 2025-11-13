"use client";
import React, { useState } from "react";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import ChevronDownIcon from "@/svg/ChevronDownIcon";

interface Account {
  key: string;
  label: string;
  icon?: string;
}

interface Props {
  onShow: () => void;
}

const SelectRealAccount = (props: Props) => {
  const [selectedAccount, setSelectedAccount] = useState("03556XXX");

  // Mock data - replace with real account data
  const accounts: Account[] = [
    {
      key: "03556XXX",
      label: "03556XXX",
      icon: "/assets/png/dsc-avatar.png",
    },
    {
      key: "03557XXX",
      label: "03557XXX",
      icon: "/assets/png/dsc-avatar.png",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-[1.2rem]">
      {/* Label */}
      <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
        Tài khoản
      </p>

      {/* Select and Button Row */}
      <div className="flex items-center gap-[1.6rem]">
        {/* Account Selection */}
        <div className="flex-1">
          <Select
            selectedKeys={[selectedAccount]}
            onChange={(e) => setSelectedAccount(e.target.value)}
            classNames={{
              trigger:
                "cursor-pointer bg-gradient-to-r from-[var(--bg-gradient-icon-from)] from-[-17.67%] via-[var(--bg-gradient-icon-via)] via-[57.89%] to-[var(--bg-gradient-icon-to)] to-[125.21%] rounded-[1.2rem] h-[4.8rem] min-h-[4.8rem] px-[1.6rem] gap-[0.8rem] border-[0.1rem] border-[var(--border-secondary)]",
              value:
                "text-[1.8rem] font-[400] leading-[1.2] text-[var(--text-primary)]",
              listboxWrapper:
                "bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)]",
              popoverContent:
                "bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)] rounded-[1.2rem] border-[0.1rem] border-[var(--border-secondary)]",
              innerWrapper: "flex items-center gap-[0.8rem]",
            }}
            renderValue={(items) => {
              return items.map((item) => {
                const account = accounts.find((a) => a.key === item.key);
                return (
                  <div
                    key={item.key}
                    className="flex items-center gap-[0.8rem]"
                  >
                    <Avatar
                      src={account?.icon}
                      alt="Account icon"
                      className="size-[3.2rem] shrink-0"
                    />
                    <span className="text-[1.8rem] font-[400] leading-[1.2] text-[var(--text-primary)]">
                      {item.textValue}
                    </span>
                  </div>
                );
              });
            }}
            aria-label="Chọn tài khoản"
            selectorIcon={<ChevronDownIcon />}
          >
            {accounts.map((account) => (
              <SelectItem
                key={account.key}
                textValue={account.label}
                classNames={{
                  base: "h-[4.8rem] min-h-[4.8rem] py-[1rem] px-[1.6rem] hover:bg-[var(--bg-secondary)] data-[hover=true]:bg-[var(--bg-secondary)]",
                  title:
                    "text-[1.8rem] font-[400] leading-[1.2] text-[var(--text-primary)]",
                }}
              >
                <div className="flex items-center gap-[0.8rem]">
                  <Avatar
                    src={account.icon}
                    alt="Account icon"
                    className="size-[3.2rem] shrink-0"
                  />
                  <span>{account.label}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Manage Account Button */}
        <Button
          onClick={props.onShow}
          className="h-[4.8rem] px-[1.6rem] py-[1rem] bg-gradient-to-b from-[var(--bg-gradient-start)] to-[var(--bg-gradient-end)] rounded-[1.2rem] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] shrink-0"
        >
          <span className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)] whitespace-nowrap">
            Quản lý tài khoản
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SelectRealAccount;
