import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { CalendarIcon, Home } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

interface WfhRequest {
  id: number;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: "Approved" | "Pending" | "Rejected";
}

const initialRequests: WfhRequest[] = [
  { id: 1, from: "Mar 20, 2025", to: "Mar 21, 2025", days: 2, reason: "Internet installation at home", status: "Approved" },
  { id: 2, from: "Apr 4, 2025", to: "Apr 4, 2025", days: 1, reason: "Plumber appointment", status: "Approved" },
  { id: 3, from: "Apr 14, 2025", to: "Apr 15, 2025", days: 2, reason: "Personal errands", status: "Pending" },
];

export function WfhRequestTab() {
  const [requests, setRequests] = useState<WfhRequest[]>(initialRequests);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!fromDate || !toDate || !reason.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("WFH request submitted successfully.");
    setFromDate(undefined);
    setToDate(undefined);
    setReason("");
  };

  const handleCancel = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success("WFH request cancelled.");
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Request Work From Home</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
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

          <div className="space-y-2">
            <Label>Reason <span className="text-destructive">*</span></Label>
            <Textarea placeholder="Reason for working from home..." value={reason} onChange={(e) => setReason(e.target.value)} maxLength={300} />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmit} className="bg-accent text-accent-foreground hover:bg-accent/90">Submit</Button>
            <Button variant="ghost" onClick={() => { setFromDate(undefined); setToDate(undefined); setReason(""); }}>Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">WFH Request History</CardTitle>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Home className="h-12 w-12 mb-3 text-muted-foreground/50" />
              <p className="font-medium">No WFH requests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-center">Days</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req) => (
                    <TableRow key={req.id} className="hover:bg-muted/50">
                      <TableCell>{req.from}</TableCell>
                      <TableCell>{req.to}</TableCell>
                      <TableCell className="text-center">{req.days}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{req.reason}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[req.status]}>{req.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {req.status === "Pending" && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">Cancel</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Cancel WFH Request?</AlertDialogTitle>
                                <AlertDialogDescription>This will cancel your WFH request for {req.from} to {req.to}.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Keep It</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleCancel(req.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Yes, Cancel
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
