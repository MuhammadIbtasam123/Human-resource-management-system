import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, CheckCircle, Clock, Sun, TrendingUp, TrendingDown, Users, UserCheck, Briefcase, AlertTriangle } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";

const employeeKpis = [
  { label: "My Leave Balance", value: "14", trend: "", icon: CalendarDays },
  { label: "Days Present", value: "18", trend: "+2 vs last month", trendUp: true, icon: CheckCircle },
  { label: "Pending Requests", value: "2", trend: "", icon: Clock },
  { label: "Upcoming Holidays", value: "3", trend: "", icon: Sun },
];

const managerKpisLeft = [
  { label: "My Leave Balance", value: "12", icon: CalendarDays },
  { label: "Days Present", value: "20", icon: CheckCircle },
];

const managerKpisRight = [
  { label: "Team Headcount", value: "8", icon: Users },
  { label: "Present Today", value: "6", icon: UserCheck },
  { label: "On Leave Today", value: "1", icon: CalendarDays },
  { label: "Pending Approvals", value: "3", icon: AlertTriangle, highlight: true },
];

const hrKpis = [
  { label: "Total Employees", value: "142", trend: "+3", trendUp: true, icon: Users },
  { label: "Present Today %", value: "83%", trend: "+5%", trendUp: true, icon: UserCheck },
  { label: "On Leave Today", value: "8", trend: "-2", trendUp: false, icon: CalendarDays },
  { label: "Open Onboarding", value: "3", trend: "+1", trendUp: true, icon: Briefcase },
  { label: "Attrition YTD", value: "4.2%", trend: "-0.5%", trendUp: false, icon: AlertTriangle },
];

const directorKpis = hrKpis;

export function RoleKpiStrip() {
  const { role } = useRole();

  if (role === "employee") {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {employeeKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-5 pb-4 px-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{kpi.label}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{kpi.value}</p>
                  {kpi.trend && (
                    <div className="flex items-center gap-1 mt-1">
                      {kpi.trendUp ? <TrendingUp className="h-3 w-3 text-accent" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                      <span className={`text-xs font-medium ${kpi.trendUp ? "text-accent" : "text-destructive"}`}>{kpi.trend}</span>
                    </div>
                  )}
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

  if (role === "manager") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-4 pb-4 px-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">My Stats</p>
            <div className="grid grid-cols-2 gap-4">
              {managerKpisLeft.map((kpi) => (
                <div key={kpi.label} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <kpi.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">{kpi.label}</p>
                    <p className="text-xl font-bold text-foreground">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4 px-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">My Team Stats</p>
            <div className="grid grid-cols-2 gap-3">
              {managerKpisRight.map((kpi) => (
                <div key={kpi.label} className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${"highlight" in kpi && kpi.highlight ? "bg-destructive/10" : "bg-accent/10"}`}>
                    <kpi.icon className={`h-4 w-4 ${"highlight" in kpi && kpi.highlight ? "text-destructive" : "text-accent"}`} />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase">{kpi.label}</p>
                    <p className="text-lg font-bold text-foreground">{kpi.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // HR Admin & Director
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {(role === "director" ? directorKpis : hrKpis).map((kpi) => (
        <Card key={kpi.label}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{kpi.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                {kpi.trend && (
                  <div className="flex items-center gap-1 mt-0.5">
                    {kpi.trendUp ? <TrendingUp className="h-3 w-3 text-accent" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    <span className={`text-[10px] font-medium ${kpi.trendUp ? "text-accent" : "text-destructive"}`}>{kpi.trend}</span>
                  </div>
                )}
              </div>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
