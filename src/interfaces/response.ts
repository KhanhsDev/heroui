import type { STATUS_RIGHTS_MAPPING } from 'components/AssetInfoNew/EventPermission/RightsIssueGrid/StatusRightsCell';
import type { TYPE_DIVIDE_MAPPING } from 'components/AssetInfoNew/EventPermission/DividendEntitlementGrid/TypeDividendCell';
import type {
  GTD_TYPE,
  LOAN_TYPE,
  ORDER_KIND,
  ORDER_TYPE,
  LOAN_STATUS,
  NOTI_CATEGORY,
  SELL_BUY_TYPE,
  STATUS_TOP_UP,
  SUBTYPE_TPLUS,
  CONDITIONAL_TYPE,
  TRANSACTION_TYPE,
  ADVANCE_MONEY_TYPE,
  MAP_CUSTOMER_CLASS,
  TRANSACTION_STATUS,
  TOP_UP_HISTORY_TYPE,
  PERIOD_OF_TIME_ALERT,
  CONDITIONAL_ORDER_STATUS,
} from 'global';

import type { Account } from './model';
import type { UserInfo } from './common';

export interface CheckCardRes {
  address: string;
  addressconf: string;
  birthday: string;
  birthdayconf: string;
  characteristics: string;
  characteristics_conf: string;
  class: string;
  copyright: string;
  country: string;
  district: string;
  document: string;
  ethnicity: string;
  ethnicityconf: string;
  expiry: string;
  expiryconf: string;
  hometown: string;
  hometownconf: string;
  id: string;
  id_check: string;
  id_full: number;
  id_logic: string;
  id_logic_message: string;
  id_type: string;
  idconf: string;
  is_full: number;
  is_full_score: number;
  issue_by: string;
  issue_by_conf: string;
  issue_date: string;
  issue_date_conf: string;
  name: string;
  nameconf: string;
  national: string;
  optional_data: string;
  passport_type: string;
  precinct: string;
  province: string;
  religion: string;
  religionconf: string;
  request_id: string;
  result_code: number;
  server_name: string;
  server_ver: string;
  sex: string;
  sexconf: string;
  street: string;
  street_name: string;
}

export interface CheckFaceRes {
  face_anti_spoof_status: FaceAntiSpoofStatus;
  face_card_angle: number;
  face_live_angle: number;
  face_loc_card: number[];
  face_loc_live: number[];
  message: Message;
  request_id: string;
  result_code: number;
  server_name: string;
  sim: number;
  verification_time: number;
  verify_result: number;
  verify_result_text: string;
  version: string;
  wearing_mask: string;
  wearing_mask_score: number;
}

export interface FaceAntiSpoofStatus {
  fake_code: string;
  fake_score: number;
  fake_type: string;
  liveness_compare_scores: number[];
  status: string | Record<string, unknown>;
}

export interface Message {
  api_version: string;
  error_code: string;
  error_message: string;
}

export interface RestError {
  status?: RestError;
  code?: string;
  message?: string;
  messageParams?: Record<string, unknown>;
}

export type RestListResponse<T = Record<string, unknown>> = RestError & {
  data?: T[];
  page?: number;
  size: number;
  totalPages?: number;
  totalElements: number;
};

export type RestResponse<T = Record<string, unknown>> = RestError & T;

export interface DrAccountSummaryRes {
  date: string;
  previousCashBalance: number;
  todayCashBalance: number;
  inOutAmount: number;
  pendingWithdrawalAmount: number;
  CAA: number;
  pendingWithdrawalCAA: number;
  assetCollateralValue: number;
  realizedPL: number;
  unrealizedPL: number;
  assignedCAA: number;
  fee: number;
  tax: number;
  marginRequirement: number;
  unmatchedOrderMarginRequirement: number;
  marginDeficit: number;
  availableFundForWithdraw: number;
  availableFundForOrder: number;
  availableFundForWithdrawCAA: number;
}

export interface DrRiskRatio {
  acceptedCollateralValue: number;
  initialMargin: number;
  variationMargin: number;
  spreadMargin: number;
  initialMarginDelivery: number;
  marginRequirement: number;
  marginUtilization: number;
  position: number;
  marginLevel: string;
}

export interface OpenPositionRes {
  accountNumber: string;
  accountName: string;
  code: string;
  currencyCode: string;
  sellBuyType: SELL_BUY_TYPE;
  quantity: number;
  previousQuantity: number;
  averagePrice: number;
  currentPrice: number;
  unrealizedPL: number;
  closableQuantity: number;
  tickSize: number;
  tickValue: number;
  priceAdjustment: number;
  nextKey: string;
}

export interface TPCLOrderRes {
  id: number;
  username: string;
  accountNumber: string;
  subNumber: string;
  symbol: string;
  sellBuyType: string;
  type: string;
  orderQuantity: number;
  orderPrice: number;
  triggerPrice: number;
  triggerRate: number;
  triggerOption: string;
  triggerType: string;
  buyPrice: number;
  status: string;
  orderTime: number;
  orderType: ORDER_TYPE;
  instanceId: string;
  createdAt: number;
}

export interface StopOrderHistoryRes {
  date: string;
  sequenceNumber: string;
  originalOrderNumber: string;
  accountNumber: string;
  accountName: string;
  code: string;
  codeName: string;
  sellBuyType: SELL_BUY_TYPE;
  orderType: string;
  status: string;
  orderQuantity: number;
  orderPrice: number;
  bandPrice: number;
  fromDate: string;
  toDate: string;
  mdmType: string;
  username: string;
  registered: string;
  registeredDate: string;
  cancelUsername: string;
  cancelDateTime: string;
  sendYn: string;
  tradingDate: string;
  orderNumber: string;
  errorCode: string;
  errorMessage: string;
  ip: string;
  operator: string;
  operatingTime: string;
  nextKey: string;
  stopPrice: number;
  isSent: boolean;
  isRegistered: boolean;
}

