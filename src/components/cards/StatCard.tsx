import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-card p-6 shadow-card border border-border/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
          {trend && (
            <div className={cn(
              'inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
              trend.positive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            )}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div className={cn(
          'p-3 rounded-xl',
          iconClassName || 'bg-primary/10'
        )}>
          <Icon className={cn('w-6 h-6', iconClassName ? '' : 'text-primary')} />
        </div>
      </div>
      {/* Decorative gradient */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-tl from-primary/10 to-transparent rounded-full blur-2xl" />
    </div>
  );
};

export default StatCard;
