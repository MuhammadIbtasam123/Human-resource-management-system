import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Present", value: 18, color: "hsl(var(--chart-green))" },
  { name: "Absent", value: 2, color: "hsl(var(--chart-red))" },
  { name: "WFH", value: 3, color: "hsl(var(--chart-blue))" },
  { name: "Late", value: 2, color: "hsl(var(--chart-yellow))" },
];

const total = data.reduce((a, b) => a + b.value, 0);

export function AttendanceWidget() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Attendance This Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          <div className="relative w-40 h-40 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{total}</span>
              <span className="text-[10px] text-muted-foreground">Working Days</span>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <div className="flex-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{item.name}</span>
                  <span className="text-muted-foreground">
                    {item.value} ({Math.round((item.value / total) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
