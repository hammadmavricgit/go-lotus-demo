'use client';

import React from 'react';
import { useLayout } from './LayoutProvider';

interface MainContentProps {
  children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
  const { isMobile } = useLayout();

  return (
    <main
      className={`
        flex-1 bg-white
        transition-all duration-300 ease-in-out
        overflow-auto
        ${isMobile ? 'w-full' : ''}
      `}
      role='main'
    >
      <div className='min-h-full'>
        {/* Responsive padding based on screen size */}
        <div
          className='
          p-4 sm:p-6 lg:p-8
          max-w-none
        '
        >
          {children}
        </div>
      </div>
    </main>
  );
};
