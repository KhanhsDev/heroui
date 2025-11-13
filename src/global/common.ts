import IncreaseIcon from 'assets/svg/increase.svg';
import DecreaseIcon from 'assets/svg/decrease.svg';
import RectangleIcon from 'assets/svg/rectangle.svg';

export enum LANG {
  VI = 'vi',
  EN = 'en',
}

export enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}
export enum MARKET {
  HOSE = 'HOSE',
  HNX = 'HNX',
  UPCOM = 'UPCOM',
}

export enum REALTIME_CHANNEL_DATA_TYPE {
  QUOTE = 'QUOTE',
  BID_OFFER = 'BID_OFFER',
  BID_ODD = 'BID_ODD',
  QUOTE_ODD = 'QUOTE_ODD',
}

export enum SYMBOL_TYPE {
  STOCK = 'STOCK',
  FUND = 'FUND',
  ETF = 'ETF',
  FUTURES = 'FUTURES',
  CW = 'CW',
  BOND = 'BOND',
  INDEX = 'INDEX',
  FUTURES_BOND = 'FUTURES_BOND',
}
export enum SELL_BUY_TYPE {
  BUY = 'BUY',
  SELL = 'SELL',
}
export type BOARD_TYPE =
  | 'FAVORITE_DEFAULT'
  | 'INDUSTRY'
  | 'ODD_LOT'
  | 'PUT_THROUGH'
  | 'COMPOSITE'
  | MARKET
  | SYMBOL_TYPE;

export enum INDEX_DISPLAY_MODE {
  HIDDEN = 'HIDDEN',
  SHOWN = 'SHOWN',
  SHOWN_WITHOUT_CHART = 'SHOWN_WITHOUT_CHART',
}

export enum MARKET_STATUS {
  ATO = 'ATO',
  LO = 'LO',
  INTERMISSION = 'INTERMISSION',
  ATC = 'ATC',
  PLO = 'PLO',
  RUNOFF = 'RUNOFF',
  CLOSED = 'CLOSED',
  PUT_THROUGH = 'PUT_THROUGH',
}

export enum THEME {
  DARK = 'DARK',
  LIGHT = 'LIGHT',
}

export enum SOCKET_STATUS {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
  CONNECTING = 'CONNECTING',
}

export enum SYSTEM_TYPE {
  EQUITY = 'EQUITY',
  DERIVATIVES = 'DERIVATIVES',
}
export const INDEX_TYPE = {
  FOREIGN: 'F',
  DOMESTIC: 'D',
};
export enum CASH_TYPE {
  QR = 'QR',
  BANK_TRANFER = 'BANK_TRANFER',
  SHB_MOBILE = 'SHB_MOBILE',
}
export const TIME_FORMAT_DISPLAY = 'HH:mm:ss';
export const DATE_FORMAT_DISPLAY = 'dd/MM/yyyy';

export enum OTP_TYPE {
  MATRIX_OTP = '2',
  SMART_OTP = '5',
  SMS = 'SMS',
}

export enum SUB_ACCOUNT_NUMBER {
  NORMAL = '00',
  MARGIN = '01',
  DERIVATIVES = '80',
  PRODUCT = '08',
}

export enum ROUTES {
  BOARD = 'board',
  LOGIN = 'login',
  EKYC = 'ekyc',
  BANK_REGISTER = 'bank-register',
  OPEN_SUB_ACCOUNT = 'open-sub-account',
  FORGOT_PASSWORD = 'forgot-password',
  TRADING = 'trading',
}

export enum CHANEL_TYPE {
  BOS = 'BOS',
  PHONE = 'PHONE',
  WEB = 'WEB',
  HTS = 'HTS',
  SMS = 'SMS',
  IPHONE = 'IPHONE',
  IPAD = 'IPAD',
  ANDROID = 'ANDROID',
}

export enum ORDER_KIND {
  NORMAL_ORDER, // lệnh thường
  ADVANCED_ORDER, // lệnh đặt trước
  CONDITIONAL_ORDER, // lệnh điều kiện
}

export enum ORDER_ACTION {
  PLACE_ORDER = 'PLACE_ORDER',
  CLOSE_POSITION = 'CLOSE_POSITION',
  CANCEL = 'CANCEL',
  MODIFY = 'MODIFY',
  CANCEL_MULTIPLE = 'CANCEL_MULTIPLE',
  MODIFY_MULTIPLE = 'MODIFY_MULTIPLE',
}

