import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Building2, Calendar, Briefcase, Edit } from "lucide-react";

const profileData = {
  name: "John Doe",
  initials: "JD",
  role: "Senior Software Engineer",
  department: "Engineering",
  employeeId: "EMP-2024-0042",
  email: "john.doe@clarisync.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "January 15, 2022",
  manager: "Sarah Chen",
  status: "Active",
};

const details = [
  { icon: Mail, label: "Email", value: profileData.email },
  { icon: Phone, label: "Phone", value: profileData.phone },
  { icon: MapPin, label: "Location", value: profileData.location },
  { icon: Building2, label: "Department", value: profileData.department },
  { icon: Calendar, label: "Joined", value: profileData.joinDate },
  { icon: Briefcase, label: "Reports to", value: profileData.manager },
];

const leaveBalance = [
  { type: "Annual", total: 20, used: 8, remaining: 12 },
  { type: "Sick", total: 12, used: 3, remaining: 9 },
  { type: "Casual", total: 7, used: 4, remaining: 3 },
  { type: "Unpaid", total: 10, used: 0, remaining: 10 },
];

const ProfilePage = () => (
  <AppLayout title="My Profile">
    <div className="max-w-4xl space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {profileData.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-foreground">{profileData.name}</h2>
                <Badge className="bg-green-100 text-green-700 border-green-200" variant="outline">
                  {profileData.status}
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">{profileData.role}</p>
              <p className="text-sm text-muted-foreground">{profileData.employeeId}</p>
            </div>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {details.map((item, i) => (
              <div key={i}>
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
                {i < details.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leave Balance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leave Balance — 2025</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leaveBalance.map((leave) => {
              const pct = Math.round((leave.used / leave.total) * 100);
              return (
                <div key={leave.type} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">{leave.type}</span>
                    <span className="text-muted-foreground">
                      {leave.remaining} / {leave.total} remaining
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  </AppLayout>
);

export default ProfilePage;
