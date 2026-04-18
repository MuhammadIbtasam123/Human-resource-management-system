import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const leaveTypes = [
  { type: "Annual", used: 8, total: 20, color: "hsl(var(--chart-blue))" },
  { type: "Sick", used: 3, total: 12, color: "hsl(var(--chart-orange))" },
  { type: "Casual", used: 4, total: 7, color: "hsl(var(--chart-green))" },
  { type: "Unpaid", used: 0, total: 10, color: "hsl(var(--chart-purple))" },
];

const pieData = leaveTypes.map((l) => ({
  name: l.type,
  remaining: l.total - l.used,
  used: l.used,
  total: l.total,
  color: l.color,
}));

export function LeaveBalanceSidebar() {
  const totalRemaining = pieData.reduce((s, d) => s + d.remaining, 0);
  const totalAll = pieData.reduce((s, d) => s + d.total, 0);

  return (
    <Card className="h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Leave Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="remaining"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={3}
                strokeWidth={0}
              >
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} days remaining`, name]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-foreground">{totalRemaining}</span>
            <span className="text-[10px] text-muted-foreground">of {totalAll} left</span>
          </div>
        </div>

        <div className="space-y-2">
          {leaveTypes.map((l) => {
            const remaining = l.total - l.used;
            const pct = (remaining / l.total) * 100;
            return (
              <div key={l.type} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="text-foreground font-medium">{l.type}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {remaining}/{l.total}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: l.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
