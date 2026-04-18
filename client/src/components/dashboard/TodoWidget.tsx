import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  FileText,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

interface Reminder {
  id: number;
  text: string;
  category: "leave" | "timesheet" | "document" | "training" | "general";
  priority: "high" | "medium" | "low";
  actionLabel: string;
  dismissed: boolean;
}

const categoryIcons = {
  leave: CalendarDays,
  timesheet: Clock,
  document: FileText,
  training: GraduationCap,
  general: AlertCircle,
};

const priorityStyles = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-amber-400 bg-amber-50",
  low: "border-l-blue-400 bg-blue-50/50",
};

const initialReminders: Reminder[] = [
  {
    id: 1,
    text: "You have 12 unused annual leave days. Consider applying before Q2 ends.",
    category: "leave",
    priority: "medium",
    actionLabel: "Apply Leave",
    dismissed: false,
  },
  {
    id: 2,
    text: "Timesheet for last week (Mar 24–28) is not submitted.",
    category: "timesheet",
    priority: "high",
    actionLabel: "Submit Now",
    dismissed: false,
  },
  {
    id: 3,
    text: "Mandatory compliance training due by Apr 15.",
    category: "training",
    priority: "high",
    actionLabel: "Start Training",
    dismissed: false,
  },
  {
    id: 4,
    text: "Your ID proof document is expiring on May 1. Please upload a renewed copy.",
    category: "document",
    priority: "medium",
    actionLabel: "Upload",
    dismissed: false,
  },
  {
    id: 5,
    text: "Clock-out was missed on Apr 1. Submit a time correction request.",
    category: "timesheet",
    priority: "high",
    actionLabel: "Correct Time",
    dismissed: false,
  },
  {
    id: 6,
    text: "Team feedback survey is open. Please complete it by Apr 10.",
    category: "general",
    priority: "low",
    actionLabel: "Take Survey",
    dismissed: false,
  },
];

export function TodoWidget() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const dismiss = (id: number) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, dismissed: true } : r)));
  };

  const active = reminders.filter((r) => !r.dismissed);
  const highCount = active.filter((r) => r.priority === "high").length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Action Items</CardTitle>
          <div className="flex items-center gap-2">
            {highCount > 0 && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                {highCount} urgent
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {active.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {active.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-10 w-10 mb-2 text-accent" />
              <p className="text-sm font-medium">All caught up!</p>
              <p className="text-xs">No pending action items.</p>
            </div>
          ) : (
            active.map((reminder) => {
              const Icon = categoryIcons[reminder.category];
              return (
                <div
                  key={reminder.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border-l-4 transition-colors ${priorityStyles[reminder.priority]}`}
                >
                  <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{reminder.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        className="h-7 text-xs px-3 bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        {reminder.actionLabel}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs px-2 text-muted-foreground"
                        onClick={() => dismiss(reminder.id)}
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