export enum ORDER_TYPE {
  LO = 'LO',
  MP = 'MP',
  ATO = 'ATO',
  ATC = 'ATC',
  MOK = 'MOK',
  MAK = 'MAK',
  MTL = 'MTL',
  PLO = 'PLO',
  STOP_LO = 'STOP_LO',
}
export enum MEDIA_TYPE {
  HTS = '04',
  WEB = '11',
  BOS = '01',
}

export enum MDM_TYPE {
  WTS = '03',
  HTS = '04',
  IOS = '06',
  IPAD = '07',
  ANDROID = '08',
  OMS = '20',
  API = '30',
}

export enum MARKET_SESSION {
  MORNING = 'MORNING',
  AFTERNOON = 'AFTERNOON',
  ATO = 'ATO',
  ATC = 'ATC',
}

export const MAP_MARKET_SESSION: Record<string, MARKET_SESSION> = {
  1: MARKET_SESSION.ATO,
  2: MARKET_SESSION.MORNING,
  3: MARKET_SESSION.AFTERNOON,
  4: MARKET_SESSION.ATC,
};

export enum CANCEL_ORDER_TYPE {
  DERIVATIVES_ORDER_CANCEL = 'DERIVATIVES_ORDER_CANCEL',
  DERIVATIVES_ORDER_ADVANCE_CANCEL = 'DERIVATIVES_ORDER_ADVANCE_CANCEL',
  DERIVATIVES_ORDER_STOP_CANCEL = 'DERIVATIVES_ORDER_STOP_CANCEL',
  TPCL_ORDER_CANCEL = 'TPCL_ORDER_CANCEL',
}

export const TAKE_ALL = 'ALL';

export enum DR_NORMAL_ORDER_STATUS {
  WAITING_TO_ENTER_EXCHANGE = '0',
  WAITING_TO_MATCH = '1',
  PARTIALLY_MATCHED = '2',
  FULLY_MATCHED = '3',
  WAITING_TO_MODIFY_NOT_MATCHED = '4',
  MODIFIED_ORDER_NOT_MATCHED = '5',
  WAITING_TO_CANCEL_NOT_MATCHED = '6',
  CANCELLED_NOT_MATCHED = '7',
  REJECTED_ERROR_NOT_MATCHED = '8',
  UNKNOWN = '9',
  ADVANCE_ORDER_NOT_EXECUTED = '10',
  ADVANCE_ORDER_EXECUTED = '11',
  ADVANCE_ORDER_CANCELLED_EXPIRED = '12',
  ADVANCE_ORDER_ERROR = '13',
  STOP_ORDER_NOT_EXECUTED = '14',
  STOP_ORDER_EXECUTED = '15',
  STOP_ORDER_CANCELLED_EXPIRED = '16',
  STOP_ORDER_EXECUTION_ERROR = '17',
}

export enum TRANSACTION_TYPE {
  WITHDRAWAL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
}

export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export const MAX_MONTH_TAKE = 3;

export enum BankType {
  INTERNAL = '1',
  EXTERNAL = '2',
}

export enum MARGIN_FUNDS_TYPE {
  ALL = 'ALL',
  DEPOSIT = 'C05',
  WITHDRAW = 'C10',
}

export const OTP_WRONG_CODES = [
  'WRONG_OTP',
  'WRONG_OTP_OVER_TIMES',
  'WRONG_PIN_EXCEED_TIMES',
  'WRONG_OTP_EXCEED_TIMES',
  'INVALID_OTP',
];

export enum TREND_KEY_MAPPING {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  NO_CHANGE = 'NO_CHANGE',
}

export const TREND_ICONS_MAPPING: Record<TREND_KEY_MAPPING, any> = {
  INCREASE: IncreaseIcon,
  DECREASE: DecreaseIcon,
  NO_CHANGE: RectangleIcon,
};

export const TREND_COLORS_MAPPING: Record<TREND_KEY_MAPPING, string> = {
  INCREASE: '--green-night',
  DECREASE: '--red-night',
  NO_CHANGE: '--yellow-night',
};

