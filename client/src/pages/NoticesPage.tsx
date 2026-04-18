import { AppLayout } from "@/components/layout/AppLayout";
import { notices } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pin, Paperclip } from "lucide-react";

const categoryColors: Record<string, string> = {
  HR: "bg-primary/10 text-primary",
  Finance: "bg-accent/10 text-accent",
  General: "bg-muted text-muted-foreground",
  Urgent: "bg-destructive/10 text-destructive",
};

const NoticesPage = () => {
  const sorted = [...notices].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <AppLayout title="Notice Board">
      <div className="space-y-3">
        {sorted.map((notice) => (
          <Card key={notice.id} className={`${!notice.is_read ? "border-l-4 border-l-accent" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {notice.is_pinned && <Pin className="h-4 w-4 text-[hsl(var(--warning))] shrink-0 mt-0.5" />}
                {!notice.is_read && <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-foreground">{notice.title}</h3>
                    <Badge className={`text-[10px] ${categoryColors[notice.category]}`}>{notice.category}</Badge>
                    {notice.attachment && <Paperclip className="h-3.5 w-3.5 text-muted-foreground" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{notice.body}</p>
                  <p className="text-xs text-muted-foreground mt-1">By {notice.created_by} · {notice.created_at}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default NoticesPage;
