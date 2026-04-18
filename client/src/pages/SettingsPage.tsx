import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Building2, Calendar, Users, Bell, Rocket, Shield, Plug, FileText,
  Upload, Plus, Trash2,
} from "lucide-react";

const settingsSections = [
  { id: "company", label: "Company Profile", icon: Building2 },
  { id: "leave", label: "Leave Policy", icon: Calendar },
  { id: "departments", label: "Departments & Roles", icon: Users },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "onboarding", label: "Onboarding Config", icon: Rocket },
  { id: "permissions", label: "Permissions & Roles", icon: Shield },
  { id: "integrations", label: "Integrations", icon: Plug },
  { id: "audit", label: "Audit Log", icon: FileText },
];

const workingDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const leaveTypes = [
  { name: "Annual Leave", allocation: 20, carryForward: true, genderSpecific: false, requiresDoc: false },
  { name: "Sick Leave", allocation: 12, carryForward: false, genderSpecific: false, requiresDoc: true },
  { name: "Casual Leave", allocation: 7, carryForward: false, genderSpecific: false, requiresDoc: false },
  { name: "Maternity Leave", allocation: 90, carryForward: false, genderSpecific: true, requiresDoc: true },
];

const integrations = [
  { name: "Slack", connected: true, lastSync: "2 min ago" },
  { name: "Google Workspace", connected: true, lastSync: "1 hr ago" },
  { name: "ClickUp", connected: false, lastSync: "—" },
  { name: "Microsoft 365", connected: false, lastSync: "—" },
  { name: "Zapier", connected: false, lastSync: "—" },
];

const permissionMatrix = [
  { role: "Employee", dashboard: true, leave: true, attendance: true, people: false, onboarding: false, analytics: false, settings: false },
  { role: "Manager", dashboard: true, leave: true, attendance: true, people: true, onboarding: false, analytics: true, settings: false },
  { role: "HR Admin", dashboard: true, leave: true, attendance: true, people: true, onboarding: true, analytics: true, settings: true },
  { role: "Super Admin", dashboard: true, leave: true, attendance: true, people: true, onboarding: true, analytics: true, settings: true },
];

