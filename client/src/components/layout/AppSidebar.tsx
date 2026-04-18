import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  User,
  Users,
  Rocket,
  BarChart3,
  Settings,
  CheckSquare,
  Megaphone,
  GitBranch,
  ClipboardList,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
}

const navByRole: Record<UserRole, { main: NavItem[]; account: NavItem[] }> = {
  employee: {
    main: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "My Leave", url: "/leave", icon: CalendarDays },
      { title: "My Attendance", url: "/attendance", icon: Clock },
      { title: "Company Directory", url: "/people", icon: Users },
      { title: "Notices", url: "/notices", icon: Megaphone },
    ],
    account: [
      { title: "My Profile", url: "/profile", icon: User },
    ],
  },
  manager: {
    main: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "My Leave", url: "/leave", icon: CalendarDays },
      { title: "Team Leave Approvals", url: "/team-leave", icon: CheckSquare },
      { title: "My Attendance", url: "/attendance", icon: Clock },
      { title: "Team Attendance", url: "/team-attendance", icon: ClipboardList },
      { title: "Company Directory", url: "/people", icon: Users },
      { title: "Notices", url: "/notices", icon: Megaphone },
    ],
    account: [
      { title: "My Profile", url: "/profile", icon: User },
    ],
  },
  hr_admin: {
    main: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Leave Management", url: "/leave", icon: CalendarDays },
      { title: "Attendance", url: "/attendance", icon: Clock },
      { title: "People & Directory", url: "/people", icon: Users },
      { title: "Onboarding", url: "/onboarding", icon: Rocket },
      { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
      { title: "Notice Board", url: "/notices", icon: Megaphone },
      { title: "Org Chart", url: "/org-chart", icon: GitBranch },
    ],
    account: [
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
  director: {
    main: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Manager Approvals", url: "/manager-approvals", icon: CheckSquare },
      { title: "People & Directory", url: "/people", icon: Users },
      { title: "Analytics & Reports", url: "/analytics", icon: BarChart3 },
      { title: "Org Chart", url: "/org-chart", icon: GitBranch },
    ],
    account: [
      { title: "My Profile", url: "/profile", icon: User },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
};

const sidebarAccentByRole: Record<UserRole, string> = {
  employee: "bg-accent",
  manager: "bg-primary",
  hr_admin: "bg-[hsl(270,50%,50%)]",
  director: "bg-[hsl(38,90%,50%)]",
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { role } = useRole();

  const nav = navByRole[role];
  const accentClass = sidebarAccentByRole[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-lg ${accentClass} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="font-bold text-lg text-sidebar-foreground tracking-tight">Clarisync</span>
          </div>
        ) : (
          <div className={`h-8 w-8 rounded-lg ${accentClass} flex items-center justify-center mx-auto`}>
            <span className="text-white font-bold text-sm">C</span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">Main</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.main.map((item) => {
                const isActive = item.url === "/" ? location.pathname === "/" : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url} end={item.url === "/"} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">Account</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.account.map((item) => {
                const isActive = location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
