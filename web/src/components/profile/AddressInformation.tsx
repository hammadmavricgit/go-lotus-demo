'use client';

import React from 'react';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Label } from '@/components/ui/Label/Label';
import { Button } from '@/components/ui/Button/Button';

interface AddressInformationProps {
  data: {
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip_code: number | null;
  };
  onChange: (field: string, value: string | number) => void;
  onSaveAllChanges: () => Promise<void>;
  hasChanges?: boolean;
  isSaving?: boolean;
  loading?: boolean;
  error?: string | null;
}

export const AddressInformation: React.FC<AddressInformationProps> = ({
  data,
  onChange,
  onSaveAllChanges,
  hasChanges = false,
  isSaving = false,
  loading = false,
  error = null,
}) => {
  return (
    <Card className='p-8 border border-[#6C757D80] rounded-lg'>
      {/* Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#FC5858] mx-auto mb-2'></div>
            <div className='text-[14px] text-[#565E64] font-manrope'>
              Loading address information...
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
            Address
          </h2>
          <p className='text-[14px] text-[#000101] leading-[1.4] font-manrope'>
            Your address information is used for billing and account
            verification purposes.
          </p>
        </div>

        {/* Form Fields */}
        <div className='space-y-6'>
          {/* Number & Street */}
          <div className='flex items-center gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='address1'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                Number & Street
              </Label>
            </div>
            <div className='flex-1'>
              <Input
                id='address1'
                type='text'
                value={data.address1 || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange('address1', e.target.value)
                }
                className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                placeholder='Enter your street address'
              />
            </div>
          </div>

          {/* Address Line 2 */}
          <div className='flex items-center gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='address2'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                Address Line 2
              </Label>
            </div>
            <div className='flex-1'>
              <Input
                id='address2'
                type='text'
                value={data.address2 || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange('address2', e.target.value)
                }
                className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                placeholder='Apartment, suite, unit, etc. (optional)'
              />
            </div>
          </div>

          {/* City */}
          <div className='flex items-center gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='city'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                City
              </Label>
            </div>
            <div className='flex-1'>
              <Input
                id='city'
                type='text'
                value={data.city || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange('city', e.target.value)
                }
                className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                placeholder='Enter your city'
              />
            </div>
          </div>

          {/* State */}
          <div className='flex items-center gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='state'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                State
              </Label>
            </div>
            <div className='flex-1'>
              <Input
                id='state'
                type='text'
                value={data.state || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange('state', e.target.value)
                }
                className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                placeholder='Enter your state'
              />
            </div>
          </div>

          {/* Zip Code */}
          <div className='flex items-center gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='zip_code'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                Zip Code
              </Label>
            </div>
            <div className='flex-1'>
              <Input
                id='zip_code'
                type='text'
                value={data.zip_code || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  // Only allow numbers for zip code
                  if (value === '' || /^\d+$/.test(value)) {
                    onChange(
                      'zip_code',
                      value === '' ? '' : parseInt(value, 10)
                    );
                  }
                }}
                className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                placeholder='Enter your zip code'
              />
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className='flex justify-end pt-4 border-t border-[#6C757D80]'>
          <div className='flex items-center gap-4'>
            {hasChanges && (
              <div className='text-[14px] text-[#565E64] font-manrope'>
                You have unsaved changes
              </div>
            )}
            <Button
              onClick={onSaveAllChanges}
              disabled={!hasChanges || isSaving}
              variant='secondary'
              className='font-semibold text-[18px] px-6 py-3'
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
