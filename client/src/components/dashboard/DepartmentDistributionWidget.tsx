import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { departments, employees } from "@/data/mockData";

export function DepartmentDistributionWidget() {
  const data = departments
    .filter((d) => d.name !== "Executive")
    .map((d) => ({
      name: d.name,
      count: employees.filter((e) => e.department === d.name).length,
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Department Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={80} />
            <Tooltip />
            <Bar dataKey="count" fill="hsl(213,52%,24%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
