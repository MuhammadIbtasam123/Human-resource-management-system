import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clock, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

export function ClockInOutTab() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockedIn, setClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const handleClockIn = () => {
    const time = formatTime(new Date());
    setClockInTime(time);
    setClockedIn(true);
    toast.success(`Clocked in at ${time}`);
  };

  const handleClockOut = () => {
    const time = formatTime(new Date());
    setClockOutTime(time);
    setClockedIn(false);
    toast.success(`Clocked out at ${time}`);
    setNotes("");
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg">Time Capture</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Clock */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{formatDate(currentTime)}</span>
            </div>
            <p className="text-4xl font-mono font-bold text-foreground tracking-wider">
              {formatTime(currentTime)}
            </p>
          </div>

          {/* Status */}
          {clockedIn && clockInTime && (
            <div className="text-center">
              <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">
                Currently Clocked In since {clockInTime}
              </Badge>
            </div>
          )}

          {/* Clock Button */}
          <div className="flex justify-center">
            {!clockedIn ? (
              <Button
                size="lg"
                className="h-16 w-48 text-lg bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg"
                onClick={handleClockIn}
              >
                <LogIn className="h-5 w-5 mr-2" />
                Clock In
              </Button>
            ) : (
              <div className="space-y-3 w-full">
                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea
                    placeholder="Add notes before clocking out..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    maxLength={200}
                    className="min-h-[60px]"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="h-16 w-48 text-lg bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl shadow-lg"
                    onClick={handleClockOut}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Clock Out
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Today's Session Log */}
          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-sm font-medium text-foreground">Today's Session</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Clock In</p>
                <p className="text-sm font-medium mt-1">{clockInTime || "—"}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Clock Out</p>
                <p className="text-sm font-medium mt-1">{clockOutTime || "—"}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Hours</p>
                <p className="text-sm font-medium mt-1">{clockedIn ? "In progress" : clockOutTime ? "8h 15m" : "—"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
