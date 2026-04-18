import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const events: Record<string, Array<{ type: "approved" | "pending" | "holiday" | "wfh" | "birthday"; label: string }>> = {
  "2025-04-03": [{ type: "birthday", label: "Sarah Chen 🎂" }],
  "2025-04-10": [{ type: "approved", label: "John Doe — Annual Leave" }],
  "2025-04-11": [{ type: "approved", label: "John Doe — Annual Leave" }],
  "2025-04-14": [{ type: "wfh", label: "Priya Sharma — WFH" }, { type: "pending", label: "David Kim — Casual Leave" }],
  "2025-04-15": [{ type: "pending", label: "John Doe — Casual Leave" }],
  "2025-04-18": [{ type: "holiday", label: "Good Friday" }],
  "2025-04-25": [{ type: "wfh", label: "John Doe — WFH" }],
};

const typeColors: Record<string, string> = {
  approved: "bg-green-500",
  pending: "bg-amber-400",
  holiday: "bg-blue-500",
  wfh: "bg-accent",
  birthday: "bg-pink-400",
};

const typeLabels: Record<string, string> = {
  approved: "Approved Leave",
  pending: "Pending Leave",
  holiday: "Public Holiday",
  wfh: "WFH",
  birthday: "Birthday",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1));
  const [myOnly, setMyOnly] = useState(false);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-base">Team Calendar</CardTitle>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Switch id="my-only" checked={myOnly} onCheckedChange={setMyOnly} className="scale-75" />
              <Label htmlFor="my-only" className="text-xs cursor-pointer">My Leaves</Label>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">{monthName}</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-px">
          {weekdays.map((d) => (
            <div key={d} className="text-center text-[11px] font-medium text-muted-foreground py-1">{d}</div>
          ))}
          {days.map((day, i) => {
            const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : "";
            const dayEvents = day ? (events[dateStr] || []) : [];
            const filtered = myOnly ? dayEvents.filter(e => e.label.includes("John Doe")) : dayEvents;
            const isToday = day === 3 && month === 3 && year === 2025;

            return (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div
                    className={`relative h-9 flex items-center justify-center text-xs rounded-md transition-colors
                      ${day ? "hover:bg-muted/50 cursor-default" : ""}
                      ${isToday ? "ring-2 ring-accent font-bold" : ""}
                    `}
                  >
                    {day && (
                      <>
                        <span className="text-foreground">{day}</span>
                        {filtered.length > 0 && (
                          <div className="absolute bottom-0.5 flex gap-px">
                            {filtered.slice(0, 3).map((e, j) => (
                              <span key={j} className={`h-1.5 w-1.5 rounded-full ${typeColors[e.type]}`} />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </TooltipTrigger>
                {filtered.length > 0 && (
                  <TooltipContent>
                    <div className="space-y-1">
                      {filtered.map((e, j) => (
                        <p key={j} className="text-xs">{e.label}</p>
                      ))}
                    </div>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t flex-wrap">
          {Object.entries(typeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${typeColors[type]}`} />
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
