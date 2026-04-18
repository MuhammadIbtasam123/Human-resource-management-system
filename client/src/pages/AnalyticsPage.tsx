import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const headcountData = [
  { month: "Jan", count: 130 }, { month: "Feb", count: 132 }, { month: "Mar", count: 136 },
  { month: "Apr", count: 138 }, { month: "May", count: 140 }, { month: "Jun", count: 142 },
];

const deptDistribution = [
  { dept: "Engineering", count: 48 }, { dept: "Product", count: 18 }, { dept: "Sales", count: 22 },
  { dept: "Design", count: 12 }, { dept: "Marketing", count: 15 }, { dept: "HR", count: 10 },
  { dept: "Finance", count: 8 }, { dept: "Operations", count: 9 },
];

const wfhData = [
  { name: "On-site", value: 60, color: "hsl(var(--chart-blue))" },
  { name: "WFH", value: 25, color: "hsl(var(--chart-green))" },
  { name: "Hybrid", value: 15, color: "hsl(var(--chart-yellow))" },
];

const leaveUsageMonthly = [
  { month: "Jan", Annual: 12, Sick: 5, Casual: 3, Unpaid: 1 },
  { month: "Feb", Annual: 8, Sick: 7, Casual: 4, Unpaid: 0 },
  { month: "Mar", Annual: 15, Sick: 3, Casual: 2, Unpaid: 2 },
  { month: "Apr", Annual: 10, Sick: 4, Casual: 5, Unpaid: 1 },
];

const topLeaveTakers = [
  { name: "Emily Watson", initials: "EW", days: 5 },
  { name: "Michael Roberts", initials: "MR", days: 4 },
  { name: "Sarah Chen", initials: "SC", days: 3 },
  { name: "David Kim", initials: "DK", days: 3 },
  { name: "Lisa Park", initials: "LP", days: 2 },
];

const attendanceReport = [
  { name: "John Doe", total: 25, present: 22, absent: 1, late: 2, wfh: 3, leave: 2, pct: 88 },
  { name: "Sarah Chen", total: 25, present: 20, absent: 2, late: 1, wfh: 2, leave: 3, pct: 80 },
  { name: "Michael Roberts", total: 25, present: 23, absent: 0, late: 3, wfh: 1, leave: 1, pct: 92 },
  { name: "Priya Sharma", total: 25, present: 18, absent: 3, late: 0, wfh: 5, leave: 2, pct: 72 },
  { name: "David Kim", total: 25, present: 24, absent: 0, late: 1, wfh: 0, leave: 1, pct: 96 },
];

