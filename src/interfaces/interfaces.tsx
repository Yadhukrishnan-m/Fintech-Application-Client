export interface ILoanApplicationResponse {
  success: boolean;
  message: string;
  application: ILoanApplication;
}

export interface ILoanApplication {
  _id: string;
  userId: IUser;
  loanId: ILoan;
  applicationId: string;
  amount: number;
  tenure: number;
  interest: number;
  duePenalty: number;
  accountNumber:string;
  ifscCode:string;
  status: string;
  message: string;
  documents: Record<string, string>[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  customerId: string;
  name: string;
  email: string;
  finscore: number;
  password: string;
  isBlacklisted: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  aadhaarDoc: string;
  aadhaarNumber: string;
  cibilDoc: string;
  cibilScore: number;
  dob: string;
  gender: string;
  income: number;
  job: string;
  panDoc: string;
  panNumber: string;
  phone: number;
}

export interface ILoan {
  _id: string;
  loanId: string;
  name: string;
  description: string;
  isActive: boolean;
  minimumAmount: number;
  maximumAmount: number;
  minimumTenure: number;
  maximumTenure: number;
  minimumInterest: number;
  maximumInterest: number;
  duePenalty: number;
  features: string;
  eligibility: string;
  loanImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  documents: Record<string, string>[];
}

export interface ILoanPopulated {
  _id: string;
  loanId: string;
  name: string;
  description: string;
  isActive: boolean;
  minimumAmount: number;
  maximumAmount: number;
  minimumTenure: number;
  maximumTenure: number;
  minimumInterest: number;
  maximumInterest: number;
  duePenalty: number;
  features: string;
  eligibility: string;
  loanImage: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  documents: Record<string, string>[];
}

export interface IUserLoan {
  _id: string;
  userId: string;
  loanId: string;
  applicationId: string;
  userLoanId:string
  amount: number;
  interest: number;
  duePenalty: number;
  tenure: number;
  gracePeriod: number;
  nextDueDate: string;
  createdAt: string;
}
export interface IUserLoanPopulated {
  _id: string;
  userId: IUser;
  loanId: ILoan;
  applicationId: string;
  amount: number;
  userLoanId:string;
  interest: number;
  duePenalty: number;
  tenure: number;
  nextDueDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface ITransaction {
  _id:string
  transactionId: string;
  userId: IUser
  userLoanId:  IUserLoanPopulated
  amount: number;
  interestAmount?: number;
  penaltyAmount?: number;
  paymentStatus: string;
  createdAt:string
  type: string;
}

export interface IEMI {
  emiNumber: number;
  amount: number;
  dueDate: Date;
  status: "upcoming" | "grace" | "overdue" | "paid";
  penalty: number;
  transaction: ITransaction | null;
  gracePeriodEndDate:Date
  canPay: boolean;
}

