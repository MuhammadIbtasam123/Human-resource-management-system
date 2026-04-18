import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  Clock,
  Rocket,
  FileText,
  GraduationCap,
  AlertCircle,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

interface ActionItem {
  id: number;
  text: string;
  category: "leave" | "timesheet" | "document" | "training" | "onboarding" | "policy";
  priority: "high" | "medium" | "low";
  actionLabel: string;
  due?: string;
  dismissed: boolean;
}

const categoryIcons: Record<string, any> = {
  leave: CalendarDays,
  timesheet: Clock,
  document: FileText,
  training: GraduationCap,
  onboarding: Rocket,
  policy: FileText,
  general: AlertCircle,
};

const priorityStyles: Record<string, string> = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-[hsl(var(--warning))] bg-[hsl(var(--warning))]/5",
  low: "border-l-primary/40 bg-primary/5",
};

const initialItems: ActionItem[] = [
  { id: 1, text: "You have 12 unused annual leave days. Consider applying before Q2 ends.", category: "leave", priority: "medium", actionLabel: "Apply Leave", dismissed: false },
  { id: 2, text: "Timesheet for last week (Mar 24–28) is not submitted.", category: "timesheet", priority: "high", actionLabel: "Submit Now", due: "Due today", dismissed: false },
  { id: 3, text: "Mandatory compliance training due by Apr 15.", category: "training", priority: "high", actionLabel: "Start Training", due: "Due Apr 15", dismissed: false },
  { id: 4, text: "Your ID proof document is expiring on May 1. Upload a renewed copy.", category: "document", priority: "medium", actionLabel: "Upload", due: "Due May 1", dismissed: false },
  { id: 5, text: "Clock-out was missed on Apr 1. Submit a time correction.", category: "timesheet", priority: "high", actionLabel: "Correct Time", due: "Due today", dismissed: false },
  { id: 6, text: "Sarah Chen — Annual Leave (Apr 14-16) needs your review.", category: "leave", priority: "high", actionLabel: "Review", due: "Due today", dismissed: false },
  { id: 7, text: "Complete Day 1 orientation checklist.", category: "onboarding", priority: "medium", actionLabel: "Complete", due: "Due Apr 7", dismissed: false },
  { id: 8, text: "Read & sign updated Travel Reimbursement Policy.", category: "policy", priority: "low", actionLabel: "Review", due: "Due Apr 10", dismissed: false },
  { id: 9, text: "Team feedback survey is open. Please complete by Apr 10.", category: "document", priority: "low", actionLabel: "Take Survey", due: "Due Apr 10", dismissed: false },
];

export function PendingActionsWidget() {
  const [items, setItems] = useState<ActionItem[]>(initialItems);
  const [tab, setTab] = useState("all");

  const dismiss = (id: number) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, dismissed: true } : r)));
  };

  const active = items.filter((r) => !r.dismissed);
  const highCount = active.filter((r) => r.priority === "high").length;

  const filtered = tab === "all" ? active : active.filter((r) => r.priority === tab);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Pending Actions</CardTitle>
          <div className="flex items-center gap-2">
            {highCount > 0 && (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                {highCount} urgent
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">{active.length}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="h-8 w-full">
            <TabsTrigger value="all" className="text-xs flex-1">All</TabsTrigger>
            <TabsTrigger value="high" className="text-xs flex-1">Urgent</TabsTrigger>
            <TabsTrigger value="medium" className="text-xs flex-1">Medium</TabsTrigger>
            <TabsTrigger value="low" className="text-xs flex-1">Low</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <CheckCircle2 className="h-10 w-10 mb-2 text-accent" />
              <p className="text-sm font-medium">All caught up!</p>
              <p className="text-xs">No pending actions.</p>
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = categoryIcons[item.category] || AlertCircle;
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border-l-4 transition-colors ${priorityStyles[item.priority]}`}
                >
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{item.text}</p>
                    {item.due && (
                      <p className="text-xs text-muted-foreground mt-1">{item.due}</p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" className="h-7 text-xs px-3 bg-accent text-accent-foreground hover:bg-accent/90">
                        {item.actionLabel}
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs px-2 text-muted-foreground"
                        onClick={() => dismiss(item.id)}
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
