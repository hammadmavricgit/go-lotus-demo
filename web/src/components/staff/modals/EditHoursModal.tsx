'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Save, Clock } from 'lucide-react';
import { Input } from '@/components/ui/Input/Input';
import { StaffHours } from '@/lib/types/staff-hours';

// Validation schema for staff hours
const editHoursSchema = z.object({
  expectedHours: z
    .string()
    .refine(
      (val) =>
        val === '' ||
        (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 168),
      {
        message: 'Expected hours must be between 0 and 168',
      }
    ),
  maxHours: z
    .string()
    .refine(
      (val) =>
        val === '' ||
        (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 168),
      {
        message: 'Max hours must be between 0 and 168',
      }
    ),
  maxOvertimeHours: z
    .string()
    .refine(
      (val) =>
        val === '' ||
        (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 80),
      {
        message: 'Max overtime hours must be between 0 and 80',
      }
    ),
  supervisedHours: z
    .string()
    .refine(
      (val) =>
        val === '' ||
        (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 168),
      {
        message: 'Supervised hours must be between 0 and 168',
      }
    ),
  vacationTimeAlloted: z
    .string()
    .refine(
      (val) =>
        val === '' ||
        (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 500),
      {
        message: 'Vacation time must be between 0 and 500 hours',
      }
    ),
  sickTimeAlloted: z
    .string()
    .refine(
      (val) =>
        val === '' ||
        (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 500),
      {
        message: 'Sick time must be between 0 and 500 hours',
      }
    ),
});

// The form data type uses string for all fields because HTML input values are always strings.
type EditHoursFormData = {
  expectedHours: string;
  maxHours: string;
  maxOvertimeHours: string;
  supervisedHours: string;
  vacationTimeAlloted: string;
  sickTimeAlloted: string;
};

interface EditHoursModalProps {
  hours: StaffHours | null;
  staffId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<StaffHours>) => Promise<void>;
}

