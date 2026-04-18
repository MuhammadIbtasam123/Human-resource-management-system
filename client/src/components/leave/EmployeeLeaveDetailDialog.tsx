import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays } from "lucide-react";

interface LeaveDetail {
  type: string;
  from: string;
  to: string;
  days: number;
  status: string;
  reason: string;
}

interface EmployeeLeaveInfo {
  name: string;
  initials: string;
  department: string;
  title: string;
  leaves: LeaveDetail[];
}

const statusStyles: Record<string, string> = {
  Approved: "bg-accent/10 text-accent border-accent/30",
  Pending: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30",
  Rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

// Mock detailed leave data per employee
const employeeLeaveData: Record<string, EmployeeLeaveInfo> = {
  "Sarah Chen": {
    name: "Sarah Chen", initials: "SC", department: "Engineering", title: "Frontend Developer",
    leaves: [
      { type: "Annual", from: "Apr 10, 2025", to: "Apr 12, 2025", days: 3, status: "Approved", reason: "Family vacation" },
      { type: "Sick", from: "Mar 5, 2025", to: "Mar 5, 2025", days: 1, status: "Approved", reason: "Not feeling well" },
      { type: "WFH", from: "Feb 20, 2025", to: "Feb 21, 2025", days: 2, status: "Approved", reason: "Internet installation at home" },
    ],
  },
  "Michael Roberts": {
    name: "Michael Roberts", initials: "MR", department: "Sales", title: "Account Executive",
    leaves: [
      { type: "Sick", from: "Apr 14, 2025", to: "Apr 14, 2025", days: 1, status: "Pending", reason: "Doctor appointment" },
      { type: "Annual", from: "Jan 2, 2025", to: "Jan 3, 2025", days: 2, status: "Approved", reason: "New Year break" },
    ],
  },
  "Priya Sharma": {
    name: "Priya Sharma", initials: "PS", department: "Design", title: "UI Designer",
    leaves: [
      { type: "WFH", from: "Apr 15, 2025", to: "Apr 16, 2025", days: 2, status: "Approved", reason: "Focus work on design system" },
      { type: "Casual", from: "Mar 10, 2025", to: "Mar 10, 2025", days: 1, status: "Approved", reason: "Personal errand" },
    ],
  },
  "David Kim": {
    name: "David Kim", initials: "DK", department: "Engineering", title: "Backend Developer",
    leaves: [
      { type: "Casual", from: "Apr 18, 2025", to: "Apr 18, 2025", days: 1, status: "Pending", reason: "Moving to new apartment" },
    ],
  },
  "Emily Watson": {
    name: "Emily Watson", initials: "EW", department: "Marketing", title: "Content Strategist",
    leaves: [
      { type: "Annual", from: "Apr 21, 2025", to: "Apr 25, 2025", days: 5, status: "Approved", reason: "International travel" },
      { type: "Sick", from: "Feb 12, 2025", to: "Feb 13, 2025", days: 2, status: "Approved", reason: "Flu" },
      { type: "Casual", from: "Jan 15, 2025", to: "Jan 15, 2025", days: 1, status: "Approved", reason: "Bank work" },
    ],
  },
};

interface Props {
  employeeName: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmployeeLeaveDetailDialog({ employeeName, open, onOpenChange }: Props) {
  const emp = employeeName ? employeeLeaveData[employeeName] : null;

  if (!emp) return null;

  const totalDays = emp.leaves.reduce((s, l) => s + l.days, 0);
  const approvedDays = emp.leaves.filter((l) => l.status === "Approved").reduce((s, l) => s + l.days, 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary text-sm">{emp.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{emp.name}</p>
              <p className="text-sm text-muted-foreground font-normal">{emp.title} · {emp.department}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 my-4">
          <div className="rounded-lg bg-muted/50 p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{emp.leaves.length}</p>
            <p className="text-xs text-muted-foreground">Total Requests</p>
          </div>
          <div className="rounded-lg bg-accent/10 p-3 text-center">
            <p className="text-2xl font-bold text-accent">{approvedDays}</p>
            <p className="text-xs text-muted-foreground">Days Approved</p>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-2xl font-bold text-primary">{totalDays}</p>
            <p className="text-xs text-muted-foreground">Total Days</p>
          </div>
        </div>

        {/* Leave history table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead className="text-center">Days</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emp.leaves.map((leave, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{leave.type}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{leave.from}</TableCell>
                  <TableCell className="text-sm">{leave.to}</TableCell>
                  <TableCell className="text-center font-medium">{leave.days}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusStyles[leave.status] || ""}`}>
                      {leave.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {leave.reason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
