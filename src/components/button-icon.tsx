import React from 'react';
import { Button } from "@/components/ui/button";
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const ButtonIcon = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  icon: Icon,
  iconPosition = 'left',
  className,
  ...props 
}: ButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        "flex items-center justify-center gap-2",
        iconPosition === 'right' && "flex-row-reverse",
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </Button>
  );
};

export default ButtonIcon;