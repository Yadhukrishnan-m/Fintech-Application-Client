 ;

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface EmiStatusChartProps {
  paidEmis: number;
  overdueEmis: number;
  upcomingEmis: number;
  dueEmis: number;
  graceEmis: number;
}

export function EmiStatusChart({
  paidEmis,
  overdueEmis,
  upcomingEmis,
  dueEmis,
  graceEmis,
}: EmiStatusChartProps) {
  const data = [
    { name: "Paid", value: paidEmis, color: "#10b981" },
    { name: "Overdue", value: overdueEmis, color: "#ef4444" },
    { name: "Upcoming", value: upcomingEmis, color: "#3b82f6" },
    { name: "Due", value: dueEmis, color: "#f59e0b" },
    { name: "Grace", value: graceEmis, color: "#8b5cf6" },
  ].filter((item) => item.value > 0);

  return (
    <Card className="shadow-md border-t-4 border-t-blue-500">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-blue-800">EMI Status Distribution</CardTitle>
        <CardDescription>Overview of EMI payment statuses</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
                strokeWidth={2}
                stroke="#ffffff"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    style={{
                      filter: "drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} EMIs`, "Count"]}
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingTop: "20px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
