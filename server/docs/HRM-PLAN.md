# HRM System — Full Plan

## Decisions

- `POST /api/auth/register` creates org + admin user atomically (one step)
- RBAC: Role + Permissions model (fine-grained via `role_permissions` table)
- Architecture: Controller → Service → Model (clean separation)
- Single-tenant now, `org_id` on every table for future multi-tenancy

---

## ERD

### Direct Relationships (no pivot tables)

```
#   From              To                    Cardinality   Notes
1   Organization  →   User                  1 : M         org_id on users
2   Organization  →   Department            1 : M         org_id on departments
3   Organization  →   Employee              1 : M         org_id on employees
4   User          →   Employee              1 : 0..1      user_id on employees (optional)
5   Employee      →   Department            M : 1         department_id on employees
6   Department    →   Employee (head)       1 : 0..1      head_id on departments (nullable)
7   Employee      →   Employee (manager)    M : 0..1      manager_id self-ref (nullable)
```

### RBAC Relationships (pivot tables)

```
User  ──< user_roles >──  Role  ──< role_permissions >──  Permission
       M             M         M                      M
       (org-scoped)
```

### Full Schema Diagram

```
                        ┌──────────────────────┐
                        │    organizations     │
                        ├──────────────────────┤
                        │ id          UUID PK  │
                        │ name        TEXT     │
                        │ slug        UNIQUE   │
                        │ settings    JSONB    │
                        │ is_active   BOOL     │
                        │ created_at  TS       │
                        └───┬──────┬───────┬──┘
                      1/    │      │       │ \1
                           M│      │M      │M
              ┌─────────────▼┐  ┌──▼───────▼────────────────┐
              │    users     │  │        employees           │
              ├──────────────┤  ├────────────────────────────┤
              │ id    UUID PK│  │ id           UUID PK       │
              │ org_id  FK   │  │ org_id       FK→orgs       │
              │ email  UNIQUE│  │ user_id      FK→users 0..1 │
              │ password_hash│  │ department_id FK→depts M:1 │
              │ is_active    │  │ manager_id   self-FK  0..1 │
              │ created_at   │  │ first_name   TEXT          │
              └──────┬───────┘  │ last_name    TEXT          │
                   1 │          │ phone        TEXT          │
                     │ M        │ job_title    TEXT          │
              ┌──────▼───────┐  │ hire_date    DATE          │
              │  user_roles  │  │ status  ACTIVE|INACTIVE    │
              ├──────────────┤  │ created_at   TS            │
              │ user_id FK   │  └──────────┬─────────────────┘
              │ role_id FK   │           M │           M │
              │ org_id  FK   │  (head_id)1 │     (dept)  │ 1
              │ assigned_at  │  ┌──────────▼─────────────┘
              └──────┬───────┘  │      departments        │
                   M │          ├─────────────────────────┤
                     │ 1        │ id         UUID PK      │
              ┌──────▼───────┐  │ org_id     FK→orgs      │
              │    roles     │  │ name       TEXT         │
              ├──────────────┤  │ head_id    FK→emp 0..1  │
              │ id    UUID PK│  │ created_at TS           │
              │ name  TEXT   │  └─────────────────────────┘
              │  ADMIN       │
              │  HR          │
              │  MANAGER     │
              │  TEAM_LEAD   │
              │  EMPLOYEE    │
              │ description  │
              └──────┬───────┘
                   1 │
                     │ M
              ┌──────▼────────────┐
              │  role_permissions │
              ├───────────────────┤
              │ role_id  FK→roles │
              │ perm_id  FK→perms │
              └──────┬────────────┘
                   M │
                     │ 1
              ┌──────▼───────┐
              │ permissions  │
              ├──────────────┤
              │ id    UUID PK│
              │ name  TEXT   │
              │  emp:read    │
              │  emp:write   │
              │  emp:delete  │
              │  dept:read   │
              │  dept:write  │
              │  org:settings│
              │ description  │
              └──────────────┘
```

**Multi-tenancy note:** Every table except `roles` and `permissions` carries `org_id`. Scoping all queries by `org_id` is the only change needed when adding multi-tenancy.

---

## Folder Structure

```
server/src/
├── config/
│   └── db.js                  ✅ exists — pg Pool
├── db/
│   └── migrations/
│       ├── 001_init.sql       all tables + ENUMs
│       └── 002_seed.sql       roles + permissions seed data
├── middleware/
│   ├── auth.js                JWT verify → attaches req.user
│   └── rbac.js                requirePermission('emp:read') guard
├── models/                    raw SQL query functions only
│   ├── user.model.js
│   ├── employee.model.js
│   ├── department.model.js
│   └── organization.model.js
├── services/                  business logic, calls models
│   ├── auth.service.js
│   ├── employee.service.js
│   ├── department.service.js
│   └── organization.service.js
├── controllers/               HTTP in/out, calls services
│   ├── auth.controller.js
│   ├── employee.controller.js
│   ├── department.controller.js
│   └── organization.controller.js
├── routes/
│   ├── index.js               mounts all routers under /api
│   ├── auth.routes.js
│   ├── employee.routes.js
│   ├── department.routes.js
│   └── organization.routes.js
├── validators/                Zod schemas
│   ├── auth.schema.js
│   └── employee.schema.js
├── utils/
│   ├── jwt.js                 sign / verify helpers
│   └── response.js            standard { success, data, error } shape
├── app.js                     ✅ exists
└── server.js                  ✅ exists
```