export interface OrderUnMatchRes {
  accountNumber: string;
  accountName: string;
  orderNumber: string;
  orderStatus: string;
  strategyType: string;
  orderType: ORDER_TYPE;
  code: string;
  sellBuyType: SELL_BUY_TYPE;
  orderQuantity: number;
  orderPrice: number;
  matchedQuantity: number;
  unmatchedQuantity: number;
  validity: string;
  orderStyle: string;
  nextKey: string;
}
export interface OrderHistoryRes {
  accountNumber: string;
  accountName: string;
  orderNumber: string;
  orderStatus: string;
  strategyType: string;
  orderType: ORDER_TYPE;
  code: string;
  sellBuyType: SELL_BUY_TYPE;
  orderQuantity: number;
  orderPrice: number;
  matchedQuantity: number;
  unmatchedQuantity: number;
  validity: string;
  orderStyle: string;
  nextKey: string;
  modifyCancelType: string;
}

export type OrderAdvanceRes = {
  date: string;
  sequenceNumber: string;
  originalOrderNumber: string;
  accountNumber: string;
  accountName: string;
  code: string;
  codeName: string;
  sellBuyType: string;
  orderType: string;
  status: string;
  orderQuantity: number;
  orderPrice: number;
  bandPrice: number;
  fromDate: string;
  toDate: string;
  mdmType: string;
  username: string;
  registered: string;
  registeredDate: string;
  cancelUsername: string;
  cancelDateTime: string;
  sendYn: string;
  tradingDate: string;
  orderNumber: string;
  errorCode: string;
  errorMessage: string;
  ip: string;
  operator: string;
  operatingTime: string;
  nextKey: string;
  stopPrice: number;
  isSent: boolean;
  isRegistered: boolean;
};

export type OpenOrderData = (
  | ({ orderKind: ORDER_KIND.NORMAL_ORDER } & OrderUnMatchRes)
  | ({ orderKind: ORDER_KIND.ADVANCED_ORDER } & OrderAdvanceRes)
) & { date: string };

export type OpenOrderHistoryData = (
  | ({ orderKind: ORDER_KIND.NORMAL_ORDER } & OrderHistoryRes)
  | ({ orderKind: ORDER_KIND.ADVANCED_ORDER } & OrderAdvanceRes)
) & { date: string };

export type ColetionOrderRes = {
  derivativesOrderTodayUnmatch: OrderUnMatchRes[];
  derivativesOrderAdvancedHistory: OrderAdvanceRes[];
  derivativesOrderStopHistory: StopOrderHistoryRes[];
  tpClOrderHistory: TPCLOrderRes[];
};
export type ColetionOrderHistoryRes = {
  derivativesOrderHistory: OrderHistoryRes[];
  derivativesOrderAdvancedHistory: OrderAdvanceRes[];
  derivativesOrderStopHistory: StopOrderHistoryRes[];
  tpClOrderHistory: TPCLOrderRes[];
};

export interface DrProfitLoss {
  closedLongQuantity: number;
  closedShortQuantity: number;
  realizedPL: number;
  fee: number;
  tax: number;
  netProfitLoss: number;
  longQuantity: number;
  shortQuantity: number;
  unrealizedPL: number;
  profitLossItems: Array<{
    code: string;
    lastPrice: number;
    closedLongQuantity: number;
    closedShortQuantity: number;
    realizedPL: number;
    fee: number;
    tax: number;
    netProfitLoss: number;
    longQuantity: number;
    shortQuantity: number;
    unrealizedPL: number;
    nextKey: string;
  }>;
}

export interface StockBalance {
  idx: number;
  acntNo: string;
  subNo: string;
  stkCd: string;
  ownQty: string;
  ownQtyPl: string;
  outqReqQty: string;
  ableQty: string;
  outbillAbleQty: string;
  outbillAbleSbLmtQty: string;
  amtAvailable: string;
  amtSum: string;
  amtSumAll: string;
  stockCode: string;
  availableQuantity: string;
  limitAvailableQuantity: string;
  transferVolume?: string;
  tranferableStockPrice?: string;
}

export interface StockTransaction {
  idx: number;
  procDt: string;
  acntNo: string;
  subNo: string;
  stkCd: string;
  tranType: number;
  qty: number;
  inqPri: number | null;
  extSubNo: string | null;
  status: number;
  cnte: string;
  increase?: boolean;
}

export interface TransferStockResponse {
  stockCode: string;
  quantity: number;
  code: number;
  message: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  otpIndex: number;
  userId: number;
  userInfo: UserInfo;
  accountList: Account[];
}

export interface IHistoryAdvanceCash {
  id: string;
  date: Date;
  account: string;
  amount: number;
}

export interface IHistoryTransaction {
  id: string;
  date: Date;
  content: string;
  ariseIncrease: number | null;
  ariseDecrease: number | null;
  amount: number | null;
}

export interface ICashTransactionHistory {
  id: string;
  date: Date;
  transactionType: TRANSACTION_TYPE;
  accountSend: string | null;
  accountReceive: string;
  transactionStatus: TRANSACTION_STATUS;
  ariseIncrease: number | null;
  ariseDecrease: number | null;
  amount: number | null;
}

export interface ISummaryGridInfo {
  subAccount: string;
  nav: number | null;
  profit: number | null;
  sessionFluctuation: number | null;
  totalAmt: number | null;
  stockValue: number | null;
  loan: number | null;
  marginRate: number | null;
}

export interface ISubAccountGridInfo {
  symbol: string;
  volumeTransaction: number;
  T0: number;
  T1: number;
  T2: number;
  currentPrice: number;
  capitalPrice: number;
  currentValue: number;
  totalCapital: number;
  sessionFluctuation: number;
  profit: number;
  takeProfit: number;
  cutLosses: number;
}

