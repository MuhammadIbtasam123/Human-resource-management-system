import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Mail, LinkIcon, MessageSquare, DollarSign, UserPlus,
  Monitor, FileText, CheckCircle2, ChevronRight, ChevronLeft,
  Rocket, Eye,
} from "lucide-react";

const steps = ["Personal Details", "Employment", "System Access", "Automation Preview", "Review & Submit"];

const softwareTools = [
  { name: "ClickUp", checked: true },
  { name: "Slack", checked: true },
  { name: "Notion", checked: true },
  { name: "GitHub", checked: false },
  { name: "Figma", checked: false },
  { name: "Jira", checked: true },
];

const automations = [
  { icon: Mail, label: "Company email creation request", recipient: "IT Team", enabled: true },
  { icon: Mail, label: "Welcome email with credentials & handbook", recipient: "New Employee", enabled: true },
  { icon: LinkIcon, label: "ClickUp invite", recipient: "Company Email", enabled: true },
  { icon: MessageSquare, label: "Slack/Teams invite", recipient: "Company Email", enabled: true },
  { icon: DollarSign, label: "Finance onboarding email", recipient: "Finance Team", enabled: true },
  { icon: UserPlus, label: "Introduction email to Manager", recipient: "Reporting Manager", enabled: true },
  { icon: Monitor, label: "IT setup request (laptop, tools, access)", recipient: "IT Team", enabled: true },
  { icon: FileText, label: "Document checklist email", recipient: "New Employee", enabled: true },
];

const onboardingTracker = [
  { id: 1, name: "Alex Morgan", initials: "AM", startDate: "Apr 3, 2025", progress: 40, manager: "John Doe", status: "In Progress" },
  { id: 2, name: "Lisa Park", initials: "LP", startDate: "Apr 1, 2025", progress: 75, manager: "Sarah Chen", status: "In Progress" },
  { id: 3, name: "Tom Wilson", initials: "TW", startDate: "Mar 15, 2025", progress: 100, manager: "David Kim", status: "Completed" },
];

const statusStyles: Record<string, string> = {
  "Not Started": "bg-muted text-muted-foreground",
  "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
  "Completed": "bg-green-100 text-green-700 border-green-200",
};

