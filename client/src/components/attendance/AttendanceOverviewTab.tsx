import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const summaryData = [
  { label: "Days Present", value: 18, color: "bg-green-100 text-green-700 border-green-200" },
  { label: "Days Absent", value: 2, color: "bg-red-100 text-red-700 border-red-200" },
  { label: "WFH Days", value: 3, color: "bg-blue-100 text-blue-700 border-blue-200" },
  { label: "Leaves Taken", value: 2, color: "bg-amber-100 text-amber-700 border-amber-200" },
  { label: "Late Arrivals", value: 4, color: "bg-orange-100 text-orange-700 border-orange-200" },
  { label: "Early Departures", value: 1, color: "bg-purple-100 text-purple-700 border-purple-200" },
];

const weeklyData = [
  { week: "Week 1", worked: 42, expected: 40 },
  { week: "Week 2", worked: 38, expected: 40 },
  { week: "Week 3", worked: 40, expected: 40 },
  { week: "Week 4", worked: 35, expected: 40 },
];

export function AttendanceOverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {summaryData.map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-4 pb-3 px-4 text-center">
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Weekly Hours — Worked vs Expected</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Bar dataKey="worked" name="Worked" fill="hsl(var(--chart-green))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expected" name="Expected" fill="hsl(var(--chart-blue))" radius={[4, 4, 0, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
