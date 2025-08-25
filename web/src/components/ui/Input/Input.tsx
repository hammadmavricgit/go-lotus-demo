import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      required = false,
      error = false,
      containerClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('space-y-1', containerClassName)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'font-["Manrope:Regular",_sans-serif] font-normal text-[#000101] text-[16px] leading-[100%] block',
              labelClassName
            )}
          >
            {label}
            {required && <span className='text-[#dc3545]'> *</span>}
          </label>
        )}
        <div
          className={cn(
            'bg-white border border-[#565e64] border-[0.5px] rounded-lg h-[46px] px-2.5 py-3 flex items-center',
            error && 'border-red-500'
          )}
        >
          <input
            type={type}
            data-slot='input'
            className={cn(
              'flex flex-col font-["Manrope:Regular",_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#565e64] text-[14px] text-left text-nowrap bg-transparent border-none outline-none w-full',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
