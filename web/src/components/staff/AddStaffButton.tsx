'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { InvitationModal } from '@/components/invitations/InvitationModal';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { Button } from '@/components/ui/Button/Button';

interface AddStaffButtonProps {
  onStaffAdded?: () => void;
  className?: string;
  disabled?: boolean;
}

export function AddStaffButton({
  onStaffAdded,
  className = '',
  disabled = false,
}: AddStaffButtonProps) {
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
      <Button
        onClick={() => setIsModalOpen(true)}
        disabled={disabled}
        variant='secondary'
        className={`h-[49px] px-4 py-0 border-[#fc5858] text-[#fc5858] text-[18px] font-semibold ${className}`}
      >
        + Add Staff Member
      </Button>

      <InvitationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleInvitationSuccess}
      />
    </>
  );
}
