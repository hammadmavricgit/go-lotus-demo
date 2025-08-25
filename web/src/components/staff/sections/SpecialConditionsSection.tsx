'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useSpecialConditions } from '@/hooks/useSpecialConditions';
import { EditSpecialConditionsModal } from '@/components/staff/modals/EditSpecialConditionsModal';

interface SpecialConditionsSectionProps {
  staffId: string;
}

export function SpecialConditionsSection({
  staffId,
}: SpecialConditionsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    specialConditions,
    loading,
    error,
    addSpecialCondition,
    removeSpecialCondition,
    refetch,
  } = useSpecialConditions(staffId);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleSave = async (selectedConditionIds: number[]) => {
    try {
      // Update the user's specialConditions directly with the selected IDs
      const userUpdateResponse = await fetch(`/api/users/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          specialConditions: selectedConditionIds.map((id) => ({ id })),
        }),
      });

      if (!userUpdateResponse.ok) {
        throw new Error('Failed to update user special conditions');
      }

      // Refresh the data
      await refetch();
    } catch (error) {
      console.error('Error updating special conditions:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Special Conditions
            </h2>
            <button
              disabled
              className='border border-gray-300 text-gray-400 font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg cursor-not-allowed w-full sm:w-auto'
            >
              Edit
            </button>
          </div>

          {/* Loading Content */}
          <div className='flex items-center justify-center py-8'>
            <LoadingSpinner size='md' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Special Conditions
            </h2>
            <button
              onClick={handleEdit}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors w-full sm:w-auto'
              aria-label='Edit special conditions'
            >
              Edit
            </button>
          </div>

          {/* Error Content */}
          <div className='text-center py-8'>
            <p className='text-[#565e64] font-normal text-[14px]'>
              Failed to load special conditions
            </p>
          </div>
        </div>

        {/* Edit Modal */}
        <EditSpecialConditionsModal
          specialConditions={specialConditions}
          staffId={staffId}
          isOpen={isEditing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    );
  }

  if (!specialConditions || specialConditions.length === 0) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Special Conditions
            </h2>
            <button
              onClick={handleEdit}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors w-full sm:w-auto'
              aria-label='Edit special conditions'
            >
              Edit
            </button>
          </div>

          {/* Empty State Content */}
          <div className='text-center py-8'>
            <p className='text-[#565e64] font-normal text-[14px]'>
              No special conditions available
            </p>
          </div>
        </div>

        {/* Edit Modal */}
        <EditSpecialConditionsModal
          specialConditions={specialConditions}
          staffId={staffId}
          isOpen={isEditing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
      <div className='p-4 pb-2'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>
          <h2 className='text-[#11151b] font-semibold text-[18px]'>
            Special Conditions
          </h2>
          <button
            onClick={handleEdit}
            className='border border-[#fc5858] text-[#fc5858] font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors w-full sm:w-auto'
            aria-label='Edit special conditions'
          >
            Edit
          </button>
        </div>

        {/* <div className='h-[19px] mb-4' /> */}

        {/* Content */}
        <div className='text-[#000101] font-normal text-[14px] leading-[1.4] whitespace-pre-line break-words overflow-wrap-anywhere'>
          <p className='mb-0'>
            Special Conditions:{' '}
            {specialConditions
              .map((condition) => condition.specialCondition.condition)
              .join('\n')}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditSpecialConditionsModal
        specialConditions={specialConditions}
        staffId={staffId}
        isOpen={isEditing}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
