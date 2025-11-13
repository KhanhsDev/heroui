import type {
  ORDER_KIND,
  ORDER_TYPE,
  SYMBOL_TYPE,
  SYSTEM_TYPE,
  ORDER_ACTION,
  SELL_BUY_TYPE,
  CONDITIONAL_TYPE,
} from 'global/common';

import type { UserInfo } from './common';
import type { TransferStockResponse } from './response';

export interface Favorite {
  id: string;
  name: string;
  symbolList?: string[];
}

export interface UpdateFavoriteList {
  favorite: Favorite;
  isDeleteSymbol?: boolean;
  isAddSymbol?: boolean;
  isSort?: boolean;
  symbol?: string;
  isRename?: boolean;
}

export interface NotificationConfig<T = any> {
  title?: string;
  titleError?: string;
  titleSuccess?: string;
  containerId?: string;
  ignoreSuccess?: boolean;
  ignoreError?: boolean;
  ignoreCount?: boolean;
  type?: 'TOAST' | 'MODAL';
  content?: string;
  color?: 'success' | 'error' | 'warning';
  errorMessage?: string;
  getSuccessNoti?: (data: T) => { type: 'success' | 'error' | 'warning'; content: string; title: string };
}

export interface GraphQLPayload {
  name: string;
  query?: Record<string, unknown>;
  queryField: QueryField;
}

export interface QueryField {
  name?: string;
  fields: Array<QueryField | string>;
}
export interface Account {
  accountName?: string;
  accountNumber: string;
  subNumber: string;
  account: string;
  accountDisplay?: string;
  type?: SYSTEM_TYPE;
  banks?: AccountBank[];
  isBankLinkingAccount?: boolean;
  isAuthoritiedAccount?: boolean;
}

export interface AccountBank {
  bankCode: string;
  bankName: string;
  bankAccount: string;
}

export interface QuoteSummaryData extends Record<string, number> {
  price: number;
  volume: number;
  buyVolume: number;
  sellVolume: number;
  bsVolume: number;
  buyRate: number;
  sellRate: number;
  bsRate: number;
  rate: number;
}

export type ORDER_KIND_DETAIL = ORDER_TYPE | CONDITIONAL_TYPE;
export interface OrderFormData {
  orderKind?: ORDER_KIND;
  orderAction?: ORDER_ACTION;
  symbol?: string;
  account?: Account;
  accountNumber?: string;
  subNumber?: string;
  sellBuyType?: SELL_BUY_TYPE;
  orderType?: ORDER_TYPE;
  orderKindDetail?: ORDER_KIND_DETAIL;
  conditionalType?: CONDITIONAL_TYPE;
  price?: number;
  quantity?: number;
  matchedQuantity?: number;
  unmatchedQuantity?: number;
  validity?: string;
  orderNumber?: string | number;
  branchCode?: string;
  mediaType?: string;
  bankCode?: string;
  bankName?: string;
  bankAccount?: string;
  phoneNumber?: string;
  securitiesType?: SYMBOL_TYPE;
  orderDate?: string;
  orderTime?: string | number;
  advanceOrderType?: string;
  marketSession?: string;
  oneClick?: boolean;
  fromDate?: Date;
  toDate?: Date;
  stopPrice?: number;
  rangePrice?: number;
  instanceId?: string;
  buyableQty?: number;
  sellableQty?: number;
  maxQty?: number;
  matchedPrice?: number;

  buyingPower?: number;

  //Base for conditional order
  fromGTD?: Date;
  toGTD?: Date;

  //STOP ORDER
  triggerPrice?: number;
  triggerOption?: 'GTE' | 'LTE';

  //OCO | BULL | BEAR
  takeProfitPrice?: number;
  cutLossPrice?: number;
  cutLossTriggerPrice?: number;
}

export interface MinuteChartData {
  c: number[];
  v: number[];
  t: number[];
}

export interface OrderSubmitResult {
  success: boolean;
  request?: Record<string, unknown>;
  response?: Record<string, unknown>;
  orderKind: ORDER_KIND;
}

export interface StockTransferResult {
  success: boolean;
  response?: TransferStockResponse[];
}

export interface Account {
  accountName?: string;
  accountNumber: string;
  subNumber: string;
  account: string;
  accountDisplay?: string;
  type?: SYSTEM_TYPE;
  banks?: AccountBank[];
  isBankLinkingAccount?: boolean;
  isAuthoritiedAccount?: boolean;
}

export interface SessionInfo {
  accessToken?: string;
  refeshToken?: string;
  apiKey?: string;
  userInfo?: UserInfo;
  isAuthenticated?: boolean;
  loading?: boolean;
}
export interface SideBarItem {
  id: number;
  name: string;
  icon?: React.ReactNode;
  route?: string;
  disabled?: boolean;
  isHide?: boolean;
  noPrefixPath?: boolean;
}

export interface SideBarAuthenticatedItem {
  step: number;
  id: string;
  name: string;
  component?: React.ReactNode;
  hide?: boolean;
}
export interface SelectedRange {
  label: string;
  from: string;
  to: string;
}