export const DEFAULT_TOAST_CONTAINER_ID =
  'c13211b5-413f-4688-8fca-3dc160d1758b';

export enum ORDER_KIND_WAITING_TYPE {
  NORMAL_ORDER = '0',
  ADVANCED_ORDER = '1',
}

export const DEFAULT_DATE_TIME_FORMAT = 'HH:mm:ss | dd/MM/yyyy';

export const DEFAULT_TOAST_AUTO_CLOSE = 2 * 1000; // 2s

export enum LIST_TABS_IDS {
  CASH_DEPOSIT = '57a8',
  WITHDRAW_CASH = '574f',
  CASH_ADVANCE = '5705',
  CASH_TRANSFER = '57f9',
  STOCK_TRANSFER = '57cb',
  MARGIN_DEPOSIT = '57de',
  MARGIN_WITHDRAW = '57b8',
}

export const CASH_MARGIN_RATE = {
  CALL: 35,
  SELL: 30,
};

export enum SUBTYPE_TPLUS {
  NORMAL = 'NORMAL',
  PRODUCT = 'PRODUCT',
  DERIVATIVES = 'DERIVATIVES',
  MARGIN = 'MARGIN',
}

export const SUBTYPE_TPLUS_MAPPING: Record<SUBTYPE_TPLUS, string> = {
  [SUBTYPE_TPLUS.NORMAL]: 'P_316',
  [SUBTYPE_TPLUS.PRODUCT]: 'P_317',
  [SUBTYPE_TPLUS.DERIVATIVES]: 'P_318',
  [SUBTYPE_TPLUS.MARGIN]: 'P_319',
};

export const MAP_CUSTOMER_CLASS = {
  '000': {
    name: 'NORMAL',
    color: '#FFFFFFFF',
    bgColor: '#FF848281',
  },
  '001': {
    name: 'GOLD',
    color: '#FFF2B132',
    bgColor: '#FF493819',
  },
  '002': {
    name: 'DIAMOND',
    color: '#FF66D4CF',
    bgColor: '#FF264140',
  },
  '009': {
    name: 'DIAMOND',
    color: '#FF66D4CF',
    bgColor: '#FF264140',
  },
  '003': {
    name: 'PLATINUM',
    color: '#FFFA9528',
    bgColor: '#FF55381D',
  },
  '005': {
    name: 'EMPLOYEE',
    color: '#FF09E384',
    bgColor: '#FF114830',
  },
  '': {
    name: 'STANDARD',
    color: '#AAAAAA',
    bgColor: '#191919',
  },
};

export enum ORDER_STATUS_DERIVATIVES {
  WAITING_TO_ENTER_EXCHANGE = 'WAITING_TO_ENTER_EXCHANGE',
  WAITING = 'WAITING',
  PARTIAL_FILLED = 'PARTIAL_FILLED',
  FULL_FILLED = 'FULL_FILLED',
  WAITING_TO_MODIFY = 'WAITING_TO_MODIFY',
  MODIFIED = 'MODIFIED',
  WAITING_TO_CANCEL = 'WAITING_TO_CANCEL',
  CANCELLED = 'CANCELLED',
  REJECT = 'REJECT',
  UNKNOWN = 'UNKNOWN',
  ADVANCE_ORDER_NOT_EXECUTED = 'ADVANCE_ORDER_NOT_EXECUTED',
  ADVANCE_ORDER_EXECUTED = 'ADVANCE_ORDER_EXECUTED',
  ADVANCE_ORDER_CANCELLED = 'ADVANCE_ORDER_CANCELLED',
  ADVANCE_ORDER_ERROR = 'ADVANCE_ORDER_ERROR',
  STOP_ORDER_NOT_EXECUTED = 'STOP_ORDER_NOT_EXECUTED',
  STOP_ORDER_EXECUTED = 'STOP_ORDER_EXECUTED',
  STOP_ORDER_CANCELLED = 'STOP_ORDER_CANCELLED',
  STOP_ORDER_ERROR = 'STOP_ORDER_ERROR',
}

export const MAP_STATUS_ORDER_CLASS: Record<
  string,
  { color: string; bgColor: string }
