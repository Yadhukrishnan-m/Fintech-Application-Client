import React, { useCallback, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeFrameSelector } from "./TimeFrameSelector";
import adminAxiosInstance from "@/config/AdminAxiosInstence";

type TimeFrame =  "monthly" | "yearly";


export function ApplicationsChart() {
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>("monthly");

const [data,setData]=useState()

  const fetchData = useCallback(async () => {
    try {
      const response = await adminAxiosInstance.get(
        `/dashboard/application-chart/${timeFrame}`
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  }, [timeFrame]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">
          Loan Applications Overview
        </CardTitle>
        <div className="flex space-x-4">
          <TimeFrameSelector
            timeFrame={timeFrame}
            setTimeFrame={setTimeFrame}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "0.5rem",
                  border: "1px solid #e2e8f0",
                }}
              />
              <Legend />
              <Bar
                dataKey="total"
                name="Total Applications"
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="approved"
                name="Approved"
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rejected"
                name="Rejected"
                fill="#F97316"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