---

## API Endpoints

| Method | Path | Permission | Description |
|--------|------|-----------|-------------|
| POST | `/api/auth/register` | public | Create org + admin user (atomic) |
| POST | `/api/auth/login` | public | Returns JWT |
| GET | `/api/auth/me` | any authed | Current user + role |
| GET | `/api/employees` | `emp:read` | List employees |
| POST | `/api/employees` | `emp:write` | Create employee |
| GET | `/api/employees/:id` | `emp:read` | Get one employee |
| PUT | `/api/employees/:id` | `emp:write` | Update employee |
| DELETE | `/api/employees/:id` | `emp:delete` | Soft-delete |
| GET | `/api/departments` | `dept:read` | List departments |
| POST | `/api/departments` | `dept:write` | Create department |
| GET | `/api/organizations/settings` | `org:settings` | Get org settings |
| PUT | `/api/organizations/settings` | `org:settings` | Update org settings |

---

## Implementation Steps

### Phase 1 — Database Migration

- **Step 1a** — `server/db/migrations/001_init.sql`
  Create all tables: `organizations`, `roles`, `permissions`, `users`, `user_roles`, `role_permissions`, `departments`, `employees`

- **Step 1b** — `server/db/migrations/002_seed.sql`
  Insert all 5 roles + permissions (`emp:read`, `emp:write`, `emp:delete`, `dept:read`, `dept:write`, `org:settings`) + role_permissions mappings

---

### Phase 2 — Utilities

- **Step 2a** — `server/src/utils/response.js`
  `ok(res, data, status)` and `fail(res, message, status)` helpers

- **Step 2b** — `server/src/utils/jwt.js`
  `signToken(payload)` and `verifyToken(token)` wrapping jsonwebtoken

---

### Phase 3 — Validators

- **Step 3a** — `server/src/validators/auth.schema.js`
  Zod schemas: `registerSchema` (orgName, email, password) and `loginSchema` (email, password)

- **Step 3b** — `server/src/validators/employee.schema.js`
  Zod schema: `createEmployeeSchema`, `updateEmployeeSchema`

---

### Phase 4 — Models (raw SQL)

- **Step 4a** — `server/src/models/user.model.js`
  `createUser`, `findByEmail`, `findById`

- **Step 4b** — `server/src/models/organization.model.js`
  `createOrg`, `findById`, `updateSettings`

- **Step 4c** — `server/src/models/employee.model.js`
  `createEmployee`, `findAll`, `findById`, `update`, `softDelete`

- **Step 4d** — `server/src/models/department.model.js`
  `createDepartment`, `findAll`

---

### Phase 5 — Auth Layer

- **Step 5a** — `server/src/services/auth.service.js`
  `register` (transaction: create org → create user → assign ADMIN role), `login` (verify password → sign JWT)

- **Step 5b** — `server/src/controllers/auth.controller.js`
  `register`, `login`, `me` handlers — validate with Zod, call service, use response utils

- **Step 5c** — `server/src/routes/auth.routes.js`
  Mount POST `/register`, POST `/login`, GET `/me`

- **Step 5d** — `server/src/middleware/auth.js`
  Extract Bearer token → `verifyToken` → attach `req.user` → call next

- **Step 5e** — `server/src/middleware/rbac.js`
  `requirePermission(permission)` — query `user_roles` + `role_permissions` → 403 if not found

---

### Phase 6 — Employee & Department

- **Step 6a** — `server/src/services/employee.service.js`
- **Step 6b** — `server/src/controllers/employee.controller.js`
- **Step 6c** — `server/src/routes/employee.routes.js`
- **Step 6d** — `server/src/services/department.service.js`
- **Step 6e** — `server/src/controllers/department.controller.js`
- **Step 6f** — `server/src/routes/department.routes.js`

---

### Phase 7 — Org Settings

- **Step 7a** — `server/src/services/organization.service.js`
- **Step 7b** — `server/src/controllers/organization.controller.js`
- **Step 7c** — `server/src/routes/organization.routes.js`

---

### Phase 8 — Wire Up

- **Step 8a** — `server/src/routes/index.js`
  Import all routers, export single router mounted at `/api`

- **Step 8b** — Update `server/src/app.js`
  Import routes index, register under `/api`

---

## Verification Checklist

```
GET  /health                                      → { status: "OK" }
POST /api/auth/register  { orgName, email, pwd }  → { token }
POST /api/auth/login     { email, pwd }           → { token }
GET  /api/auth/me        Bearer <admin-token>     → user + role

POST /api/employees      Bearer <hr-token>        → 201 created
GET  /api/employees      Bearer <manager-token>   → 200 list
DELETE /api/employees/:id Bearer <employee-token> → 403 forbidden

GET  /api/organizations/settings  Bearer <non-admin> → 403
PUT  /api/organizations/settings  Bearer <admin>     → 200 updated
```
