// ============ MOCK DATA FOR HRM SYSTEM ============

export interface Employee {
  id: string;
  full_name: string;
  email: string;
  role: "employee" | "manager" | "hr_admin" | "director";
  department_id: string;
  department: string;
  manager_id: string | null;
  job_title: string;
  employment_type: "full_time" | "part_time" | "contract" | "intern";
  join_date: string;
  avatar_initials: string;
  phone: string;
  date_of_birth: string;
  is_active: boolean;
  status: "active" | "probation" | "on_leave" | "inactive";
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name: string;
  employee_title: string;
  employee_avatar: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  days: number;
  reason: string;
  status: "pending_manager" | "pending_hr" | "approved" | "rejected" | "cancelled";
  manager_comment?: string;
  hr_comment?: string;
  manager_action_at?: string;
  hr_action_at?: string;
  created_at: string;
  attachment?: boolean;
}

export interface AttendanceRecord {
  user_id: string;
  date: string;
  clock_in: string;
  clock_out: string;
  total_hours: number;
  status: "present" | "absent" | "wfh" | "leave" | "late";
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: "HR" | "Finance" | "General" | "Urgent";
  is_pinned: boolean;
  created_by: string;
  created_at: string;
  is_read: boolean;
  attachment?: boolean;
}

export const departments = [
  { id: "d1", name: "Engineering", head_user_id: "u2" },
  { id: "d2", name: "Human Resources", head_user_id: "u3" },
  { id: "d3", name: "Marketing", head_user_id: "u6" },
  { id: "d4", name: "Finance", head_user_id: "u7" },
  { id: "d5", name: "Design", head_user_id: "u8" },
  { id: "d6", name: "Executive", head_user_id: "u4" },
];

