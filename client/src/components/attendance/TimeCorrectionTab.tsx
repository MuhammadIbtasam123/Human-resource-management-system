import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

const pastCorrections = [
  { id: 1, date: "Mar 28, 2025", wrongIn: "10:30 AM", correctIn: "09:00 AM", wrongOut: "—", correctOut: "—", reason: "Badge reader error", status: "Approved" },
  { id: 2, date: "Apr 1, 2025", wrongIn: "—", correctIn: "—", wrongOut: "—", correctOut: "06:10 PM", reason: "Forgot to clock out", status: "Pending" },
];

export function TimeCorrectionTab() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [wrongClockIn, setWrongClockIn] = useState("");
  const [correctClockIn, setCorrectClockIn] = useState("");
  const [wrongClockOut, setWrongClockOut] = useState("");
  const [correctClockOut, setCorrectClockOut] = useState("");
  const [reason, setReason] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!selectedDate || !reason.trim()) {
      toast.error("Please select a date and provide a reason.");
      return;
    }
    setShowConfirm(true);
  };

  const confirmSubmit = () => {
    toast.success("Time correction request submitted.");
    setSelectedDate(undefined);
    setWrongClockIn("");
    setCorrectClockIn("");
    setWrongClockOut("");
    setCorrectClockOut("");
    setReason("");
    setShowConfirm(false);
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Request Time Correction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Date <span className="text-destructive">*</span></Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Incorrect Clock In</Label>
              <Input placeholder="e.g. 10:30 AM" value={wrongClockIn} onChange={(e) => setWrongClockIn(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Correct Clock In</Label>
              <Input placeholder="e.g. 09:00 AM" value={correctClockIn} onChange={(e) => setCorrectClockIn(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Incorrect Clock Out</Label>
              <Input placeholder="e.g. —" value={wrongClockOut} onChange={(e) => setWrongClockOut(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Correct Clock Out</Label>
              <Input placeholder="e.g. 06:10 PM" value={correctClockOut} onChange={(e) => setCorrectClockOut(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Reason for Correction <span className="text-destructive">*</span></Label>
            <Textarea placeholder="Explain the reason..." value={reason} onChange={(e) => setReason(e.target.value)} maxLength={300} />
          </div>

          <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
            <AlertDialogTrigger asChild>
              <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Submit for Approval
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit Correction?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your time correction request will be sent to your manager for review.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Correction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Wrong In → Correct In</TableHead>
                  <TableHead>Wrong Out → Correct Out</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastCorrections.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{c.date}</TableCell>
                    <TableCell>{c.wrongIn} → {c.correctIn}</TableCell>
                    <TableCell>{c.wrongOut} → {c.correctOut}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{c.reason}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[c.status]}>{c.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