export interface IBankData {
  bankBranchCode: string;
  bankBranchName: string;
  bankCode: string;
  shortName: string;
  bankName: string;
  bankAccountNumber: string;
  bankSubNumber: string;
  bankAccountName: string;
  registeredDate: string;
  canceledDate: string;
  htsUserId: string;
}

export interface IBankResponse {
  totalQuantity: number;
  remainQuantity: number;
  data: IBankData[];
}

export interface IBankSupported {
  TT: string;
  shsBranch: string;
  beneficiaryUnit: string;
  bankAccountNumber: string;
  bankBranch: string;
  isFr: boolean;
  bankCode: string;
  bankName: string;
  bankLogo: string;
  bin: string;
}

export interface IBalanceResponse {
  depositAmount: number;
  depositBlockAmount: number;
  orderBlockAmount: number;
  withdrawableAmount: number;
  withdrawBlockAmount: number;
  waitingAmount: number;
  marginLoanAmount: number;
  expiredLoanAmount: number;
  creditShortageAmount: number;
  stockEvaluationAmount: number;
  mortageStockEvaluationAmount: number;
  minReqValue: number;
}

export interface IDerivativesResponse {
  depositAmount: number;
  waitingAmount: number;
  transferableAmount: number;
}

export interface ICashTransferHistory {
  transactionDate: string;
  receivedAccountNumber: string;
  receivedSubNumber: string;
  receivedAccountName: string;
  amount: number;
  accountNumber: string;
  subNumber: string;
  note: string;
  sequenceNumber: number;
  sendSequenceNumber: number;
  receiveSequenceNumber: number;
  isCancel: boolean;
  transferSequenceNumber: number;
}

export interface IRiskRadioAccountResponse {
  acceptedCollateralValue: number;
  initialMargin: number;
  variationMargin: number;
  spreadMargin: number;
  initialMarginDelivery: number;
  marginRequirement: number;
  marginUtilization: number;
  position: number;
  marginLevel: 'NORMAL' | string;
}

export interface ISummaryAccountResponse {
  date: string;
  previousCashBalance: number;
  todayCashBalance: number;
  inOutAmount: number;
  pendingWithdrawalAmount: number;
  CAA: number;
  pendingWithdrawalCAA: number;
  assetCollateralValue: number;
  realizedPL: number;
  unrealizedPL: number;
  assignedCAA: number;
  fee: number;
  tax: number;
  marginRequirement: number;
  unmatchedOrderMarginRequirement: number;
  marginDeficit: number;
  availableFundForWithdraw: number;
  availableFundForOrder: number;
  availableFundForWithdrawCAA: number;
  marginUtilization: number;
}

export interface IDerivativesAccountEquity {
  availableCashBalance: number;
  totalCashBalance: number;
  availableStockQuantity: number;
  availableStockAmount: number;
  totalStockQuantity: number;
  totalStockAmount: number;
}

export interface IWithdrawDerivativesResponse {
  depositAmount: number;
  otherBlockAmount: number;
  collateralAmount: number;
  withdrawBlockAmount: number;
  depositBlockAmount: number;
  availableAmount: number;
  settleBlockAmount: number;
  availableFundForWithdraw: number;
}

export interface IDepositeDerivativesResponse {
  depositAmount: number;
  otherBlockAmount: number;
  collateralAmount: number;
  withdrawBlockAmount: number;
  depositBlockAmount: number;
  availableAmount: number;
  settleBlockAmount: number;
  maturityBlockAmount: number;
}

export interface IFeeMarginForm {
  feeAmount: number;
  adjustedAmount: number;
  receivedAmount: number;
  feeType: 'EXCLUSIVE';
}

export interface IIMBankResponse {
  bankAccountNumber: string;
  bankAccountName: string;
}

export interface IHistoryCashWithdraw {
  transactionType: string;
  date: string;
  time: string;
  accountNumber: string;
  amount: number;
  currency: string;
  extSubNo: string;
}

export interface EqtBuyable {
  depositAmount: number;
  virtualDepositAmount: number;
  buyableQuantity: number;
  buyingPower: number;
  stockValuationAmount: number;
  assetValuationAmount: number;
  orderBlockAmount: number;
  totalBlockAmount: number;
  marginLimitation: number;
  lackAmount: number;
  remainRoom: number;
}

