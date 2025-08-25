'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#FC5858] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variantClasses = {
    primary: 'bg-[#FC5858] text-white hover:bg-[#e54d4d] active:bg-[#d14242]',
    secondary:
      'bg-transparent text-[#FC5858] border border-[#FC5858] hover:bg-[#FC5858] hover:text-white active:bg-[#e54d4d]',
    outline:
      'bg-transparent text-[#545454] border border-[#6C757D] hover:bg-[#F4EDE2] hover:text-[#11151B] active:bg-[#6C757D]',
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
