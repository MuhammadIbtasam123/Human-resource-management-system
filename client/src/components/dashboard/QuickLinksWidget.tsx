import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Home, Download, FileText, Headphones, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickLinks = [
  { label: "Apply Leave", icon: CalendarDays, path: "/leave" },
  { label: "Request WFH", icon: Home, path: "/attendance" },
  { label: "Download Payslip", icon: Download, path: "#" },
  { label: "View Policies", icon: FileText, path: "#" },
  { label: "IT Helpdesk", icon: Headphones, path: "#" },
  { label: "Company Handbook", icon: BookOpen, path: "#" },
];

export function QuickLinksWidget() {
  const navigate = useNavigate();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => navigate(link.path)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <link.icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-xs font-medium text-foreground text-center leading-tight">{link.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
