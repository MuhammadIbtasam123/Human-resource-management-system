import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const birthdays = [
  { id: 1, name: "Sarah Chen", initials: "SC", department: "Engineering", event: "🎂 Birthday today", daysUntil: "Today" },
  { id: 2, name: "Priya Sharma", initials: "PS", department: "Design", event: "🎂 Birthday today", daysUntil: "Today" },
  { id: 3, name: "Emily Watson", initials: "EW", department: "Marketing", event: "🎂 Birthday", daysUntil: "In 2 days" },
];

const anniversaries = [
  { id: 4, name: "Michael Roberts", initials: "MR", department: "Sales", event: "🎉 3 years", daysUntil: "Today" },
  { id: 5, name: "David Kim", initials: "DK", department: "Engineering", event: "🎉 5 years", daysUntil: "Tomorrow" },
  { id: 6, name: "James Taylor", initials: "JT", department: "HR", event: "🎉 1 year", daysUntil: "In 3 days" },
];

const newJoiners = [
  { id: 7, name: "Alex Morgan", initials: "AM", department: "Engineering", event: "🆕 Joined", daysUntil: "Today" },
  { id: 8, name: "Lisa Park", initials: "LP", department: "Product", event: "🆕 Joined", daysUntil: "2 days ago" },
];

type PersonItem = { id: number; name: string; initials: string; department: string; event: string; daysUntil: string };

function PersonRow({ person }: { person: PersonItem }) {
  const [wish, setWish] = useState("");

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary/10 text-primary text-xs">{person.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{person.name}</p>
        <p className="text-xs text-muted-foreground">{person.department} · {person.event}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-muted-foreground">{person.daysUntil}</span>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="h-6 text-[10px] px-2">Send Wishes</Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-base">Send wishes to {person.name}</DialogTitle>
            </DialogHeader>
            <Textarea placeholder="Write your message..." value={wish} onChange={(e) => setWish(e.target.value)} />
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => { toast.success("Wishes sent!"); setWish(""); }}>Send</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export function ActivityFeedWidget() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="birthdays">
          <TabsList className="h-8 w-full">
            <TabsTrigger value="birthdays" className="text-xs flex-1">🎂 Birthdays</TabsTrigger>
            <TabsTrigger value="anniversaries" className="text-xs flex-1">🎉 Anniversaries</TabsTrigger>
            <TabsTrigger value="joiners" className="text-xs flex-1">🆕 New Joiners</TabsTrigger>
          </TabsList>
          <TabsContent value="birthdays" className="mt-3">
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {birthdays.map((p) => <PersonRow key={p.id} person={p} />)}
            </div>
          </TabsContent>
          <TabsContent value="anniversaries" className="mt-3">
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {anniversaries.map((p) => <PersonRow key={p.id} person={p} />)}
            </div>
          </TabsContent>
          <TabsContent value="joiners" className="mt-3">
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {newJoiners.map((p) => <PersonRow key={p.id} person={p} />)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
