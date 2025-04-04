import { Card, CardContent } from "@/components/ui/card";
import {
  
  CheckCircle,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

interface EmiSummaryProps {
  totalEmis: number;
  paidEmis: number;
  overdueEmis: number;
  upcomingEmis: number;
  dueEmis: number;
  graceEmis: number;
  totalAmount: number;
  totalPenalty: number;
  totalPaid: number;
  paidpenalty:number
}

export function EmiCards({
  totalEmis,
  paidEmis,
  overdueEmis,
  upcomingEmis,
  dueEmis,
  graceEmis,
  totalAmount,
  totalPenalty,
  paidpenalty,
  totalPaid,
}: EmiSummaryProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Collection Status</h3>
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-3xl font-bold text-teal-700">
                {Math.round((totalPaid / totalAmount) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Collection Rate</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center border-4 border-green-100">
              <span className="text-xl font-bold text-green-600">
                {paidEmis}/{totalEmis}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Paid EMIs</span>
              </div>
              <span className="font-medium">{paidEmis}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Overdue EMIs</span>
              </div>
              <span className="font-medium">{overdueEmis}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Upcoming EMIs</span>
              </div>
              <span className="font-medium">{upcomingEmis}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm">Due/Grace EMIs</span>
              </div>
              <span className="font-medium">{dueEmis + graceEmis}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-teal-600 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Financial Summary</h3>
            <DollarSign className="h-5 w-5 text-white" />
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Total Amount (including penalty)
              </p>
              <p className="text-2xl font-bold text-teal-700">
                ₹{totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="h-px bg-gray-100"></div>
            <div>
              <p className="text-sm text-muted-foreground">
                Amount Collected (including penalty)
              </p>
              <p className="text-2xl font-bold text-green-600">
                ₹{totalPaid.toFixed(2)}
              </p>
            </div>
            <div className="h-px bg-gray-100"></div>
            <div>
              <p className="text-sm text-muted-foreground">
                Remaining Amount (including penalty)
              </p>
              <p className="text-2xl font-bold text-amber-600">
                ₹{(totalAmount - totalPaid).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-amber-600 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">Penalty Overview</h3>
            <AlertTriangle className="h-5 w-5 text-white" />
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Total Penalties</p>
            <p className="text-3xl font-bold text-red-600">
              ₹{totalPenalty.toFixed(2)}
            </p>
          </div>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">Paid Penalties</p>
            <p className="text-3xl font-bold text-orange-600">
              ₹{paidpenalty.toFixed(2)}
            </p>
          </div>

          {/* <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <span className="text-sm">Overdue EMIs</span>
              </div>
              <span className="font-medium">{overdueEmis}</span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${(overdueEmis / totalEmis) * 100}%` }}
              ></div>
            </div>

            <div className="text-xs text-muted-foreground text-right">
              {Math.round((overdueEmis / totalEmis) * 100)}% of total EMIs
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
