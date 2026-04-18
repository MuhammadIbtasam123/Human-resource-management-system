import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceOverviewTab } from "@/components/attendance/AttendanceOverviewTab";
import { TimesheetTab } from "@/components/attendance/TimesheetTab";
import { TimeCorrectionTab } from "@/components/attendance/TimeCorrectionTab";
import { ClockInOutTab } from "@/components/attendance/ClockInOutTab";
import { WfhRequestTab } from "@/components/attendance/WfhRequestTab";

const AttendancePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout title="Attendance">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timesheet">Timesheet</TabsTrigger>
          <TabsTrigger value="clock">Clock In / Out</TabsTrigger>
          <TabsTrigger value="correction">Regularization</TabsTrigger>
          <TabsTrigger value="wfh">WFH Request</TabsTrigger>
        </TabsList>

        <TabsContent value="overview"><AttendanceOverviewTab /></TabsContent>
        <TabsContent value="timesheet"><TimesheetTab /></TabsContent>
        <TabsContent value="clock"><ClockInOutTab /></TabsContent>
        <TabsContent value="correction"><TimeCorrectionTab /></TabsContent>
        <TabsContent value="wfh"><WfhRequestTab /></TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default AttendancePage;
