import { Check, X, Clock } from "lucide-react";

interface Step {
  label: string;
  actor?: string;
  role?: string;
  status: "completed" | "current" | "pending" | "rejected";
  timestamp?: string;
  comment?: string;
}

interface ApprovalStepperProps {
  steps: Step[];
}

export function ApprovalStepper({ steps }: ApprovalStepperProps) {
  return (
    <div className="flex items-start gap-0">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                step.status === "completed"
                  ? "bg-accent text-accent-foreground"
                  : step.status === "current"
                  ? "border-2 border-accent text-accent animate-pulse"
                  : step.status === "rejected"
                  ? "bg-destructive text-destructive-foreground"
                  : "border-2 border-muted-foreground/30 text-muted-foreground"
              }`}
            >
              {step.status === "completed" ? (
                <Check className="h-4 w-4" />
              ) : step.status === "rejected" ? (
                <X className="h-4 w-4" />
              ) : step.status === "current" ? (
                <Clock className="h-3.5 w-3.5" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <div className="text-center mt-1.5 max-w-[100px]">
              <p className="text-[10px] font-medium text-foreground leading-tight">{step.label}</p>
              {step.actor && (
                <p className="text-[9px] text-muted-foreground">{step.actor}</p>
              )}
              {step.timestamp && (
                <p className="text-[9px] text-muted-foreground">{step.timestamp}</p>
              )}
              {step.comment && (
                <p className="text-[9px] text-muted-foreground italic mt-0.5 line-clamp-2">"{step.comment}"</p>
              )}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mt-4 mx-1 ${
                step.status === "completed"
                  ? "bg-accent"
                  : step.status === "rejected"
                  ? "bg-destructive"
                  : "bg-muted-foreground/20"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function getLeaveApprovalSteps(request: {
  status: string;
  manager_comment?: string;
  hr_comment?: string;
  manager_action_at?: string;
  hr_action_at?: string;
  created_at: string;
}) {
  const steps: Step[] = [
    {
      label: "Submitted",
      status: "completed",
      timestamp: request.created_at,
    },
    {
      label: "Manager Review",
      actor: "Manager",
      status:
        request.status === "pending_manager"
          ? "current"
          : request.status === "rejected" && !request.hr_action_at
          ? "rejected"
          : "completed",
      timestamp: request.manager_action_at,
      comment: request.manager_comment,
    },
    {
      label: "HR Review",
      actor: "HR Admin",
      status:
        request.status === "pending_hr"
          ? "current"
          : request.status === "approved"
          ? "completed"
          : request.status === "rejected" && request.manager_action_at
          ? "rejected"
          : "pending",
      timestamp: request.hr_action_at,
      comment: request.hr_comment,
    },
    {
      label: "Final Decision",
      status:
        request.status === "approved"
          ? "completed"
          : request.status === "rejected"
          ? "rejected"
          : "pending",
    },
  ];
  return steps;
}
