'use client';

import { useState } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card/Card';
import { Badge } from '@/components/ui/Badge/Badge';
import { Staff } from '@/lib/types/staff';
import { EditStaffProfileModal } from '../modals/EditStaffProfileModal';
import { SignatureModal } from '../modals/SignatureModal';

interface StaffProfileSectionProps {
  staff: Staff;
  onRefresh?: () => Promise<void>;
}

export function StaffProfileSection({
  staff,
  onRefresh,
}: StaffProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSignatureOpen, setIsSignatureOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (data: any) => {
    try {
      // Include the email field to avoid validation errors
      const updateData = {
        ...data,
        email: staff.email, // Include existing email
      };

      const response = await fetch(`/api/users/${staff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update staff profile');
      }

      // Refresh the staff data to show updated values
      if (onRefresh) {
        await onRefresh();
      }
      console.log('Staff profile updated successfully');
    } catch (error) {
      console.error('Error updating staff profile:', error);
      // TODO: Show error message
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsEditing(false);
  };

  const handleSignatureClick = () => {
    setIsSignatureOpen(true);
  };

  const handleSignatureClose = () => {
    setIsSignatureOpen(false);
  };

  const handleSignatureSave = async (signatureData: string) => {
    try {
      const response = await fetch(`/api/users/${staff.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          signature: signatureData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save signature');
      }

      // Refresh the staff data to show updated signature
      if (onRefresh) {
        await onRefresh();
      }
      console.log('Signature saved successfully');
    } catch (error) {
      console.error('Error saving signature:', error);
      throw error;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not provided';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatPhone = (phone: string | null) => {
    if (!phone) return 'Not provided';
    // Basic phone formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phone;
  };

  const formatSSN = (ssn: string | null) => {
    if (!ssn) return 'Not provided';
    // Mask SSN for security
    const cleaned = ssn.replace(/\D/g, '');
    if (cleaned.length === 9) {
      return `***-**-${cleaned.slice(-4)}`;
    }
    return '***-**-****';
  };

  return (
    <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
      <div className='p-4 pb-2'>
        {/* Header */}
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-[#11151b] font-semibold text-[18px]'>
            Staff Profile
          </h2>
          <button
            onClick={handleEdit}
            className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
            aria-label='Edit staff profile information'
          >
            Edit
          </button>
        </div>

        {/* Content */}
        <div className='flex gap-4'>
          {/* Profile Image and Signature */}
          <div className='flex flex-col items-center gap-6'>
            <div className='w-[110px] h-[110px] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center'>
              {/* Placeholder for profile image */}
              <div className='w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center'>
                <span className='text-white text-2xl font-bold'>
                  {staff.firstName[0]}
                  {staff.lastName[0]}
                </span>
              </div>
            </div>
            <button
              onClick={handleSignatureClick}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
              aria-label='View or edit staff signature'
            >
              {staff.signature ? 'View Signature' : 'Add Signature'}
            </button>
          </div>

          {/* Staff Information */}
          <div className='flex-1'>
            <div className='text-[#000101] font-normal text-[14px] leading-[1.4] whitespace-pre-line'>
              <p className='mb-0 font-bold text-black'>
                {staff.firstName.toUpperCase()} {staff.lastName.toUpperCase()}
              </p>
              <p className='mb-0'>goLOTUS ID: {staff.id}</p>
              <p className='mb-0'>
                <span>Date of birth: </span>
                <span>{formatDate(staff.dateOfBirth)}</span>
              </p>
              <p className='mb-0'>Gender: {staff.gender || 'Not provided'}</p>
              <p className='mb-0'>E-mail: {staff.email}</p>
              <p className='mb-0'>Work phone: {formatPhone(staff.workPhone)}</p>
              <p className='mb-0'>Home phone: {formatPhone(staff.homePhone)}</p>
              <p className='mb-0'>
                Mobile phone: {formatPhone(staff.primaryPhone)}
              </p>
              <p className='mb-0'>
                Social Security Number: {formatSSN(staff.socialSecurityNumber)}
              </p>
              <p className='mb-0'>&nbsp;</p>
              <p className='mb-0'>
                Home Address: {staff.address1 || 'Not provided'}
                {staff.address2 && (
                  <>
                    <br />
                    {staff.address2}
                  </>
                )}
                {(staff.city || staff.state || staff.zipCode) && (
                  <>
                    <br />
                    {[staff.city, staff.state, staff.zipCode]
                      .filter(Boolean)
                      .join(', ')}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditStaffProfileModal
        staff={staff}
        isOpen={isEditing}
        onClose={handleCloseModal}
        onSave={handleSave}
      />

      {/* Signature Modal */}
      <SignatureModal
        isOpen={isSignatureOpen}
        onClose={handleSignatureClose}
        onSave={handleSignatureSave}
        existingSignature={staff.signature}
        staffName={`${staff.firstName} ${staff.lastName}`}
      />
    </div>
  );
}
