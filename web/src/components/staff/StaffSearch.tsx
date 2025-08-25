'use client';

import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

interface StaffSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function StaffSearch({
  onSearch,
  placeholder = 'Type e.g Staff name',
  className = '',
}: StaffSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const debounceRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout for debouncing
    debounceRef.current = setTimeout(() => {
      const sanitizedQuery = (searchQuery || '').trim().replace(/\s+/g, ' ');
      onSearch(sanitizedQuery);
    }, 300);

    // Cleanup timeout on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`relative h-full rounded-lg w-[358px] ${className}`}>
      <div className='flex flex-row gap-2.5 h-full items-center justify-start overflow-clip px-3 py-2 relative w-[358px]'>
        <div className='flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px relative shrink-0'>
          <div className='relative rounded-lg shrink-0 size-8'>
            <div
              className='absolute size-[14.5px] translate-x-[-50%] translate-y-[-50%]'
              style={{ top: 'calc(50% - 0.25px)', left: 'calc(50% - 0.25px)' }}
            >
              <Search className='h-[14.5px] w-[14.5px] text-[#6c757d]' />
            </div>
          </div>
          <input
            type='text'
            value={searchQuery}
            onChange={handleInputChange}
            placeholder={placeholder}
            className='flex flex-col font-["Manrope:Regular",_sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#6c757d] text-[14px] text-left text-nowrap bg-transparent border-none outline-none w-full'
          />
        </div>
      </div>
      <div className='absolute border border-[rgba(108,117,125,0.5)] border-solid inset-0 pointer-events-none rounded-lg' />
    </div>
  );
}
