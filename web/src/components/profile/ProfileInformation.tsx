'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Label } from '@/components/ui/Label/Label';
import { Note } from '@/types/profile';
import { User, Upload, PenTool } from 'lucide-react';
import { NotesTable } from './NotesTable';
import { ProfilePictureUpload } from './ProfilePictureUpload';
import { SignatureModal } from './SignatureModal';

interface ProfileInformationProps {
  user: {
    firstName: string | null;
    lastName: string | null;
    primary_phone: string | null;
    email: string;
    signature: string | null;
    imageUrl?: string | null;
  };
  notes?: Note[];
  lastLoginDate?: string;
  loading?: boolean;
  error?: string | null;
  showNotes?: boolean;
  onImageUpload?: (file: File) => void;
  onFieldChange?: (field: string, value: string) => void;
  onSignatureSave?: (signatureData: string) => Promise<void>;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({
  user,
  notes = [],
  lastLoginDate,
  loading = false,
  error = null,
  showNotes = false,
  onImageUpload,
  onFieldChange,
  onSignatureSave,
}) => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  const handleSignatureClick = () => {
    setShowSignatureModal(true);
  };

  const handleSignatureSave = async (signatureData: string) => {
    if (onSignatureSave) {
      await onSignatureSave(signatureData);
    }
  };

  return (
    <Card className='p-8 border border-[#6C757D80] rounded-lg'>
      {/* Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#FC5858] mx-auto mb-2'></div>
            <div className='text-[14px] text-[#565E64] font-manrope'>
              Loading profile information...
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 rounded-lg p-4'>
          <div className='flex items-center gap-2'>
            <svg
              className='w-5 h-5 text-red-600'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                clipRule='evenodd'
              />
            </svg>
            <p className='text-[14px] text-red-800 font-manrope'>
              <strong>Error:</strong> {error}
            </p>
          </div>
        </div>
      )}

      <div className='flex flex-col gap-8'>
        {/* Header */}
        <div>
          <h2 className='text-[24px] font-semibold text-[#000101] font-manrope mb-4'>
            Profile information
          </h2>
        </div>

        {/* Section 1: Avatar and Notes */}
        <div className='flex gap-8'>
          {/* Left Side - Avatar */}
          <div className='flex flex-col items-center space-y-4'>
            <ProfilePictureUpload
              currentImageUrl={user.imageUrl}
              onImageUpload={(imageUrl) => {
                // Update the profile with new image URL
                onFieldChange?.('imageUrl', imageUrl);
              }}
              onImageDelete={() => {
                // Remove the image URL from profile
                onFieldChange?.('imageUrl', '');
              }}
            />
            {/* Last Login under Add photo button */}
            {lastLoginDate && (
              <div className='text-[14px] text-[#565E64] font-manrope text-center'>
                Last login: {new Date(lastLoginDate).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Right Side - Notes (only shown for staff users) */}
          {showNotes && (
            <div className='flex-1'>
              <NotesTable
                notes={notes.map((note) => ({
                  id: note.id,
                  issueDate: note.issue_date,
                  label: note.label,
                  note: note.note,
                  fileUrl: note.file_url,
                  attachments: null,
                  userId: null,
                  createdAt:
                    note.created_at instanceof Date
                      ? note.created_at.toISOString()
                      : note.created_at,
                  updatedAt:
                    note.updated_at instanceof Date
                      ? note.updated_at.toISOString()
                      : note.updated_at,
                }))}
                onSort={(field, direction) => {
                  console.log('Sorting notes by:', field, direction);
                  // This will be handled by the parent component if needed
                }}
              />
            </div>
          )}
        </div>

        {/* Section 2: Form Fields */}
        <div className='border-t border-[#6C757D80] pt-8'>
          <div className='space-y-6'>
            {/* First Name */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
              <div className='w-full sm:w-48'>
                <Label
                  htmlFor='firstName'
                  className='text-[16px] font-normal text-[#11151B] font-manrope'
                >
                  First Name
                </Label>
              </div>
              <div className='flex-1'>
                <Input
                  id='firstName'
                  type='text'
                  value={user.firstName || ''}
                  onChange={(e) => onFieldChange?.('firstName', e.target.value)}
                  className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                  placeholder='First Name'
                />
              </div>
            </div>

            {/* Last Name */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
              <div className='w-full sm:w-48'>
                <Label
                  htmlFor='lastName'
                  className='text-[16px] font-normal text-[#11151B] font-manrope'
                >
                  Last Name
                </Label>
              </div>
              <div className='flex-1'>
                <Input
                  id='lastName'
                  type='text'
                  value={user.lastName || ''}
                  onChange={(e) => onFieldChange?.('lastName', e.target.value)}
                  className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                  placeholder='Last Name'
                />
              </div>
            </div>

            {/* Primary Phone */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
              <div className='w-full sm:w-48'>
                <Label
                  htmlFor='primary_phone'
                  className='text-[16px] font-normal text-[#11151B] font-manrope'
                >
                  Primary Phone
                </Label>
              </div>
              <div className='flex-1'>
                <Input
                  id='primary_phone'
                  type='tel'
                  value={user.primary_phone || ''}
                  onChange={(e) =>
                    onFieldChange?.('primary_phone', e.target.value)
                  }
                  className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                  placeholder='Primary Phone'
                />
              </div>
            </div>

            {/* Email Address */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
              <div className='w-full sm:w-48'>
                <Label
                  htmlFor='email'
                  className='text-[16px] font-normal text-[#11151B] font-manrope'
                >
                  E-Mail Address (User Name)
                </Label>
              </div>
              <div className='flex-1'>
                <Input
                  id='email'
                  type='email'
                  value={user.email}
                  readOnly
                  className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                  placeholder='Email Address'
                />
              </div>
            </div>

            {/* Signature - Moved to rightmost side */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8'>
              <div className='w-full sm:w-48'>
                <Label
                  htmlFor='signature'
                  className='text-[16px] font-normal text-[#11151B] font-manrope'
                >
                  Signature
                </Label>
              </div>
              <div className='flex-1'>
                <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center sm:justify-end'>
                  {/* Signature Display */}
                  <div className='flex-1 sm:w-64'>
                    {user.signature ? (
                      <div className='border border-gray-200 rounded-lg p-3 bg-gray-50'>
                        <img
                          src={user.signature}
                          alt='User signature'
                          className='max-w-full h-auto max-h-16 object-contain'
                        />
                      </div>
                    ) : (
                      <div className='h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50'>
                        <span className='text-[14px] text-[#565E64] font-manrope'>
                          No signature found
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Signature Button */}
                  <Button
                    className='h-12 px-6 border-2 border-[#FC5858] text-[#FC5858] hover:bg-[#FC5858] hover:text-white font-semibold text-[18px] bg-transparent rounded-lg cursor-pointer w-full sm:w-auto'
                    onClick={handleSignatureClick}
                  >
                    <PenTool className='w-4 h-4 mr-2' />
                    {user.signature ? 'Update' : 'Add'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={showSignatureModal}
        onClose={() => setShowSignatureModal(false)}
        onSave={handleSignatureSave}
        existingSignature={user.signature}
        userName={
          `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'
        }
      />
    </Card>
  );
};
