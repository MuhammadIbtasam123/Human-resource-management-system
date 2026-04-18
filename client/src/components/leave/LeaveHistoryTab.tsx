import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, History } from "lucide-react";

interface HistoryRecord {
  id: number;
  type: string;
  appliedDate: string;
  from: string;
  to: string;
  days: number;
  status: "Approved" | "Rejected" | "Pending" | "Cancelled";
}

const allRecords: HistoryRecord[] = [
  { id: 1, type: "Annual", appliedDate: "Jan 5, 2025", from: "Jan 15, 2025", to: "Jan 17, 2025", days: 3, status: "Approved" },
  { id: 2, type: "Sick", appliedDate: "Feb 10, 2025", from: "Feb 11, 2025", to: "Feb 11, 2025", days: 1, status: "Approved" },
  { id: 3, type: "Casual", appliedDate: "Feb 20, 2025", from: "Feb 25, 2025", to: "Feb 25, 2025", days: 1, status: "Rejected" },
  { id: 4, type: "Annual", appliedDate: "Mar 1, 2025", from: "Mar 10, 2025", to: "Mar 14, 2025", days: 5, status: "Approved" },
  { id: 5, type: "Unpaid", appliedDate: "Mar 15, 2025", from: "Mar 20, 2025", to: "Mar 21, 2025", days: 2, status: "Cancelled" },
  { id: 6, type: "Annual", appliedDate: "Mar 28, 2025", from: "Apr 10, 2025", to: "Apr 11, 2025", days: 2, status: "Approved" },
  { id: 7, type: "Casual", appliedDate: "Apr 1, 2025", from: "Apr 15, 2025", to: "Apr 15, 2025", days: 1, status: "Pending" },
  { id: 8, type: "Sick", appliedDate: "Apr 2, 2025", from: "May 20, 2025", to: "May 20, 2025", days: 1, status: "Pending" },
  { id: 9, type: "Annual", appliedDate: "Nov 10, 2024", from: "Dec 20, 2024", to: "Dec 31, 2024", days: 8, status: "Approved" },
  { id: 10, type: "Sick", appliedDate: "Sep 5, 2024", from: "Sep 6, 2024", to: "Sep 6, 2024", days: 1, status: "Approved" },
];

const statusStyles: Record<string, string> = {
  Approved: "bg-green-100 text-green-700 border-green-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  Cancelled: "bg-gray-100 text-gray-500 border-gray-200",
};

const ITEMS_PER_PAGE = 5;

export function LeaveHistoryTab() {
  const [yearFilter, setYearFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = allRecords.filter((r) => {
    if (yearFilter !== "all" && !r.appliedDate.includes(yearFilter)) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leave History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={yearFilter} onValueChange={(v) => { setYearFilter(v); setPage(1); }}>
            <SelectTrigger className="w-28 h-9 text-sm">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9 text-sm">
              <SelectValue placeholder="Leave Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Annual">Annual</SelectItem>
              <SelectItem value="Sick">Sick</SelectItem>
              <SelectItem value="Casual">Casual</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-32 h-9 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        {paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <History className="h-12 w-12 mb-3 text-muted-foreground/50" />
            <p className="font-medium">No records found</p>
            <p className="text-sm">Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Leave Type</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead className="text-center">Days</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{r.type}</TableCell>
                    <TableCell>{r.appliedDate}</TableCell>
                    <TableCell>{r.from}</TableCell>
                    <TableCell>{r.to}</TableCell>
                    <TableCell className="text-center">{r.days}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[r.status]}>
                        {r.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {filtered.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
