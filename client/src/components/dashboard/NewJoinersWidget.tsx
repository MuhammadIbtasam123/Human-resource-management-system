import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { onboardingEmployees } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";

export function NewJoinersWidget() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">New Joiners — Onboarding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {onboardingEmployees.map((emp) => (
          <div key={emp.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-accent/10 text-accent">
                {emp.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{emp.name}</p>
                <Badge variant="outline" className="text-[10px]">
                  {emp.completed_tasks}/{emp.total_tasks} tasks
                </Badge>
              </div>
              <Progress value={emp.progress} className="h-1.5 mt-1" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