export const employees: Employee[] = [
  { id: "u1", full_name: "Aarav Patel", email: "aarav@clarisync.com", role: "employee", department_id: "d1", department: "Engineering", manager_id: "u2", job_title: "Software Engineer", employment_type: "full_time", join_date: "2023-03-15", avatar_initials: "AP", phone: "+91 98765 43210", date_of_birth: "1995-06-12", is_active: true, status: "active" },
  { id: "u2", full_name: "Priya Sharma", email: "priya@clarisync.com", role: "manager", department_id: "d1", department: "Engineering", manager_id: "u4", job_title: "Engineering Manager", employment_type: "full_time", join_date: "2021-01-10", avatar_initials: "PS", phone: "+91 98765 43211", date_of_birth: "1990-03-22", is_active: true, status: "active" },
  { id: "u3", full_name: "Ravi Kumar", email: "ravi@clarisync.com", role: "hr_admin", department_id: "d2", department: "Human Resources", manager_id: "u4", job_title: "HR Administrator", employment_type: "full_time", join_date: "2020-06-01", avatar_initials: "RK", phone: "+91 98765 43212", date_of_birth: "1988-11-05", is_active: true, status: "active" },
  { id: "u4", full_name: "Meera Desai", email: "meera@clarisync.com", role: "director", department_id: "d6", department: "Executive", manager_id: null, job_title: "Director of Operations", employment_type: "full_time", join_date: "2019-01-01", avatar_initials: "MD", phone: "+91 98765 43213", date_of_birth: "1985-08-15", is_active: true, status: "active" },
  { id: "u5", full_name: "Anita Reddy", email: "anita@clarisync.com", role: "employee", department_id: "d1", department: "Engineering", manager_id: "u2", job_title: "Frontend Developer", employment_type: "full_time", join_date: "2023-07-20", avatar_initials: "AR", phone: "+91 98765 43214", date_of_birth: "1996-02-28", is_active: true, status: "active" },
  { id: "u6", full_name: "Karan Mehta", email: "karan@clarisync.com", role: "manager", department_id: "d3", department: "Marketing", manager_id: "u4", job_title: "Marketing Manager", employment_type: "full_time", join_date: "2021-05-15", avatar_initials: "KM", phone: "+91 98765 43215", date_of_birth: "1991-09-10", is_active: true, status: "active" },
  { id: "u7", full_name: "Deepa Nair", email: "deepa@clarisync.com", role: "manager", department_id: "d4", department: "Finance", manager_id: "u4", job_title: "Finance Manager", employment_type: "full_time", join_date: "2020-11-01", avatar_initials: "DN", phone: "+91 98765 43216", date_of_birth: "1989-04-18", is_active: true, status: "active" },
  { id: "u8", full_name: "Vikram Singh", email: "vikram@clarisync.com", role: "manager", department_id: "d5", department: "Design", manager_id: "u4", job_title: "Design Lead", employment_type: "full_time", join_date: "2022-02-01", avatar_initials: "VS", phone: "+91 98765 43217", date_of_birth: "1993-12-25", is_active: true, status: "active" },
  { id: "u9", full_name: "Neha Gupta", email: "neha@clarisync.com", role: "employee", department_id: "d3", department: "Marketing", manager_id: "u6", job_title: "Content Specialist", employment_type: "full_time", join_date: "2024-01-08", avatar_initials: "NG", phone: "+91 98765 43218", date_of_birth: "1997-07-03", is_active: true, status: "probation" },
  { id: "u10", full_name: "Sanjay Joshi", email: "sanjay@clarisync.com", role: "employee", department_id: "d4", department: "Finance", manager_id: "u7", job_title: "Financial Analyst", employment_type: "full_time", join_date: "2022-09-12", avatar_initials: "SJ", phone: "+91 98765 43219", date_of_birth: "1994-01-20", is_active: true, status: "active" },
  { id: "u11", full_name: "Pooja Verma", email: "pooja@clarisync.com", role: "employee", department_id: "d5", department: "Design", manager_id: "u8", job_title: "UI Designer", employment_type: "full_time", join_date: "2023-04-01", avatar_initials: "PV", phone: "+91 98765 43220", date_of_birth: "1996-10-30", is_active: true, status: "active" },
  { id: "u12", full_name: "Rahul Iyer", email: "rahul@clarisync.com", role: "employee", department_id: "d1", department: "Engineering", manager_id: "u2", job_title: "Backend Developer", employment_type: "contract", join_date: "2024-02-15", avatar_initials: "RI", phone: "+91 98765 43221", date_of_birth: "1998-05-08", is_active: true, status: "probation" },
  { id: "u13", full_name: "Shreya Chatterjee", email: "shreya@clarisync.com", role: "employee", department_id: "d2", department: "Human Resources", manager_id: "u3", job_title: "HR Coordinator", employment_type: "full_time", join_date: "2023-10-01", avatar_initials: "SC", phone: "+91 98765 43222", date_of_birth: "1995-03-14", is_active: true, status: "active" },
  { id: "u14", full_name: "Arjun Das", email: "arjun@clarisync.com", role: "employee", department_id: "d3", department: "Marketing", manager_id: "u6", job_title: "SEO Specialist", employment_type: "intern", join_date: "2024-06-01", avatar_initials: "AD", phone: "+91 98765 43223", date_of_birth: "2001-11-22", is_active: true, status: "probation" },
];

export const leaveRequests: LeaveRequest[] = [
  { id: "lr1", employee_id: "u1", employee_name: "Aarav Patel", employee_title: "Software Engineer", employee_avatar: "AP", leave_type: "Annual Leave", from_date: "2026-04-10", to_date: "2026-04-11", days: 2, reason: "Family vacation planned for the weekend", status: "pending_manager", created_at: "2026-04-02", attachment: false },
  { id: "lr2", employee_id: "u5", employee_name: "Anita Reddy", employee_title: "Frontend Developer", employee_avatar: "AR", leave_type: "Sick Leave", from_date: "2026-04-07", to_date: "2026-04-07", days: 1, reason: "Not feeling well, need rest", status: "pending_manager", created_at: "2026-04-04", attachment: true },
  { id: "lr3", employee_id: "u12", employee_name: "Rahul Iyer", employee_title: "Backend Developer", employee_avatar: "RI", leave_type: "Casual Leave", from_date: "2026-04-14", to_date: "2026-04-15", days: 2, reason: "Personal errand", status: "pending_hr", manager_comment: "Approved, workload is manageable", manager_action_at: "2026-04-03", created_at: "2026-04-01" },
  { id: "lr4", employee_id: "u9", employee_name: "Neha Gupta", employee_title: "Content Specialist", employee_avatar: "NG", leave_type: "Annual Leave", from_date: "2026-04-20", to_date: "2026-04-25", days: 4, reason: "Travel plans", status: "pending_manager", created_at: "2026-04-03" },
  { id: "lr5", employee_id: "u11", employee_name: "Pooja Verma", employee_title: "UI Designer", employee_avatar: "PV", leave_type: "Casual Leave", from_date: "2026-03-28", to_date: "2026-03-28", days: 1, reason: "Doctor appointment", status: "approved", manager_comment: "Approved", hr_comment: "Approved", manager_action_at: "2026-03-26", hr_action_at: "2026-03-27", created_at: "2026-03-25" },
  { id: "lr6", employee_id: "u10", employee_name: "Sanjay Joshi", employee_title: "Financial Analyst", employee_avatar: "SJ", leave_type: "Sick Leave", from_date: "2026-03-20", to_date: "2026-03-21", days: 2, reason: "Flu symptoms", status: "rejected", manager_comment: "Quarter-end deadlines. Please reschedule.", manager_action_at: "2026-03-19", created_at: "2026-03-18" },
  { id: "lr7", employee_id: "u2", employee_name: "Priya Sharma", employee_title: "Engineering Manager", employee_avatar: "PS", leave_type: "Annual Leave", from_date: "2026-04-18", to_date: "2026-04-22", days: 3, reason: "Family wedding", status: "pending_manager", created_at: "2026-04-03" },
];

