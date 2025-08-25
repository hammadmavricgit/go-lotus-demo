'use client';

import { useState } from 'react';
import { Edit, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useClinicInformation } from '@/hooks/useClinicInformation';
import { EditClinicInformationModal } from '../modals/EditClinicInformationModal';
import { ClinicInformation } from '@/lib/types/clinic-information';

interface ClinicInformationSectionProps {
  staffId: string;
}

export function ClinicInformationSection({
  staffId,
}: ClinicInformationSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { clinicInfo, loading, error, createClinicInfo, updateClinicInfo } =
    useClinicInformation(staffId);

  // Debug logging
  console.log('ClinicInformationSection - staffId:', staffId);
  console.log('ClinicInformationSection - clinicInfo:', clinicInfo);
  console.log('ClinicInformationSection - loading:', loading);
  console.log('ClinicInformationSection - error:', error);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (data: Partial<ClinicInformation>) => {
    try {
      console.log(
        'ClinicInformationSection - handleSave called with data:',
        data
      );
      console.log(
        'ClinicInformationSection - existing clinicInfo:',
        clinicInfo
      );

      if (clinicInfo?.id) {
        // Update existing clinic information
        console.log('ClinicInformationSection - Updating existing clinic info');
        await updateClinicInfo(data);
      } else {
        // Create new clinic information record
        console.log('ClinicInformationSection - Creating new clinic info');
        // Ensure required fields are provided for creation
        const createData = {
          userId: parseInt(staffId),
          ...data,
        } as Omit<ClinicInformation, 'id' | 'createdAt' | 'updatedAt'>;
        await createClinicInfo(createData);
      }
      // TODO: Show success message
      console.log('Clinic information updated successfully');
    } catch (error) {
      console.error('Error updating clinic information:', error);
      // TODO: Show error message
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Clinic Information
            </h2>
            <button
              disabled
              className='border border-gray-300 text-gray-400 font-semibold text-[18px] px-4 py-2 rounded-lg cursor-not-allowed'
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
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Clinic Information
            </h2>
            <button
              onClick={handleEdit}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
              aria-label='Add clinic information'
            >
              Add
            </button>
          </div>

          {/* Error Content */}
          <div className='text-center py-8'>
            <p className='text-sm text-gray-500'>
              Failed to load clinic information
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!clinicInfo) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Clinic Information
            </h2>
            <button
              onClick={handleEdit}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
              aria-label='Add clinic information'
            >
              Add
            </button>
          </div>

          {/* Empty Content */}
          <div className='text-[#11151b] font-normal text-[14px] leading-[1.4]'>
            <p className='mb-0'>No clinic information available</p>
          </div>
        </div>

        {/* Edit Modal */}
        <EditClinicInformationModal
          clinicInfo={clinicInfo}
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
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-[#11151b] font-semibold text-[18px]'>
            Clinic Information
          </h2>
          <button
            onClick={handleEdit}
            className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
            aria-label={
              clinicInfo ? 'Edit clinic information' : 'Add clinic information'
            }
          >
            {clinicInfo ? 'Edit' : 'Add'}
          </button>
        </div>

        {/* Content */}
        <div className='text-[#11151b] font-normal text-[14px] leading-[1.4] whitespace-pre-line'>
          <p className='mb-0'>Title: {clinicInfo.title || ''}</p>
          <p className='mb-0'>
            Employee number: {clinicInfo.employeeNumber || ''}
          </p>
          <p className='mb-0'>NPI number: {clinicInfo.npiNumber || ''}</p>
          <p className='mb-0'>Department: {clinicInfo.department || ''}</p>
          <p className='mb-0'>Supervisor: {clinicInfo.supervisor || ''}</p>
          <p className='mb-0'>Date Hired: {formatDate(clinicInfo.dateHired)}</p>
          <p className='mb-0'>
            Date Terminated: {formatDate(clinicInfo.dateTerminated)}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditClinicInformationModal
        clinicInfo={clinicInfo}
        staffId={staffId}
        isOpen={isEditing}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
