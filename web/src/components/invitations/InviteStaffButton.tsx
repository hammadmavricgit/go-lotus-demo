'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { InvitationModal } from '@/components/invitations/InvitationModal';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';

interface InviteStaffButtonProps {
  onStaffAdded?: () => void;
  className?: string;
  disabled?: boolean;
}

export function InviteStaffButton({
  onStaffAdded,
  className = '',
  disabled = false,
}: InviteStaffButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useEnhancedAuth();

  // Only show button for admin users
  if (!user || user.role !== 'admin') {
    return null;
  }

  const handleInvitationSuccess = (): void => {
    setIsModalOpen(false);
    onStaffAdded?.();
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        className={`box-border content-stretch flex flex-row gap-4 h-[49px] items-center justify-start px-4 py-0 relative rounded-lg border border-[#fc5858] border-solid bg-white ${className}`}
      >
        <div className='box-border content-stretch flex flex-row gap-2 h-full items-center justify-start px-0 py-[11px] relative shrink-0'>
          <div className='flex flex-col font-["Manrope:SemiBold",_sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#fc5858] text-[18px] text-center text-nowrap'>
            Invite Staff Member
          </div>
        </div>
      </button>

      <InvitationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleInvitationSuccess}
      />
    </>
  );
}