export interface EqtSellable {
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

export interface MarginCampaign {
  code?: string;
  message?: string;
  expiredDate?: string;
  status?: string;
  availableLimit?: number;
  maximumLimit?: number;
}

export interface EquityAccountAsset {
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

export interface ProfitLossItem {
  side: 'BUY' | 'SELL';
  stockCode: string;
  sellableQuantity: number;
  buyingQuantity: number;
  buyingPrice: number;
  currentPrice: number;
  buyingAmount: number;
  evaluationAmount: number;
  profitLossRate: number;
  costPriInDay: number;
  weight: number;
  averagePrice: number;
  unrealizedPL: number;
  quantity: number;
}

export interface EquityPortfolio {
  t1Deposit: number;
  t2Deposit: number;
  depositAmount: number;
  totalBuyAmount: number;
  totalEvaluationAmount: number;
  totalProfitLoss: number;
  totalProfitLossRate: number;
  estimatedDeposit: number;
  profitLossItems: ProfitLossItem[];
}

export type FeeGroup = {
  cmsnTp: string;
  name: string;
  fee: number;
  minAssetRotation?: number;
  minCompareType?: string;
  maxAssetRotation?: number;
  maxCompareType?: string;
};

export type MarginInfo = {
  mrgnLevl: string;
  apyDt: string;
  mrgnEvalRt: string;
  mrgnLndPrd: number;
  intRt: number;
  intDlyRt: number;
  mrgnIntPrd: number;
};

export type TPlusProduct = {
  subNumber: string;
  subType: SUBTYPE_TPLUS;
  minFee: number;
  maxFee: number;
  transactionFeeRate: number;
  transactionFeeNet: number;
  interestRate: number;
  feeStr?: string;
  isRegistered: boolean;
  limit: number;
  loanPeriod: number;
  interestCycle?: string;
  drStatus?: string;
  productId: number;
  url: string;
  marginInfo: MarginInfo;
  feeGroupList: FeeGroup[];
  status?: string;
};
export interface UserInfoResponse {
  isForeigner: boolean;
  idNumber: string;
  customerName: string;
  idIssueDate: string;
  idIssuePlace: string;
  mobile: string;
  email: string;
  address: string;
  contactAddress: string;
  managerNo: string;
  managerName: string;
  managerBranch: string;
  bod: string;
  grpTp: string;
  taxCd: string;
  phoneNumber?: string;
  idNo: string;
}

export interface BranchResponse {
  branchCode: string;
  branchName: string;
}
export interface TPlus {
  title: string;
  desc: string;
  interestRate: number;
  isRegistered: boolean;
  isOutstanding: boolean;
  remainingLimit: number;
  remainingBalance: number;
  type: number;
}
export interface subInfo {
  rlVal: number;
  mrgnLoanNowrm: number;
  rlValPre: number;
  mrgnMaxAmt: number;
  lndUseAmt: number;
}

export interface TodayHistory {
  idx: string;
  acntNo: string;
  subNo: string;
  ordNo: string;
  firstNo: string;
  ordType: string;
  sellBuyType: string;
  type: string;
  isPreOrder: string;
  isOrdGrp: string;
  stockCode: string;
  ordQty: string;
  mthQty: string;
  mthPrice: string;
  ordPrice: string;
  mthAmt: string;
  mktType: string;
  ordStatus: string;
  creatDate: string;
  ordDate: string;
  ordTime: string;
}

export interface AccountInfo {
  isForeigner: boolean;
  idNumber: string;
  customerName: string;
  idIssueDate: string;
  idIssuePlace: string;
  mobile: string;
  email: string;
  address: string;
  contactAddress: string;
  managerNo: string;
  managerName: string;
  managerBranch: string;
  bod: string;
  grpTp: string;
  taxCd: string;
}

export interface ConditionalOrderItem {
  id: number;
  parentId?: number;
  path: string;
  accountNumber: string;
  subNumber: string;
  symbol: string;
  sellBuyType: SELL_BUY_TYPE;
  type: CONDITIONAL_TYPE;
  formattedType: string;
  orderQuantity: number;
  orderPrice: number;
  unmatchedQuantity: number;
  triggerPrice: number;
  triggerOption?: 'GTE' | 'LTE';
  fromTime?: number;
  toTime?: number;
  status: CONDITIONAL_ORDER_STATUS;
  orderTime: number;
  validity: string;
  gtdType: GTD_TYPE;
  modifiable: boolean;
  cancelable: boolean;
  orderType: ORDER_TYPE;
  instanceId: string;
  createdAt: number;
  level: number;
  visible: boolean;
  childCount: number;
  matchedQuantity: number;
  matchedPrice: number;
  trailingAmt?: number;
  trailingRate?: number;
  toler?: number;
  enableCutLoss?: boolean;
  enableTakeProfit?: boolean;
  takeProfitPrice?: number;

