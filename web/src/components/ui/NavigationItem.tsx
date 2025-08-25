'use client';

import React from 'react';
import { useLayout } from '../layout/LayoutProvider';
import { ChevronRight } from 'lucide-react';

import { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavigationItemProps {
  label: string;
  icon?: LucideIcon;
  route?: string;
  hasDropdown?: boolean;
  type: 'nav';
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  icon: Icon,
  route,
  hasDropdown = false,
  type,
}) => {
  const { activeRoute, setActiveRoute } = useLayout();
  const isActive = route === activeRoute;
  const router = useRouter();

  const handleClick = () => {
    if (route) {
      setActiveRoute(route);
      router.push(route);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full h-14 px-4
        flex items-center gap-4
        text-left transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-[#FC5858] focus:ring-inset
        ${
          isActive
            ? 'bg-[rgba(252,88,88,0.12)] text-[#FC5858]'
            : 'text-[#000101] hover:bg-white/20'
        }
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Icon */}
      <div className='w-8 h-8 flex items-center justify-center'>
        {Icon ? (
          <Icon
            className={`w-6 h-6 ${
              isActive ? 'text-[#FC5858]' : 'text-[#000101]'
            }`}
          />
        ) : (
          <div className='w-6 h-6' />
        )}
      </div>

      {/* Label */}
      <span className="flex-1 text-[16px] font-normal font-['Manrope']">
        {label}
      </span>

      {/* Dropdown Indicator */}
      {hasDropdown && (
        <ChevronRight className='w-4 h-4 rotate-90 text-[#000101]' />
      )}
    </button>
  );
};
