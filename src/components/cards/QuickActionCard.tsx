import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color?: 'primary' | 'success' | 'warning' | 'info';
}

const colorClasses = {
  primary: 'from-primary/20 to-primary/5 border-primary/20 hover:border-primary/40',
  success: 'from-success/20 to-success/5 border-success/20 hover:border-success/40',
  warning: 'from-warning/20 to-warning/5 border-warning/20 hover:border-warning/40',
  info: 'from-info/20 to-info/5 border-info/20 hover:border-info/40',
};

const iconClasses = {
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  info: 'bg-info text-info-foreground',
};

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  href,
  color = 'primary',
}) => {
  return (
    <Link
      to={href}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
        colorClasses[color]
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-3 rounded-xl shadow-md', iconClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default QuickActionCard;
