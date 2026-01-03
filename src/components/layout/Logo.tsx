import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, className, variant = 'default' }) => {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'flex items-center justify-center rounded-xl p-2',
        variant === 'default' ? 'bg-gradient-primary' : 'bg-primary-foreground/20'
      )}>
        <Calendar 
          size={sizes[size].icon} 
          className={cn(variant === 'default' ? 'text-primary-foreground' : 'text-primary-foreground')}
          strokeWidth={2.5}
        />
      </div>
      {showText && (
        <span className={cn(
          'font-bold tracking-tight',
          sizes[size].text,
          variant === 'default' ? 'text-foreground' : 'text-primary-foreground'
        )}>
          Dayflow
        </span>
      )}
    </div>
  );
};

export default Logo;
