'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { ClinicInformation } from '@/lib/types/clinic-information';

// Validation schema matching Figma design
const editClinicInformationSchema = z.object({
  title: z.string().optional(),
  employeeNumber: z.string().optional(),
  npiNumber: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        // NPI number validation (10 digits)
        return /^\d{10}$/.test(val);
      },
      {
        message: 'NPI number must be exactly 10 digits',
      }
    ),
  supervisor: z.string().optional(),
  dateHired: z.string().optional(),
  dateTerminated: z.string().optional(),
});

type EditClinicInformationFormData = z.infer<
  typeof editClinicInformationSchema
>;

interface EditClinicInformationModalProps {
  clinicInfo: ClinicInformation | null;
  staffId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<ClinicInformation>) => Promise<void>;
}

export function EditClinicInformationModal({
  clinicInfo,
  staffId,
  isOpen,
  onClose,
  onSave,
}: EditClinicInformationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditClinicInformationFormData>({
    resolver: zodResolver(editClinicInformationSchema),
    defaultValues: {
      title: clinicInfo?.title || '',
      employeeNumber: clinicInfo?.employeeNumber || '',
      npiNumber: clinicInfo?.npiNumber || '',
      supervisor: clinicInfo?.supervisor || '',
      dateHired: clinicInfo?.dateHired || '',
      dateTerminated: clinicInfo?.dateTerminated || '',
    },
  });

  // Reset form when clinic info data changes
  useEffect(() => {
    if (isOpen && clinicInfo) {
      reset({
        title: clinicInfo.title || '',
        employeeNumber: clinicInfo.employeeNumber || '',
        npiNumber: clinicInfo.npiNumber || '',
        supervisor: clinicInfo.supervisor || '',
        dateHired: clinicInfo.dateHired || '',
        dateTerminated: clinicInfo.dateTerminated || '',
      });
    } else if (isOpen && !clinicInfo) {
      // Clear form for new entry
      reset({
        title: '',
        employeeNumber: '',
        npiNumber: '',
        supervisor: '',
        dateHired: '',
        dateTerminated: '',
      });
    }
  }, [isOpen, clinicInfo, reset]);

  const onSubmit = async (data: EditClinicInformationFormData) => {
    try {
      setIsLoading(true);

      const clinicData: Partial<ClinicInformation> = {
        userId: parseInt(staffId),
        title: data.title || null,
        employeeNumber: data.employeeNumber || null,
        npiNumber: data.npiNumber || null,
        department: null, // Not in Figma design
        supervisor: data.supervisor || null,
        dateHired: data.dateHired || null,
        dateTerminated: data.dateTerminated || null,
      };

      await onSave(clinicData);
      onClose();
    } catch (error) {
      console.error('Failed to save clinic information:', error);
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
              Clinic Information
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
            {/* Title */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Title
              </label>
              <input
                {...register('title')}
                placeholder='Type here'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Employee Number */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Employee number
              </label>
              <input
                {...register('employeeNumber')}
                placeholder='Type here'
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* NPI Number */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                NPI number
              </label>
              <div className='relative'>
                <input
                  {...register('npiNumber')}
                  placeholder='Type here'
                  maxLength={10}
                  className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
                  aria-describedby={
                    errors.npiNumber ? 'npiNumber-error' : undefined
                  }
                />
                {errors.npiNumber && (
                  <p id='npiNumber-error' className='text-red-600 text-sm mt-1'>
                    {errors.npiNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Supervisor */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Supervisor
              </label>
              <div className='relative'>
                <select
                  {...register('supervisor')}
                  className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent appearance-none'
                >
                  <option value=''>Choose Supervisor</option>
                  <option value='Lisa Murphy'>Lisa Murphy</option>
                  <option value='John Smith'>John Smith</option>
                  <option value='Sarah Johnson'>Sarah Johnson</option>
                  <option value='Other'>Other</option>
                </select>
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                  <svg width='7' height='4' viewBox='0 0 7 4' fill='none'>
                    <path d='M3.5 4L0 0H7L3.5 4Z' fill='#565e64' />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date Hired */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Date Hired
              </label>
              <input
                type='date'
                {...register('dateHired')}
                className='w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-["Manrope"] font-normal text-[14px] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent'
              />
            </div>

            {/* Date Terminated */}
            <div className='flex flex-col gap-1'>
              <label className='text-[#000101] font-["Manrope"] font-normal text-[16px] leading-normal'>
                Date Terminated
              </label>
              <input
                type='date'
                {...register('dateTerminated')}
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