> = {
  RECEIPT_CONFIRM: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  RECEIPT: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  FULL_FILLED: {
    color: '--green-night',
    bgColor: '--light-green',
  },
  PARTIAL_FILLED: {
    color: '--yellow-night',
    bgColor: '--light-yellow',
  },
  REJECT: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  CANCELLED: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  NOT_PROCESSED: {
    color: '--gray-night',
    bgColor: '--light-gray',
  },
  PROCESSED: {
    color: '--green-night',
    bgColor: '--light-green',
  },
  REJECTED: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  EXPIRED: {
    color: '--text-6',
    bgColor: '--bg-02-night',
  },
  WAITING: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },

  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_NOT_EXECUTED]: {
    color: '--gray-night',
    bgColor: '--light-gray',
  },
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_EXECUTED]: {
    color: '--green-night',
    bgColor: '--light-green',
  },
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_CANCELLED]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_ERROR]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
};

export const DR_MAP_STATUS_ORDER_CLASS: Record<
  string,
  { color: string; bgColor: string }
> = {
  [DR_NORMAL_ORDER_STATUS.WAITING_TO_ENTER_EXCHANGE]: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  [DR_NORMAL_ORDER_STATUS.WAITING_TO_MATCH]: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  [DR_NORMAL_ORDER_STATUS.PARTIALLY_MATCHED]: {
    color: '--yellow-night',
    bgColor: '--light-yellow',
  },
  [DR_NORMAL_ORDER_STATUS.FULLY_MATCHED]: {
    color: '--green-night',
    bgColor: '--light-green',
  },
  [DR_NORMAL_ORDER_STATUS.WAITING_TO_MODIFY_NOT_MATCHED]: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  [DR_NORMAL_ORDER_STATUS.MODIFIED_ORDER_NOT_MATCHED]: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  [DR_NORMAL_ORDER_STATUS.WAITING_TO_CANCEL_NOT_MATCHED]: {
    color: '--yellow-night',
    bgColor: '--light-yellow',
  },
  [DR_NORMAL_ORDER_STATUS.CANCELLED_NOT_MATCHED]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  [DR_NORMAL_ORDER_STATUS.REJECTED_ERROR_NOT_MATCHED]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  [DR_NORMAL_ORDER_STATUS.UNKNOWN]: {
    color: '--gray-night',
    bgColor: '--light-gray',
  },
  [DR_NORMAL_ORDER_STATUS.ADVANCE_ORDER_NOT_EXECUTED]: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  [DR_NORMAL_ORDER_STATUS.ADVANCE_ORDER_EXECUTED]: {
    color: '--green-night',
    bgColor: '--light-green',
  },
  [DR_NORMAL_ORDER_STATUS.ADVANCE_ORDER_CANCELLED_EXPIRED]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  [DR_NORMAL_ORDER_STATUS.ADVANCE_ORDER_ERROR]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  [DR_NORMAL_ORDER_STATUS.STOP_ORDER_NOT_EXECUTED]: {
    color: '--blue-night',
    bgColor: '--light-blue',
  },
  [DR_NORMAL_ORDER_STATUS.STOP_ORDER_EXECUTED]: {
    color: '--green-night',
    bgColor: '--light-green',
  },
  [DR_NORMAL_ORDER_STATUS.STOP_ORDER_CANCELLED_EXPIRED]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
  [DR_NORMAL_ORDER_STATUS.STOP_ORDER_EXECUTION_ERROR]: {
    color: '--red-night',
    bgColor: '--light-red',
  },
};

export const MAP_PRODUCT_CLASS = {
  true: {
    name: 'P_320',
    color: '--green-night',
    bgColor: '--light-green',
  },
  false: {
    name: 'P_321',
    color: '--red-night',
    bgColor: '--light-red',
  },
};

export const MAP_UNIT_INTEREST_RATE = {
  YEAR: 'P_325',
};

export enum ORDER_STATUS_EQUITY {
  WAITING = 'WAITING',
  PARTIAL_FILLED = 'PARTIAL_FILLED',
  FULL_FILLED = 'FULL_FILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  REJECT = 'REJECT',
  ERROR = 'ERROR',
  NOT_PROCESSED = 'NOT_PROCESSED',
  PROCESSED = 'PROCESSED',
}

