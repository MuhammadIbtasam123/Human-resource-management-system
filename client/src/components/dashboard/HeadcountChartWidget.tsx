import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "May", count: 128 }, { month: "Jun", count: 130 }, { month: "Jul", count: 132 },
  { month: "Aug", count: 131 }, { month: "Sep", count: 134 }, { month: "Oct", count: 136 },
  { month: "Nov", count: 135 }, { month: "Dec", count: 137 }, { month: "Jan", count: 138 },
  { month: "Feb", count: 139 }, { month: "Mar", count: 140 }, { month: "Apr", count: 142 },
];

export function HeadcountChartWidget() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Headcount Trend (12M)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="hsl(160,100%,39%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
