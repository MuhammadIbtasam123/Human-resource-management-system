import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { leaveRequests } from "@/data/mockData";
import { ApprovalStepper, getLeaveApprovalSteps } from "@/components/approval/ApprovalStepper";
import { CheckCircle, XCircle } from "lucide-react";

const ManagerApprovalsPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");

  // Director reviews manager leave requests
  const managerRequests = leaveRequests.filter(
    (r) => r.employee_id === "u2" || r.employee_id === "u6" || r.employee_id === "u7" || r.employee_id === "u8"
  );

  const selected = leaveRequests.find((r) => r.id === selectedId);

  const handleAction = () => {
    toast.success(action === "approve" ? "Manager leave approved" : "Manager leave rejected");
    setSelectedId(null);
    setAction(null);
    setComment("");
  };

  return (
    <AppLayout title="Manager Approvals">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Review and approve leave requests from managers reporting to you.</p>

        {managerRequests.map((req) => (
          <Card key={req.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">{req.employee_avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">{req.employee_name}</p>
                      <p className="text-xs text-muted-foreground">{req.employee_title}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{req.status.replace("_", " ").toUpperCase()}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{req.leave_type} · {req.from_date} → {req.to_date} · {req.days} days</p>
                  <p className="text-sm">{req.reason}</p>
                  <ApprovalStepper steps={getLeaveApprovalSteps(req)} />
                </div>
                {req.status === "pending_manager" && (
                  <div className="flex flex-col gap-1 shrink-0">
                    <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => { setSelectedId(req.id); setAction("approve"); }}>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive" onClick={() => { setSelectedId(req.id); setAction("reject"); }}>
                      <XCircle className="h-3.5 w-3.5 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {managerRequests.length === 0 && (
          <Card><CardContent className="p-8 text-center text-muted-foreground">No manager leave requests.</CardContent></Card>
        )}
      </div>

      <Dialog open={!!selectedId} onOpenChange={() => { setSelectedId(null); setAction(null); }}>
        <DialogContent>
          <DialogHeader><DialogTitle>{action === "approve" ? "Approve" : "Reject"} Manager Leave</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <p className="text-sm"><span className="font-medium">{selected.employee_name}</span> — {selected.leave_type}, {selected.days} day(s)</p>
              <Textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedId(null)}>Cancel</Button>
            <Button className={action === "approve" ? "bg-accent text-accent-foreground" : "bg-destructive text-destructive-foreground"} onClick={handleAction}>
              {action === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default ManagerApprovalsPage;
