import React from 'react';
import { Activity } from '@/types/hrms';
import { Calendar, Clock, User, Wallet } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ActivityCardProps {
  activities: Activity[];
}

const getIcon = (type: Activity['type']) => {
  switch (type) {
    case 'leave':
      return <Calendar className="w-4 h-4 text-info" />;
    case 'attendance':
      return <Clock className="w-4 h-4 text-success" />;
    case 'profile':
      return <User className="w-4 h-4 text-warning" />;
    case 'payroll':
      return <Wallet className="w-4 h-4 text-primary" />;
    default:
      return <Clock className="w-4 h-4 text-muted-foreground" />;
  }
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activities }) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map(activity => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="p-2 rounded-lg bg-background">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityCard;
