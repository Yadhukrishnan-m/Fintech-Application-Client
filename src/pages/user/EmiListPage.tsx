"use client";

import { useCallback, useEffect, useState } from "react";
import EMITimeline from "../../components/user/userLoan/EmiCards";
// import { toast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { Card } from "@/components/ui/card";
import userAxiosInstance from "@/config/UserAxiosInstence";
import {  useParams } from "react-router-dom";
import Loader from "@/components/shared/Loader";
// import { ErrorToast } from "@/components/shared/Toast";
import { IEMI, IUserLoan } from "@/interfaces/interfaces";

const defaultUserLoan: IUserLoan = {
  userId: "",
  loanId: "",
  applicationId: "",
  createdAt: new Date().toISOString(),
  _id: "",
  amount: 0,
  interest: 0,
  tenure: 0,
  nextDueDate: new Date().toISOString(),
  gracePeriod: 0,
  duePenalty: 0,
};


export default function EmiListPage() {
  const [emis, setEmis] = useState<IEMI[]>([]);
  const [userLoan, setUserLoan] = useState<IUserLoan>(defaultUserLoan);
// const navigate=useNavigate()

const { id } = useParams();
const [loading, setLoading] = useState(false);

const fetchApplications = useCallback(async () => {
  setLoading(true);
  try {
    const response = await userAxiosInstance.get(
      `/user-loan/emis/${id}`
    );
 console.log(response.data.emi);
 

    setEmis(response.data.emi || []);
    setUserLoan(response.data.userLoan )
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
}, [id]);

useEffect(() => {
  fetchApplications();
}, [fetchApplications]);
console.log(emis);


  const handlePayEMI = async() => {
    try {
      const response = await userAxiosInstance.get(`/emi-payment/${id}`);
      
      if (response.data.success) {
        fetchApplications();
      }
    } catch (error) {
      console.log(error);
    } 
    

  };

  if (loading || !userLoan) {
    <Loader message="loading"/>
  }

  // Calculate loan statistics
  const totalAmount = emis.reduce((sum, emi) => sum + emi.amount, 0);
  const paidAmount = emis
    .filter((emi) => emi.status === "paid")
    .reduce((sum, emi) => sum + emi.amount, 0);
  const remainingAmount = totalAmount - paidAmount;
  const completionPercentage = Math.round((paidAmount / totalAmount) * 100);

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-teal-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-teal-800 mb-2">Loan Repayment</h1>
      <p className="text-teal-600 mb-8">Track and manage your EMI payments</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-5 border-teal-100 shadow-sm bg-white">
          <h3 className="text-sm font-medium text-teal-600 mb-1">
            Total Loan Amount
          </h3>
          <p className="text-2xl font-bold text-teal-900">
            ₹{totalAmount.toFixed(2)}
          </p>
        </Card>

        <Card className="p-5 border-teal-100 shadow-sm bg-white">
          <h3 className="text-sm font-medium text-teal-600 mb-1">
            Paid Amount
          </h3>
          <p className="text-2xl font-bold text-teal-900">
            ₹{paidAmount.toFixed(2)}
          </p>
        </Card>

        <Card className="p-5 border-teal-100 shadow-sm bg-white">
          <h3 className="text-sm font-medium text-teal-600 mb-1">
            Remaining Amount
          </h3>
          <p className="text-2xl font-bold text-teal-900">
            ₹{remainingAmount.toFixed(2)}
          </p>
        </Card>
      </div>

      <div className="mb-4 bg-white p-4 rounded-lg shadow-sm border border-teal-100">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-teal-700">
            Loan Progress
          </span>
          <span className="text-sm font-medium text-teal-700">
            {completionPercentage}% Complete
          </span>
        </div>
        <div className="w-full bg-teal-100 rounded-full h-2.5">
          <div
            className="bg-teal-600 h-2.5 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      <EMITimeline emis={emis} onPayEMI={handlePayEMI} />

      <div className="mt-12 bg-white p-6 rounded-lg border border-teal-100 shadow-sm">
        <h2 className="text-xl font-semibold text-teal-800 mb-4">
          Loan Details
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <p className="text-sm text-teal-600">Principal Amount</p>
            <p className="text-lg font-bold text-teal-900">{userLoan.amount}</p>
          </div>
          <div>
            <p className="text-sm text-teal-600">Interest Rate</p>
            <p className="text-lg font-bold text-teal-900">
              {userLoan.interest}% p.a.
            </p>
          </div>
          <div>
            <p className="text-sm text-teal-600">Tenure</p>
            <p className="text-lg font-bold text-teal-900">
              {userLoan.tenure} months
            </p>
          </div>
          <div>
            <p className="text-sm text-teal-600">Grace Period</p>
            <p className="text-lg font-bold text-teal-900">
              {userLoan.gracePeriod}days
            </p>
          </div>
          <div>
            <p className="text-sm text-teal-600">Due Penalty Interest </p>
            <p className="text-lg font-bold text-teal-900">
              {userLoan.duePenalty} P.a
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