export const ORDER_STATUS_EQUITY_TRANSLATE: Record<string, string> = {
  [ORDER_STATUS_EQUITY.WAITING]: 'P_10',
  [ORDER_STATUS_EQUITY.PARTIAL_FILLED]: 'P_4',
  [ORDER_STATUS_EQUITY.FULL_FILLED]: 'P_3',
  [ORDER_STATUS_EQUITY.CANCELLED]: 'P_6',
  [ORDER_STATUS_EQUITY.EXPIRED]: 'P_9',
  [ORDER_STATUS_EQUITY.REJECT]: 'P_5',
  [ORDER_STATUS_EQUITY.ERROR]: 'P_5',
  [ORDER_STATUS_EQUITY.NOT_PROCESSED]: 'P_7',
  [ORDER_STATUS_EQUITY.PROCESSED]: 'P_8',
};

export const ORDER_STATUS_DERIVATIVES_TRANSLATE: Record<string, string> = {
  [ORDER_STATUS_DERIVATIVES.WAITING_TO_ENTER_EXCHANGE]: 'P_7',
  [ORDER_STATUS_DERIVATIVES.WAITING]: 'P_10',
  [ORDER_STATUS_DERIVATIVES.PARTIAL_FILLED]: 'P_4',
  [ORDER_STATUS_DERIVATIVES.FULL_FILLED]: 'P_3',
  [ORDER_STATUS_DERIVATIVES.WAITING_TO_MODIFY]: 'P_7',
  [ORDER_STATUS_DERIVATIVES.MODIFIED]: 'N_509',
  [ORDER_STATUS_DERIVATIVES.WAITING_TO_CANCEL]: 'N_510',
  [ORDER_STATUS_DERIVATIVES.CANCELLED]: 'P_6',
  [ORDER_STATUS_DERIVATIVES.REJECT]: 'P_5',
  [ORDER_STATUS_DERIVATIVES.UNKNOWN]: 'P_5',
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_NOT_EXECUTED]: 'P_51',
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_EXECUTED]: 'P_53',
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_CANCELLED]: 'P_6',
  [ORDER_STATUS_DERIVATIVES.ADVANCE_ORDER_ERROR]: 'N_522',

  [ORDER_STATUS_DERIVATIVES.STOP_ORDER_NOT_EXECUTED]: '', // Bỏ - do đã dùng lệnh STOP
  [ORDER_STATUS_DERIVATIVES.STOP_ORDER_EXECUTED]: '',
  [ORDER_STATUS_DERIVATIVES.STOP_ORDER_CANCELLED]: '',
  [ORDER_STATUS_DERIVATIVES.STOP_ORDER_ERROR]: '',
};

export const MENU_TABS_IDS = {
  BOARD: 1,
  MARKET: 2,
  TRADING: 3,
  ASSET: 4,
  ACCOUNT: 5,
  REPORT: 6,
};

export enum EDIT_TYPE {
  PRICE,
  QUANTITY,
}

export enum ASSET_TABS {
  INVESTMENT_PERFORMANCE,
  PROPERTY_INFORMATION,
  MARGIN_INFORMATION,
}
export enum FILTER_ORDER_VALUE {
  RECEIPT_CONFIRM = 'RECEIPT_CONFIRM',
  RECEIPT = 'RECEIPT',
  FULL_FILLED = 'FULL_FILLED',
  PARTIAL_FILLED = 'PARTIAL_FILLED',
  REJECT = 'REJECT',
  CANCELLED = 'CANCELLED',
  NOT_PROCESSED = 'NOT_PROCESSED',
  PROCESSED = 'PROCESSED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  WAITING = 'WAITING',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED',
}

export enum ORD_TYPE {
  MP = '1',
  LIMIT = '2',
}

export const MAP_VALIDITY: Record<string, string> = {
  ATO: '2',
  MAK: '3',
  MOK: '4',
  ATC: '7',
  MTL: '9',
};
export enum ASSET_VALUE_INDEX {
  STOCK_VALUE = 1,
  CASH_VALUE = 2,
}
export enum MARGIN_BALANCE_INDEX {
  AVAILABLE_BALANCE = 1,
  USED_BALANCE = 2,
  NON_DEPOSITED_BALANCE = 3,
}

