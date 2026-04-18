import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, LayoutGrid, List, Mail, Phone, Eye, Copy } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const employees = [
  { id: 1, name: "John Doe", initials: "JD", title: "Senior Software Engineer", department: "Engineering", email: "john.doe@clarisync.com", phone: "+1 555-0101", location: "San Francisco", type: "Full-time" },
  { id: 2, name: "Sarah Chen", initials: "SC", title: "Product Manager", department: "Product", email: "sarah.chen@clarisync.com", phone: "+1 555-0102", location: "New York", type: "Full-time" },
  { id: 3, name: "Michael Roberts", initials: "MR", title: "Sales Lead", department: "Sales", email: "michael.r@clarisync.com", phone: "+1 555-0103", location: "Chicago", type: "Full-time" },
  { id: 4, name: "Priya Sharma", initials: "PS", title: "UI/UX Designer", department: "Design", email: "priya.s@clarisync.com", phone: "+1 555-0104", location: "Remote", type: "Full-time" },
  { id: 5, name: "David Kim", initials: "DK", title: "Backend Engineer", department: "Engineering", email: "david.k@clarisync.com", phone: "+1 555-0105", location: "San Francisco", type: "Full-time" },
  { id: 6, name: "Emily Watson", initials: "EW", title: "Marketing Specialist", department: "Marketing", email: "emily.w@clarisync.com", phone: "+1 555-0106", location: "New York", type: "Part-time" },
  { id: 7, name: "James Taylor", initials: "JT", title: "HR Coordinator", department: "HR", email: "james.t@clarisync.com", phone: "+1 555-0107", location: "Chicago", type: "Full-time" },
  { id: 8, name: "Alex Morgan", initials: "AM", title: "DevOps Engineer", department: "Engineering", email: "alex.m@clarisync.com", phone: "+1 555-0108", location: "Remote", type: "Contract" },
  { id: 9, name: "Lisa Park", initials: "LP", title: "Product Analyst", department: "Product", email: "lisa.p@clarisync.com", phone: "+1 555-0109", location: "San Francisco", type: "Full-time" },
];

const PeoplePage = () => {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const filtered = employees.filter((e) => {
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (deptFilter !== "all" && e.department !== deptFilter) return false;
    if (typeFilter !== "all" && e.type !== typeFilter) return false;
    return true;
  });

  return (
    <AppLayout title="People & Directory">
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9" />
          </div>
          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-36 h-9 text-sm"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depts</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 h-9 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-1 ml-auto">
            <Button variant={view === "grid" ? "default" : "outline"} size="icon" className="h-9 w-9" onClick={() => setView("grid")}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant={view === "list" ? "default" : "outline"} size="icon" className="h-9 w-9" onClick={() => setView("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">{filtered.length} employees found</p>

        {/* Grid View */}
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((emp) => (
              <Card key={emp.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 pb-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary text-lg">{emp.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{emp.name}</h3>
                      <p className="text-sm text-muted-foreground">{emp.title}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{emp.department}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <button onClick={() => { navigator.clipboard.writeText(emp.email); toast.success("Email copied!"); }} className="flex items-center gap-1 hover:text-foreground">
                        <Mail className="h-3 w-3" />
                        <Copy className="h-2.5 w-2.5" />
                      </button>
                      <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{emp.phone}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate(`/people/${emp.id}`)}>
                      <Eye className="h-3 w-3 mr-1" /> View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((emp) => (
                      <TableRow key={emp.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarFallback className="bg-primary/10 text-primary text-[10px]">{emp.initials}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{emp.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{emp.title}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell className="text-sm">{emp.email}</TableCell>
                        <TableCell>{emp.location}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">{emp.type}</Badge></TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/people/${emp.id}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default PeoplePage;
