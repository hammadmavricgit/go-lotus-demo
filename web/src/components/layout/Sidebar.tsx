'use client';

import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import {
  Calendar,
  FileText,
  Menu,
  Settings,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { Button } from '../ui/Button/Button';
import { NavigationItem } from '../ui/NavigationItem';
import { useLayout } from './LayoutProvider';
import { UserProfile } from './UserProfile';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  const { isSidebarOpen, toggleSidebar, isMobile } = useLayout();
  const { user } = useEnhancedAuth();

  // Role-based navigation items
  const navigationItems = useMemo(() => {
    const baseItems = [
      {
        id: 'clients',
        label: 'Clients',
        icon: Users,
        type: 'nav' as const,
        route: '/clients',
      },
      {
        id: 'schedule',
        label: 'Schedule',
        icon: Calendar,
        type: 'nav' as const,
        route: '/schedule',
      },
      {
        id: 'reports',
        label: 'Reports',
        icon: FileText,
        type: 'nav' as const,
        route: '/reports',
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        type: 'nav' as const,
        route: '/settings',
      },
      {
        id: 'my-profile',
        label: 'My Profile',
        icon: null,
        type: 'nav' as const,
        route: '/profile',
        hasDropdown: true,
      },
      {
        id: 'help',
        label: 'Help',
        icon: null,
        type: 'nav' as const,
        route: '/help',
        hasDropdown: true,
      },
      {
        id: 'control-center',
        label: 'Control Center',
        icon: null,
        type: 'nav' as const,
        route: '/control',
        hasDropdown: true,
      },
    ];

    // Add Staff item only for admin users
    if (user?.role === 'admin') {
      baseItems.splice(1, 0, {
        id: 'staff',
        label: 'Staff',
        icon: UserCheck,
        type: 'nav' as const,
        route: '/staff',
      });
    }

    return baseItems;
  }, [user]);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden'
          onClick={toggleSidebar}
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-[280px] bg-[#F4EDE2] 
          transform transition-transform duration-300 ease-in-out
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
          flex flex-col justify-between
          py-6
        `}
        role='navigation'
        aria-label='Main navigation'
      >
        {/* Header with Logo and Toggle */}
        <div className='px-4'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <Image
                src='/golotus-logo.png'
                alt='goLOTUS Logo'
                width={170}
                height={45}
                priority
              />
            </div>

            {/* Mobile Toggle Button */}
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className='lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors'
                aria-label='Close navigation'
              >
                <X className='w-6 h-6 text-[#11151B]' />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className='space-y-3 mb-10'>
            <Button
              variant='primary'
              className='w-full h-[52px] text-[18px] font-semibold'
            >
              Data Tracker
            </Button>
            <Button
              variant='secondary'
              className='w-full h-[52px] text-[18px] font-semibold'
            >
              Client Goals
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className='space-y-1'>
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.id}
                label={item.label}
                icon={item.icon ?? undefined}
                route={item.route}
                hasDropdown={item.hasDropdown}
                type={item.type}
              />
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className='px-4  rounded-lg mx-4 mb-4'>
          <div className='flex items-center gap-3'>
            <UserProfile />
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button (when sidebar is closed) */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className='fixed top-4 left-4 z-30 lg:hidden p-2 bg-[#F4EDE2] rounded-md shadow-lg'
          aria-label='Open navigation'
        >
          <Menu className='w-6 h-6 text-[#11151B]' />
        </button>
      )}
    </>
  );
};