const OnboardingPage = () => {
  const [activeTab, setActiveTab] = useState("wizard");
  const [step, setStep] = useState(0);
  const [autoToggles, setAutoToggles] = useState(automations.map((a) => a.enabled));

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <AppLayout title="Onboarding">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="wizard">Add New Employee</TabsTrigger>
          <TabsTrigger value="tracker">Onboarding Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="wizard">
          {/* Step Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              {steps.map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium border-2 ${
                    i < step ? "bg-accent text-accent-foreground border-accent" :
                    i === step ? "bg-primary text-primary-foreground border-primary" :
                    "bg-muted text-muted-foreground border-border"
                  }`}>
                    {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className={`hidden sm:block h-0.5 w-8 lg:w-16 ${i < step ? "bg-accent" : "bg-border"}`} />}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-foreground">{steps[step]}</p>
          </div>

          <Card className="max-w-3xl">
            <CardContent className="pt-6 space-y-5">
              {step === 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Full Name <span className="text-destructive">*</span></Label><Input placeholder="e.g. Jane Smith" /></div>
                    <div className="space-y-2"><Label>Personal Email <span className="text-destructive">*</span></Label><Input type="email" placeholder="jane@email.com" /></div>
                    <div className="space-y-2"><Label>Phone <span className="text-destructive">*</span></Label><Input placeholder="+1 555-0000" /></div>
                    <div className="space-y-2"><Label>Date of Birth</Label><Input type="date" /></div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem><SelectItem value="prefer-not">Prefer not to say</SelectItem></SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2"><Label>Emergency Contact</Label><Input placeholder="Name & Phone" /></div>
                  </div>
                  <div className="space-y-2"><Label>Address</Label><Textarea placeholder="Full address" className="min-h-[60px]" /></div>
                </>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Job Title <span className="text-destructive">*</span></Label><Input placeholder="e.g. Software Engineer" /></div>
                  <div className="space-y-2">
                    <Label>Department <span className="text-destructive">*</span></Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="eng">Engineering</SelectItem><SelectItem value="product">Product</SelectItem><SelectItem value="design">Design</SelectItem><SelectItem value="sales">Sales</SelectItem><SelectItem value="hr">HR</SelectItem><SelectItem value="marketing">Marketing</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Reports To</Label><Input placeholder="Manager name" /></div>
                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="full">Full-time</SelectItem><SelectItem value="part">Part-time</SelectItem><SelectItem value="contract">Contract</SelectItem><SelectItem value="intern">Intern</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Start Date <span className="text-destructive">*</span></Label><Input type="date" /></div>
                  <div className="space-y-2"><Label>Probation Period</Label><Input placeholder="e.g. 3 months" /></div>
                  <div className="space-y-2">
                    <Label>Work Location</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent><SelectItem value="onsite">On-site</SelectItem><SelectItem value="remote">Remote</SelectItem><SelectItem value="hybrid">Hybrid</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2"><Label>Salary (Confidential)</Label><Input type="number" placeholder="Annual salary" /></div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company Email</Label>
                      <Input placeholder="firstname.lastname@clarisync.com" />
                      <p className="text-xs text-muted-foreground">Auto-suggested format</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Role / Permission Level</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                        <SelectContent><SelectItem value="employee">Employee</SelectItem><SelectItem value="manager">Manager</SelectItem><SelectItem value="hr-admin">HR Admin</SelectItem><SelectItem value="finance">Finance</SelectItem><SelectItem value="super-admin">Super Admin</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label>Software Access</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {softwareTools.map((tool) => (
                        <div key={tool.name} className="flex items-center gap-2 p-2 border rounded-md">
                          <Checkbox defaultChecked={tool.checked} />
                          <span className="text-sm">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">These automations will be triggered on submit:</p>
                  {automations.map((auto, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
                      <auto.icon className="h-4 w-4 text-accent shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{auto.label}</p>
                        <p className="text-xs text-muted-foreground">→ {auto.recipient}</p>
                      </div>
                      <Switch checked={autoToggles[i]} onCheckedChange={(v) => { const t = [...autoToggles]; t[i] = v; setAutoToggles(t); }} />
                      <Badge variant="outline" className={autoToggles[i] ? "bg-green-100 text-green-700 border-green-200 text-xs" : "bg-muted text-muted-foreground text-xs"}>
                        {autoToggles[i] ? "Will Send" : "Skipped"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {step === 4 && (
                <div className="text-center space-y-4 py-6">
                  <Rocket className="h-12 w-12 text-accent mx-auto" />
                  <h3 className="text-lg font-semibold text-foreground">Ready to Onboard!</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Review all details above. Clicking submit will create the employee record and trigger all enabled automations.
                  </p>
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => toast.success("Employee onboarded successfully! Automations triggered.")}>
                    Submit & Trigger Onboarding
                  </Button>
                </div>
              )}

              {step < 4 && (
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="outline" onClick={prevStep} disabled={step === 0}><ChevronLeft className="h-4 w-4 mr-1" />Back</Button>
                  <Button onClick={nextStep} className="bg-primary text-primary-foreground">Next<ChevronRight className="h-4 w-4 ml-1" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracker">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Onboarding Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {onboardingTracker.map((emp) => (
                      <TableRow key={emp.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary/10 text-primary text-[10px]">{emp.initials}</AvatarFallback></Avatar>
                            <span className="font-medium">{emp.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{emp.startDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 w-32">
                            <Progress value={emp.progress} className="h-2 flex-1" />
                            <span className="text-xs text-muted-foreground">{emp.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{emp.manager}</TableCell>
                        <TableCell><Badge variant="outline" className={statusStyles[emp.status]}>{emp.status}</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default OnboardingPage;
