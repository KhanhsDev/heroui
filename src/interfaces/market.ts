import type { ColumnState } from 'ag-grid-community';
import type {
  MARKET,
  SYMBOL_TYPE,
  SYSTEM_TYPE,
  MARKET_STATUS,
  SELL_BUY_TYPE,
  REALTIME_CHANNEL_DATA_TYPE,
} from 'global/common';

interface ExtraSymbolData {
  channelType?: REALTIME_CHANNEL_DATA_TYPE; //last channel that updated data
  right?: RightInfo;
}

export interface BidOffer {
  p?: number; // price
  v?: number; // volume
  c?: number; // volume change
}

export interface FlatBidOffer {
  vo?: number; // volume offfer
  vb?: number; // volume bid
  po?: number; // price offer
  pb?: number; // price bid
}

export interface SymbolData extends ExtraSymbolData {
  s: string; // symbol code
  ds?: string; // display symbol code
  rc?: string; // Reference code
  m?: MARKET;
  n1?: string; // Vietnamese name
  n2?: string; // English name
  t?: SYMBOL_TYPE;
  b?: string; // Underlying asset
  bs?: SYMBOL_TYPE; // Underlying asset symbol type
  i?: boolean; //Highlight Index
  o?: number; // open
  h?: number; // high
  l?: number; // low
  c?: number; // close
  a?: number; // avg
  ch?: number; // change
  r?: number; // rate
  re?: number; // reference price
  vo?: number; // tradingVolume
  va?: number; // tradingValue
  ce?: number; //ceilingPrice
  fl?: number; //floorPrice
  bb?: BidOffer[];
  bo?: BidOffer[];
  mv?: number;
  mb?: 'BUY' | 'SELL';
  ti?: number; //Time
  ss?: string; //Session
  tb?: number; //Total Bid Volume
  to?: number; //Total Offer Volume
  isFr?: boolean; // is foreign
  h52W?: number;
  l52W?: number;
  av52W?: number;
  ftd?: string; //First Trade Date
  ltd?: string; //Last Trade Date
  md?: string; //Maturity Date
  ic?: {
    // Index Count
    ce: number;
    fl: number;
    up: number;
    dw: number;
    uc: number;
    tc?: number; // total trade count
    utc?: number; // total untrade count
  };
  et?: {
    //Estimated Price for next trading date
    ce?: number;
    fl?: number;
  };
  frBvo?: number; // Foreigner Buy Volume
  frSvo?: number; // Foreinger Sell Volume
  frCr?: number; // Current Foreigner Room
  frTr?: number; // Total Foreigner Room
  frBva?: number; // Foreginer buy value
  frSva?: number; // Foreginer sell value // Net  = B-S
  oi?: number; // Open Interest
  is?: string; // Issuer name
  ep?: number; // Expected Price
  er?: number; // Expected Change
  ec?: number; // Expected Rate
  exp?: number; // Exercise Price
  exr?: string; // Exercise Ratio
  iv?: number; // Implied Volatility
  rv?: number; // real Volatility
  vd?: number; // Volatility Diff
  de?: number; // Delta
  ul?: SymbolData; // Extra data for underlying assets
  pc?: number; // Previous Close Price
  lq?: number; // listed qty
  prvo?: number; // Previous Trading Volume
  abo?: number; // accumumulate bid volume
  aoo?: number; // accumumulate offer volume
  tbo?: number; // total bid
  too?: number; // total offer
  dbo?: number; // diffBidOffer
  av10?: number; // avg volume 10 days
  ie?: boolean;
  mvUp?: boolean; // market streamer format volume cell
  mvaUp?: boolean; // market streamer format value cell
  ba?: number;

  fsp?: number;
  noFsp?: number;

  mbo?: number; // matched buy volume
  mso?: number; // matched sell volume
  mbso?: number; // matched b/s volume

  av20?: number;

  etfStockList?: {
    s: string;
    u: number;
  }[];

  //CBOND
  iss?: string;
  par?: number;
  periodRemain?: string;
  interestRateType?: string;
  interestType?: string;
  interestCouponType?: string;
  interestPeriod?: string;
  interestRate?: number;
  interestPeriodUnit?: string;
  interestPaymentType?: string;
  hm?: {
    p?: number;
    v?: number;
  };
  lm?: {
    p?: number;
    v?: number;
  };

  sectorCode?: string; // sector code from fialda;

  ct?: string; // category feature
}

export interface SubscribeSymbol {
  symbolList: SymbolData[];
  types: REALTIME_CHANNEL_DATA_TYPE[];
  fromBrowser?: boolean;
}

export interface QuerySymbolData {
  symbolList?: string[];
  fromBoard?: boolean;
  fromIndexTable?: boolean;
  fromDashBoard?: boolean;
  isBoard?: boolean;
  marketHeatmap?: boolean;
}

export interface IMarketData {
  symbolList: SymbolData[];
  indexStockList: Record<string, string[]>;
  sectorList: { icbCode: string; icbName: string }[];
}

export interface MarketStatus {
  market: MARKET;
  status: MARKET_STATUS;
  lastTradingDate: string;
  lastMarketInit: number;
  previousTradingDate: string;
  type: SYSTEM_TYPE;
}

export interface UnitSetting {
  value: number;
  volume: number;
  drVolume: number;
}
export interface BoardSettings {
  unitSetting?: UnitSetting;
  hideColumns?: { [x: string]: string[] };
  hideColumnsMobile?: { [x: string]: string[] };
  columnOrder?: { [x: string]: ColumnState[] };
  templateColumnOrder?: { [x: string]: ColumnState[] };
  oneCol?: boolean;
  isOdd?: boolean;
  columnGroupState?: Record<string, boolean>;
}

export interface Advertise {
  s: string;
  ti: number;
  sb: SELL_BUY_TYPE;
  m: string;
  p: number;
  v: number;
}
export interface AdvertiseData {
  buy: Advertise[];
  sell: Advertise[];
}

export interface DealNotice {
  s: string;
  ti: number;
  m: string;
  ptmp: number;
  ptmvo: number;
  ptmva: number;
  ptvo: number;
  ptva: number;
}

export interface DealNoticeData {
  accVolume: number;
  accValue: number;
  data: DealNotice[];
}

export interface BankListData {
  secBankCode: string;
  secBankBranchName: string;
  secBankBranchCode: string;
  napasCode: string;
  nextKey: string;
  logo?: string;
}

export type HistoryResponse = HistoryFullDataResponse | HistoryPartialDataResponse | HistoryNoDataResponse;

export interface HistoryFullDataResponse extends UdfOkResponse {
  t: number[];
  c: number[];
  o: number[];
  h: number[];
  l: number[];
  v: number[];
}

export interface UdfOkResponse extends UdfResponse {
  s: 'ok';
}

export interface UdfResponse {
  s: string;
}

interface HistoryPartialDataResponse extends UdfOkResponse {
  t: number[];
  c: number[];
  o?: never;
  h?: never;
  l?: never;
  v?: never;
}

interface HistoryNoDataResponse extends UdfResponse {
  s: 'no_data';
  nextTime?: number;
}

export interface UdfErrorResponse {
  s: 'error';
  errmsg: string;
}

export interface QuoteData {
  ti: number;
  mv: number;
  c: number;
  ch: number;
  r: number;
}

export interface RightInfo {
  stkCode: string;
  exDate: string; // yyyymmdd;
  message: string;
}
