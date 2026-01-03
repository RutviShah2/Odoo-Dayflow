import { User, AttendanceRecord, LeaveRequest, DashboardStats, Activity } from '@/types/hrms';

export const mockUsers: User[] = [
  {
    id: '1',
    employeeId: 'EMP001',
    email: 'rutvi.shah@dayflow.com',
    name: 'Rutvi Shah',
    role: 'admin',
    avatar: '',
    department: 'Human Resources',
    designation: 'HR Manager',
    phone: '+91 98765 43210',
    address: 'Ahmedabad, Gujarat, India',
    joiningDate: '2022-01-15',
    salary: {
      basic: 65000,
      hra: 26000,
      allowances: 15000,
      deductions: 8000,
      netSalary: 98000,
    },
  },
  {
    id: '2',
    employeeId: 'EMP002',
    email: 'disu.makadiya@dayflow.com',
    name: 'Disu Makadiya',
    role: 'employee',
    avatar: '',
    department: 'Engineering',
    designation: 'Senior Software Engineer',
    phone: '+91 98765 43211',
    address: 'Surat, Gujarat, India',
    joiningDate: '2022-03-20',
    salary: {
      basic: 55000,
      hra: 22000,
      allowances: 12000,
      deductions: 6500,
      netSalary: 82500,
    },
  },
  {
    id: '3',
    employeeId: 'EMP003',
    email: 'vaibhavi.karia@dayflow.com',
    name: 'Vaibhavi Karia',
    role: 'employee',
    avatar: '',
    department: 'Design',
    designation: 'UI/UX Designer',
    phone: '+91 98765 43212',
    address: 'Rajkot, Gujarat, India',
    joiningDate: '2022-06-10',
    salary: {
      basic: 50000,
      hra: 20000,
      allowances: 10000,
      deductions: 5500,
      netSalary: 74500,
    },
  },
  {
    id: '4',
    employeeId: 'EMP004',
    email: 'arjun.patel@dayflow.com',
    name: 'Arjun Patel',
    role: 'employee',
    avatar: '',
    department: 'Engineering',
    designation: 'Software Engineer',
    phone: '+91 98765 43213',
    address: 'Vadodara, Gujarat, India',
    joiningDate: '2023-01-05',
    salary: {
      basic: 45000,
      hra: 18000,
      allowances: 8000,
      deductions: 5000,
      netSalary: 66000,
    },
  },
  {
    id: '5',
    employeeId: 'EMP005',
    email: 'priya.sharma@dayflow.com',
    name: 'Priya Sharma',
    role: 'employee',
    avatar: '',
    department: 'Marketing',
    designation: 'Marketing Executive',
    phone: '+91 98765 43214',
    address: 'Mumbai, Maharashtra, India',
    joiningDate: '2023-04-15',
    salary: {
      basic: 40000,
      hra: 16000,
      allowances: 7000,
      deductions: 4500,
      netSalary: 58500,
    },
  },
];

export const getCurrentWeekDates = (): string[] => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
  
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

export const generateMockAttendance = (userId: string): AttendanceRecord[] => {
  const weekDates = getCurrentWeekDates();
  const today = new Date().toISOString().split('T')[0];
  
  return weekDates.map((date, index) => {
    const isToday = date === today;
    const isFuture = new Date(date) > new Date();
    const isWeekend = index === 5 || index === 6;
    
    if (isFuture || isWeekend) {
      return {
        id: `att-${userId}-${date}`,
        date,
        status: isWeekend ? 'leave' : 'absent',
        remarks: isWeekend ? 'Weekend' : undefined,
      };
    }
    
    const statuses: ('present' | 'absent' | 'half-day' | 'leave')[] = ['present', 'present', 'present', 'half-day', 'leave'];
    const randomStatus = isToday ? 'present' : statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `att-${userId}-${date}`,
      date,
      checkIn: randomStatus !== 'absent' && randomStatus !== 'leave' ? '09:00' : undefined,
      checkOut: randomStatus === 'present' ? '18:00' : randomStatus === 'half-day' ? '13:00' : undefined,
      status: randomStatus,
      hoursWorked: randomStatus === 'present' ? 9 : randomStatus === 'half-day' ? 4 : 0,
    };
  });
};

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave-1',
    employeeId: '2',
    employeeName: 'Disu Makadiya',
    type: 'sick',
    startDate: '2026-01-06',
    endDate: '2026-01-07',
    reason: 'Feeling unwell, need to rest and recover',
    status: 'pending',
    appliedOn: '2026-01-03',
  },
  {
    id: 'leave-2',
    employeeId: '3',
    employeeName: 'Vaibhavi Karia',
    type: 'casual',
    startDate: '2026-01-10',
    endDate: '2026-01-10',
    reason: 'Personal work - family function',
    status: 'pending',
    appliedOn: '2026-01-02',
  },
  {
    id: 'leave-3',
    employeeId: '4',
    employeeName: 'Arjun Patel',
    type: 'paid',
    startDate: '2025-12-28',
    endDate: '2025-12-30',
    reason: 'Year-end vacation with family',
    status: 'approved',
    appliedOn: '2025-12-20',
    approvedBy: 'Rutvi Shah',
    approvedOn: '2025-12-21',
  },
  {
    id: 'leave-4',
    employeeId: '5',
    employeeName: 'Priya Sharma',
    type: 'unpaid',
    startDate: '2025-12-15',
    endDate: '2025-12-16',
    reason: 'Emergency travel',
    status: 'rejected',
    appliedOn: '2025-12-14',
    approvedBy: 'Rutvi Shah',
    approvedOn: '2025-12-14',
    comments: 'High priority project deadline. Please reschedule.',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalEmployees: 5,
  presentToday: 4,
  onLeave: 1,
  pendingRequests: 2,
};

export const mockActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'leave',
    message: 'Disu Makadiya applied for sick leave',
    timestamp: '2026-01-03T10:30:00',
  },
  {
    id: 'act-2',
    type: 'attendance',
    message: 'Vaibhavi Karia checked in at 09:05 AM',
    timestamp: '2026-01-03T09:05:00',
  },
  {
    id: 'act-3',
    type: 'leave',
    message: 'Leave request from Arjun Patel was approved',
    timestamp: '2025-12-21T14:00:00',
  },
  {
    id: 'act-4',
    type: 'profile',
    message: 'Priya Sharma updated her contact information',
    timestamp: '2025-12-20T11:30:00',
  },
  {
    id: 'act-5',
    type: 'payroll',
    message: 'December 2025 payroll processed successfully',
    timestamp: '2025-12-31T17:00:00',
  },
];
