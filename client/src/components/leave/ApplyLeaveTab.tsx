import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import { format, differenceInCalendarDays } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LeaveBalanceSidebar } from "./LeaveBalanceSidebar";

export function ApplyLeaveTab() {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [halfDay, setHalfDay] = useState(false);
  const [reason, setReason] = useState("");
  const [fileName, setFileName] = useState("");

  const dayCount =
    fromDate && toDate
      ? halfDay
        ? 0.5
        : Math.max(differenceInCalendarDays(toDate, fromDate) + 1, 0)
      : 0;

  const handleSubmit = () => {
    if (!leaveType || !fromDate || !toDate || !reason.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (reason.trim().length < 5) {
      toast.error("Please provide a more detailed reason.");
      return;
    }
    toast.success("Leave application submitted successfully!");
    setLeaveType("");
    setFromDate(undefined);
    setToDate(undefined);
    setHalfDay(false);
    setReason("");
    setFileName("");
  };

  const handleCancel = () => {
    setLeaveType("");
    setFromDate(undefined);
    setToDate(undefined);
    setHalfDay(false);
    setReason("");
    setFileName("");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Form */}
      <Card className="flex-1 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Apply for Leave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Leave Type <span className="text-destructive">*</span></Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger>
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="casual">Casual Leave</SelectItem>
                <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !fromDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={fromDate} onSelect={setFromDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>To Date <span className="text-destructive">*</span></Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !toDate && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={toDate} onSelect={setToDate} disabled={(date) => (fromDate ? date < fromDate : false)} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Label htmlFor="half-day" className="cursor-pointer">Half-day</Label>
              <Switch id="half-day" checked={halfDay} onCheckedChange={setHalfDay} />
            </div>
            {dayCount > 0 && (
              <span className="text-sm font-medium text-foreground">
                {dayCount} day{dayCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>Reason <span className="text-destructive">*</span></Label>
            <Textarea placeholder="Enter the reason for your leave..." value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} className="min-h-[100px]" />
            <p className="text-xs text-muted-foreground text-right">{reason.length}/500</p>
          </div>

          <div className="space-y-2">
            <Label>Attachment (optional)</Label>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => { setFileName("medical_certificate.pdf"); toast.info("File selected (mock)"); }}>
                <Upload className="h-4 w-4 mr-2" /> Choose File
              </Button>
              {fileName && <span className="text-sm text-muted-foreground">{fileName}</span>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">Submit Application</Button>
            <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Leave balance sidebar - visible on lg+ */}
      <div className="hidden lg:block w-72 shrink-0">
        <LeaveBalanceSidebar />
      </div>

      {/* Mobile: show below form */}
      <div className="lg:hidden">
        <LeaveBalanceSidebar />
      </div>
    </div>
  );
}
