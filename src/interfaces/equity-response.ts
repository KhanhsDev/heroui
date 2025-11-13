import type { ORDER_TYPE } from 'global';

export interface OpenOrderData {
  idx: number;
  acntNo: string;
  subNo: string;
  ordNo: string;
  fstNo: string;
  bnhCd: string;
  ordType: ORDER_TYPE;
  sellBuyTp: '2' | '1'; // 2: Buy , 1: Sell
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
  accountNumber: string;
  branchCode: string;
  acctNo: string;
  ordDate: string;
  mtkType?: string
}

export interface ConfirmOrderData {
  accountNumber: string;
  subNumber: string;
  orderNumber: string;
  orderDate: string;
  orderTime: string;
  modifyCancelType: string;
  sellBuyType: string;
  stockCode: string;
  orderQuantity: number;
  orderPrice: number;
  acceptType: 'YES' | 'NO';
  market: string;
  username: string;
  mediaType: string;
  orderType: ORDER_TYPE;
  matchedQuantity: number;
  matchedPrice: number;
  branchCode: string;
}
