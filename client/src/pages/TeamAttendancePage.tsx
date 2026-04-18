import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { teamAttendance } from "@/data/mockData";
import { Download } from "lucide-react";
import { toast } from "sonner";

const TeamAttendancePage = () => {
  return (
    <AppLayout title="Team Attendance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Team Attendance — April 2026</h2>
          <Button variant="outline" size="sm" onClick={() => toast.info("CSV export (mock)")}>
            <Download className="h-4 w-4 mr-1" /> Export CSV
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium text-muted-foreground">Employee</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Present</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Absent</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Late</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">WFH</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Leave</th>
                    <th className="text-center p-3 font-medium text-muted-foreground">Attendance %</th>
                  </tr>
                </thead>
                <tbody>
                  {teamAttendance.map((row) => (
                    <tr key={row.user_id} className={`border-b last:border-0 hover:bg-muted/30 cursor-pointer ${row.attendance_pct < 80 ? "bg-destructive/5" : ""}`}>
                      <td className="p-3 font-medium text-foreground">{row.name}</td>
                      <td className="p-3 text-center">{row.present}</td>
                      <td className="p-3 text-center">{row.absent}</td>
                      <td className="p-3 text-center">{row.late}</td>
                      <td className="p-3 text-center">{row.wfh}</td>
                      <td className="p-3 text-center">{row.leave}</td>
                      <td className="p-3 text-center">
                        <Badge variant="outline" className={`text-xs ${
                          row.attendance_pct >= 90 ? "border-accent text-accent" :
                          row.attendance_pct >= 80 ? "border-[hsl(var(--warning))] text-[hsl(var(--warning))]" :
                          "border-destructive text-destructive"
                        }`}>
                          {row.attendance_pct}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TeamAttendancePage;