const auditLog = [
  { user: "Admin", action: "Updated leave policy", target: "Annual Leave", time: "Apr 3, 2025 10:30 AM" },
  { user: "Sarah Chen", action: "Applied leave", target: "Apr 10-12", time: "Apr 2, 2025 3:15 PM" },
  { user: "Admin", action: "Added employee", target: "Alex Morgan", time: "Apr 1, 2025 9:00 AM" },
  { user: "John Doe", action: "Submitted time correction", target: "Apr 1", time: "Apr 1, 2025 6:30 PM" },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("company");

  return (
    <AppLayout title="Settings">
      <div className="flex gap-6">
        {/* Mini sidebar */}
        <div className="hidden lg:block w-52 shrink-0 space-y-1">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm transition-colors ${
                activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <section.icon className="h-4 w-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile section selector */}
          <div className="lg:hidden mb-4">
            <Select value={activeSection} onValueChange={setActiveSection}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {settingsSections.map((s) => <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {activeSection === "company" && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Company Profile</CardTitle></CardHeader>
              <CardContent className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">C</div>
                  <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" />Upload Logo</Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Company Name</Label><Input defaultValue="Clarisync" /></div>
                  <div className="space-y-2"><Label>Timezone</Label>
                    <Select defaultValue="pst"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="pst">Pacific (PST)</SelectItem><SelectItem value="est">Eastern (EST)</SelectItem><SelectItem value="ist">India (IST)</SelectItem></SelectContent></Select>
                  </div>
                  <div className="space-y-2"><Label>Fiscal Year Start</Label>
                    <Select defaultValue="jan"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="jan">January</SelectItem><SelectItem value="apr">April</SelectItem><SelectItem value="jul">July</SelectItem></SelectContent></Select>
                  </div>
                </div>
                <div className="space-y-2"><Label>Address</Label><Textarea defaultValue="123 Innovation Dr, San Francisco, CA 94107" className="min-h-[60px]" /></div>
                <div className="space-y-2">
                  <Label>Working Days</Label>
                  <div className="flex gap-2 flex-wrap">
                    {workingDays.map((day, i) => (
                      <div key={day} className="flex items-center gap-1.5 border rounded-md px-3 py-1.5">
                        <Checkbox defaultChecked={i < 5} /><span className="text-sm">{day}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => toast.success("Settings saved!")}>Save Changes</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "leave" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Leave Policy</CardTitle>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="h-4 w-4 mr-1" />Add Leave Type</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Leave Type</TableHead>
                        <TableHead className="text-center">Annual Allocation</TableHead>
                        <TableHead className="text-center">Carry Forward</TableHead>
                        <TableHead className="text-center">Gender Specific</TableHead>
                        <TableHead className="text-center">Requires Doc</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leaveTypes.map((lt) => (
                        <TableRow key={lt.name} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{lt.name}</TableCell>
                          <TableCell className="text-center">{lt.allocation} days</TableCell>
                          <TableCell className="text-center"><Switch defaultChecked={lt.carryForward} /></TableCell>
                          <TableCell className="text-center"><Switch defaultChecked={lt.genderSpecific} /></TableCell>
                          <TableCell className="text-center"><Switch defaultChecked={lt.requiresDoc} /></TableCell>
                          <TableCell><Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "departments" && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Departments & Roles</CardTitle>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="h-4 w-4 mr-1" />Add Department</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["Engineering", "Product", "Design", "Sales", "Marketing", "HR", "Finance"].map((dept) => (
                    <div key={dept} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30">
                      <div>
                        <p className="font-medium text-foreground">{dept}</p>
                        <p className="text-xs text-muted-foreground">Head: TBD</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><Trash2 className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "notifications" && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Notification Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Leave request approved/rejected",
                  "Birthday reminder",
                  "Work anniversary reminder",
                  "Policy document updated",
                  "New employee joined",
                  "Timesheet reminder",
                ].map((event) => (
                  <div key={event} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-foreground">{event}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5"><Checkbox defaultChecked /><span className="text-xs text-muted-foreground">In-app</span></div>
                      <div className="flex items-center gap-1.5"><Checkbox defaultChecked /><span className="text-xs text-muted-foreground">Email</span></div>
                    </div>
                  </div>
                ))}
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => toast.success("Notification preferences saved!")}>Save</Button>
              </CardContent>
            </Card>
          )}

          {activeSection === "onboarding" && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Onboarding Automation Config</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Toggle automations that fire when a new employee is added.</p>
                {[
                  "Send welcome email to new employee",
                  "Request IT setup (laptop, tools)",
                  "Send introduction to reporting manager",
                  "Send finance onboarding details",
                  "Create company email account",
                  "Send software access invites",
                ].map((auto) => (
                  <div key={auto} className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm text-foreground">{auto}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeSection === "permissions" && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Permissions & Role Matrix</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-center">Dashboard</TableHead>
                        <TableHead className="text-center">Leave</TableHead>
                        <TableHead className="text-center">Attendance</TableHead>
                        <TableHead className="text-center">People</TableHead>
                        <TableHead className="text-center">Onboarding</TableHead>
                        <TableHead className="text-center">Analytics</TableHead>
                        <TableHead className="text-center">Settings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {permissionMatrix.map((row) => (
                        <TableRow key={row.role} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{row.role}</TableCell>
                          {["dashboard", "leave", "attendance", "people", "onboarding", "analytics", "settings"].map((col) => (
                            <TableCell key={col} className="text-center">
                              <Checkbox defaultChecked={(row as unknown as Record<string, boolean>)[col]} />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "integrations" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((int) => (
                <Card key={int.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-5 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{int.name}</h3>
                        <Badge variant="outline" className={`mt-1 text-xs ${int.connected ? "bg-green-100 text-green-700 border-green-200" : "bg-muted text-muted-foreground"}`}>
                          {int.connected ? "Connected" : "Not Connected"}
                        </Badge>
                        {int.connected && <p className="text-xs text-muted-foreground mt-2">Last sync: {int.lastSync}</p>}
                      </div>
                      <Button variant={int.connected ? "outline" : "default"} size="sm" className={!int.connected ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}>
                        {int.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeSection === "audit" && (
            <Card>
              <CardHeader><CardTitle className="text-lg">Audit Log</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {auditLog.map((log, i) => (
                        <TableRow key={i} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{log.user}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.target}</TableCell>
                          <TableCell className="text-muted-foreground">{log.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