export const leaveTypes = [
  { id: "lt1", name: "Annual Leave", annual_allocation: 18, carry_forward: true, requires_document: false, is_active: true },
  { id: "lt2", name: "Sick Leave", annual_allocation: 12, carry_forward: false, requires_document: true, is_active: true },
  { id: "lt3", name: "Casual Leave", annual_allocation: 7, carry_forward: false, requires_document: false, is_active: true },
  { id: "lt4", name: "Comp Off", annual_allocation: 5, carry_forward: true, requires_document: false, is_active: true },
  { id: "lt5", name: "Maternity Leave", annual_allocation: 180, carry_forward: false, requires_document: true, is_active: true },
  { id: "lt6", name: "Paternity Leave", annual_allocation: 15, carry_forward: false, requires_document: true, is_active: true },
];

export const notices: Notice[] = [
  { id: "n1", title: "Office Closure on Good Friday", body: "The office will be closed on April 18th for Good Friday. Enjoy the long weekend!", category: "HR", is_pinned: true, created_by: "Ravi Kumar", created_at: "2026-04-01", is_read: false },
  { id: "n2", title: "Q1 Town Hall Recording Available", body: "The recording of the Q1 Town Hall is now available on the company intranet.", category: "General", is_pinned: false, created_by: "Meera Desai", created_at: "2026-03-31", is_read: false, attachment: true },
  { id: "n3", title: "Updated Travel Reimbursement Policy", body: "Please review the updated travel reimbursement policy effective May 1st.", category: "Finance", is_pinned: true, created_by: "Deepa Nair", created_at: "2026-03-28", is_read: true },
  { id: "n4", title: "Fire Drill Scheduled — April 15", body: "A fire drill will be conducted on April 15 at 3:00 PM. All employees must participate.", category: "Urgent", is_pinned: false, created_by: "Ravi Kumar", created_at: "2026-03-25", is_read: true },
];

export const teamAttendance = [
  { user_id: "u1", name: "Aarav Patel", present: 18, absent: 1, late: 2, wfh: 3, leave: 1, attendance_pct: 88 },
  { user_id: "u5", name: "Anita Reddy", present: 20, absent: 0, late: 1, wfh: 2, leave: 0, attendance_pct: 96 },
  { user_id: "u12", name: "Rahul Iyer", present: 15, absent: 3, late: 4, wfh: 1, leave: 2, attendance_pct: 72 },
  { user_id: "u9", name: "Neha Gupta", present: 19, absent: 1, late: 0, wfh: 2, leave: 1, attendance_pct: 91 },
  { user_id: "u10", name: "Sanjay Joshi", present: 21, absent: 0, late: 0, wfh: 1, leave: 0, attendance_pct: 100 },
  { user_id: "u11", name: "Pooja Verma", present: 17, absent: 2, late: 3, wfh: 2, leave: 1, attendance_pct: 82 },
  { user_id: "u13", name: "Shreya Chatterjee", present: 20, absent: 0, late: 1, wfh: 1, leave: 1, attendance_pct: 95 },
  { user_id: "u14", name: "Arjun Das", present: 16, absent: 2, late: 2, wfh: 0, leave: 3, attendance_pct: 76 },
];