export enum CONDITIONAL_TYPE {
  OCO = 'OCO',
  BULL_BEAR = 'BULL_BEAR',
  STOP = 'STOP',
  TCO = 'TCO',
  BULK = 'BULK',
}

export enum VALIDITY {
  DAY = 'DAY',
}

export const VALIDITY_TRANSLATE: Record<string, string> = {
  [VALIDITY.DAY]: 'Trong ngày',
};

export const ORDER_STATUS_VALUE_MAPPING: Record<string, number> = {
  [FILTER_ORDER_VALUE.REJECT]: 0,
  [FILTER_ORDER_VALUE.PARTIAL_FILLED]: 1,
  [FILTER_ORDER_VALUE.FULL_FILLED]: 2,
  [FILTER_ORDER_VALUE.CANCELLED]: 3,
};

export const FETCH_COUNT = 30;

export enum GTD_TYPE {
  DAY = 'DAY',
  GTD_NORMAL = 'GTD_NORMAL',
  GTD_CANCEL = 'GTD_CANCEL',
}

export enum GTD_OPTION {
  GTE = 'GTE',
  LTE = 'LTE',
}

export enum CONDITIONAL_ORDER_STATUS {
  INACTIVE = 'INACTIVE',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',

  QUEUE = 'QUEUE',
  WAITING_TO_SEND = 'WAITING_TO_SEND',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FULL_FILLED = 'FULL_FILLED',
  CANCELLING = 'CANCELLING',
  REJECTED = 'REJECTED',
  TAKE_PROFIT_WAIT_CANCEL = 'TAKE_PROFIT_WAIT_CANCEL',
}
export enum LOAN_FILTER_TYPE {
  REGULAR_LOAN = 1,
  PREFERRED_LOAN = 2,
  STILL_VALID = 3,
  EXPIRED = 4,
}

export enum LOAN_TYPE {
  OTHER = '60', // Vay khác
  MARGIN = '70', // Margin
}

// Enum cho loan status
export enum LOAN_STATUS {
  IN_TERM = '0', // Trong hạn
  OVERDUE = '1', // Quá hạn
  ALL = '',
}
// hiện tại đang lấy theo web cũ, nên có sửa thì sau sửa ở type ở đây nhé
export enum REPORT_FEE_TYPE {
  ALL = 'ALL',
  CLEARING = 'BUY_SELL',
  MONEY_DEPOSIT_WITHDRAW = 'RECEIPT_PAYMENT',
  LOAN_COMPLETION = 'LOAN_REPAYMENT',
  WAREHOUSE = 'WAREHOUSING_DELIVERY',
}
export enum PAYMENT_TYPE {
  DEPOSIT = 1,
  WITHDRAW = 2,
}
export enum PAYMENT_STATUS {
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING',
}
export enum MARGIN_TYPE {
  MARGIN_DEPOSIT = 1,
  MARGIN_WITHDRAW = 2,
}
export enum EKYC_TAB_INDEX {
  CONTACT_INFO = 0,
  VERIFY_INFORMATION = 1,
  SERVICE_REGISTRATION = 2,
  PERSONAL_INFO = 3,
  ACCOUNT_INFO = 4,
  BANK_ACCOUNT = 5,
  VERIFY_OTP = 6,
  SUCCESS = 7,
}

export enum FILTER_ORDER_HISTORY_VALUE {
  FULL_FILLED = 'FULL_FILLED',
  PARTIAL_FILLED = 'PARTIAL_FILLED',
  CANCELLED = 'CANCELLED',
}

export const ORDER_HISTORY_STATUS_VALUE_MAPPING: Record<
  FILTER_ORDER_HISTORY_VALUE,
  number
> = {
  [FILTER_ORDER_HISTORY_VALUE.PARTIAL_FILLED]: 1,
  [FILTER_ORDER_HISTORY_VALUE.FULL_FILLED]: 2,
  [FILTER_ORDER_HISTORY_VALUE.CANCELLED]: 3,
};

export enum FILTER_ORDER_BOOK_VALUE {
  FULL_FILLED = 'FULL_FILLED',
  PARTIAL_FILLED = 'PARTIAL_FILLED',
  CANCELLED = 'CANCELLED',
}

export const ORDER_BOOK_STATUS_VALUE_MAPPING: Record<
  FILTER_ORDER_BOOK_VALUE,
  number
