'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  generatePageNumbers,
  shouldShowPagination,
} from '@/lib/utils/pagination';

interface StaffPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function StaffPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: StaffPaginationProps) {
  const getVisiblePages = () => {
    return generatePageNumbers(currentPage, totalPages);
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (!shouldShowPagination(totalPages)) {
    return null;
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='flex items-center justify-center w-8 h-8 border border-[rgba(108,117,125,0.5)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors'
      >
        <ChevronLeft className='w-4 h-4' />
      </button>

      {/* Page Numbers */}
      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          disabled={typeof page !== 'number'}
          className={`
            flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors
            ${
              typeof page === 'number'
                ? page === currentPage
                  ? 'bg-[#FCA311] text-white'
                  : 'border border-[rgba(108,117,125,0.5)] hover:bg-gray-50'
                : 'text-gray-500 cursor-default'
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='flex items-center justify-center w-8 h-8 border border-[rgba(108,117,125,0.5)] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors'
      >
        <ChevronRight className='w-4 h-4' />
      </button>
    </div>
  );
}
