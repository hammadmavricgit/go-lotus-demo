'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { EmergencyContact } from '@/lib/types/emergency-contacts';

interface EditEmergencyContactModalProps {
  emergencyContact: EmergencyContact | null;
  staffId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    contact: Omit<EmergencyContact, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
}

// Form schema matching the exact Figma design
const emergencyContactFormSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  relationship: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

type EmergencyContactFormData = z.infer<typeof emergencyContactFormSchema>;

export function EditEmergencyContactModal({
  emergencyContact,
  staffId,
  isOpen,
  onClose,
  onSave,
}: EditEmergencyContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmergencyContactFormData>({
    resolver: zodResolver(emergencyContactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      relationship: '',
      phone: '',
      email: '',
    },
  });

  // Reset form when modal opens/closes or data changes
  useEffect(() => {
    if (isOpen) {
      if (emergencyContact) {
        // Split the name into first and last name for editing
        const nameParts = emergencyContact.name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        reset({
          firstName,
          lastName,
          relationship: emergencyContact.relationship || '',
          phone: emergencyContact.phone || '',
          email: emergencyContact.email || '',
        });
      } else {
        // Reset to empty for new contact
        reset({
          firstName: '',
          lastName: '',
          relationship: '',
          phone: '',
          email: '',
        });
      }
    }
  }, [isOpen, emergencyContact, reset]);

  const onSubmit = async (data: EmergencyContactFormData) => {
    console.log('EditEmergencyContactModal - onSubmit called with:', data);

    try {
      setIsSubmitting(true);

      // Combine first and last name
      const fullName =
        `${data.firstName.trim()} ${data.lastName.trim()}`.trim();

      const contactData = {
        name: fullName,
        relationship: data.relationship?.trim() || null,
        phone: data.phone?.trim() || null,
        email: data.email?.trim() || null,
        address: null, // Not in the Figma design
        userId: parseInt(staffId),
      };

      console.log('EditEmergencyContactModal - Saving contact:', contactData);

      await onSave(contactData);
      onClose();
    } catch (error) {
      console.error('Error saving emergency contact:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-transparent flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-4 w-full max-w-md mx-4 shadow-xl border'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h2 className="text-[#11151b] font-semibold text-[18px] font-['Manrope']">
              Emergency Contact Information
            </h2>
            <button
              type='button'
              onClick={onClose}
              className='w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors'
              aria-label='Close modal'
            >
              <X className='w-6 h-6 text-gray-500' />
            </button>
          </div>

          {/* Form Fields */}
          <div className='space-y-4 mb-6'>
            {/* First Name */}
            <div className='flex flex-col gap-1'>
              <label className="text-[#000101] font-normal text-[16px] font-['Manrope']">
                First Name <span className='text-[#dc3545]'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('firstName')}
                  type='text'
                  placeholder='Enter First Name'
                  className="w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-normal text-[14px] font-['Manrope'] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent placeholder:text-[#565e64]"
                />
              </div>
              {errors.firstName && (
                <p className='text-red-500 text-sm'>
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className='flex flex-col gap-1'>
              <label className="text-[#000101] font-normal text-[16px] font-['Manrope']">
                Last Name <span className='text-[#dc3545]'>*</span>
              </label>
              <div className='relative'>
                <input
                  {...register('lastName')}
                  type='text'
                  placeholder='Enter Last Name'
                  className="w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-normal text-[14px] font-['Manrope'] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent placeholder:text-[#565e64]"
                />
              </div>
              {errors.lastName && (
                <p className='text-red-500 text-sm'>
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Relationship */}
            <div className='flex flex-col gap-1'>
              <label className="text-[#000101] font-normal text-[16px] font-['Manrope']">
                Relationship
              </label>
              <div className='relative'>
                <input
                  {...register('relationship')}
                  type='text'
                  placeholder='Type here'
                  className="w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-normal text-[14px] font-['Manrope'] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent placeholder:text-[#565e64]"
                />
              </div>
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-1'>
              <label className="text-[#000101] font-normal text-[16px] font-['Manrope']">
                Phone
              </label>
              <div className='relative'>
                <input
                  {...register('phone')}
                  type='tel'
                  placeholder='Enter Phone Number'
                  className="w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-normal text-[14px] font-['Manrope'] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent placeholder:text-[#565e64]"
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col gap-1'>
              <label className="text-[#000101] font-normal text-[16px] font-['Manrope']">
                Email
              </label>
              <div className='relative'>
                <input
                  {...register('email')}
                  type='email'
                  placeholder='Enter e-mail'
                  className="w-full h-[46px] px-2.5 py-3 bg-white border-[0.5px] border-[#565e64] rounded-lg text-[#565e64] font-normal text-[14px] font-['Manrope'] leading-[1.4] focus:outline-none focus:ring-2 focus:ring-[#fc5858] focus:border-transparent placeholder:text-[#565e64]"
                />
              </div>
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className='flex gap-2 justify-end'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className="h-[49px] w-[84px] border border-[#fc5858] rounded-lg text-[#fc5858] font-semibold text-[18px] font-['Manrope'] hover:bg-[#fc5858] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className="h-[49px] w-[84px] bg-[#fc5858] rounded-lg text-white font-semibold text-[18px] font-['Manrope'] hover:bg-[#e54848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
