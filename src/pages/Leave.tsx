import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Calendar,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';
import { mockLeaveRequests } from '@/data/mockData';
import { format, differenceInDays, parseISO } from 'date-fns';
import { LeaveRequest, LeaveStatus, LeaveType } from '@/types/hrms';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const statusConfig: Record<LeaveStatus, { label: string; icon: React.ReactNode; className: string }> = {
  pending: {
    label: 'Pending',
    icon: <AlertCircle className="w-4 h-4" />,
    className: 'status-pending',
  },
  approved: {
    label: 'Approved',
    icon: <CheckCircle2 className="w-4 h-4" />,
    className: 'status-approved',
  },
  rejected: {
    label: 'Rejected',
    icon: <XCircle className="w-4 h-4" />,
    className: 'status-rejected',
  },
};

const leaveTypeLabels: Record<LeaveType, string> = {
  paid: 'Paid Leave',
  sick: 'Sick Leave',
  unpaid: 'Unpaid Leave',
  casual: 'Casual Leave',
};

const Leave: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [formData, setFormData] = useState({
    type: 'paid' as LeaveType,
    startDate: '',
    endDate: '',
    reason: '',
  });

  const userLeaves = leaveRequests.filter(l => l.employeeId === user?.id);

  const leaveBalance = {
    paid: 12,
    sick: 6,
    casual: 4,
    used: userLeaves.filter(l => l.status === 'approved').length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLeave: LeaveRequest = {
      id: `leave-${Date.now()}`,
      employeeId: user?.id || '',
      employeeName: user?.name || '',
      type: formData.type,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
    };

    setLeaveRequests(prev => [newLeave, ...prev]);
    setFormData({ type: 'paid', startDate: '', endDate: '', reason: '' });
    setIsDialogOpen(false);
    
    toast({
      title: 'Leave Request Submitted',
      description: 'Your leave request has been submitted for approval.',
    });
  };

  const getDurationText = (start: string, end: string) => {
    const days = differenceInDays(parseISO(end), parseISO(start)) + 1;
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leave Requests</h1>
            <p className="text-muted-foreground mt-1">Apply for leave and track your requests</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="w-5 h-5 mr-2" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription>Fill in the details to submit your leave request.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as LeaveType }))}
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="paid">Paid Leave</option>
                    <option value="sick">Sick Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                    <option value="casual">Casual Leave</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      min={formData.startDate}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea
                    value={formData.reason}
                    onChange={e => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Please provide a reason for your leave request..."
                    rows={3}
                    required
                  />
                </div>

                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Leave Balance */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-success mb-2">
              <CalendarDays className="w-5 h-5" />
              <span className="text-sm font-medium">Paid Leave</span>
            </div>
            <p className="text-2xl font-bold">{leaveBalance.paid}</p>
            <p className="text-xs text-muted-foreground">Available days</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-info mb-2">
              <CalendarDays className="w-5 h-5" />
              <span className="text-sm font-medium">Sick Leave</span>
            </div>
            <p className="text-2xl font-bold">{leaveBalance.sick}</p>
            <p className="text-xs text-muted-foreground">Available days</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-warning mb-2">
              <CalendarDays className="w-5 h-5" />
              <span className="text-sm font-medium">Casual Leave</span>
            </div>
            <p className="text-2xl font-bold">{leaveBalance.casual}</p>
            <p className="text-xs text-muted-foreground">Available days</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">Used This Year</span>
            </div>
            <p className="text-2xl font-bold">{leaveBalance.used}</p>
            <p className="text-xs text-muted-foreground">Days taken</p>
          </div>
        </div>

        {/* Leave Requests List */}
        <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold">Your Leave Requests</h3>
          </div>
          
          {userLeaves.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No leave requests yet</h3>
              <p className="text-muted-foreground mb-4">
                Click the button above to apply for your first leave.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {userLeaves.map(leave => (
                <div key={leave.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{leaveTypeLabels[leave.type]}</h4>
                        <Badge variant="outline" className={statusConfig[leave.status].className}>
                          {statusConfig[leave.status].icon}
                          <span className="ml-1">{statusConfig[leave.status].label}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{leave.reason}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(parseISO(leave.startDate), 'd MMM yyyy')} - {format(parseISO(leave.endDate), 'd MMM yyyy')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getDurationText(leave.startDate, leave.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>Applied on</p>
                      <p className="font-medium text-foreground">
                        {format(parseISO(leave.appliedOn), 'd MMM yyyy')}
                      </p>
                    </div>
                  </div>
                  {leave.comments && (
                    <div className="mt-4 p-3 rounded-lg bg-muted/50">
                      <p className="text-sm">
                        <span className="font-medium">Comment: </span>
                        {leave.comments}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Leave;
