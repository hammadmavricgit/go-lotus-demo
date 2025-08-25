'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { Input } from '@/components/ui/Input/Input';
import { Label } from '@/components/ui/Label/Label';
import { Select } from '@/components/ui/Select/Select';
import { PROFESSIONAL_TITLES } from '@/types/profile';

interface PublicProfileProps {
  data: {
    title: string | null;
    bio: string | null;
  };
  loading?: boolean;
  error?: string | null;
  onChange: (field: string, value: string) => void;
}

export const PublicProfile: React.FC<PublicProfileProps> = ({
  data,
  loading = false,
  error = null,
  onChange,
}) => {
  const [otherTitle, setOtherTitle] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange('title', value);

    // Clear other title when a predefined option is selected
    if (value !== 'other') {
      setOtherTitle('');
    }
  };

  const handleOtherTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherTitle(value);
    onChange('title', value); // Update the title with the custom value
  };

  return (
    <Card className='p-8 border border-[#6C757D80] rounded-lg'>
      {/* Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#FC5858] mx-auto mb-2'></div>
            <div className='text-[14px] text-[#565E64] font-manrope'>
              Loading public profile...
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
            My Public Profile
          </h2>
          <p className='text-[14px] text-[#000101] leading-[1.4] font-manrope'>
            When a parent or professional clicks on your image or name this is
            the information that will appear to them.
          </p>
        </div>

        {/* Form Fields */}
        <div className='space-y-6'>
          {/* Professional Title */}
          <div className='flex items-center gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='title'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                Title
              </Label>
            </div>
            <div className='flex-1'>
              <Select
                value={data.title && data.title !== 'other' ? data.title : ''}
                onChange={handleTitleChange}
                options={PROFESSIONAL_TITLES}
                placeholder='Select your title'
                className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
              />
            </div>
          </div>

          {/* Other Title Input - Show when "Other" is selected */}
          {data.title === 'other' && (
            <div className='flex items-center gap-8'>
              <div className='w-48'>
                <Label
                  htmlFor='otherTitle'
                  className='text-[16px] font-normal text-[#11151B] font-manrope'
                >
                  Specify Title
                </Label>
              </div>
              <div className='flex-1'>
                <Input
                  id='otherTitle'
                  type='text'
                  value={otherTitle}
                  onChange={handleOtherTitleChange}
                  className='h-12 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope'
                  placeholder='Enter your professional title'
                />
              </div>
            </div>
          )}

          {/* Bio */}
          <div className='flex items-start gap-8'>
            <div className='w-48'>
              <Label
                htmlFor='bio'
                className='text-[16px] font-normal text-[#11151B] font-manrope'
              >
                Bio
              </Label>
            </div>
            <div className='flex-1'>
              <textarea
                id='bio'
                value={data.bio || ''}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  onChange('bio', e.target.value)
                }
                className='min-h-[120px] w-full border-2 border-[rgba(108,117,125,0.5)] text-[14px] font-manrope resize-none rounded-md px-3 py-2 bg-white focus:outline-none focus:border-[#FC5858]'
                placeholder='Tell others about your professional background, expertise, and what makes you unique...'
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
