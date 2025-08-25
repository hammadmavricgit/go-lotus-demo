'use client';

import { useState } from 'react';
import { Edit, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useStaffHours } from '@/hooks/useStaffHours';
import { EditHoursModal } from '../modals/EditHoursModal';
import { StaffHours } from '@/lib/types/staff-hours';

interface HoursSectionProps {
  staffId: string;
}

export function HoursSection({ staffId }: HoursSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { hours, loading, error, createHours, updateHours } =
    useStaffHours(staffId);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (data: Partial<StaffHours>) => {
    try {
      if (hours?.id) {
        // Update existing hours
        await updateHours(data);
      } else {
        // Create new hours record
        console.log('HoursSection - Creating new hours');
        // Ensure required fields are provided for creation
        const createData = {
          userId: parseInt(staffId),
          ...data,
        } as Omit<StaffHours, 'id' | 'createdAt' | 'updatedAt'>;
        await createHours(createData);
      }
    } catch (error) {
      console.error('Error updating hours:', error);
      // TODO: Show error message
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const formatHours = (hours: number | null) => {
    if (hours === null || hours === undefined) return 'Not set';
    return `${hours} hours`;
  };

  if (loading) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>Hours</h2>
            <button
              disabled
              className='border border-gray-300 text-gray-400 font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg cursor-not-allowed w-full sm:w-auto'
            >
              Add
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
            <h2 className='text-[#11151b] font-semibold text-[18px]'>Hours</h2>
            <button
              onClick={handleEdit}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors w-full sm:w-auto'
              aria-label='Add hours information'
            >
              Add
            </button>
          </div>

          {/* Error Content */}
          <div className='text-center py-8'>
            <p className='text-sm text-gray-500'>
              Failed to load hours information
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!hours) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>Hours</h2>
            <button
              onClick={handleEdit}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors w-full sm:w-auto'
              aria-label='Add hours information'
            >
              Add
            </button>
          </div>

          {/* Empty Content */}
          <div className='text-[#11151b] font-normal text-[14px] leading-[1.4]'>
            <p className='mb-0'>No hours information available</p>
          </div>
        </div>

        {/* Edit Modal */}
        <EditHoursModal
          hours={hours}
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
          <h2 className='text-[#11151b] font-semibold text-[18px]'>Hours</h2>
          <button
            onClick={handleEdit}
            className='border border-[#fc5858] text-[#fc5858] font-semibold text-sm sm:text-[18px] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors w-full sm:w-auto'
            aria-label={
              hours ? 'Edit hours information' : 'Add hours information'
            }
          >
            {hours ? 'Edit' : 'Add'}
          </button>
        </div>

        {/* Content */}
        <div className='text-[#11151b] font-normal text-[14px] leading-[1.4] whitespace-pre-line break-words overflow-wrap-anywhere'>
          <p className='mb-0'>
            Expected hours: {formatHours(hours.expectedHours)}
          </p>
          <p className='mb-0'>Max hours: {formatHours(hours.maxHours)}</p>
          <p className='mb-0'>
            Max overtime hours: {formatHours(hours.maxOvertimeHours)}
          </p>
          <p className='mb-0'>
            Supervised hours needed: {formatHours(hours.supervisedHours)}
          </p>
          <p className='mb-0'>
            Vacation time allotted: {formatHours(hours.vacationTimeAlloted)}
          </p>
          <p className='mb-0'>
            Sick time allotted: {formatHours(hours.sickTimeAlloted)}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditHoursModal
        hours={hours}
        staffId={staffId}
        isOpen={isEditing}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
