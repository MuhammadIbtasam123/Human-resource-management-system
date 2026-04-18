import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { leaveRequests } from "@/data/mockData";
import { ApprovalStepper, getLeaveApprovalSteps } from "@/components/approval/ApprovalStepper";
import { CheckCircle, XCircle, Paperclip } from "lucide-react";

export function TeamPendingApprovalsWidget() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [comment, setComment] = useState("");

  const pendingRequests = leaveRequests.filter(
    (r) => r.status === "pending_manager"
  ).slice(0, 4);

  const handleAction = () => {
    toast.success(
      action === "approve"
        ? "Leave request approved and forwarded to HR"
        : "Leave request rejected"
    );
    setSelectedRequest(null);
    setAction(null);
    setComment("");
  };

  const selected = leaveRequests.find((r) => r.id === selectedRequest);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">Team Pending Approvals</CardTitle>
            <Badge variant="destructive" className="text-xs">{pendingRequests.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingRequests.map((req) => (
            <div key={req.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">{req.employee_avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{req.employee_name}</p>
                <p className="text-xs text-muted-foreground">
                  {req.leave_type} · {req.from_date} → {req.to_date} ({req.days}d)
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">{req.reason}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="icon" variant="ghost" className="h-7 w-7 text-accent hover:bg-accent/10" onClick={() => { setSelectedRequest(req.id); setAction("approve"); }}>
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:bg-destructive/10" onClick={() => { setSelectedRequest(req.id); setAction("reject"); }}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {pendingRequests.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No pending approvals 🎉</p>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={() => { setSelectedRequest(null); setAction(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{action === "approve" ? "Approve" : "Reject"} Leave Request</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">{selected.employee_avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selected.employee_name}</p>
                  <p className="text-xs text-muted-foreground">{selected.employee_title}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><span className="text-muted-foreground">Type:</span> <Badge variant="outline">{selected.leave_type}</Badge></div>
                <div><span className="text-muted-foreground">Days:</span> {selected.days}</div>
                <div><span className="text-muted-foreground">From:</span> {selected.from_date}</div>
                <div><span className="text-muted-foreground">To:</span> {selected.to_date}</div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Reason:</p>
                <p className="text-sm">{selected.reason}</p>
                {selected.attachment && <p className="text-xs text-accent flex items-center gap-1 mt-1"><Paperclip className="h-3 w-3" /> Attachment uploaded</p>}
              </div>
              <ApprovalStepper steps={getLeaveApprovalSteps(selected)} />
              <Textarea placeholder={action === "reject" ? "Reason for rejection (required)" : "Comment (optional)"} value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedRequest(null)}>Cancel</Button>
            <Button
              className={action === "approve" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-destructive text-destructive-foreground"}
              onClick={handleAction}
              disabled={action === "reject" && !comment}
            >
              {action === "approve" ? "Approve" : "Reject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
