import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  MinusCircle,
  CalendarOff,
} from 'lucide-react';
import { generateMockAttendance, getCurrentWeekDates, mockUsers } from '@/data/mockData';
import { format, addDays, startOfWeek, endOfWeek, isToday, parseISO } from 'date-fns';
import { AttendanceRecord, AttendanceStatus } from '@/types/hrms';
import { cn } from '@/lib/utils';

const statusConfig: Record<AttendanceStatus, { label: string; icon: React.ReactNode; className: string }> = {
  present: {
    label: 'Present',
    icon: <CheckCircle2 className="w-4 h-4" />,
    className: 'status-present',
  },
  absent: {
    label: 'Absent',
    icon: <XCircle className="w-4 h-4" />,
    className: 'status-absent',
  },
  'half-day': {
    label: 'Half Day',
    icon: <MinusCircle className="w-4 h-4" />,
    className: 'status-half-day',
  },
  leave: {
    label: 'Leave',
    icon: <CalendarOff className="w-4 h-4" />,
    className: 'status-leave',
  },
};

const Attendance: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [selectedEmployee, setSelectedEmployee] = useState(user?.id || '');

  const attendanceData = generateMockAttendance(selectedEmployee);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  const getAttendanceForDate = (date: Date): AttendanceRecord | undefined => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return attendanceData.find(a => a.date === dateStr);
  };

  const calculateStats = () => {
    const present = attendanceData.filter(a => a.status === 'present').length;
    const absent = attendanceData.filter(a => a.status === 'absent').length;
    const halfDay = attendanceData.filter(a => a.status === 'half-day').length;
    const leave = attendanceData.filter(a => a.status === 'leave').length;
    const totalHours = attendanceData.reduce((sum, a) => sum + (a.hoursWorked || 0), 0);
    return { present, absent, halfDay, leave, totalHours };
  };

  const stats = calculateStats();

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance</h1>
            <p className="text-muted-foreground mt-1">Track your daily attendance records</p>
          </div>

          {isAdmin && (
            <select
              value={selectedEmployee}
              onChange={e => setSelectedEmployee(e.target.value)}
              className="flex h-10 w-full sm:w-64 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {mockUsers.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.employeeId})
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-success mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Present</span>
            </div>
            <p className="text-2xl font-bold">{stats.present}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <XCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Absent</span>
            </div>
            <p className="text-2xl font-bold">{stats.absent}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-warning mb-2">
              <MinusCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Half Day</span>
            </div>
            <p className="text-2xl font-bold">{stats.halfDay}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-info mb-2">
              <CalendarOff className="w-5 h-5" />
              <span className="text-sm font-medium">On Leave</span>
            </div>
            <p className="text-2xl font-bold">{stats.leave}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50 col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Total Hours</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalHours}h</p>
          </div>
        </div>

        {/* Week Navigation */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="text-center">
                <h3 className="font-semibold">
                  {format(currentWeekStart, 'd MMM')} - {format(addDays(currentWeekStart, 6), 'd MMM yyyy')}
                </h3>
              </div>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="secondary" size="sm" onClick={goToCurrentWeek}>
              Today
            </Button>
          </div>

          {/* Weekly View */}
          <div className="grid grid-cols-7 gap-3">
            {weekDays.map(day => {
              const attendance = getAttendanceForDate(day);
              const isTodayDate = isToday(day);
              const dayOfWeek = format(day, 'EEE');
              const isWeekend = dayOfWeek === 'Sat' || dayOfWeek === 'Sun';

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    'rounded-xl p-4 text-center transition-all',
                    isTodayDate
                      ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                      : 'bg-muted/50 hover:bg-muted',
                    isWeekend && !isTodayDate && 'opacity-60'
                  )}
                >
                  <p className={cn('text-xs font-medium mb-1', isTodayDate ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                    {dayOfWeek}
                  </p>
                  <p className={cn('text-lg font-bold mb-3', isTodayDate ? 'text-primary-foreground' : 'text-foreground')}>
                    {format(day, 'd')}
                  </p>
                  {attendance && (
                    <div className="space-y-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs w-full justify-center',
                          isTodayDate ? 'border-primary-foreground/30 text-primary-foreground' : statusConfig[attendance.status].className
                        )}
                      >
                        {statusConfig[attendance.status].icon}
                        <span className="ml-1">{statusConfig[attendance.status].label}</span>
                      </Badge>
                      {attendance.checkIn && (
                        <p className={cn('text-xs', isTodayDate ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                          {attendance.checkIn} - {attendance.checkOut || '--:--'}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed List */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Detailed Records</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Day</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check In</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Check Out</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Hours</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map(record => (
                  <tr key={record.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{format(parseISO(record.date), 'd MMM yyyy')}</td>
                    <td className="p-4">{format(parseISO(record.date), 'EEEE')}</td>
                    <td className="p-4">{record.checkIn || '-'}</td>
                    <td className="p-4">{record.checkOut || '-'}</td>
                    <td className="p-4">{record.hoursWorked ? `${record.hoursWorked}h` : '-'}</td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusConfig[record.status].className}>
                        {statusConfig[record.status].icon}
                        <span className="ml-1">{statusConfig[record.status].label}</span>
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