> = {
  [FILTER_ORDER_BOOK_VALUE.PARTIAL_FILLED]: 1,
  [FILTER_ORDER_BOOK_VALUE.FULL_FILLED]: 2,
  [FILTER_ORDER_BOOK_VALUE.CANCELLED]: 3,
};

export enum FILTER_CONFIRM_ORDER_VALUE {
  REJECT = 'REJECT',
  RECEIPT_CONFIRM = 'RECEIPT_CONFIRM',
}

export enum FILTER_ORDER_WAITING_VALUE {
  WAITING_TO_MATCH = 'WAITING_TO_MATCH',
  PARTIAL_FILLED = 'PARTIAL_FILLED',
  PROCESSING = 'PROCESSING',
}

export const ORDER_WAITING_STATUS_VALUE_MAPPING: Record<
  FILTER_ORDER_WAITING_VALUE,
  number
> = {
  [FILTER_ORDER_WAITING_VALUE.WAITING_TO_MATCH]: 0,
  [FILTER_ORDER_WAITING_VALUE.PARTIAL_FILLED]: 1,
  [FILTER_ORDER_WAITING_VALUE.PROCESSING]: 9,
};

export enum MODAL_TYPE {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  CASH_ADVANCE = 'CASH_ADVANCE',
  TRANSFER = 'TRANSFER',
  TRANSFER_SECURITIES = 'TRANSFER_SECURITIES',
  REPAY_DEBT = 'REPAY_DEBT',
  WITHDRAW_FUNDS = 'WITHDRAW_FUNDS',
  DEPOSIT_FUNDS = 'DEPOSIT_FUNDS',
  STOCK_TRANSFER = 'STOCK_TRANSFER',
}

export enum EVENT_PERMISSION_TYPE {
  DIVIDEND = 3,
}

export enum HISTORY_TYPE {
  ISSUE_MORE_STOCK = 1, // CP phát hành thêm
  DIVIDEND = 3, // Cổ tức
  BOND_PURCHASE_RIGHT = 4, // Quyền mua TP
  CONVERTIBLE_STOCK = 8, // CP chuyển đổi
  BOND_INTEREST = 9, // Lãi TP
  OTHER_RIGHTS = 'A', // Quyền khác
}

export enum STATUS_TOP_UP {
  ALL = '%',
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
  CANCELED = 4,
}

export enum TOP_UP_HISTORY_TYPE {
  ALL = '%',
  DEPOSIT = 1,
  WITHDRAW = 2,
}
export enum MARKET_FILTER_TYPE {
  ALL = '%',
  SYMBOL = 'symbol',
  DERIVATIVES = 'derivatives',
  RECOMMEND = 'recommend',
}
export enum PHONE_VERIFY_OPTION {
  CAN_USE_OTP_VIA_SMS = 1,
  CAN_NOT_USE_OTP = 2,
}

export const OTP_MODAL_AUTO_DEBIT = 'OTP_MODAL_AUTO_DEBIT';

export enum NOTI_CATEGORY {
  TRADING = 'TRADING',
  ALARM = 'ALARM',
}

export enum ADVANCE_MONEY_TYPE {
  CASH_ADVANCE = '701', // Ứng trước tiền bàn
  REPAY_DEBT = '702', // Hoàn trả ứng trước tiền bán
}

export const BANK_TYPE_CHECK_THRESHOLD = 499000000; // 499Tr
export const BANK_VALID_METHOD_400 = 'BANK_VALID_METHOD_400';

export enum CASH_TRANSFER_TYPE_HISTORY {
  INCOMING = '025',
  OUTGOING = '026',
}

export const DELAY_TIME_REFRESH_ORDER = 1500; // 1.5 giây

export const FETCH_COUNT_QUERY_ALL = 1000; // truyền vào để query all data

export enum PERIOD_OF_TIME_ALERT {
  THREE_MONTHS = 'P3M',
  SIX_MONTHS = 'P6M',
  ONE_YEAR = 'P1Y',
}

export enum FREQUENCY_ALERT {
  DAILY = '1',
  ONCE = '0',
}
export enum IDENTIFICATION_MODAL {
  SHOW = 0,
  PENDING = 2,
}
