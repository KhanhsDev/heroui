export interface BankInfo {
  TT: string;
  shsBranch: string;
  shsBranchCode: string;
  beneficiaryUnit: string;
  bankAccountNumber: string;
  bankBranch: string;
  isFr: boolean;
  bankCode: string;
  bankName: string;
  bankLogo: string;
  bin: string;
  branchs?: BankInfo[];
}