  orderKind?: ORDER_KIND; // lệnh đặt trước hiện thị ở orderbook
  orderDate?: string; // lệnh đặt trước hiện thị ở orderbook
  orderNumber?: number;
}

export interface TotalValueOrderWaiting {
  buyTotal: number;
  sellTotal: number;
  mthBuyValue: number;
  buyValue: number;
  mthSellValue: number;
  sellValue: number;
  mthBuyQty: number;
  buyQty: number;
  mthSellQty: number;
  sellQty: number;
}

export interface TotalValueTodayOrders {
  buyTotal: string;
  sellTotal: string;
  mthBuyValue: string;
  buyValue: string;
  mthSellValue: string;
  sellValue: string;
  mthBuyQty: string;
  buyQty: string;
  mthSellQty: string;
  sellQty: string;
}

export interface TotalValueHistoryOrders {
  buyTotal: string;
  sellTotal: string;
  mthBuyValue: string;
  buyValue: string;
  mthSellValue: string;
  sellValue: string;
  mthBuyQty: string;
  buyQty: string;
  mthSellQty: string;
  sellQty: string;
}
export interface TPlusSub {
  accountNumber: string;
  subNumber: string;
  cmsnTp: string;
  custGvcb: keyof typeof MAP_CUSTOMER_CLASS;
  basketCd: string;
  mrgnLevl: string;
  mrgnLoanInt: number;
  mrgnLoanNowrm: number;
  mrgnMaxAmt: number;
  lndUseAmt: number;
  lndExptAmt: number;
  lndRpyWaitAmt: number;
  asetAvg: number;
  sbAmt: number;
  rlVal: number;
  rlValPre: number;
  minFee: number;
  maxFee: number;
  feeStr: string;
}

export interface IEquityTransactionHistoryItem {
  accountNumber: string;
  subNumber: string;
  tradingDate: string;
  transactionName: string;
  stockCode: string;
  balanceQuantity: number;
  tradingQuantity: number;
  tradingPrice: number;
  tradingAmount: number;
  fee: number;
  loanInterest: number;
  adjustedAmount: number;
  tradingSequence: string;
  prevDepositAmount: number;
  depositAmount: number;
  channel: string;
  remarks: string;
  isCancelled: boolean;
  processDate: string;
  bankName: string;
  dwType: string;
}

export interface StockOrderInfo {
  buyMthVal: number;
  sellMthVal: number;
  totalMthVal: number;
  totalOrdQty: number;
  totalMthQty: number;
}

export interface OrderWaitingItem {
  idx: number;
  acntNo: string;
  subNo: string;
  ordNo: string;
  fstNo: string;
  bnhCd: string;
  ordType: string;
  sellBuyTp: string;
  type: string;
  stockCode: string;
  ordQty: string;
  mthQty: string;
  ordPrice: string;
  ordAmt: string;
  mthAmt: string;
  mthPri: string;
  mktType: string;
  ordStatus: string;
  ordDt: string;
  ordTime: string;
  modCanTp: string;
  nmThQty: string;
  mktStat: string;
  sbCmsn: string;
  sbFee: string;
  sbTax: string;
  isPreOrder: string;
  isOrdGrp: string;
  userId: string;
  accountNumber: string;
  branchCode: string;
  acctNo: string;
}

export interface TradeStoryItem {
  accountNumber: string;
  subNumber: string;
  symbol: string;
  closeCount: number;
  closedAt: number;
  quantity: number;
  closePrice: number;
  openPrice: number;
  pnl: number;
  pnlRate: number;
  fee: number;
  tax: number;
}

export interface TopUpDepositHistory {
  idx: number;
  accountNo: string;
  subNo: string;
  type: TOP_UP_HISTORY_TYPE;
  transDate: string;
  amount: string;
  status: STATUS_TOP_UP;
  nowAmt: number | null;
  cnte: string;
}

export interface LoanInfo {
  accountNo: string;
  subNo: string;
  lndCntrNo: string;
  lndTp: LOAN_TYPE; // 70: Margin, 60: Khác
  lndBankCode: string;
  lndAmt: string;
  lndRemnAmt: string;
  lndDate: string;
  exprDate: string;
  lndInt: string;
  dlyInt: string;
  lndFee: string;
  dlyFee: string;
  status: LOAN_STATUS;
  loanId: string;
  issuedDate: string;
  expiredDate: string;
  loanStatus: string;
  initialDebt: string;
  paidDebt: string;
  remainingDebt: string;
  overdueInterest: string;
  interest: string;
  preferentialInterest: string;
  decreasedInterest: string;
  lndRate: string;
  lndRpyAmt: string;
}

export interface LoanSummary {
  accountNo: string;
  subNo: string;
  numOverLoan: string;
  numCrtLoan: string;
  totDebt: string;
  totRepaidDebt: string;
  totRemainingDebt: string;
  totRmnDebtInt: string;
  totInterest: string;
  lndFee: string;
  lndInt: string;
  dlyInt: string;
  dlyFee: string;
}

export interface LoanDetail {
  loanId: string;
  issuedDate: string;
  expiredDate: string;
  loanStatus: string;
  initialDebt: string;
  paidDebt: string;
  remainingDebt: string;
  overdueInterest: string;
  interest: string;
  preferentialInterest: string;
  decreasedInterest: string;
  lndRate: string;
  lndRpyAmt: string;
}

export interface LoanAvailableItem {
  matchDate: string;
  settleDate: string;
  matchAmount: number;
  tradingFee: number;
  tax: number;
  adjustAmount: number;
  loanPeriod: number;
  feeRate: number;
  estimatedFee: number;
  possibleAmount: number;
  settleBankCode: string;
  loanBankName: string;
  loanOrderType: string;
  loanOrderName: string;
  sbFee: string;
}

export interface MoneyAdvanceInfo {
  accountNo: string;
  subNo: string;
  acntName: string;
  amount: string;
  fee: number;
}
export interface IFeeAdvanceResponse {
  code: string;
  message: string;
  data: MoneyAdvanceInfo;
}
export interface DividendEntitlementItem {
  accountNo: string;
  subNo: string;
  stkCd: string;
  actionTp: keyof typeof TYPE_DIVIDE_MAPPING;
  exRightDate: string;
  recordDate: string;
  executionDate: string;
  transDate: string;
  allocationRatio: string;
  rgtQty: string;
  status: string;
}

export interface RightsIssueItem {
  accountNo: string;
  subNo: string;
  stkCd: string;
  allocationRatio: string;
  regQty: string;
  maxRegQty: string;
  price: string;
  status: keyof typeof STATUS_RIGHTS_MAPPING;
  exRightDate: string;
  recordDate: string;
  executionDate: string;
  transDate?: string;
  seqNo: number;
  outAmtTrdNo: number;
  endDate: string;
  startDate: string;
  moveStDate: string;
  movelstDate: string;
  payStatus: string;
}
export interface AccountInformationData {
  acntNo: string;
  acntName: string;
  grpType: string;
  ctrNo: string;
  idNo: string;
  idStatus: string;
  idnoType: string;
  issPlace: string;
  issDate: string;
  birth: string;
  taxCd: string;
  mobile: string;
  email: string;
  address: string;
  remNo: string;
  remName: string;
  remBrnh: string;
  remPhone: string;
  remDepartment: string;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export type AccountInformation = ApiResponse<AccountInformationData>;

export interface AdvanceMoneyHistory {
  accountNo: string;
  subNo: string;
  type: ADVANCE_MONEY_TYPE;
  lndDate: string;
  stockCode: string;
  amount: string;
  fee: string;
  time: Date;
}

export interface DrHistoryItem {
  trdAmt: string;
  amtNow: string;
  type: string;
  status: string;
  cnte: string;
  date: string;
  cnclYn: string;
  seqNo: string;
  vtbMsgId: string;
  mdmType: string;
  feeAmt: string;
  accAmt: string;
  workMn: string;
  workTime: Date | string;
}

export interface MarketIndex {
  stockCode?: string; // mã cổ phiếu
  buyRange?: { from: number; to: number }; // vùng mua
  stockLost?: number;
  stockProfit?: number;
  code?: string;
  name?: string;
  volume?: number; // khối lượng (CP)
  value?: number; // giá trị (tỷ)
  index?: number; // điểm số
  change?: number; // thay đổi điểm
  percent?: number; // thay đổi %
}
export interface MarketIndexRecommendation {
  stockCode: string; // mã cổ phiếu
  volume: number; // khối lượng
  change: number; // thay đổi điểm
  percent: number; // thay đổi %
  buyRange: [number, number]; // vùng mua
  stockLost: number; // lỗ cổ phiếu
  stockProfit: number; // lãi cổ phiếu
}
export interface IMonetaryInfo {
  ableDpo: number;
  cash: number;
  cashTot: number;
  pendingBuyAmt: number;
  setlBuyAmt: number;
  dpoBlock: number;
  d1TotDpo: number;
  d2TotDpo: number;
  lndAblAmt: number;
  cashDividend: number;
  depositInterest: number;
  valueSubRight: number;
  availableWithdraw: number;
}
export interface IStockInfo {
  ablSecurValue: number;
  delayValue: number;
  blockValue: number;
  tdSellOrdQty: number;
  buyT0Value: number;
  buyT1Value: number;
  buyT2Value: number;
  pendingSubRights: number;
  subRight: number;
  status: number;
  allValue?: number;
}
export interface ILoanInfo {
  marginRat: number;
  mainMargin: number;
  marginCall: number;
  marginForce: number;
  orgDebt: number;
  debt: number;
  loanInterest: number;
  sumCustodyFee: number;
  custodyFeeDue: number;
}
export interface IValueOrder {
  buyTotal: number;
  sellTotal: number;
  mthBuyValue: number;
  buyValue: number;
  mthSellValue: number;
  sellValue: number;
  mthBuyQty: number;
  buyQty: number;
  mthSellQty: number;
  sellQty: number;
}
export interface IWaitingOrder {
  buyTotal: number;
  sellTotal: number;
  mthBuyValue: number;
  buyValue: number;
  mthSellValue: number;
  sellValue: number;
  mthBuyQty: number;
  buyQty: number;
  mthSellQty: number;
  sellQty: number;
}

export interface IMonetaryInfoResponse {
  data: IMonetaryInfo;
}
export interface IStockInfoResponse {
  data: IStockInfo;
}
export interface ILoanInfoResponse {
  data: ILoanInfo;
}
export interface IValueOrdersResponse {
  data: IValueOrder;
}
export interface IWaitingOrdersResponse {
  data: IWaitingOrder;
}
export interface INavInfo {
  accountNumber: string;
  subNumber: string;
  pnl1Week: number;
  pnlRate1Month: number;
  pnlRate3Month: number;
  pnlRate6Month: number;
  pnlRate9Month: number;
  pnlRate12Month: number;
  pnlRate36Month: number;
  pnlRate60Month: number;
  pnlRateYTD: number;
}

export interface IStatisticOrder {
  accountNo: string;
  count: string;
  loss: number;
  lossAvg: number;
  lossTrade: number;
  lossValue: number;
  profit: number;
  profitAvg: number;
  profitPercent: number;
  rate: number;
  subNo: string;
  sumProfit: number;
  value: number;
  winTrade: number;
  winValue: number;
}
export interface TplusProductConfig {
  marginId: string;
  loanTerm: number;
  regularInterest: number;
  loanExtent: number;
  overInterest: number;
  avgInterest: number;
  code: number;
}
export interface TplusProductConfigResponse {
  code: string;
  message: string;
  data: TplusProductConfig;
}

export interface CampaignMarginLoanInfo {
  loanQty: number;
  overLoanQty: number;
  overdueLoanQuantity: number;
  validLoanQuantity: number;
  unpaidInterest: number;
  paidInterest: number;
  remainingDebt: number;
  interestLoan1: number;
  interestLoan2: number;
  totalDebt: number;
  repaidDebt: number;
  code?: string;
}
export interface CustomerInfo {
  accountNumber: string;
  acptDt: string; // Format: YYYYMMDD
  acptYn: string; // 'Y' or 'N'
  birthDay: string; // Format: YYYYMMDD
  contractNo: string;
  customerName: string;
  drStatus: string;
  email: string;
  eqtStatus: string;
  fax: string;
  groupType: string;
  homeAddr: string;
  homeTel: string;
  idExpDate: string; // Format: YYYYMMDD
  idIssDate: string; // Format: YYYYMMDD
  idNo: string;
  idNoIssPlace: string;
  idType: string;
  mobile: string;
  officeAddr: string;
  openBranch: string;
  useAdvCashYn: string; // 'Y' or 'N'
}
export interface IDrOrderWaitingItem {
  idx: string;
  bsnsDate: string;
  acntNo: string;
  type: string;
  sellBuyType: string;
  ordNo: string;
  rootOrdNo: string;
  ordType: string;
  stkCode: string;
  commdCd: string;
  mthQty: number;
  ordQty: number;
  mthPrice: number;
  ordPrice: number;
  mthAmt: number;
  ordAmt: number;
  ordStatus: string;
  completed: string;
  remainQty: number;
  ordTime: string;
  execOrdNo: string;
  bndPrice: number;
  refOrdNo: string;
  roOrdQty: number;
  startDate: string;
  endDate: string;
  mdmTp: string;
  ipAddress: string;
  userId: string;
  rejectCd: string;
  rejectMsg: string;
  mtkType: string;
}

export interface IWaitingOrderRes {
  data: IDrOrderWaitingItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface OrderInstraDayRes {
  totOrd: number;
  totQty: number;
  totValue: number;
  buyTotal: number;
  buyQty: number;
  buyTotValue: number;
  sellTotal: number;
  sellQty: number;
  sellTotValue: number;
  numUmthBuy: number;
  umthBuyQty: number;
  umthBuyValue: number;
  numUmthSell: number;
  umthSellQty: number;
  umthSellValue: number;
  numMthBuy: number;
  mthBuyQty: number;
  mthBuyValue: number;
  numMthSell: number;
  mthSellQty: number;
  mthSellValue: number;
  numUmth: number;
  umthQty: number;
  umthValue: number;
  numMth: number;
  mthQty: number;
  mthValue: number;
}

export interface TotalOrderDerivativesRes {
  totBuyOrd: string;
  totSellOrd: string;
  totBuyQty: string;
  totSellQty: string;
  mthBuyQty: string;
  mthSellQty: string;
  totOrd: string;
  totOrdQty: string;
  totMthQty: string;
  totRemainQty: string;
  buyRemainQty: string;
  sellRemainQty: string;
}

export interface ConvertibleRights {
  stkCd: string; // Mã chứng khoán gốc
  stkCdConv: string; // Mã chứng khoán chuyển đổi
  exRightDate: string; // Ngày quyền
  recordDate: string; // Ngày ghi nhận
  executionDate: string; // Ngày thực hiện
  transDate: string; // Ngày giao dịch
  allocationRatio: number; // Tỷ lệ phân bổ
  rgtQty: number; // Số lượng đăng ký
  status: string; // Trạng thái giao dịch
}
export interface IConvertibleRightsRes {
  code: string;
  message: string;
  data: ConvertibleRights[];
}
export interface BondRights {
  stkCd: string; // Mã trái phiếu
  exRightDate: string; // Ngày quyền
  recordDate: string; // Ngày ghi nhận
  transDate: string; // Ngày giao dịch
  allocationRatio: number; // Tỷ lệ phân bổ quyền lợi
  interAmt: number; // Số tiền lãi
  dueAmt: number; // Số tiền đến hạn
  status: string; // Trạng thái quyền (ví dụ: "Đang chờ", "Đã thực hiện", "Hết hạn")
}
export interface IBondRightsRes {
  code: string;
  message: string;
  data: BondRights[];
}
export interface IConvertibleBondRights {
  stkCd: string; // Mã trái phiếu
  stkCdConv: string; // Mã chứng khoán chuyển đổi (cổ phiếu mục tiêu)
  exRightDate: string; // Ngày quyền (ngày quyền lợi có hiệu lực)
  recordDate: string; // Ngày ghi nhận (ngày chốt danh sách)
  startDate: string; // Ngày bắt đầu quyền (ngày bắt đầu đăng ký quyền lợi)
  endDate: string; // Ngày kết thúc quyền (ngày hết hạn quyền lợi)
  executionDate: string; // Ngày thực hiện (ngày thực hiện chuyển đổi hoặc quyền lợi)
  transDate: string; // Ngày giao dịch (ngày giao dịch liên quan đến quyền lợi)
  allocationRatio: number; // Tỷ lệ phân bổ chuyển đổi (ví dụ: 1 trái phiếu = 2 cổ phiếu)
  rgtQty: number; // Số lượng quyền đăng ký (số lượng quyền chuyển đổi)
  status: string; // Trạng thái quyền lợi (ví dụ: "Đang chờ", "Đã thực hiện", "Hết hạn")
}
export interface IConvertibleBondRightsRes {
  code: string;
  message: string;
  data: IConvertibleBondRights[];
}
export interface IFinancialData {
  fS_QuickRatio: number | string;
  fS_CurrentRatio: number | string;
  fS_DebtOnEquityRatio: number | string;
  fS_DebtOnTotalAssetsRatio: number | string;
  mG_GrossMargin_TTM: number | string;
  mG_OperatingMargin: number | string;
  mG_EBITMargin_TTM: number | string;
  mG_PretaxMargin_TTM: number | string;
  mE_ROA: number | string;
  mE_ROA_Avg_3Y: number | string;
  mE_ROE: number | string;
  eps_TTM: number;
  bvps: number;
  sps: number;
}

export interface IFinancialICBData {
  _id: string;
  bvps: number;
  cfps: number;
  eps_TTM: number;
  fS_CashRatio: number;
  fS_CurrentRatio: number;
  fS_DebtOnEquityRatio: number;
  fS_DebtOnTotalAssetsRatio: number;
  fS_QuickRatio: number;
  icbCode: string;
  mE_AssetTurnover: number;
  mE_InventoryTurnover: number;
  mE_ReceivableTurnover: number;
  mE_ROA: number;
  mE_ROA_Avg_3Y: number;
  mE_ROE: number;
  mE_ROE_Avg_3Y: number;
  mG_EBITMargin_TTM: number;
  mG_GrossMargin_TTM: number;
  mG_NetProfitMargin_TTM: number;
  mG_OperatingMargin_TTM: number;
  mG_PretaxMargin_TTM: number;
  pB: number;
  pE: number;
  pS: number;
  sps: number;
  tbvps: number;
}

export type IFeeInfo = ApiResponse<IFeeDetail>;
export interface IFeeDetail {
  feeSum: number;
  cmsn: number;
  loanInterest: number;
  advanceFee: number;
  other: number;
  tax: number;
}

export interface ITotalDerivativesAssetsRes {
  data?: ITotalDerivativesAssets;
}
export interface ITotalDerivativesAssets {
  accountNo: string;
  sumNav: string;
  vsdNav: string;
  shsNav: string;
  marginSecSHS: string;
  marginDpoSHS: string;
  marginSecVSD: string;
  marginDpoVSD: string;
}

export interface IProfitLossDerivativesResponse {
  data: IProfitLossDerivatives;
}

export interface IProfitLossDerivatives {
  unrealProfit: string;
  realProfit: string;
  totProfit: string;
}

export interface IDrMarginRatioResponse {
  data?: IDrMarginRatio;
}

export interface IDrMarginRatio {
  marginRat: string;
  w1: string;
  w2: string;
  w3: string;
  status: string;
}

export interface IDrUsedAssetsResponse {
  data: IDrUsedAssets;
}

export interface IDrUsedAssets {
  usedBalance: string;
  im: string;
  imw: string;
  vm: string;
  debt: string;
  cmsn: string;
  tax: string;
  totFeeTax: string;
}

export interface IDrAvailableAssetsResponse {
  data?: IDrAvailableAssets;
}

export interface IDrAvailableAssets {
  ableBalance: string;
  vsdBalance: string;
  shsBalance: string;
}

export interface NotificationItem {
  id: string;
  createdAt: number;
  title: string;
  content: string;
  category: NOTI_CATEGORY;
  isRead?: boolean;
  params?: Record<string, unknown>;
}

export interface UnseenCountRes {
  category: NOTI_CATEGORY;
  count: number;
}

export interface ReportSymbolItem {
  id: string;
  creationTime: string;
  fileName: string;
  symbol: string;
  title: string;
  type: number;
  year: number;
}

export interface IAlarm {
  id: number;
  userId: number;
  symbol: string;
  symbolType: 'STOCK' | string;
  compareType: 'GTE' | 'LTE' | 'EQUAL';
  compareField: 'PRICE' | 'VOLUME';
  marketValue: number;
  compareValue?: number;
  percentageChange?: number;
  valueChange?: number | null;
  status: 'ACTIVE' | 'PAUSED';
  frequency: boolean;
  note: string;
  desc: string | null;
  instanceId: string;
  priceOverPeriodOfTimeType?: PERIOD_OF_TIME_ALERT;
  expireDate?: string;
}

export interface NormalLoan {
  loanDate: string;
  expiredDate: string;
  stockCode: string;
  loanType: string;
  loanQuantity: number;
  loanAmount: number;
  loanInterest: number;
  loanRepayAmount: number;
  loanRemainAmount: number;
  status: string;
  nextKey: string;
  loanFee: number;
}

export interface LoanBalanceInfo {
  lndRpyAmt: string;
  lndPrd: string;
  lndRpyInt: string;
  rpyIntDly: string;
  lndRpyFee: string;
  rpyFeeDly: string;
}
export interface IMoneyTransferHistoryItem {
  idx: number;
  accountNo: string;
  subNo: string;
  extSubNo: string;
  type: string;
  amount: string;
  nowAmount: string;
  time: string;
  cnte: string;
}

export interface IMoneyTransferHistory {
  code: string;
  message: string;
  data: IMoneyTransferHistoryItem[];
}

export interface IStockRankingResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  data: RankingItem[];
}

export interface RankingItem {
  idx: number;
  subNo: string;
  stockCode: string;
  profit: number;
  value: number;
  buyValue: number;
  sellValue: number;
}

export interface WaitingOrderEquityItem {
  idx: string;
  acntNo: string;
  subNo: string;
  ordNo: string;
  bnhCd: string;
  firstNo: string;
  ordType: string;
  sellBuyType: string;
  type: string;
  isPreOrder: string;
  isOrdGrp: string;
  stockCode: string;
  ordQty: string;
  mthQty: string;
  nmThQty: string;
  ordPrice: string;
  ordAmt: string;
  mthPri: string;
  mthAmt: string;
  mktType: string;
  ordStatus: string;
  creatDate: string;
  ordDate: string;
  ordTime: string;
  modCanTp: string;
  ordVetoCau: string;
}

export interface ITodayOrderEquityRes {
  code: string;
  message: string;
  data: TodayOrderEquityItem[];
}

export interface TodayOrderEquityItem {
  userId: string;
  completed: string;
  acntNo: string;
  subNo: string;
  ordNo: string;
  firstNo: string;
  ordType: string;
  sellBuyType: string;
  type: string;
  isPreOrder: string;
  isOrdGrp: string;
  stockCode: string;
  ordQty: string;
  mthQty: string;
  mthPrice: string;
  ordPrice: string;
  mthAmt: string;
  mktType: string;
  ordStatus: string;
  creatDate: string;
  ordDate: string;
  ordTime: string;
  ordVetoCau: string;
  orgOrdQty: string;
  idx: string;
}

export interface ValidBankResponse {
  accountNo: string;
  bankCdOff: string;
  bankAccountNo: string;
  idno: string;
  secBankCd: string;
  secBankName: string;
  isExist: number;
  isShb: number;
  isEkyc: string;
  isNapas: number;
  maxWithdrawalAmount: string;
  isWdate: string;
}

export interface LoanPaid {
  accountNo: string;
  subAccountNo: string;
  loanType: string;
  loanContractNo: string;
  loanDate: string;
  loanAmount: string;
  loanPaid: string;
  loanRemaining: string;
  interestTermLoan: string;
  interestOverdue: string;
  loanFeeTerm: string;
  overdueFee: string;
  totalOutstandingBalance: string;
  totalRefund: string;
  availableFunds: string;
  principalPayment: string;
  interestPaidAmount: string;
  interestOverdueAmount: string;
  loanFeeAmount: string;
  overdueFeeAmount: string;
  totalRefundAmount: string;
  amountRemainingAfterRefund: string;
}

export type PortfolioInvestmentRes = {
  acntNo: string;
  subNo: string;
  stkCd: string;
  ownQty: number;
  outqReqQty: number;
  outbillAbleQty: number;
  rgtWaitQty: number;
  sellAbleQty: number;
  buyMthQty: number;
  sellMthQty: number;
  tdBuyMthQty: number;
  pdBuyMthQty: number;
  ppdBuyMthQty: number;
  tdSellMthQty: number;
  pdSellMthQty: number;
  ppdSellMthQty: number;
  curPri: number;
  costPri: number;
  bookAmtPl: number;
  ownQtyPl: number;
  evalAmt: number;
  evalAmtSum: number;
  evalPer: number;
  stkPfRt: number;
  bookAmtSum: number;
  evalSumPrf: number;
  prfSumRt: number;
  costPriInDay: number;
};

export interface HistoricalDataType {
  symbol: string;
  proprietaryTradingBuyValue: number;
  proprietaryTradingSellValue: number;
  proprietaryTradingValue?: number;
}

export interface AccountEmpInfoResponse {
  remNo: string;
  remName: string;
  branchCode: string;
  saleGroupNo: string;
  saleGroupName: string;
  accounts: {
    accountNo: string;
    subList: string;
    accountName: string;
  }[];
}

export interface AccountInfoBySubResponse {
  accountName: string;
  bankCode: string;
  bankName: string;
  bankAccountNumber: string;
  phoneNumber: string;
}
