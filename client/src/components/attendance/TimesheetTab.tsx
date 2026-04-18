import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";

const statusStyles: Record<string, string> = {
  Present: "bg-green-100 text-green-700 border-green-200",
  Absent: "bg-red-100 text-red-700 border-red-200",
  WFH: "bg-blue-100 text-blue-700 border-blue-200",
  Leave: "bg-amber-100 text-amber-700 border-amber-200",
  Late: "bg-orange-100 text-orange-700 border-orange-200",
};

const timesheetData = [
  { date: "Apr 1", day: "Tue", clockIn: "09:02 AM", clockOut: "06:15 PM", hours: "9h 13m", status: "Present" },
  { date: "Apr 2", day: "Wed", clockIn: "09:30 AM", clockOut: "06:05 PM", hours: "8h 35m", status: "Late" },
  { date: "Apr 3", day: "Thu", clockIn: "08:55 AM", clockOut: "—", hours: "—", status: "Present" },
  { date: "Apr 4", day: "Fri", clockIn: "—", clockOut: "—", hours: "—", status: "WFH" },
  { date: "Apr 5", day: "Sat", clockIn: "—", clockOut: "—", hours: "—", status: "Absent" },
  { date: "Apr 6", day: "Sun", clockIn: "—", clockOut: "—", hours: "—", status: "Absent" },
  { date: "Apr 7", day: "Mon", clockIn: "09:00 AM", clockOut: "06:00 PM", hours: "9h 0m", status: "Present" },
  { date: "Apr 8", day: "Tue", clockIn: "—", clockOut: "—", hours: "—", status: "Leave" },
];

export function TimesheetTab() {
  const presentDays = timesheetData.filter((d) => d.status === "Present" || d.status === "Late").length;
  const totalHours = "35h 48m";
  const absences = timesheetData.filter((d) => d.status === "Absent").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <CardTitle className="text-lg">Monthly Timesheet — April 2025</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Bar */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-center">
            <p className="text-2xl font-bold text-green-700">{presentDays}</p>
            <p className="text-xs text-green-600">Present Days</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-center">
            <p className="text-2xl font-bold text-blue-700">{totalHours}</p>
            <p className="text-xs text-blue-600">Total Hours</p>
          </div>
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-center">
            <p className="text-2xl font-bold text-red-700">{absences}</p>
            <p className="text-xs text-red-600">Absences</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Day</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timesheetData.map((row, i) => (
                <TableRow key={i} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{row.date}</TableCell>
                  <TableCell>{row.day}</TableCell>
                  <TableCell>{row.clockIn}</TableCell>
                  <TableCell>{row.clockOut}</TableCell>
                  <TableCell>{row.hours}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
