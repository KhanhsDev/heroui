import type { OTP_TYPE, LIST_TABS_IDS } from 'global';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

import type { Account } from './model';
import type { StockBalance } from './response';

export interface Obj {
  [key: string]: {} | undefined;
}

export interface UserInfo {
  displayName?: string;
  username?: string;
  userLevel?: USER_LEVEL;
  userSettings?: UserSettings;
  useSmartOtp?: boolean;
  useSmsOtp?: boolean;
  otp?: OtpInfo;
  accountNumber?: string;
  phoneNumber?: string[];
  id?: string;
}

export enum USER_LEVEL {
  CUSTOMER = 'CUSTOMER',
  USER = 'USER',
  REMISER = 'REMISER',
  BROKER = 'BROKER',
}

export interface UserSettings {
  selectedAccount?: string;
  currentSymbol?: string;
  currentStock?: string;
  currentFutures?: string;
  selectedFavorite?: number;
  wtsSettings?: {
    layoutSetting?: Record<string, unknown>;
  };
}

export interface UserData {
  u?: string; // User name, user id of Core System
  i?: number; // Id of FTL System
  sid?: string; // Session Id of Core System
  ex?: {
    // Extra data
    id?: string; // Idenfified number
    br?: string; // Branch Code
    mgnDpt?: string; // Management Dept Code
    dpt?: string; // Dept Code
    agc?: string; // Agency Number
    acc?: Account[]; // List of accounts
    lgId?: string; // Login Id
    flg?: string; //Authentication Flag
    lvl?: USER_LEVEL; // User Level
  };
}

export interface OtpInfo {
  service: string;
  uri: string;
  exp?: number;
  otpIndex?: string;
  otpType?: OTP_TYPE;
}

export interface Token {
  ud?: UserData;
  sgIds?: number[]; // Scope Group Ids
  otp?: OtpInfo;
  a?: boolean; // Authenticated or not
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: ReactNode;
  className?: string;
  size?: 'sx' | 'sm' | 'md' | 'lg';
  color?: 'success' | 'waring' | 'primary' | 'default' | 'error';
  variant?: 'border' | 'solid' | 'faded';
  rounded?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
}

export interface TransferStockParams {
  accountNumber?: string;
  subNumber?: string;
  receivedAccountNumber?: string;
  receivedSubNumber?: string;
  infoReceived: InfoReceived[];
  stockTransferValue?: number;
  selectedRow: StockBalance | undefined;
}

export interface InfoReceived {
  stockCode: string;
  quantity: number;
}

export interface Step {
  number: number;
  component: ReactNode;
}

export interface StockTransferFormData extends TransferStockParams {}

export interface Config {
  defaultTimeZone: string;
  basePath: string;
  oneSignalAppId?: string;
  cashSubNumber: string;
  marketDataUrl?: string;
  indexStockListUrl?: string;
}

export interface UserInfo {
  username?: string;
  userLevel?: USER_LEVEL;
  userSettings?: UserSettings;
  useSmartOtp?: boolean;
  useSmsOtp?: boolean;
  identifierNumber?: string;
  accountNumber?: string;
  mngDeptCode?: string;
}

export interface ResponseCommon<T = unknown> {
  response?: T;
  success: boolean;
}

/**
 * {
 *   [accountNumber: string]: {
 *     [tabId: string]: {
 *       [key: string]: string | unknown
 *     }
 *   } | undefined;
 * }
 *
 */
export type UserPreferencesCache = Record<
  string,
  Record<LIST_TABS_IDS, Record<string, string | unknown>> | undefined
>;

export type CashDetails = Array<
  Array<{
    id: string;
    label: string;
    value?: string | number;
    percent?: number;
    textColor?: string;
    hideBrackets?: boolean;
    prefix?: string;
    className?: string;
    hide?: boolean;
  }>
>;

export interface RecognitionQRId {
  id: string;
  name: string;
  birthday: string;
  issue_date: string;
}

export interface IAccountAsset {
  netAsset: number;
  totalAsset: number;
  totalCash: number;
  availableCash: number;
  unavailableCash: number;
  reuseAmount: number;
  dividend: number;
  stockEvaluationAmount: number;
  availableStockAmount: number;
  unavailableStockAmount: number;
  buyingStockWaitingAmount: number;
  rights: number;
  pendingStockAmount: number;
  totalLoanAmount: number;
  marginLoan: number;
  nonSettledBuyingAmount: number;
  unmatchBuyingAmount: number;
  interest: number;
  collateralAssetValue: number;
  minBuyingPower: number;
  withdrawableAmount: number;
  cmr: number;
  cashAmountForMMR: number;
  stockAmountForMMR: number;
  virtualDeposit: number;
  usedVirtualDeposit: number;
  totalLackingSettledAmount: number;
  lackingMarginAmount: number;
  lackingVirtualDepositAmount: number;
  lackingLoanAmountForT1: number;
  marginAvailableStockAmount: number;
  marginUnavailableStockAmount: number;
  evaluationAvailableStockAmount: number;
  evaluationUnavailableStockAmount: number;
  totalLoanMortgage: number;
  totalLoanBuying: number;
  totalLoanExpectedAmount: number;
  stockAmountCanUseMargin: number;
  evaluationAmount: number;
  tlTaOfTotalAccount: number;
  tlTaOfMarginList: number;
}

export interface ProfitLossItems {
  side: 'BUY' | 'SELL';
  subNumber: string;
  stockCode: string;
  balanceQuantity: number;
  sellableQuantity: number;
  currentPrice: number;
  buyingPrice: number;
  buyingAmount: number;
  evaluationAmount: number;
  todayBuy: number;
  todaySell: number;
  t1Buy: number;
  t1Sell: number;
  t2Buy: number;
  t2Sell: number;
  profitLossRate: number;
  buyingQuantity: number;
  costPriInDay: number;
}

export interface IAccountProfitLoss {
  t1Deposit: number;
  t2Deposit: number;
  depositAmount: number;
  totalBuyAmount: number;
  totalEvaluationAmount: number;
  totalProfitLoss: number;
  totalProfitLossRate: number;
  estimatedDeposit: number;
  profitLossItems: ProfitLossItems[];
}

export interface IEquitySellable {
  stockCode: string;
  balanceQuantity: number;
  sellableQuantity: number;
  todayBuy: number;
  todaySell: number;
  t1Buy: number;
  t1Sell: number;
  t2Buy: number;
  t2Sell: number;
}

export interface IEquityAccountMargin {
  levl: string;
  cer: number;
  crr: number;
  callRt: number;
  mmr: number;
  cmr: number;
  fmr: number;
  lndPrd: number;
  ill: number;
  used: number;
  rll: number;
  intRt: number;
  dlyRt: number;
  sbst: string;
  ownSbst: number;
  rgtSbst: number;
  buySbst: number;
  sellSbst: number;
  reuse: string;
  rgtReuse: number;
  sellReuse: number;
  lack: string;
  mrgnRpyYn: boolean;
  selling: string;
  mrgnLoanInt: number;
  nav: number;
}

export type TIME_FRAME = '1D' | '1W' | '1M' | '3M' | '6M' | '9M' | 'YTD' | '1Y';
