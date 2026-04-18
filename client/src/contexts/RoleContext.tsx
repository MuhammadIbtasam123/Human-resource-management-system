import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "employee" | "manager" | "hr_admin" | "director";

interface MockUser {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  department: string;
  job_title: string;
  avatar_initials: string;
  manager_id: string | null;
}

const MOCK_USERS: Record<UserRole, MockUser> = {
  employee: {
    id: "u1",
    full_name: "Aarav Patel",
    email: "aarav@clarisync.com",
    role: "employee",
    department: "Engineering",
    job_title: "Software Engineer",
    avatar_initials: "AP",
    manager_id: "u2",
  },
  manager: {
    id: "u2",
    full_name: "Priya Sharma",
    email: "priya@clarisync.com",
    role: "manager",
    department: "Engineering",
    job_title: "Engineering Manager",
    avatar_initials: "PS",
    manager_id: "u4",
  },
  hr_admin: {
    id: "u3",
    full_name: "Ravi Kumar",
    email: "ravi@clarisync.com",
    role: "hr_admin",
    department: "Human Resources",
    job_title: "HR Administrator",
    avatar_initials: "RK",
    manager_id: "u4",
  },
  director: {
    id: "u4",
    full_name: "Meera Desai",
    email: "meera@clarisync.com",
    role: "director",
    department: "Executive",
    job_title: "Director of Operations",
    avatar_initials: "MD",
    manager_id: null,
  },
};

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: MockUser;
  roleLabel: string;
  roleColor: string;
}

const ROLE_LABELS: Record<UserRole, string> = {
  employee: "Employee",
  manager: "Manager",
  hr_admin: "HR Admin",
  director: "Director",
};

const ROLE_COLORS: Record<UserRole, string> = {
  employee: "bg-accent text-accent-foreground",
  manager: "bg-primary text-primary-foreground",
  hr_admin: "bg-[hsl(270,50%,50%)] text-white",
  director: "bg-[hsl(38,90%,50%)] text-white",
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>(
    () => (localStorage.getItem("hrm-role") as UserRole) || "employee"
  );

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("hrm-role", newRole);
  };

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole: handleSetRole,
        user: MOCK_USERS[role],
        roleLabel: ROLE_LABELS[role],
        roleColor: ROLE_COLORS[role],
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within RoleProvider");
  return context;
}
