# Dayflow HRMS (React + Vite)

Modern HRMS frontend that showcases onboarding, attendance, leave, payroll, and approvals flows with a polished marketing page. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## Overview
- Public landing page highlighting Dayflow and CTA to sign up/sign in.
- Mock authentication with localStorage-backed sessions and demo accounts.
- Role-aware UI (Admin vs Employee) driving navigation and quick actions.
- Dashboard with activity feed, quick actions, and mock stats.
- Attendance weekly calendar with status badges and detailed table.
- Leave application workflow plus admin approvals view.
- Payroll breakdown with earnings/deductions and payslip history.
- Employee directory (admin only) with search/filter.

## Tech Stack
- Vite + React 18 + TypeScript
- Tailwind CSS, shadcn/ui (Radix Primitives), Framer Motion accents
- React Router v6 for routing
- React Query provider ready for API integration
- date-fns for date handling; lucide-react icons

## Getting Started
Prerequisites: Node.js 18+ and a package manager (npm, pnpm, or bun).

Install dependencies:
- npm: `npm install`
- pnpm: `pnpm install`
- bun: `bun install`

Run the dev server:
```
npm run dev
```
The app defaults to http://localhost:5173.

Build for production:
```
npm run build
```

Preview the production build locally:
```
npm run preview
```

Lint the project:
```
npm run lint
```

## Demo Accounts
Use any password with 6+ characters.

- Admin: rutvi.shah@dayflow.com
- Employee: disu.makadiya@dayflow.com

## Project Structure
```
src/
	pages/          // Route pages (landing, auth, dashboard, attendance, leave, payroll, employees, approvals, profile)
	components/     // Layout, cards, and shadcn/ui primitives
	contexts/       // Auth context with localStorage session
	data/           // Mock data for users, attendance, leave, dashboard stats
	hooks/          // Reusable hooks (toast, mobile detection)
	lib/            // Utilities (class merging, helpers)
	types/          // Shared HRMS domain types
```

## Behavior Notes
- Data is mock-only and seeded from src/data/mockData.ts; no backend calls yet.
- Auth state persists in localStorage under `dayflow_user`.
- Admin-only routes (Employees, Approvals) redirect non-admin users to the dashboard.



## Customization Ideas
- Replace mock data with real API calls (wire through React Query).
- Hook up authentication to your identity provider and remove the demo shortcuts.
- Extend payroll, attendance, and approvals to use live data sources.

