import { AppLayout } from "@/components/layout/AppLayout";
import { useRole } from "@/contexts/RoleContext";
import { RoleKpiStrip } from "@/components/dashboard/RoleKpiStrip";
import { LeaveSummaryWidget } from "@/components/dashboard/LeaveSummaryWidget";
import { AttendanceWidget } from "@/components/dashboard/AttendanceWidget";
import { ActivityFeedWidget } from "@/components/dashboard/ActivityFeedWidget";
import { NoticeBoardWidget } from "@/components/dashboard/NoticeBoardWidget";
import { CalendarWidget } from "@/components/dashboard/CalendarWidget";
import { PendingActionsWidget } from "@/components/dashboard/PendingActionsWidget";
import { QuickLinksWidget } from "@/components/dashboard/QuickLinksWidget";
import { TeamPendingApprovalsWidget } from "@/components/dashboard/TeamPendingApprovalsWidget";
import { TeamAttendanceSummaryWidget } from "@/components/dashboard/TeamAttendanceSummaryWidget";
import { HeadcountChartWidget } from "@/components/dashboard/HeadcountChartWidget";
import { DepartmentDistributionWidget } from "@/components/dashboard/DepartmentDistributionWidget";
import { AttritionGaugeWidget } from "@/components/dashboard/AttritionGaugeWidget";
import { NewJoinersWidget } from "@/components/dashboard/NewJoinersWidget";
import { HrPendingApprovalsWidget } from "@/components/dashboard/HrPendingApprovalsWidget";

const Index = () => {
  const { role } = useRole();

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <RoleKpiStrip />

        {role === "employee" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <PendingActionsWidget />
            <LeaveSummaryWidget />
            <AttendanceWidget />
            <ActivityFeedWidget />
            <NoticeBoardWidget />
            <CalendarWidget />
            <QuickLinksWidget />
          </div>
        )}

        {role === "manager" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <TeamPendingApprovalsWidget />
            <TeamAttendanceSummaryWidget />
            <LeaveSummaryWidget />
            <AttendanceWidget />
            <PendingActionsWidget />
            <CalendarWidget />
            <NoticeBoardWidget />
            <QuickLinksWidget />
            <ActivityFeedWidget />
          </div>
        )}

        {role === "hr_admin" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <HeadcountChartWidget />
            <DepartmentDistributionWidget />
            <HrPendingApprovalsWidget />
            <NewJoinersWidget />
            <NoticeBoardWidget />
            <AttritionGaugeWidget />
            <CalendarWidget />
            <ActivityFeedWidget />
          </div>
        )}

        {role === "director" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <HeadcountChartWidget />
            <AttritionGaugeWidget />
            <DepartmentDistributionWidget />
            <TeamAttendanceSummaryWidget />
            <CalendarWidget />
            <NoticeBoardWidget />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
