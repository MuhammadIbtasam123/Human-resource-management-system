import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const notices = [
  { id: 1, title: "Office Closure — Good Friday", excerpt: "Please note the office will be closed on April 18th for Good Friday. Plan your work accordingly.", date: "Apr 1, 2025", pinned: true, attachment: false, category: "HR", unread: true },
  { id: 2, title: "Updated Travel Reimbursement Policy", excerpt: "Effective May 1st, all travel claims must be submitted within 7 business days. Please review the updated policy document for details.", date: "Mar 28, 2025", pinned: true, attachment: true, category: "Finance", unread: true },
  { id: 3, title: "URGENT: System Maintenance Tonight", excerpt: "The HR portal will be down for maintenance from 11 PM to 2 AM tonight.", date: "Apr 3, 2025", pinned: false, attachment: false, category: "Urgent", unread: true },
  { id: 4, title: "Annual Team Outing — Save the Date", excerpt: "The annual team outing is planned for May 15–16. More details about location and activities coming soon!", date: "Mar 25, 2025", pinned: false, attachment: false, category: "General", unread: false },
  { id: 5, title: "Q1 Town Hall Recording Available", excerpt: "For those who missed the Q1 town hall, the recording is now available on the intranet portal.", date: "Mar 20, 2025", pinned: false, attachment: true, category: "General", unread: false },
];

const categoryStyles: Record<string, string> = {
  HR: "bg-primary/10 text-primary border-primary/20",
  Finance: "bg-blue-100 text-blue-700 border-blue-200",
  Urgent: "bg-destructive/10 text-destructive border-destructive/20",
  General: "bg-muted text-muted-foreground border-border",
};

export function NoticeBoardWidget() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const sorted = [...notices].sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));

  const handleClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
    setReadIds((prev) => new Set(prev).add(id));
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Notice Board</CardTitle>
          <Button variant="link" className="text-xs text-accent p-0 h-auto" onClick={() => navigate("/notifications")}>View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {sorted.map((notice) => {
            const isUnread = notice.unread && !readIds.has(notice.id);
            return (
              <div
                key={notice.id}
                className="p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handleClick(notice.id)}
              >
                <div className="flex items-start gap-2">
                  {notice.pinned && <Pin className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />}
                  {isUnread && <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-medium text-foreground truncate">{notice.title}</h4>
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${categoryStyles[notice.category] || ""}`}>
                        {notice.category}
                      </Badge>
                      {notice.attachment && <Paperclip className="h-3.5 w-3.5 text-muted-foreground shrink-0" />}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {expandedId === notice.id ? notice.excerpt : notice.excerpt.slice(0, 80) + (notice.excerpt.length > 80 ? "..." : "")}
                    </p>
                    <span className="text-[11px] text-muted-foreground mt-1 block">{notice.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
