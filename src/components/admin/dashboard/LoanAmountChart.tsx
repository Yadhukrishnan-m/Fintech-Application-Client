import { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeFrameSelector } from "./TimeFrameSelector";
import adminAxiosInstance from "@/config/AdminAxiosInstence";

type TimeFrame = "monthly" | "yearly";

interface ITransactionChartData {
  name: "Principal" | "Interest" | "Penalty";
  value: number;
}

const COLORS = ["#0EA5E9", "#D946EF", "#F97316"];

export function LoanAmountChart() {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("monthly");
  const [data, setData] = useState<ITransactionChartData[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await adminAxiosInstance.get(
        `/dashboard/transaction-chart/${timeFrame}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  }, [timeFrame]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const total = data.reduce((acc, item) => acc + item.value, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          Loan Repayment Graph
        </CardTitle>
        <TimeFrameSelector timeFrame={timeFrame} setTimeFrame={setTimeFrame} />
      </CardHeader>
      <CardContent>
        <div className="h-[330px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(val) => `$${val}`} />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value)]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Legend />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4 text-center">
          <div className="rounded-lg bg-gray-100 p-2">
            <h3 className="font-medium text-gray-700">Total Amount Received</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(total)}
            </p>
          </div>
          <div className="rounded-lg bg-blue-50 p-2">
            <h3 className="font-medium text-blue-600">Principal Received</h3>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(data[0]?.value || 0)}
            </p>
          </div>
          <div className="rounded-lg bg-purple-50 p-2">
            <h3 className="font-medium text-purple-600">Interest Received</h3>
            <p className="text-2xl font-bold text-purple-600">
              {formatCurrency(data[1]?.value || 0)}
            </p>
          </div>
          <div className="rounded-lg bg-orange-50 p-2">
            <h3 className="font-medium text-orange-600">Penalty Received</h3>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(data[2]?.value || 0)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
