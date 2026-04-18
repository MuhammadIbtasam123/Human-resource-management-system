import { useState, useCallback, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ReactFlow, Controls, Background, MiniMap, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { orgChartData, employees } from "@/data/mockData";
import { useRole } from "@/contexts/RoleContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Search } from "lucide-react";

const roleBorderColors: Record<string, string> = {
  director: "#D97706",
  hr_admin: "#7C3AED",
  manager: "#1E3A5F",
  employee: "#94a3b8",
};

function OrgNode({ data }: { data: { label: string; title: string; department: string; role: string; initials: string; isCurrentUser?: boolean; dimmed?: boolean } }) {
  const borderColor = roleBorderColors[data.role] || "#94a3b8";
  return (
    <div
      className={`bg-card rounded-xl p-3 shadow-md border-2 min-w-[140px] text-center transition-opacity ${data.dimmed ? "opacity-30" : ""}`}
      style={{ borderColor }}
    >
      <Avatar className="h-10 w-10 mx-auto mb-1.5" style={{ borderColor, borderWidth: 2 }}>
        <AvatarFallback className="text-xs bg-primary/10 text-primary">{data.initials}</AvatarFallback>
      </Avatar>
      <p className="text-sm font-semibold text-foreground leading-tight">{data.label}</p>
      <p className="text-[10px] text-muted-foreground">{data.title}</p>
      <Badge variant="outline" className="text-[9px] mt-1 px-1.5" style={{ borderColor, color: borderColor }}>
        {data.department}
      </Badge>
      {data.isCurrentUser && (
        <Badge className="block mt-1 text-[9px] bg-accent text-accent-foreground mx-auto w-fit">You</Badge>
      )}
    </div>
  );
}

const nodeTypes = { custom: OrgNode };

const OrgChartPage = () => {
  const { user } = useRole();
  const [searchTerm, setSearchTerm] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const nodes: Node[] = useMemo(() =>
    orgChartData.nodes.map((n) => ({
      ...n,
      data: {
        ...n.data,
        isCurrentUser: n.id === user.id,
        dimmed: searchTerm
          ? !n.data.label.toLowerCase().includes(searchTerm.toLowerCase())
          : deptFilter !== "all"
          ? n.data.department !== deptFilter
          : false,
      },
    })), [searchTerm, deptFilter, user.id]);

  const edges: Edge[] = useMemo(() =>
    orgChartData.edges.map((e) => ({
      ...e,
      style: { stroke: "#94a3b8", strokeWidth: 1.5 },
      animated: false,
    })), []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedEmployee(node.id);
  }, []);

  const selectedEmp = employees.find((e) => e.id === selectedEmployee);

  const depts = [...new Set(orgChartData.nodes.map((n) => n.data.department))];

  return (
    <AppLayout title="Org Chart">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
            <Input placeholder="Search person..." className="pl-8 h-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="h-9 w-48"><SelectValue placeholder="Filter department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {depts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="h-[calc(100vh-220px)] border rounded-xl overflow-hidden bg-muted/30">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={onNodeClick}
            fitView
            minZoom={0.3}
            maxZoom={2}
          >
            <Controls />
            <Background />
            <MiniMap nodeStrokeWidth={3} />
          </ReactFlow>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full border-2" style={{ borderColor: "#D97706" }} /> Director</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full border-2" style={{ borderColor: "#7C3AED" }} /> HR Admin</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full border-2" style={{ borderColor: "#1E3A5F" }} /> Manager</span>
          <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full border-2" style={{ borderColor: "#94a3b8" }} /> Employee</span>
        </div>
      </div>

      <Sheet open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Employee Profile</SheetTitle>
          </SheetHeader>
          {selectedEmp && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">{selectedEmp.avatar_initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{selectedEmp.full_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmp.job_title}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-muted-foreground text-xs">Department</p><p className="font-medium">{selectedEmp.department}</p></div>
                <div><p className="text-muted-foreground text-xs">Role</p><p className="font-medium capitalize">{selectedEmp.role.replace("_", " ")}</p></div>
                <div><p className="text-muted-foreground text-xs">Email</p><p className="font-medium">{selectedEmp.email}</p></div>
                <div><p className="text-muted-foreground text-xs">Phone</p><p className="font-medium">{selectedEmp.phone}</p></div>
                <div><p className="text-muted-foreground text-xs">Join Date</p><p className="font-medium">{selectedEmp.join_date}</p></div>
                <div><p className="text-muted-foreground text-xs">Status</p>
                  <Badge variant="outline" className="text-xs capitalize">{selectedEmp.status}</Badge>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AppLayout>
  );
};

export default OrgChartPage;
