'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage/ErrorMessage';
import { StaffProfileSection } from './sections/StaffProfileSection';
import { HoursSection } from './sections/HoursSection';
import { ClinicInformationSection } from './sections/ClinicInformationSection';
import { SpecialConditionsSection } from './sections/SpecialConditionsSection';
import { EmergencyContactSection } from './sections/EmergencyContactSection';
import { CredentialsSection } from './sections/CredentialsSection';
import { InternalNotesSection } from './sections/InternalNotesSection';
import { useStaffDetails } from '@/hooks/useStaffDetails';

interface StaffDetailsPageProps {
  staffId: string;
  onStaffNameChange?: (name: string) => void;
}

export function StaffDetailsPage({
  staffId,
  onStaffNameChange,
}: StaffDetailsPageProps) {
  const router = useRouter();
  const { staff, loading, error, refetch } = useStaffDetails(staffId);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Update staff name for SEO when staff data is loaded
  useEffect(() => {
    if (staff && onStaffNameChange) {
      const fullName = `${staff.firstName} ${staff.lastName}`.trim();
      onStaffNameChange(fullName);
    }
  }, [staff, onStaffNameChange]);

  const handleBack = () => {
    router.push('/staff');
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const handleStatusChange = async (newStatus: 'Current' | 'Archived') => {
    if (!staff || isUpdatingStatus) return;

    setIsUpdatingStatus(true);
    try {
      // Map frontend status to backend status
      const backendStatus = newStatus === 'Current' ? 'Active' : 'Inactive';

      const response = await fetch(`/api/users/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: backendStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Status update error details:', errorData);
        throw new Error(`Failed to update status: ${response.statusText}`);
      }

      // Refresh the staff data to show updated status
      await refetch();
    } catch (error) {
      console.error('Error updating status:', error);
      // You could add a toast notification here
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center space-y-4'>
          <ErrorMessage message={error} />
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <LoadingSpinner size='sm' /> : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <ErrorMessage message='Staff member not found' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white font-["Manrope",_sans-serif]'>
      {/* Header */}
      <div className='bg-white'>
        <div className='px-4 py-6'>
          <div className='flex flex-col gap-4'>
            {/* Back Button */}
            <button
              onClick={handleBack}
              className='flex items-center gap-2 text-[#11151b] font-semibold text-[18px] hover:text-[#fc5858] transition-colors'
              aria-label='Go back to staff listing page'
            >
              <span>&lt;</span>
              <span>Back to all Staff page</span>
            </button>

            {/* Page Title */}
            <h1 className='text-[36px] font-semibold text-[rgba(0,0,0,0.8)] leading-[100%]'>
              Staff Profile
            </h1>

            {/* Status Controls and View Schedule */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <span className='text-[#11151b] font-semibold text-[18px]'>
                  Change status:
                </span>
                {isUpdatingStatus && (
                  <div className='flex items-center gap-2 text-sm text-gray-500'>
                    <div className='w-4 h-4 border-2 border-gray-300 border-t-[#fc5858] rounded-full animate-spin'></div>
                    <span>Updating...</span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='status'
                      value='Current'
                      checked={staff.status === 'Current'}
                      onChange={() => handleStatusChange('Current')}
                      disabled={isUpdatingStatus}
                      className='sr-only'
                      aria-describedby='current-staff-label'
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-[#fc5858] flex items-center justify-center ${
                        isUpdatingStatus ? 'opacity-50' : ''
                      }`}
                    >
                      {staff.status === 'Current' && (
                        <div className='w-3 h-3 rounded-full bg-[#fc5858]' />
                      )}
                    </div>
                    <span
                      id='current-staff-label'
                      className={`text-[#fc5858] font-semibold text-[18px] ${
                        isUpdatingStatus ? 'opacity-50' : ''
                      }`}
                    >
                      Current Staff
                    </span>
                  </label>
                  <label className='flex items-center gap-2 cursor-pointer'>
                    <input
                      type='radio'
                      name='status'
                      value='Archived'
                      checked={staff.status === 'Archived'}
                      onChange={() => handleStatusChange('Archived')}
                      disabled={isUpdatingStatus}
                      className='sr-only'
                      aria-describedby='archived-staff-label'
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center ${
                        isUpdatingStatus ? 'opacity-50' : ''
                      }`}
                    >
                      {staff.status === 'Archived' && (
                        <div className='w-3 h-3 rounded-full bg-gray-400' />
                      )}
                    </div>
                    <span
                      id='archived-staff-label'
                      className={`text-[#000101] font-normal text-[16px] ${
                        isUpdatingStatus ? 'opacity-50' : ''
                      }`}
                    >
                      Archived Staff
                    </span>
                  </label>
                </div>
              </div>
              <button
                className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
                aria-label='View staff schedule'
              >
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='px-4 pb-6'>
        <div className='flex flex-col lg:flex-row gap-2'>
          {/* Left Column */}
          <div className='flex-1 space-y-2'>
            <StaffProfileSection staff={staff} onRefresh={refetch} />
            <ClinicInformationSection staffId={staffId} />
            <EmergencyContactSection staffId={staffId} />
          </div>

          {/* Right Column */}
          <div className='flex-1 space-y-2'>
            <HoursSection staffId={staffId} />
            <SpecialConditionsSection staffId={staffId} />
          </div>
        </div>

        {/* Full Width Sections */}
        <div className='space-y-2 mt-2'>
          <CredentialsSection staffId={staffId} />
          <InternalNotesSection staffId={staffId} />
        </div>
      </div>
    </div>
  );
}
