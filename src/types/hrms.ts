export type UserRole = 'admin' | 'employee';

export type LeaveType = 'paid' | 'sick' | 'unpaid' | 'casual';

export type LeaveStatus = 'pending' | 'approved' | 'rejected';

export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'leave';

export interface User {
  id: string;
  employeeId: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department: string;
  designation: string;
  phone: string;
  address: string;
  joiningDate: string;
  salary: SalaryStructure;
  documents?: Document[];
}

export interface SalaryStructure {
  basic: number;
  hra: number;
  allowances: number;
  deductions: number;
  netSalary: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  url: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  hoursWorked?: number;
  remarks?: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  approvedBy?: string;
  approvedOn?: string;
  comments?: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  pendingRequests: number;
}

export interface Activity {
  id: string;
  type: 'leave' | 'attendance' | 'profile' | 'payroll';
  message: string;
  timestamp: string;
  icon?: string;
}
