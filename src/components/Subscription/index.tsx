"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Select, SelectItem } from "@heroui/select";
import CheckIcon from "@/svg/CheckIcon";
import CloseIcon from "@/svg/CloseIcon";
import ChevronDownIcon from "@/svg/ChevronDownIcon";

type SubscriptionPlan = {
  name: string;
  price: string;
  devices: number;
  accounts: number;
  features: {
    virtualAccount: boolean;
    historyData: boolean;
    backtest: boolean;
    messageSignals: boolean;
    buySignals: boolean;
    autoTrading: boolean;
  };
};

type Props = {
  onClose: () => void;
  onBuyPlan?: (
    planName: string,
    billingCycle: string,
    totalAmount: string
  ) => void;
};

export default function Subscription({ onClose, onBuyPlan }: Props) {
  const [billingCycle, setBillingCycle] = useState("1month");

  const billingOptions = [
    { key: "1month", label: "1 tháng" },
    { key: "3months", label: "3 tháng" },
    { key: "6months", label: "6 tháng" },
    { key: "1year", label: "1 năm" },
  ];

  const getBillingCycleLabel = (key: string) => {
    return (
      billingOptions.find((option) => option.key === key)?.label || "1 tháng"
    );
  };

  const plans: SubscriptionPlan[] = [
    {
      name: "Free",
      price: "0",
      devices: 1,
      accounts: 0,
      features: {
        virtualAccount: true,
        historyData: true,
        backtest: true,
        messageSignals: false,
        buySignals: false,
        autoTrading: false,
      },
    },
    {
      name: "Cơ bản",
      price: "1,500,000",
      devices: 1,
      accounts: 0,
      features: {
        virtualAccount: true,
        historyData: true,
        backtest: true,
        messageSignals: true,
        buySignals: true,
        autoTrading: false,
      },
    },
    {
      name: "Tiêu chuẩn",
      price: "7,000,000",
      devices: 3,
      accounts: 3,
      features: {
        virtualAccount: true,
        historyData: true,
        backtest: true,
        messageSignals: true,
        buySignals: true,
        autoTrading: false,
      },
    },
    {
      name: "Nâng cao",
      price: "7,000,000",
      devices: 4,
      accounts: 4,
      features: {
        virtualAccount: true,
        historyData: true,
        backtest: true,
        messageSignals: true,
        buySignals: true,
        autoTrading: true,
      },
    },
  ];

  const features = [
    { label: "Số lượng thiết bị", key: "devices" },
    { label: "Số tài khoản được liên kết", key: "accounts" },
    { label: "Sử dụng tài khoản ảo", key: "virtualAccount" },
    { label: "Xem dữ liệu lịch sử", key: "historyData" },
    { label: "Backtest", key: "backtest" },
    { label: "Nhận tín hiệu qua tin nhắn", key: "messageSignals" },
    { label: "Báo mua/bán", key: "buySignals" },
    { label: "Tự động mua/bán", key: "autoTrading" },
  ];

  const FeatureIcon = ({ available }: { available: boolean }) => (
    <div
      className={`flex items-center justify-center size-[3.6rem] rounded-full ${
        available ? "bg-[rgba(0,180,95,0.1)]" : "bg-[rgba(255,47,47,0.1)]"
      }`}
    >
      <div
        className={`flex items-center justify-center size-[3rem] rounded-full ${
          available
            ? "bg-gradient-to-b from-[#55b657] to-[#08ae77]"
            : "bg-gradient-to-b from-[#ff2f2f] to-[#a13e3e]"
        }`}
      >
        {available ? <CheckIcon /> : <CloseIcon />}
      </div>
    </div>
  );

  return (
    <div className="bg-[#1a1c1b] rounded-[2rem] overflow-hidden w-full h-full p-[3.2rem] pb-[4.4rem]">
      {/* Header */}
      <div className="flex items-start justify-between mb-[3.6rem]">
        <div className="flex flex-col gap-[1.1rem]">
          <h2 className="text-[2.4rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
            So sánh các gói và tính năng
          </h2>
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[#929196]">
            Nâng cấp ngay hôm nay để tận hưởng giá ưu đãi đặc biệt cùng trải
            nghiệm sàn ảo toàn diện, mạnh mẽ và đầy đủ tính năng.
          </p>
        </div>

        {/* Billing Cycle Dropdown */}
        <div className="flex items-center gap-[1.4rem] whitespace-nowrap">
          <p className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
            Chu kỳ thanh toán
          </p>
          <Select
            selectedKeys={[billingCycle]}
            onChange={(e) => setBillingCycle(e.target.value)}
            selectorIcon={<ChevronDownIcon />}
            classNames={{
              trigger:
                "cursor-pointer bg-gradient-to-r from-[#111313] from-[17.671%] via-[#222622] via-[44.546%] to-[#111313] to-[125.21%] rounded-[1.2rem] h-[3.6rem] min-h-[3.6rem] px-[1.2rem] py-[1rem] gap-[1rem] w-[11rem]",
              value:
                "text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)]",
              listboxWrapper:
                "bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]",
              popoverContent:
                "bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313] rounded-[1.2rem] w-[11rem]",
            }}
            aria-label="Chu kỳ thanh toán"
          >
            {billingOptions.map((option) => (
              <SelectItem
                key={option.key}
                classNames={{
                  base: "text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)] h-[4rem] min-h-[4rem] py-[1rem] px-[1.2rem]",
                  title:
                    "text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)]",
                }}
              >
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-[#111313] rounded-[1.2rem] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        {/* Header Row with Plans */}
        <div className="flex items-start mb-[1.8rem]">
          <div className="w-[26.2rem] px-[2.4rem] py-[4rem]">
            <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
              Quyền lợi
            </p>
          </div>

          {/* Plan Cards */}
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex-1 px-[2.4rem] py-[1.6rem] flex flex-col gap-[1.6rem] mt-[2.4rem]"
            >
              <div className="flex flex-col gap-[0.4rem]">
                <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
                  {plan.name}
                </p>
                <p className="text-[2.4rem] font-[600] leading-[1.2] bg-gradient-to-b from-[#55b657] to-[#08ae77] bg-clip-text text-transparent">
                  {plan.price} <span className="text-[#929196]">vnđ</span>
                </p>
              </div>
              {plan.name !== "Free" && (
                <Button
                  variant="flat"
                  className="w-full h-[4rem] bg-[#212525] rounded-[1.6rem] cursor-pointer"
                  onPress={() => {
                    if (onBuyPlan) {
                      onBuyPlan(
                        plan.name,
                        getBillingCycleLabel(billingCycle),
                        plan.price
                      );
                    }
                  }}
                >
                  <span className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]">
                    Mua
                  </span>
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Feature Rows */}
        <div className="flex flex-col gap-1 px-[2.4rem] mb-[2rem]">
          {features.map((feature, index) => (
            <div
              key={feature.key}
              className={`flex items-center h-[5.1rem] ${
                index % 2 === 0 ? "bg-[#151716] rounded-[1.2rem]" : ""
              } ${index !== features.length - 1 ? "" : ""}`}
            >
              <div className="w-[26.2rem] px-[1.6rem] py-[0.8rem]">
                <p className="text-[1.8rem] font-[400] leading-[1.2] text-[var(--text-primary)]">
                  {feature.label}
                </p>
              </div>

              {plans.map((plan) => {
                const value =
                  feature.key === "devices"
                    ? plan.devices
                    : feature.key === "accounts"
                      ? plan.accounts
                      : plan.features[
                          feature.key as keyof typeof plan.features
                        ];

                return (
                  <div
                    key={plan.name}
                    className="flex-1 px-[3.2rem] py-[1rem] flex items-center justify-start"
                  >
                    {typeof value === "boolean" ? (
                      <FeatureIcon available={value} />
                    ) : (
                      <p className="text-[1.8rem] font-[600] w-[3.6rem] flex justify-center items-center leading-[1.2] text-[var(--text-primary)]">
                        {value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
