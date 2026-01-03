import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  ClipboardCheck,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  MessageSquare,
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

const Approvals: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [comment, setComment] = useState('');
  const [dialogAction, setDialogAction] = useState<'approve' | 'reject' | null>(null);

  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const pendingRequests = leaveRequests.filter(r => r.status === 'pending');
  const processedRequests = leaveRequests.filter(r => r.status !== 'pending');

  const handleAction = (action: 'approve' | 'reject') => {
    if (!selectedRequest) return;

    setLeaveRequests(prev =>
      prev.map(r =>
        r.id === selectedRequest.id
          ? {
              ...r,
              status: action === 'approve' ? 'approved' : 'rejected',
              approvedBy: user?.name,
              approvedOn: new Date().toISOString().split('T')[0],
              comments: comment || undefined,
            }
          : r
      )
    );

    toast({
      title: `Leave ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${selectedRequest.employeeName}'s leave request has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
    });

    setSelectedRequest(null);
    setDialogAction(null);
    setComment('');
  };

  const getDurationText = (start: string, end: string) => {
    const days = differenceInDays(parseISO(end), parseISO(start)) + 1;
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const LeaveRequestCard = ({ request, showActions = false }: { request: LeaveRequest; showActions?: boolean }) => (
    <div className="bg-card rounded-xl p-6 shadow-card border border-border/50 hover:shadow-lg transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">{request.employeeName}</h4>
              <p className="text-sm text-muted-foreground">{leaveTypeLabels[request.type]}</p>
            </div>
            <Badge variant="outline" className={statusConfig[request.status].className}>
              {statusConfig[request.status].icon}
              <span className="ml-1">{statusConfig[request.status].label}</span>
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{request.reason}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {format(parseISO(request.startDate), 'd MMM')} - {format(parseISO(request.endDate), 'd MMM yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {getDurationText(request.startDate, request.endDate)}
            </span>
          </div>
          {request.comments && (
            <div className="mt-3 p-3 rounded-lg bg-muted/50 flex items-start gap-2">
              <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5" />
              <p className="text-sm">{request.comments}</p>
            </div>
          )}
        </div>
        {showActions && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedRequest(request);
                setDialogAction('reject');
              }}
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setSelectedRequest(request);
                setDialogAction('approve');
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Approvals</h1>
          <p className="text-muted-foreground mt-1">Review and manage leave requests</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-warning mb-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold">{pendingRequests.length}</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-success mb-2">
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-sm font-medium">Approved</span>
            </div>
            <p className="text-2xl font-bold">
              {leaveRequests.filter(r => r.status === 'approved').length}
            </p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card border border-border/50">
            <div className="flex items-center gap-2 text-destructive mb-2">
              <XCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Rejected</span>
            </div>
            <p className="text-2xl font-bold">
              {leaveRequests.filter(r => r.status === 'rejected').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="pending" className="rounded-lg">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="processed" className="rounded-lg">
              Processed ({processedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {pendingRequests.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border/50">
                <ClipboardCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending requests</h3>
                <p className="text-muted-foreground">All leave requests have been processed.</p>
              </div>
            ) : (
              pendingRequests.map(request => (
                <LeaveRequestCard key={request.id} request={request} showActions />
              ))
            )}
          </TabsContent>

          <TabsContent value="processed" className="mt-6 space-y-4">
            {processedRequests.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-2xl border border-border/50">
                <ClipboardCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No processed requests</h3>
                <p className="text-muted-foreground">Processed requests will appear here.</p>
              </div>
            ) : (
              processedRequests.map(request => (
                <LeaveRequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Action Dialog */}
        <Dialog open={!!dialogAction} onOpenChange={() => setDialogAction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {dialogAction === 'approve' ? 'Approve' : 'Reject'} Leave Request
              </DialogTitle>
              <DialogDescription>
                {dialogAction === 'approve'
                  ? 'Are you sure you want to approve this leave request?'
                  : 'Please provide a reason for rejecting this request.'}
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="p-4 rounded-lg bg-muted/50 my-4">
                <p className="font-medium">{selectedRequest.employeeName}</p>
                <p className="text-sm text-muted-foreground">
                  {leaveTypeLabels[selectedRequest.type]} • {getDurationText(selectedRequest.startDate, selectedRequest.endDate)}
                </p>
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Comment {dialogAction === 'reject' && <span className="text-muted-foreground">(Required)</span>}
              </label>
              <Textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder={dialogAction === 'approve' ? 'Add a comment (optional)' : 'Reason for rejection...'}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogAction(null)}>
                Cancel
              </Button>
              <Button
                variant={dialogAction === 'approve' ? 'success' : 'destructive'}
                onClick={() => handleAction(dialogAction!)}
                disabled={dialogAction === 'reject' && !comment.trim()}
              >
                {dialogAction === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default Approvals;
