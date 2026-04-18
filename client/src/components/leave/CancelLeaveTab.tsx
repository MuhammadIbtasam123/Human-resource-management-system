import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";
import { CalendarX2 } from "lucide-react";

interface LeaveRequest {
  id: number;
  type: string;
  from: string;
  to: string;
  days: number;
  status: "Approved" | "Pending";
}

const initialRequests: LeaveRequest[] = [
  { id: 1, type: "Annual", from: "Apr 10, 2025", to: "Apr 11, 2025", days: 2, status: "Approved" },
  { id: 2, type: "Casual", from: "Apr 15, 2025", to: "Apr 15, 2025", days: 1, status: "Pending" },
  { id: 3, type: "Annual", from: "May 5, 2025", to: "May 9, 2025", days: 5, status: "Approved" },
  { id: 4, type: "Sick", from: "May 20, 2025", to: "May 20, 2025", days: 1, status: "Pending" },
];

const statusColor: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
};

export function CancelLeaveTab() {
  const [requests, setRequests] = useState<LeaveRequest[]>(initialRequests);

  const handleCancel = (id: number) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    toast.success("Leave request cancelled successfully.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cancel Leave Request</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <CalendarX2 className="h-12 w-12 mb-3 text-muted-foreground/50" />
            <p className="font-medium">No upcoming leave requests</p>
            <p className="text-sm">All your upcoming leaves have been cancelled or completed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-center">Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{req.type}</TableCell>
                    <TableCell>{req.from}</TableCell>
                    <TableCell>{req.to}</TableCell>
                    <TableCell className="text-center">{req.days}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColor[req.status]}>
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                            Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Leave Request?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel your {req.type} leave from {req.from} to {req.to}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep It</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancel(req.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Yes, Cancel Leave
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
