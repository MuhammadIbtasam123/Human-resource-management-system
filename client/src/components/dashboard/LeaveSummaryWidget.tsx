import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dataByYear: Record<string, Array<{ type: string; Allocated: number; Used: number; Pending: number }>> = {
  "2025": [
    { type: "Annual", Allocated: 20, Used: 8, Pending: 2 },
    { type: "Sick", Allocated: 12, Used: 3, Pending: 1 },
    { type: "Casual", Allocated: 7, Used: 4, Pending: 0 },
    { type: "Unpaid", Allocated: 10, Used: 0, Pending: 1 },
  ],
  "2024": [
    { type: "Annual", Allocated: 20, Used: 18, Pending: 0 },
    { type: "Sick", Allocated: 12, Used: 7, Pending: 0 },
    { type: "Casual", Allocated: 7, Used: 6, Pending: 0 },
    { type: "Unpaid", Allocated: 10, Used: 2, Pending: 0 },
  ],
  "2023": [
    { type: "Annual", Allocated: 18, Used: 16, Pending: 0 },
    { type: "Sick", Allocated: 10, Used: 5, Pending: 0 },
    { type: "Casual", Allocated: 7, Used: 7, Pending: 0 },
    { type: "Unpaid", Allocated: 10, Used: 1, Pending: 0 },
  ],
};

export function LeaveSummaryWidget() {
  const [year, setYear] = useState("2025");

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">My Leave Summary</CardTitle>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-24 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dataByYear[year]} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="type" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="Allocated" fill="hsl(var(--chart-blue))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Used" fill="hsl(var(--chart-orange))" radius={[2, 2, 0, 0]} />
            <Bar dataKey="Pending" fill="hsl(var(--chart-yellow))" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
