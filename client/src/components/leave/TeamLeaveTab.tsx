import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Download, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";
import { EmployeeLeaveDetailDialog } from "./EmployeeLeaveDetailDialog";

const teamLeaves = [
  { id: 1, name: "Sarah Chen", initials: "SC", department: "Engineering", type: "Annual", from: "Apr 10", to: "Apr 12", days: 3, status: "Approved" },
  { id: 2, name: "Michael Roberts", initials: "MR", department: "Sales", type: "Sick", from: "Apr 14", to: "Apr 14", days: 1, status: "Pending" },
  { id: 3, name: "Priya Sharma", initials: "PS", department: "Design", type: "WFH", from: "Apr 15", to: "Apr 16", days: 2, status: "Approved" },
  { id: 4, name: "David Kim", initials: "DK", department: "Engineering", type: "Casual", from: "Apr 18", to: "Apr 18", days: 1, status: "Pending" },
  { id: 5, name: "Emily Watson", initials: "EW", department: "Marketing", type: "Annual", from: "Apr 21", to: "Apr 25", days: 5, status: "Approved" },
];

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
};

export function TeamLeaveTab() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const filtered = teamLeaves.filter((l) => {
    if (dept !== "all" && l.department !== dept) return false;
    if (status !== "all" && l.status !== status) return false;
    return true;
  });

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-lg">Team Leave View</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant={view === "list" ? "default" : "outline"} size="sm" className="h-8" onClick={() => setView("list")}>
                <List className="h-4 w-4 mr-1" /> List
              </Button>
              <Button variant={view === "calendar" ? "default" : "outline"} size="sm" className="h-8" onClick={() => setView("calendar")}>
                <LayoutGrid className="h-4 w-4 mr-1" /> Calendar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-40 h-9 text-sm"><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="h-9 ml-auto" onClick={() => toast.info("Exporting team summary...")}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-center">Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((l) => (
                  <TableRow
                    key={l.id}
                    className="hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedEmployee(l.name)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{l.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-accent hover:underline">{l.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{l.department}</TableCell>
                    <TableCell>{l.type}</TableCell>
                    <TableCell>{l.from}</TableCell>
                    <TableCell>{l.to}</TableCell>
                    <TableCell className="text-center">{l.days}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[l.status]}>{l.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EmployeeLeaveDetailDialog
        employeeName={selectedEmployee}
        open={!!selectedEmployee}
        onOpenChange={(open) => !open && setSelectedEmployee(null)}
      />
    </>
  );
}
