import { useState } from "react";
import { Bell, ChevronDown, LogOut, UserCircle, Search, Settings, X, CalendarDays, AlertCircle, Megaphone, Cake } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopNavbarProps {
  title: string;
}

const notifications = [
  { id: 1, group: "Leave Updates", icon: CalendarDays, items: [
    { text: "Your annual leave (Apr 10-11) was approved", time: "2h ago", unread: true },
    { text: "Casual leave request pending manager approval", time: "5h ago", unread: true },
  ]},
  { id: 2, group: "System Alerts", icon: AlertCircle, items: [
    { text: "Timesheet for last week not submitted", time: "1d ago", unread: true },
    { text: "Password expires in 7 days", time: "2d ago", unread: false },
  ]},
  { id: 3, group: "Announcements", icon: Megaphone, items: [
    { text: "Office closure on Good Friday — Apr 18", time: "3d ago", unread: false },
  ]},
  { id: 4, group: "Birthdays", icon: Cake, items: [
    { text: "Sarah Chen's birthday today! 🎂", time: "Today", unread: true },
  ]},
];

const unreadCount = notifications.reduce((sum, g) => sum + g.items.filter(i => i.unread).length, 0);

export function TopNavbar({ title }: TopNavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { role, setRole, user, roleLabel, roleColor } = useRole();

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="text-sm text-muted-foreground font-medium hidden sm:block">{title}</span>
      </div>

      <h1 className="text-base font-semibold text-foreground absolute left-1/2 -translate-x-1/2 hidden md:block">
        {title}
      </h1>

      <div className="flex items-center gap-2">
        {/* Role Switcher (Dev Tool) */}
        <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
          <SelectTrigger className="h-7 w-[130px] text-xs border-dashed">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="employee">👤 Employee</SelectItem>
            <SelectItem value="manager">👔 Manager</SelectItem>
            <SelectItem value="hr_admin">🛡️ HR Admin</SelectItem>
            <SelectItem value="director">⭐ Director</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        {searchOpen ? (
          <div className="flex items-center gap-1">
            <Input placeholder="Search... (⌘K)" className="h-8 w-48 text-sm" autoFocus onBlur={() => setSearchOpen(false)} />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchOpen(true)}>
            <Search className="h-4 w-4 text-muted-foreground" />
          </Button>
        )}

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-3 border-b">
              <h3 className="font-semibold text-sm">Notifications</h3>
              <Button variant="link" className="text-xs text-accent p-0 h-auto" onClick={() => navigate("/notifications")}>View All</Button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/50">
                    <group.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{group.group}</span>
                  </div>
                  {group.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 px-3 py-2 hover:bg-muted/30 cursor-pointer">
                      {item.unread && <div className="h-2 w-2 rounded-full bg-accent mt-1.5 shrink-0" />}
                      {!item.unread && <div className="h-2 w-2 shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{item.text}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">{user.avatar_initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-sm font-medium">{user.full_name}</span>
                <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${roleColor}`}>
                  {roleLabel}
                </Badge>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <UserCircle className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={() => navigate("/login")}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