export const onboardingEmployees = [
  { id: "ob1", employee_id: "u9", name: "Neha Gupta", start_date: "2024-01-08", manager: "Karan Mehta", progress: 75, total_tasks: 8, completed_tasks: 6, status: "in_progress" as const },
  { id: "ob2", employee_id: "u12", name: "Rahul Iyer", start_date: "2024-02-15", manager: "Priya Sharma", progress: 50, total_tasks: 8, completed_tasks: 4, status: "in_progress" as const },
  { id: "ob3", employee_id: "u14", name: "Arjun Das", start_date: "2024-06-01", manager: "Karan Mehta", progress: 25, total_tasks: 8, completed_tasks: 2, status: "not_started" as const },
];

export const orgChartData = {
  nodes: [
    { id: "u4", position: { x: 400, y: 0 }, data: { label: "Meera Desai", title: "Director of Operations", department: "Executive", role: "director", initials: "MD" }, type: "custom" },
    { id: "u2", position: { x: 100, y: 150 }, data: { label: "Priya Sharma", title: "Engineering Manager", department: "Engineering", role: "manager", initials: "PS" }, type: "custom" },
    { id: "u3", position: { x: 300, y: 150 }, data: { label: "Ravi Kumar", title: "HR Administrator", department: "Human Resources", role: "hr_admin", initials: "RK" }, type: "custom" },
    { id: "u6", position: { x: 500, y: 150 }, data: { label: "Karan Mehta", title: "Marketing Manager", department: "Marketing", role: "manager", initials: "KM" }, type: "custom" },
    { id: "u7", position: { x: 700, y: 150 }, data: { label: "Deepa Nair", title: "Finance Manager", department: "Finance", role: "manager", initials: "DN" }, type: "custom" },
    { id: "u8", position: { x: 900, y: 150 }, data: { label: "Vikram Singh", title: "Design Lead", department: "Design", role: "manager", initials: "VS" }, type: "custom" },
    { id: "u1", position: { x: 0, y: 300 }, data: { label: "Aarav Patel", title: "Software Engineer", department: "Engineering", role: "employee", initials: "AP" }, type: "custom" },
    { id: "u5", position: { x: 150, y: 300 }, data: { label: "Anita Reddy", title: "Frontend Developer", department: "Engineering", role: "employee", initials: "AR" }, type: "custom" },
    { id: "u12", position: { x: 50, y: 400 }, data: { label: "Rahul Iyer", title: "Backend Developer", department: "Engineering", role: "employee", initials: "RI" }, type: "custom" },
    { id: "u13", position: { x: 300, y: 300 }, data: { label: "Shreya Chatterjee", title: "HR Coordinator", department: "Human Resources", role: "employee", initials: "SC" }, type: "custom" },
    { id: "u9", position: { x: 450, y: 300 }, data: { label: "Neha Gupta", title: "Content Specialist", department: "Marketing", role: "employee", initials: "NG" }, type: "custom" },
    { id: "u14", position: { x: 600, y: 300 }, data: { label: "Arjun Das", title: "SEO Specialist", department: "Marketing", role: "employee", initials: "AD" }, type: "custom" },
    { id: "u10", position: { x: 700, y: 300 }, data: { label: "Sanjay Joshi", title: "Financial Analyst", department: "Finance", role: "employee", initials: "SJ" }, type: "custom" },
    { id: "u11", position: { x: 900, y: 300 }, data: { label: "Pooja Verma", title: "UI Designer", department: "Design", role: "employee", initials: "PV" }, type: "custom" },
  ],
  edges: [
    { id: "e1", source: "u4", target: "u2" },
    { id: "e2", source: "u4", target: "u3" },
    { id: "e3", source: "u4", target: "u6" },
    { id: "e4", source: "u4", target: "u7" },
    { id: "e5", source: "u4", target: "u8" },
    { id: "e6", source: "u2", target: "u1" },
    { id: "e7", source: "u2", target: "u5" },
    { id: "e8", source: "u2", target: "u12" },
    { id: "e9", source: "u3", target: "u13" },
    { id: "e10", source: "u6", target: "u9" },
    { id: "e11", source: "u6", target: "u14" },
    { id: "e12", source: "u7", target: "u10" },
    { id: "e13", source: "u8", target: "u11" },
  ],
};
