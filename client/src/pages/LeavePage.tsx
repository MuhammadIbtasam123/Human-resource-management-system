import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplyLeaveTab } from "@/components/leave/ApplyLeaveTab";
import { CancelLeaveTab } from "@/components/leave/CancelLeaveTab";
import { LeaveHistoryTab } from "@/components/leave/LeaveHistoryTab";
import { LeaveBalanceTab } from "@/components/leave/LeaveBalanceTab";
import { TeamLeaveTab } from "@/components/leave/TeamLeaveTab";

const LeavePage = () => {
  const [activeTab, setActiveTab] = useState("apply");

  return (
    <AppLayout title="Leave Management">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 flex-wrap h-auto gap-1">
          <TabsTrigger value="apply">Apply Leave</TabsTrigger>
          <TabsTrigger value="balance">Leave Balance</TabsTrigger>
          <TabsTrigger value="cancel">Cancel Request</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
          <TabsTrigger value="team">Team Leave</TabsTrigger>
        </TabsList>

        <TabsContent value="apply"><ApplyLeaveTab /></TabsContent>
        <TabsContent value="balance"><LeaveBalanceTab /></TabsContent>
        <TabsContent value="cancel"><CancelLeaveTab /></TabsContent>
        <TabsContent value="history"><LeaveHistoryTab /></TabsContent>
        <TabsContent value="team"><TeamLeaveTab /></TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default LeavePage;
