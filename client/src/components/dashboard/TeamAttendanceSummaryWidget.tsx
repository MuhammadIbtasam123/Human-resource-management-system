import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamAttendance } from "@/data/mockData";

export function TeamAttendanceSummaryWidget() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Team Attendance This Month</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 text-xs font-medium text-muted-foreground">Name</th>
                <th className="text-center py-2 text-xs font-medium text-muted-foreground">Attendance %</th>
                <th className="text-center py-2 text-xs font-medium text-muted-foreground">Present</th>
                <th className="text-center py-2 text-xs font-medium text-muted-foreground">Late</th>
              </tr>
            </thead>
            <tbody>
              {teamAttendance.slice(0, 5).map((row) => (
                <tr key={row.user_id} className={`border-b last:border-0 ${row.attendance_pct < 80 ? "bg-destructive/5" : ""}`}>
                  <td className="py-2 font-medium text-foreground">{row.name}</td>
                  <td className="py-2 text-center">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      row.attendance_pct >= 90 ? "bg-accent/10 text-accent" :
                      row.attendance_pct >= 80 ? "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {row.attendance_pct}%
                    </span>
                  </td>
                  <td className="py-2 text-center text-muted-foreground">{row.present}</td>
                  <td className="py-2 text-center text-muted-foreground">{row.late}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
