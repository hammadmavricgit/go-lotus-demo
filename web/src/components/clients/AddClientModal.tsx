'use client';

import { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dilaog/Dialog';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Client } from '@/app/clients/page';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: Omit<Client, 'id'>) => void;
}

// Mock therapist data - replace with actual API call
const mockTherapists = [
  'Chocolate Therapy Center',
  'Dr. Sarah Johnson',
  'Dr. Michael Chen',
  'Dr. Emily Rodriguez',
  'Dr. David Thompson',
];

export function AddClientModal({
  isOpen,
  onClose,
  onSubmit,
}: AddClientModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    parentEmail: '',
    dateOfBirth: '',
    associatedTherapist: '',
    thingsToLookOutFor: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTherapistDropdown, setShowTherapistDropdown] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (
      formData.parentEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)
    ) {
      newErrors.parentEmail = 'Please enter a valid email address';
    }

    if (
      formData.dateOfBirth &&
      !/^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)
    ) {
      newErrors.dateOfBirth = 'Please enter date in DD/MM/YYYY format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Convert DD/MM/YYYY to YYYY-MM-DD format for API
      let apiDateOfBirth = formData.dateOfBirth;
      if (
        formData.dateOfBirth &&
        /^\d{2}\/\d{2}\/\d{4}$/.test(formData.dateOfBirth)
      ) {
        const [day, month, year] = formData.dateOfBirth.split('/');
        apiDateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(
          2,
          '0'
        )}`;
      }

      const newClient: Omit<Client, 'id'> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: apiDateOfBirth || 'Not specified',
        associatedStaff: formData.associatedTherapist
          ? [formData.associatedTherapist]
          : [],
        thingsToLookOutFor:
          formData.thingsToLookOutFor || 'No specific conditions noted',
        status: 'Current',
        parentEmail: formData.parentEmail,
      };

      onSubmit(newClient);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      parentEmail: '',
      dateOfBirth: '',
      associatedTherapist: '',
      thingsToLookOutFor: '',
    });
    setErrors({});
    setShowCalendar(false);
    setShowTherapistDropdown(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleDateSelect = (day: number, month: number, year: number) => {
    const formattedDate = `${day.toString().padStart(2, '0')}/${(month + 1)
      .toString()
      .padStart(2, '0')}/${year}`;
    setFormData((prev) => ({ ...prev, dateOfBirth: formattedDate }));
    setShowCalendar(false);
  };

  const generateCalendarDays = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='max-w-md bg-white border border-[#E5E7EB] rounded-lg shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-left text-[24px] font-semibold text-[#11151B] font-manrope'>
            Add Client
          </DialogTitle>
        </DialogHeader>

        <div className='mt-4'>
          <p className='text-[16px] font-normal text-[#6B7280] mb-6 font-manrope leading-[140%]'>
            Quickly add a Client with the below information. To add additional
            information, please view a Client's Profile after they have been
            created.
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              label='First Name *'
              placeholder='Enter First Name'
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              error={!!errors.firstName}
              containerClassName='w-full'
              labelClassName='text-[16px] font-semibold text-[#11151B] font-manrope'
            />
            {errors.firstName && (
              <p className='text-red-500 text-xs font-manrope'>
                {errors.firstName}
              </p>
            )}

            <Input
              label='Last Name *'
              placeholder='Enter Last Name'
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              error={!!errors.lastName}
              containerClassName='w-full'
              labelClassName='text-[16px] font-semibold text-[#11151B] font-manrope'
            />
            {errors.lastName && (
              <p className='text-red-500 text-xs font-manrope'>
                {errors.lastName}
              </p>
            )}

            <Input
              label='Parent e-mail'
              placeholder='Enter e-mail'
              type='email'
              value={formData.parentEmail}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  parentEmail: e.target.value,
                }))
              }
              error={!!errors.parentEmail}
              containerClassName='w-full'
              labelClassName='text-[16px] font-semibold text-[#11151B] font-manrope'
            />
            {errors.parentEmail && (
              <p className='text-red-500 text-xs font-manrope'>
                {errors.parentEmail}
              </p>
            )}

            <div className='relative'>
              <Input
                label='Date of birth'
                placeholder='DD/MM/YYYY'
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
                onFocus={() => setShowCalendar(true)}
                error={!!errors.dateOfBirth}
                containerClassName='w-full'
                labelClassName='text-[16px] font-semibold text-[#11151B] font-manrope'
              />
              <Calendar
                className='absolute right-4 top-[calc(50%+12px)] transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4 cursor-pointer'
                onClick={() => setShowCalendar(!showCalendar)}
              />
              {errors.dateOfBirth && (
                <p className='text-red-500 text-xs font-manrope'>
                  {errors.dateOfBirth}
                </p>
              )}

              {/* Calendar Popup */}
              {showCalendar && (
                <div className='absolute top-full left-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10 p-4 min-w-[280px]'>
                  <div className='flex items-center justify-between mb-4'>
                    <button
                      type='button'
                      className='p-2 hover:bg-[#F9FAFB] rounded transition-colors'
                      onClick={() => {
                        /* Previous month logic */
                      }}
                    >
                      ←
                    </button>
                    <span className='font-semibold text-[#11151B] font-manrope'>
                      January 2023
                    </span>
                    <button
                      type='button'
                      className='p-2 hover:bg-[#F9FAFB] rounded transition-colors'
                      onClick={() => {
                        /* Next month logic */
                      }}
                    >
                      →
                    </button>
                  </div>

                  <div className='grid grid-cols-7 gap-1 mb-2'>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                      <div
                        key={index + day}
                        className='text-center text-xs font-semibold text-[#6B7280] p-1 font-manrope'
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className='grid grid-cols-7 gap-1'>
                    {generateCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        type='button'
                        className={`p-2 text-sm rounded hover:bg-[#F9FAFB] transition-colors font-manrope ${
                          day === 1
                            ? 'bg-[#FC5858] text-white shadow-sm'
                            : 'text-[#11151B]'
                        } ${!day ? 'invisible' : ''}`}
                        onClick={() => day && handleDateSelect(day, 0, 2023)}
                        disabled={!day}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Input
              label='Things to Look Out For'
              placeholder='Enter any medical conditions, allergies, or notes'
              value={formData.thingsToLookOutFor}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  thingsToLookOutFor: e.target.value,
                }))
              }
              containerClassName='w-full'
              labelClassName='text-[16px] font-semibold text-[#11151B] font-manrope'
            />

            <div className='relative'>
              <label className='block text-[16px] font-semibold text-[#11151B] mb-2 font-manrope'>
                Associated Therapist
              </label>
              <div
                className='bg-white border border-[#D1D5DB] rounded-lg h-[46px] px-4 py-3 flex items-center justify-between cursor-pointer hover:border-[#FC5858] transition-colors'
                onClick={() => setShowTherapistDropdown(!showTherapistDropdown)}
              >
                <span className='text-[#9CA3AF] text-[16px] font-manrope'>
                  {formData.associatedTherapist || 'Select therapist'}
                </span>
                <ChevronDown className='h-4 w-4 text-[#9CA3AF]' />
              </div>

              {showTherapistDropdown && (
                <div className='absolute top-full left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto'>
                  {mockTherapists.map((therapist) => (
                    <button
                      key={therapist}
                      type='button'
                      className='w-full text-left px-4 py-3 hover:bg-[#F9FAFB] text-[16px] font-manrope text-[#11151B] transition-colors'
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          associatedTherapist: therapist,
                        }));
                        setShowTherapistDropdown(false);
                      }}
                    >
                      {therapist}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className='flex justify-end space-x-3 pt-6'>
              <Button
                type='button'
                variant='secondary'
                onClick={handleClose}
                className='px-6 py-3 h-12 text-[16px] font-semibold font-manrope border border-[#D1D5DB] text-[#374151] hover:bg-[#F9FAFB]'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-[#FC5858] hover:bg-[#e54d4d] text-white px-6 py-3 h-12 text-[16px] font-semibold font-manrope shadow-sm'
              >
                Add
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
