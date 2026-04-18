import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, CalendarDays, Briefcase, TrendingUp, TrendingDown } from "lucide-react";

const kpis = [
  { label: "Total Employees", value: "142", trend: "+3", trendUp: true, icon: Users },
  { label: "Present Today", value: "118", trend: "+5", trendUp: true, icon: UserCheck },
  { label: "On Leave Today", value: "8", trend: "-2", trendUp: false, icon: CalendarDays },
  { label: "Open Positions", value: "6", trend: "+1", trendUp: true, icon: Briefcase },
];

export function KpiStrip() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="pt-5 pb-4 px-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{kpi.label}</p>
                <p className="text-3xl font-bold text-foreground mt-1">{kpi.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {kpi.trendUp ? (
                    <TrendingUp className="h-3 w-3 text-accent" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span className={`text-xs font-medium ${kpi.trendUp ? "text-accent" : "text-destructive"}`}>
                    {kpi.trend} vs last month
                  </span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
