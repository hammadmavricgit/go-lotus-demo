import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
  className?: string;
  containerClassName?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Select an option',
      error = false,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'bg-white border border-[#565e64] border-[0.5px] rounded-lg h-[46px] px-2.5 py-3 flex items-center justify-between relative',
          error && 'border-red-500',
          containerClassName
        )}
      >
        <select
          ref={ref}
          className={cn(
            "flex flex-col font-['Manrope:Regular',_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#565e64] text-[14px] text-left text-nowrap bg-transparent border-none outline-none w-full cursor-pointer",
            className
          )}
          style={{
            backgroundImage: 'none',
            paddingRight: '2rem',
          }}
          {...props}
        >
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* <div className='absolute right-2 w-8 h-8 flex items-center justify-center pointer-events-none'>
          <ChevronDown className='w-4 h-4 text-[#565e64]' />
        </div> */}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
