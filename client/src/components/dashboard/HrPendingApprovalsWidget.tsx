import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { leaveRequests } from "@/data/mockData";
import { ApprovalStepper, getLeaveApprovalSteps } from "@/components/approval/ApprovalStepper";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export function HrPendingApprovalsWidget() {
  const pendingHr = leaveRequests.filter((r) => r.status === "pending_hr");

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Pending HR Approval</CardTitle>
          <Badge variant="destructive" className="text-xs">{pendingHr.length}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingHr.map((req) => (
          <div key={req.id} className="p-3 rounded-lg border space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="text-xs bg-primary/10 text-primary">{req.employee_avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{req.employee_name}</p>
                <p className="text-xs text-muted-foreground">{req.leave_type} · {req.days} days · {req.from_date}</p>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7 text-accent" onClick={() => toast.success("Leave approved!")}>
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => toast.error("Leave rejected")}>
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <ApprovalStepper steps={getLeaveApprovalSteps(req)} />
          </div>
        ))}
        {pendingHr.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">All clear! No pending HR approvals.</p>
        )}
      </CardContent>
    </Card>
  );
}
