import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { leaveRequests } from "@/data/mockData";
import { ApprovalStepper, getLeaveApprovalSteps } from "@/components/approval/ApprovalStepper";
import { CheckCircle, XCircle, Paperclip, Search } from "lucide-react";

const TeamLeaveApprovalsPage = () => {
  const [tab, setTab] = useState("pending");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");

  const filtered = leaveRequests.filter((r) => {
    if (tab === "pending" && r.status !== "pending_manager") return false;
    if (tab === "approved" && r.status !== "approved") return false;
    if (tab === "rejected" && r.status !== "rejected") return false;
    if (search && !r.employee_name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== "all" && r.leave_type !== typeFilter) return false;
    return true;
  });

  const selected = leaveRequests.find((r) => r.id === selectedId);

  const handleAction = () => {
    toast.success(action === "approve" ? "Leave approved and forwarded to HR" : "Leave rejected");
    setSelectedId(null);
    setAction(null);
    setComment("");
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending_manager: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]",
      pending_hr: "bg-primary/10 text-primary",
      approved: "bg-accent/10 text-accent",
      rejected: "bg-destructive/10 text-destructive",
      cancelled: "bg-muted text-muted-foreground",
    };
    return map[status] || "";
  };

  return (
    <AppLayout title="Team Leave Approvals">
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <TabsList className="h-auto gap-1">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-8 h-9 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9 w-36"><SelectValue placeholder="Leave type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Annual Leave">Annual</SelectItem>
                <SelectItem value="Sick Leave">Sick</SelectItem>
                <SelectItem value="Casual Leave">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {["pending", "approved", "rejected", "all"].map((t) => (
          <TabsContent key={t} value={t}>
            <div className="space-y-3">
              {filtered.map((req) => (
                <Card key={req.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{req.employee_avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">{req.employee_name}</p>
                            <p className="text-xs text-muted-foreground">{req.employee_title}</p>
                          </div>
                          <Badge className={`text-[10px] ${statusBadge(req.status)}`}>
                            {req.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span>{req.leave_type}</span>
                          <span>{req.from_date} → {req.to_date}</span>
                          <span className="font-medium text-foreground">{req.days} day{req.days > 1 ? "s" : ""}</span>
                          {req.attachment && <span className="text-accent flex items-center gap-1"><Paperclip className="h-3 w-3" /> Attached</span>}
                        </div>
                        <p className="text-sm text-muted-foreground">{req.reason}</p>
                        <ApprovalStepper steps={getLeaveApprovalSteps(req)} />
                      </div>
                      {req.status === "pending_manager" && (
                        <div className="flex flex-col gap-1 shrink-0">
                          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => { setSelectedId(req.id); setAction("approve"); }}>
                            <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30" onClick={() => { setSelectedId(req.id); setAction("reject"); }}>
                            <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filtered.length === 0 && (
                <Card><CardContent className="p-8 text-center text-muted-foreground">No requests found.</CardContent></Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={!!selectedId} onOpenChange={() => { setSelectedId(null); setAction(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>{action === "approve" ? "Approve" : "Reject"} Leave Request</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <p className="text-sm"><span className="font-medium">{selected.employee_name}</span> — {selected.leave_type}, {selected.days} day(s)</p>
              <Textarea placeholder={action === "reject" ? "Reason for rejection (required)" : "Comment (optional)"} value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedId(null)}>Cancel</Button>
            <Button className={action === "approve" ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"} onClick={handleAction} disabled={action === "reject" && !comment}>
              {action === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default TeamLeaveApprovalsPage;
