import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays, AlertCircle, Megaphone, Cake, CheckCircle2 } from "lucide-react";

const allNotifications = [
  { id: 1, group: "Leave Updates", icon: CalendarDays, text: "Your annual leave (Apr 10-11) was approved by Sarah Chen", time: "2 hours ago", date: "Today", unread: true, action: "View Leave" },
  { id: 2, group: "Leave Updates", icon: CalendarDays, text: "Casual leave request is pending manager approval", time: "5 hours ago", date: "Today", unread: true, action: "View Request" },
  { id: 3, group: "System Alerts", icon: AlertCircle, text: "Timesheet for last week (Mar 24-28) has not been submitted", time: "1 day ago", date: "Yesterday", unread: true, action: "Submit Now" },
  { id: 4, group: "System Alerts", icon: AlertCircle, text: "Your password will expire in 7 days. Please update it.", time: "2 days ago", date: "Yesterday", unread: false, action: "Change Password" },
  { id: 5, group: "Announcements", icon: Megaphone, text: "Office will be closed on April 18th for Good Friday", time: "3 days ago", date: "Apr 1", unread: false, action: null },
  { id: 6, group: "Announcements", icon: Megaphone, text: "Updated Travel Reimbursement Policy effective May 1st", time: "6 days ago", date: "Mar 28", unread: false, action: "Read Policy" },
  { id: 7, group: "Birthdays", icon: Cake, text: "Sarah Chen's birthday is today! Send your wishes 🎂", time: "Today", date: "Today", unread: true, action: "Send Wishes" },
  { id: 8, group: "Birthdays", icon: Cake, text: "Michael Roberts celebrated 3 years at Clarisync 🎉", time: "Today", date: "Today", unread: true, action: null },
];

const NotificationCenterPage = () => {
  const [typeFilter, setTypeFilter] = useState("all");
  const [readIds, setReadIds] = useState<Set<number>>(new Set());

  const filtered = allNotifications.filter((n) => typeFilter === "all" || n.group === typeFilter);
  const grouped = filtered.reduce((acc, n) => {
    const key = n.date;
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {} as Record<string, typeof allNotifications>);

  const markAllRead = () => {
    setReadIds(new Set(allNotifications.map((n) => n.id)));
  };

  return (
    <AppLayout title="Notifications">
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-40 h-9 text-sm"><SelectValue placeholder="Filter" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Leave Updates">Leave Updates</SelectItem>
              <SelectItem value="System Alerts">System Alerts</SelectItem>
              <SelectItem value="Announcements">Announcements</SelectItem>
              <SelectItem value="Birthdays">Birthdays</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCircle2 className="h-4 w-4 mr-1" />Mark All Read
          </Button>
        </div>

        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">{date}</p>
            <div className="space-y-2">
              {items.map((notif) => {
                const isUnread = notif.unread && !readIds.has(notif.id);
                return (
                  <Card key={notif.id} className={`transition-colors ${isUnread ? "border-accent/30 bg-accent/5" : ""}`}
                    onClick={() => setReadIds((prev) => new Set(prev).add(notif.id))}
                  >
                    <CardContent className="py-3 px-4 flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${isUnread ? "bg-accent/10" : "bg-muted"}`}>
                        <notif.icon className={`h-4 w-4 ${isUnread ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm ${isUnread ? "font-medium text-foreground" : "text-muted-foreground"}`}>{notif.text}</p>
                          {isUnread && <div className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground">{notif.time}</span>
                          <Badge variant="outline" className="text-[10px] px-1.5">{notif.group}</Badge>
                        </div>
                      </div>
                      {notif.action && (
                        <Button variant="outline" size="sm" className="h-7 text-xs shrink-0">{notif.action}</Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
};

export default NotificationCenterPage;
