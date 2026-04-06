# 🏢 HRM System (PERN Stack)

## 📌 Project Overview

Human Resource Management (HRM) system built using:

* **Frontend:** React (Vite + TypeScript + Tailwind + shadcn)
* **Backend:** Node.js + Express
* **Database:** PostgreSQL

---

# ⚙️ Initial Setup

## 🧰 Prerequisites

* Node.js (Recommended: `v20.19.0`)
* npm
* PostgreSQL (later)

---

# 📁 Project Structure

```
hrm-system/
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Express + PostgreSQL)
├── docs/
└── README.md
```

---

# 🚀 Frontend Setup (Vite + React)

## 1. Create Project

```
npm create vite@latest client
```

Select:

* React
* TypeScript

---

## 2. Install Dependencies

```
cd client
npm install
```

---

## 3. Fix Node Version (if needed)

```
nvm install 20.19.0
nvm use 20.19.0
node -v
```

---

## 4. Clean Install (if errors occur)

```
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 5. Install Core Libraries

```
npm install react-router-dom @tanstack/react-query axios
```

---

## 6. Setup Tailwind CSS

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Update `tailwind.config.js`

```
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### Update `index.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 7. Setup shadcn UI

```
npx shadcn-ui@latest init
```

---

## 8. Install Additional UI Dependencies

```
npm install zod react-hook-form @hookform/resolvers
npm install lucide-react date-fns sonner
npm install clsx tailwind-merge class-variance-authority
```

---

## ▶️ Run Frontend

```
npm run dev
```

---

# 🖥️ Backend Setup (Express + PostgreSQL)

## 1. Initialize Project

```
mkdir server
cd server
npm init -y
```

---

## 2. Install Core Packages

```
npm install express cors dotenv
npm install pg
npm install bcrypt jsonwebtoken
```

---

## 3. Install Dev Tools

```
npm install -D nodemon
```

---

## 📁 Backend Structure

```
server/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   └── company/
│   ├── config/
│   ├── middleware/
│   ├── app.js
│   └── server.js
├── .env
└── package.json
```

---

## ▶️ Run Backend

```
npx nodemon src/server.js
```

---

# 🔍 Health Check

```
http://localhost:5000/health
```

---

# 🧠 Development Approach

* Build **feature by feature**
* Keep backend + frontend in sync
* Start with:

  1. Auth
  2. Company
  3. Users

---

# 📝 Notes

* Do NOT install all dependencies at once
* Install only when needed
* Keep code modular (feature-based structure)

---

# 📌 Next Steps

* [ ] Setup Auth Module
* [ ] Design DB Schema
* [ ] Connect Frontend & Backend

---