const exportReports = [
  { title: "Monthly Attendance Summary", desc: "Complete attendance data for all employees" },
  { title: "Leave Ledger", desc: "Detailed leave balances and usage" },
  { title: "New Joiners Report", desc: "Employees onboarded this quarter" },
  { title: "Attrition Report", desc: "Employee separations and trends" },
  { title: "Payroll-ready Attendance Sheet", desc: "Formatted for payroll processing" },
  { title: "Custom Report Builder", desc: "Select fields, date range, and format" },
];

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout title="Analytics & Reports">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
          <TabsTrigger value="leave">Leave Reports</TabsTrigger>
          <TabsTrigger value="export">Export Center</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Headcount */}
              <Card>
                <CardHeader><CardTitle className="text-base">Headcount Over Time</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={headcountData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                      <Line type="monotone" dataKey="count" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Dept Distribution */}
              <Card>
                <CardHeader><CardTitle className="text-base">Department Distribution</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={deptDistribution} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis type="number" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} className="fill-muted-foreground" width={80} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* WFH Adoption */}
              <Card>
                <CardHeader><CardTitle className="text-base">Work Location Distribution</CardTitle></CardHeader>
                <CardContent>
                  <div className="flex items-center gap-6">
                    <div className="w-40 h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={wfhData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value" strokeWidth={0}>
                            {wfhData.map((e, i) => <Cell key={i} fill={e.color} />)}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-2">
                      {wfhData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-foreground">{item.name}</span>
                          <span className="text-sm text-muted-foreground ml-auto">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leave Usage Trend */}
              <Card>
                <CardHeader><CardTitle className="text-base">Leave Usage by Type (Monthly)</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={leaveUsageMonthly}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Bar dataKey="Annual" stackId="a" fill="hsl(var(--chart-blue))" />
                      <Bar dataKey="Sick" stackId="a" fill="hsl(var(--chart-orange))" />
                      <Bar dataKey="Casual" stackId="a" fill="hsl(var(--chart-green))" />
                      <Bar dataKey="Unpaid" stackId="a" fill="hsl(var(--chart-purple))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Leave Takers */}
            <Card>
              <CardHeader><CardTitle className="text-base">Top Leave Takers This Month</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topLeaveTakers.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                      <span className="text-sm font-bold text-muted-foreground w-5">#{i + 1}</span>
                      <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px]">{p.initials}</AvatarFallback></Avatar>
                      <span className="text-sm font-medium text-foreground flex-1">{p.name}</span>
                      <Badge variant="outline" className="text-xs">{p.days} days</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-lg">Attendance Report</CardTitle>
                <div className="flex gap-2">
                  <Input type="date" className="h-9 w-36 text-sm" />
                  <Input type="date" className="h-9 w-36 text-sm" />
                  <Select><SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Department" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Depts</SelectItem><SelectItem value="eng">Engineering</SelectItem></SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="h-9" onClick={() => toast.info("Exporting...")}><Download className="h-4 w-4 mr-1" />Export</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Absent</TableHead>
                      <TableHead className="text-center">Late</TableHead>
                      <TableHead className="text-center">WFH</TableHead>
                      <TableHead className="text-center">Leave</TableHead>
                      <TableHead className="text-center">Attendance %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceReport.map((r) => (
                      <TableRow key={r.name} className={`hover:bg-muted/50 ${r.pct < 80 ? "bg-destructive/5" : ""}`}>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell className="text-center">{r.total}</TableCell>
                        <TableCell className="text-center">{r.present}</TableCell>
                        <TableCell className="text-center">{r.absent}</TableCell>
                        <TableCell className="text-center">{r.late}</TableCell>
                        <TableCell className="text-center">{r.wfh}</TableCell>
                        <TableCell className="text-center">{r.leave}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className={r.pct < 80 ? "bg-red-100 text-red-700 border-red-200" : "bg-green-100 text-green-700 border-green-200"}>{r.pct}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <Card>
            <CardHeader><CardTitle className="text-lg">Leave Report</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead className="text-center">Used</TableHead>
                      <TableHead className="text-center">Remaining</TableHead>
                      <TableHead className="text-center">Pending</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: "John Doe", type: "Annual", used: 8, remaining: 12, pending: 2 },
                      { name: "Sarah Chen", type: "Annual", used: 12, remaining: 8, pending: 0 },
                      { name: "Michael Roberts", type: "Sick", used: 5, remaining: 7, pending: 1 },
                      { name: "Priya Sharma", type: "Casual", used: 6, remaining: 1, pending: 0 },
                      { name: "David Kim", type: "Annual", used: 3, remaining: 17, pending: 1 },
                    ].map((r, i) => (
                      <TableRow key={i} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell className="text-center">{r.used}</TableCell>
                        <TableCell className="text-center">{r.remaining}</TableCell>
                        <TableCell className="text-center">{r.pending > 0 ? <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 text-xs">{r.pending}</Badge> : "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exportReports.map((report) => (
              <Card key={report.title} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground">{report.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{report.desc}</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Downloading CSV...")}>CSV</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Downloading PDF...")}>PDF</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => toast.success("Downloading XLSX...")}>XLSX</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AnalyticsPage;
