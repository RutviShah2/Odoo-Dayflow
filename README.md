# 🌊 Dayflow HRMS · React + Vite

Modern HRMS frontend showcasing onboarding, attendance, leave, payroll, and approvals—wrapped in a polished marketing experience.

> Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, and **shadcn/ui**.

---

## ✨ Highlights
- 🏠 Public landing page with clear CTA (Sign up / Sign in).
- 🔐 Role-aware UI (Admin vs Employee) drives navigation and quick actions.
- 📊 Dashboard with activity feed, quick actions, and mock stats.
- 🗓️ Attendance weekly calendar with status badges and a detailed table.
- 📝 Leave workflow with employee requests and admin approvals.
- 💸 Payroll breakdown with earnings/deductions and payslip history.
- 👥 Employee directory (admin only) with search/filter.

---

## 🧰 Tech Stack
- Vite + React 18 + TypeScript
- Tailwind CSS, shadcn/ui (Radix Primitives), Framer Motion accents
- React Router v6 for routing
- React Query provider ready for API integration
- date-fns for date handling; lucide-react icons

---

## 🚀 Getting Started
Prerequisite: Node.js 18+

| Action            | npm                  | pnpm                 | bun                 |
| ----------------- | -------------------- | -------------------- | ------------------- |
| Install deps      | `npm install`        | `pnpm install`       | `bun install`       |
| Run dev server    | `npm run dev`        | `pnpm run dev`       | `bun run dev`       |
| Build             | `npm run build`      | `pnpm run build`     | `bun run build`     |
| Preview build     | `npm run preview`    | `pnpm run preview`   | `bun run preview`   |
| Lint              | `npm run lint`       | `pnpm run lint`      | `bun run lint`      |

Dev server: http://localhost:5173

---

## 🎭 Demo Accounts
Use any password (6+ chars):

- **Admin:** `rutvi.shah@dayflow.com`
- **Employee:** `disu.makadiya@dayflow.com`

---

## 🗂️ Project Structure
```
src/
  pages/          // Landing, auth, dashboard, attendance, leave, payroll, employees, approvals, profile
  components/     // Layout, cards, shadcn/ui primitives
  contexts/       // Auth context with localStorage session
  data/           // Mock data (users, attendance, leave, dashboard stats)
  hooks/          // Reusable hooks (toast, mobile detection)
  lib/            // Utilities (class merging, helpers)
  types/          // Shared HRMS domain types
```

---

## 🔍 Behavior Notes
- Data is mock-only, seeded from `src/data/mockData.ts`; no backend calls yet.
- Auth state persists in `localStorage` under `dayflow_user`.
- Admin-only routes (Employees, Approvals) redirect non-admin users to the dashboard.

---

## 🛠️ Customization Ideas
- Swap mock data for real APIs (wire through React Query).
- Integrate your identity provider and remove demo shortcuts.
- Extend payroll, attendance, and approvals with live data sources.

---

## 🤝 Contributing
1. Fork & clone the repo.
2. Create a feature branch: `git checkout -b feature/amazing-idea`.
3. Commit changes: `git commit -m "Add amazing idea"`.
4. Push & open a PR.

Happy building!