export function EditHoursModal({
  hours,
  staffId,
  isOpen,
  onClose,
  onSave,
}: EditHoursModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditHoursFormData>({
    resolver: zodResolver(editHoursSchema),
    defaultValues: {
      expectedHours: hours?.expectedHours?.toString() || '',
      maxHours: hours?.maxHours?.toString() || '',
      maxOvertimeHours: hours?.maxOvertimeHours?.toString() || '',
      supervisedHours: hours?.supervisedHours?.toString() || '',
      vacationTimeAlloted: hours?.vacationTimeAlloted?.toString() || '',
      sickTimeAlloted: hours?.sickTimeAlloted?.toString() || '',
    },
  });

  // Reset form when hours data changes
  useEffect(() => {
    if (isOpen && hours) {
      reset({
        expectedHours: hours.expectedHours?.toString() || '',
        maxHours: hours.maxHours?.toString() || '',
        maxOvertimeHours: hours.maxOvertimeHours?.toString() || '',
        supervisedHours: hours.supervisedHours?.toString() || '',
        vacationTimeAlloted: hours.vacationTimeAlloted?.toString() || '',
        sickTimeAlloted: hours.sickTimeAlloted?.toString() || '',
      });
    } else if (isOpen && !hours) {
      // Clear form for new entry
      reset({
        expectedHours: '',
        maxHours: '',
        maxOvertimeHours: '',
        supervisedHours: '',
        vacationTimeAlloted: '',
        sickTimeAlloted: '',
      });
    }
  }, [isOpen, hours, reset]);

  const onSubmit = async (data: EditHoursFormData) => {
    try {
      setIsLoading(true);

      // Transform the data to numbers/null for backend
      const hoursData: Partial<StaffHours> = {
        userId: parseInt(staffId),
        expectedHours:
          data.expectedHours === '' ? null : Number(data.expectedHours),
        maxHours: data.maxHours === '' ? null : Number(data.maxHours),
        maxOvertimeHours:
          data.maxOvertimeHours === '' ? null : Number(data.maxOvertimeHours),
        supervisedHours:
          data.supervisedHours === '' ? null : Number(data.supervisedHours),
        vacationTimeAlloted:
          data.vacationTimeAlloted === ''
            ? null
            : Number(data.vacationTimeAlloted),
        sickTimeAlloted:
          data.sickTimeAlloted === '' ? null : Number(data.sickTimeAlloted),
      };

      console.log('EditHoursModal - Sending hours data:', hoursData);
      await onSave(hoursData);
      onClose();
    } catch (error) {
      console.error('Failed to save hours:', error);
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
      <div className='bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div className='flex items-center space-x-3'>
            <Clock className='w-6 h-6 text-[#fc5858]' />
            <h2 className='text-[#11151b] font-semibold text-[24px]'>
              Edit Hours Information
            </h2>
          </div>
          <button
            onClick={handleClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Close modal'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='p-6 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-[#11151b] font-medium text-[14px] mb-1'>
                Expected Hours
              </label>
              <Input
                type='number'
                min='0'
                max='168'
                step='0.5'
                {...register('expectedHours')}
                className='border-[rgba(108,117,125,0.5)]'
                placeholder='160'
                aria-describedby={
                  errors.expectedHours ? 'expectedHours-error' : undefined
                }
              />
              {errors.expectedHours && (
                <p
                  id='expectedHours-error'
                  className='text-red-600 text-sm mt-1'
                >
                  {errors.expectedHours.message}
                </p>
              )}
              <p className='text-sm text-gray-600 mt-1'>
                Expected hours per month
              </p>
            </div>

            <div>
              <label className='block text-[#11151b] font-medium text-[14px] mb-1'>
                Maximum Hours
              </label>
              <Input
                type='number'
                min='0'
                max='168'
                step='0.5'
                {...register('maxHours')}
                className='border-[rgba(108,117,125,0.5)]'
                placeholder='180'
                aria-describedby={
                  errors.maxHours ? 'maxHours-error' : undefined
                }
              />
              {errors.maxHours && (
                <p id='maxHours-error' className='text-red-600 text-sm mt-1'>
                  {errors.maxHours.message}
                </p>
              )}
              <p className='text-sm text-gray-600 mt-1'>
                Maximum hours allowed per month
              </p>
            </div>

            <div>
              <label className='block text-[#11151b] font-medium text-[14px] mb-1'>
                Maximum Overtime Hours
              </label>
              <Input
                type='number'
                min='0'
                max='80'
                step='0.5'
                {...register('maxOvertimeHours')}
                className='border-[rgba(108,117,125,0.5)]'
                placeholder='20'
                aria-describedby={
                  errors.maxOvertimeHours ? 'maxOvertimeHours-error' : undefined
                }
              />
              {errors.maxOvertimeHours && (
                <p
                  id='maxOvertimeHours-error'
                  className='text-red-600 text-sm mt-1'
                >
                  {errors.maxOvertimeHours.message}
                </p>
              )}
              <p className='text-sm text-gray-600 mt-1'>
                Maximum overtime hours per month
              </p>
            </div>

            <div>
              <label className='block text-[#11151b] font-medium text-[14px] mb-1'>
                Supervised Hours Needed
              </label>
              <Input
                type='number'
                min='0'
                max='168'
                step='0.5'
                {...register('supervisedHours')}
                className='border-[rgba(108,117,125,0.5)]'
                placeholder='10'
                aria-describedby={
                  errors.supervisedHours ? 'supervisedHours-error' : undefined
                }
              />
              {errors.supervisedHours && (
                <p
                  id='supervisedHours-error'
                  className='text-red-600 text-sm mt-1'
                >
                  {errors.supervisedHours.message}
                </p>
              )}
              <p className='text-sm text-gray-600 mt-1'>
                Required supervised hours
              </p>
            </div>

            <div>
              <label className='block text-[#11151b] font-medium text-[14px] mb-1'>
                Vacation Time Allotted
              </label>
              <Input
                type='number'
                min='0'
                max='500'
                step='0.5'
                {...register('vacationTimeAlloted')}
                className='border-[rgba(108,117,125,0.5)]'
                placeholder='20'
                aria-describedby={
                  errors.vacationTimeAlloted
                    ? 'vacationTimeAlloted-error'
                    : undefined
                }
              />
              {errors.vacationTimeAlloted && (
                <p
                  id='vacationTimeAlloted-error'
                  className='text-red-600 text-sm mt-1'
                >
                  {errors.vacationTimeAlloted.message}
                </p>
              )}
              <p className='text-sm text-gray-600 mt-1'>
                Annual vacation hours
              </p>
            </div>

            <div>
              <label className='block text-[#11151b] font-medium text-[14px] mb-1'>
                Sick Time Allotted
              </label>
              <Input
                type='number'
                min='0'
                max='500'
                step='0.5'
                {...register('sickTimeAlloted')}
                className='border-[rgba(108,117,125,0.5)]'
                placeholder='20'
                aria-describedby={
                  errors.sickTimeAlloted ? 'sickTimeAlloted-error' : undefined
                }
              />
              {errors.sickTimeAlloted && (
                <p
                  id='sickTimeAlloted-error'
                  className='text-red-600 text-sm mt-1'
                >
                  {errors.sickTimeAlloted.message}
                </p>
              )}
              <p className='text-sm text-gray-600 mt-1'>Annual sick hours</p>
            </div>
          </div>

          {/* Form Actions */}
          <div className='flex items-center justify-end space-x-4 pt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={handleClose}
              className='border border-gray-300 text-gray-700 font-semibold text-[16px] px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors'
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='bg-[#fc5858] text-white font-semibold text-[16px] px-6 py-2 rounded-lg hover:bg-[#e54545] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2'
            >
              {isLoading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className='w-4 h-4' />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
