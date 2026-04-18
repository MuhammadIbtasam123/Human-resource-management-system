import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import Index from "./pages/Index";
import LeavePage from "./pages/LeavePage";
import AttendancePage from "./pages/AttendancePage";
import ProfilePage from "./pages/ProfilePage";
import PeoplePage from "./pages/PeoplePage";
import OnboardingPage from "./pages/OnboardingPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotificationCenterPage from "./pages/NotificationCenterPage";
import TeamLeaveApprovalsPage from "./pages/TeamLeaveApprovalsPage";
import TeamAttendancePage from "./pages/TeamAttendancePage";
import ManagerApprovalsPage from "./pages/ManagerApprovalsPage";
import OrgChartPage from "./pages/OrgChartPage";
import NoticesPage from "./pages/NoticesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RoleProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/leave" element={<LeavePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/people" element={<PeoplePage />} />
            <Route path="/people/:id" element={<PeoplePage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/notifications" element={<NotificationCenterPage />} />
            <Route path="/team-leave" element={<TeamLeaveApprovalsPage />} />
            <Route path="/team-attendance" element={<TeamAttendancePage />} />
            <Route path="/manager-approvals" element={<ManagerApprovalsPage />} />
            <Route path="/org-chart" element={<OrgChartPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RoleProvider>
  </QueryClientProvider>
);

export default App;
