'use client';

import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { useAuth } from '@/hooks/useClerkAuth';
import { LogOut } from 'lucide-react';
export const UserProfile: React.FC = () => {
  const { user } = useEnhancedAuth();
  const { logout } = useAuth();

  // Get user's full name
  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.lastName || 'User';

  // Get user's role/organization
  const roleOrganization =
    user?.role === 'admin'
      ? 'Administrator'
      : user?.role === 'staff'
      ? 'Staff Member'
      : 'Go Lotus';

  return (
    <>
      {/* User Avatar */}
      <div className='pointer-events-none'>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: 'w-10 h-10',
              userButtonTrigger: 'focus:shadow-none',
              userButtonPopoverActionButton__manageAccount: 'hidden',
            },
          }}
          showName={false}
          afterSignOutUrl='/auth'
        />
      </div>

      {/* User Info */}
      <div className='flex-1 min-w-0'>
        <div className='text-[14px] font-semibold text-[#11151B] leading-tight truncate'>
          {fullName}
        </div>
        <div className='text-[12px] font-normal text-[#565E64] leading-tight truncate'>
          {roleOrganization}
        </div>
      </div>

      {/* Logout Button */}
      <button onClick={logout} className='flex-shrink-0' title='Logout'>
        <LogOut
          size={16}
          className='text-black hover:text-red-600 transition-colors'
        />
      </button>
    </>
  );
};
