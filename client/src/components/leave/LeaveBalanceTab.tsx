import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const leaveTypes = [
  { type: "Annual Leave", used: 8, total: 20, color: "hsl(var(--chart-blue))", expiry: "Dec 31, 2025", carryForward: true },
  { type: "Sick Leave", used: 3, total: 12, color: "hsl(var(--chart-orange))", expiry: "Dec 31, 2025", carryForward: false },
  { type: "Casual Leave", used: 4, total: 7, color: "hsl(var(--chart-green))", expiry: "Dec 31, 2025", carryForward: false },
  { type: "Unpaid Leave", used: 0, total: 10, color: "hsl(var(--chart-purple))", expiry: "N/A", carryForward: false },
];

export function LeaveBalanceTab() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {leaveTypes.map((leave) => {
        const remaining = leave.total - leave.used;
        const pct = (leave.used / leave.total) * 100;
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (pct / 100) * circumference;

        return (
          <Card key={leave.type}>
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-sm">{leave.type}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-3">
              <div className="relative h-24 w-24">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r={radius} fill="none"
                    stroke={leave.color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-foreground">{remaining}</span>
                  <span className="text-[10px] text-muted-foreground">remaining</span>
                </div>
              </div>
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">
                  Used <span className="font-medium text-foreground">{leave.used}</span> of <span className="font-medium text-foreground">{leave.total}</span> days
                </p>
                {leave.expiry !== "N/A" && (
                  <p className="text-[10px] text-muted-foreground">Expires: {leave.expiry}</p>
                )}
                {leave.carryForward && (
                  <p className="text-[10px] text-accent font-medium">Carry-forward eligible</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
