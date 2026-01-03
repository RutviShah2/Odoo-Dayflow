import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import StatCard from '@/components/cards/StatCard';
import QuickActionCard from '@/components/cards/QuickActionCard';
import ActivityCard from '@/components/cards/ActivityCard';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserCheck,
  CalendarOff,
  ClipboardList,
  User,
  Clock,
  Calendar,
  Wallet,
  Play,
  Square,
  CheckCircle2,
} from 'lucide-react';
import { mockDashboardStats, mockActivities, generateMockAttendance } from '@/data/mockData';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === 'admin';

  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(format(now, 'HH:mm'));
    setIsCheckedIn(true);
    toast({
      title: 'Checked In Successfully!',
      description: `You checked in at ${format(now, 'hh:mm a')}`,
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    toast({
      title: 'Checked Out Successfully!',
      description: `You checked out at ${format(new Date(), 'hh:mm a')}`,
    });
  };

  const quickActions = isAdmin
    ? [
        { title: 'Manage Employees', description: 'View and manage all employees', icon: Users, href: '/employees', color: 'primary' as const },
        { title: 'Pending Approvals', description: 'Review leave and attendance requests', icon: ClipboardList, href: '/approvals', color: 'warning' as const },
        { title: 'Attendance Overview', description: 'View team attendance records', icon: Clock, href: '/attendance', color: 'success' as const },
        { title: 'Leave Requests', description: 'Manage team leave requests', icon: Calendar, href: '/leave', color: 'info' as const },
      ]
    : [
        { title: 'My Profile', description: 'View and update your information', icon: User, href: '/profile', color: 'primary' as const },
        { title: 'Attendance', description: 'Track your attendance records', icon: Clock, href: '/attendance', color: 'success' as const },
        { title: 'Leave Requests', description: 'Apply for leave or view status', icon: Calendar, href: '/leave', color: 'info' as const },
        { title: 'Payroll', description: 'View your salary details', icon: Wallet, href: '/payroll', color: 'warning' as const },
      ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {getGreeting()}, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {format(currentTime, 'EEEE, d MMMM yyyy')} • {format(currentTime, 'hh:mm:ss a')}
            </p>
          </div>

          {/* Check In/Out Button - Employee Only */}
          {!isAdmin && (
            <div className="flex items-center gap-4">
              {isCheckedIn && checkInTime && (
                <div className="text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 inline mr-1 text-success" />
                  Checked in at {checkInTime}
                </div>
              )}
              <Button
                variant={isCheckedIn ? 'destructive' : 'success'}
                size="lg"
                onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
                className="gap-2"
              >
                {isCheckedIn ? (
                  <>
                    <Square className="w-5 h-5" />
                    Check Out
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Check In
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Stats - Admin Only */}
        {isAdmin && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Employees"
              value={mockDashboardStats.totalEmployees}
              icon={Users}
              description="Active workforce"
              iconClassName="bg-primary/10 text-primary"
            />
            <StatCard
              title="Present Today"
              value={mockDashboardStats.presentToday}
              icon={UserCheck}
              description={`${Math.round((mockDashboardStats.presentToday / mockDashboardStats.totalEmployees) * 100)}% attendance rate`}
              iconClassName="bg-success/10 text-success"
            />
            <StatCard
              title="On Leave"
              value={mockDashboardStats.onLeave}
              icon={CalendarOff}
              description="Employees on leave today"
              iconClassName="bg-info/10 text-info"
            />
            <StatCard
              title="Pending Requests"
              value={mockDashboardStats.pendingRequests}
              icon={ClipboardList}
              description="Awaiting your approval"
              iconClassName="bg-warning/10 text-warning"
            />
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map(action => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityCard activities={mockActivities} />
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
            <h3 className="text-lg font-semibold mb-4">Your Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Employee ID</span>
                <span className="font-medium">{user?.employeeId}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Department</span>
                <span className="font-medium">{user?.department}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-muted-foreground">Designation</span>
                <span className="font-medium">{user?.designation}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Role</span>
                <span className="font-medium capitalize px-2 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

export default Dashboard;
