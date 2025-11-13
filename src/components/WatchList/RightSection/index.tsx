"use client";
import React from "react";
import { Tabs, Tab } from "@heroui/tabs";
import AutoSignalWatchlist from "./AutoSignalWatchlist";
import OrderBook from "./Orderbook";
import Portfolio from "./Portfolio";
import EmptyLinkedAccount from "./EmptyLinkedAccount";
import SelectRealAccount from "./SelectRealAccount";
import AccountManagement from "./AccountManagement";

const RightSection = () => {
  const [showAccountManagement, setShowAccountManagement] =
    React.useState(false);

  return (
    <div className="w-full h-full bg-[var(--bg-payment-main)] border-l border-[var(--border-secondary)] flex flex-col">
      {/* Header */}
      <div className="px-[2rem] py-[2rem]">
        <h2 className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
          Cài đặt tự động
        </h2>
      </div>

      {/* Main Tabs: Tài khoản ảo / Tài khoản thật */}
      <div className="pl-[2rem] flex-1 flex flex-col">
        <Tabs
          aria-label="Account type tabs"
          variant="solid"
          classNames={{
            base: "w-full",
            tabList:
              "bg-[var(--bg-primary)] p-[0.8rem] rounded-[1.2rem] gap-[0.9rem] w-auto",
            cursor:
              "bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)] rounded-[1.2rem]",
            tab: "h-[3.6rem] px-[1.2rem] py-[1rem] rounded-[1.2rem]",
            tabContent:
              "group-data-[selected=true]:text-[var(--text-primary)] group-data-[selected=true]:font-[600] text-[var(--text-tertiary)] font-[500] text-[1.5rem] leading-[1.4]",
            panel: "p-0 mt-[2rem]",
          }}
        >
          <Tab
            className="flex-1 flex flex-col"
            key="virtual"
            title="Tài khoản ảo"
          >
            <SubTabs />
          </Tab>
          <Tab
            className="flex-1 flex flex-col"
            key="real"
            title="Tài khoản thật"
          >
            {!showAccountManagement ? (
              <SelectRealAccount
                onShow={() => setShowAccountManagement(true)}
              />
            ) : (
              <AccountManagement
                onBack={() => setShowAccountManagement(false)}
              />
            )}
            {/* <EmptyLinkedAccount /> */}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

// Sub-tabs component: Danh sách theo dõi / Sổ lệnh / Danh mục đầu tư
const SubTabs = () => {
  return (
    <Tabs
      aria-label="Watchlist tabs"
      variant="underlined"
      classNames={{
        base: "w-full",
        tabList:
          "gap-0 w-full p-0 border-b border-[var(--border-secondary)] justify-start [&>*]:outline-none [&>*]:ring-0",
        cursor: "bg-[var(--text-primary)] h-[0.3rem]",
        tab: "px-[2rem] h-[3.6rem] w-auto outline-none focus-visible:outline-none data-[focus-visible=true]:outline-none",
        tabContent:
          "group-data-[selected=true]:text-[var(--text-primary)] group-data-[selected=true]:font-[700] text-[var(--text-tertiary)] font-[500] text-[1.6rem] leading-[1.4]",
        panel: "p-0 pt-[2rem]",
      }}
    >
      <Tab className="flex-1" key="watchlist" title="Danh sách theo dõi">
        <AutoSignalWatchlist />
      </Tab>
      <Tab className="flex-1" key="orderbook" title="Sổ lệnh">
        <OrderBook />
      </Tab>
      <Tab className="flex-1" key="portfolio" title="Danh mục đầu tư">
        <Portfolio />
      </Tab>
    </Tabs>
  );
};

export default RightSection;
