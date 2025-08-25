import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700',
        className
      )}
    >
      <AlertCircle className='w-5 h-5 flex-shrink-0' />
      <span className='text-sm font-medium'>{message}</span>
    </div>
  );
}
