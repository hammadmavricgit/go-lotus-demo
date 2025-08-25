'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Staff } from '@/lib/types/staff';

// Simplified validation schema matching Figma design
const editStaffProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().optional(),
  socialSecurityNumber: z.string().optional(),
  gender: z.string().optional(),
  workPhone: z.string().optional(),
  homePhone: z.string().optional(),
  primaryPhone: z.string().optional(), // Mobile phone
  address1: z.string().optional(), // Home Address
});

type EditStaffProfileFormData = z.infer<typeof editStaffProfileSchema>;

interface EditStaffProfileModalProps {
  staff: Staff;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditStaffProfileFormData) => Promise<void>;
}

export function EditStaffProfileModal({
  staff,
  isOpen,
  onClose,
  onSave,
}: EditStaffProfileModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditStaffProfileFormData>({
    resolver: zodResolver(editStaffProfileSchema),
    defaultValues: {
      firstName: staff.firstName,
      lastName: staff.lastName,
      dateOfBirth: staff.dateOfBirth || '',
      socialSecurityNumber: staff.socialSecurityNumber || '',
      gender: staff.gender || '',
      workPhone: staff.workPhone || '',
      homePhone: staff.homePhone || '',
      primaryPhone: staff.primaryPhone || '',
      address1: staff.address1 || '',
    },
  });

  const onSubmit = async (data: EditStaffProfileFormData) => {
    try {
      setIsLoading(true);
      await onSave(data);
      onClose();
    } catch (error) {
      console.error('Failed to save staff profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto'>
        {/* Modal Content */}
        <div className='p-4 flex flex-col gap-6'>
          {/* Header */}
          <div className='flex items-start justify-between'>
            <h2 className='text-[#11151b] font-["Manrope"] font-semibold text-[18px] leading-normal'>
              Staff Profile
            </h2>
            <button
              onClick={handleClose}
              className='text-gray-400 hover:text-gray-600 transition-colors rounded-lg p-1'
              aria-label='Close modal'
            >
              <X className='w-6 h-6' />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            {/* First Name - Required */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                First Name <span className='text-[#dc3545]'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('firstName')}
                  placeholder='Enter First Name'
                  className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
                  aria-describedby={
                    errors.firstName ? 'firstName-error' : undefined
                  }
                />
                {errors.firstName && (
                  <p id='firstName-error' className='text-red-600 text-sm mt-1'>
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Last Name - Required */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Last Name <span className='text-[#dc3545]'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('lastName')}
                  placeholder='Enter Last Name'
                  className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
                  aria-describedby={
                    errors.lastName ? 'lastName-error' : undefined
                  }
                />
                {errors.lastName && (
                  <p id='lastName-error' className='text-red-600 text-sm mt-1'>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Date of birth
              </label>
              <input
                type='date'
                {...register('dateOfBirth')}
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Social Security Number */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Social Security Number
              </label>
              <input
                type='password'
                {...register('socialSecurityNumber')}
                placeholder='Enter Social Security Number'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Gender */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Gender
              </label>
              <div className='relative'>
                <select
                  {...register('gender')}
                  className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent appearance-none'
                >
                  <option value=''>Choose Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                  <option value='prefer-not-to-say'>Prefer not to say</option>
                </select>
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                  <svg width='7' height='4' viewBox='0 0 7 4' fill='none'>
                    <path d='M3.5 4L0 0H7L3.5 4Z' fill='#565e64' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Work Phone */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Work phone
              </label>
              <input
                type='tel'
                {...register('workPhone')}
                placeholder='Enter Phone Number'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Home Phone */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Home phone
              </label>
              <input
                type='tel'
                {...register('homePhone')}
                placeholder='Enter Phone Number'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Mobile Phone */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Mobile phone
              </label>
              <input
                type='tel'
                {...register('primaryPhone')}
                placeholder='Enter Phone Number'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Home Address */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Home Address
              </label>
              <input
                {...register('address1')}
                placeholder='Enter Address'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Action Buttons */}
            <div className='flex gap-2 items-start justify-start'>
              <button
                type='button'
                onClick={handleClose}
                className='w-[84px] h-[49px] px-4 border border-[#fc5858] rounded-lg flex items-center justify-center text-[#fc5858] font-["Manrope"] font-semibold text-[18px] leading-normal hover:bg-[#fc5858] hover:text-white transition-colors'
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isLoading}
                className='w-[84px] h-[49px] px-4 bg-[#fc5858] rounded-lg flex items-center justify-center text-white font-["Manrope"] font-semibold text-[18px] leading-normal hover:bg-[#e54545] transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
