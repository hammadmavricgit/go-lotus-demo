'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import {
  StaffSpecialCondition,
  SpecialCondition,
} from '@/lib/types/special-conditions';

interface EditSpecialConditionsModalProps {
  specialConditions: StaffSpecialCondition[];
  staffId: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedConditionIds: number[]) => Promise<void>;
}

// Form schema for checkbox selections
const specialConditionsFormSchema = z.object({
  selectedConditions: z.array(z.number()),
});

type SpecialConditionsFormData = {
  selectedConditions: number[];
};

export function EditSpecialConditionsModal({
  specialConditions,
  staffId,
  isOpen,
  onClose,
  onSave,
}: EditSpecialConditionsModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allConditions, setAllConditions] = useState<SpecialCondition[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SpecialConditionsFormData>({
    resolver: zodResolver(specialConditionsFormSchema),
    defaultValues: {
      selectedConditions: [],
    },
  });

  const selectedConditions = watch('selectedConditions') || [];

  // Fetch all available special conditions
  useEffect(() => {
    const fetchAllConditions = async () => {
      if (!isOpen) return;

      try {
        setLoading(true);
        console.log('Fetching all special conditions...');

        const response = await fetch('/api/SpecialConditions');
        if (!response.ok) {
          throw new Error('Failed to fetch special conditions');
        }

        const data = await response.json();
        console.log('Fetched special conditions:', data);

        setAllConditions(data.data || data || []);
      } catch (error) {
        console.error('Error fetching special conditions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllConditions();
  }, [isOpen]);

  // Reset form when modal opens/closes or data changes
  useEffect(() => {
    if (isOpen && allConditions.length > 0) {
      // Get the IDs of currently selected special conditions
      const currentlySelectedIds = specialConditions.map(
        (sc) => sc.specialCondition.id
      );

      console.log('Currently selected condition IDs:', currentlySelectedIds);

      reset({
        selectedConditions: currentlySelectedIds,
      });
    }
  }, [isOpen, specialConditions, allConditions, reset]);

  const handleConditionToggle = (conditionId: number) => {
    const currentSelected = selectedConditions || [];
    const isSelected = currentSelected.includes(conditionId);

    let newSelected;
    if (isSelected) {
      newSelected = currentSelected.filter((id) => id !== conditionId);
    } else {
      newSelected = [...currentSelected, conditionId];
    }

    console.log(
      'Toggling condition:',
      conditionId,
      'New selection:',
      newSelected
    );
    setValue('selectedConditions', newSelected);
  };

  const onSubmit = async (data: SpecialConditionsFormData) => {
    console.log('EditSpecialConditionsModal - onSubmit called with:', data);

    try {
      setIsSubmitting(true);

      const selectedIds = data.selectedConditions || [];
      console.log(
        'EditSpecialConditionsModal - Saving selected condition IDs:',
        selectedIds
      );

      await onSave(selectedIds);
      onClose();
    } catch (error) {
      console.error('Error saving special conditions:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-transparent flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-md mx-4 max-h-[90vh] flex flex-col shadow-xl border'>
        {/* Header - Fixed */}
        <div className='flex items-center justify-between p-4 border-b border-gray-200'>
          <h2 className="text-[#11151b] font-semibold text-[18px] font-['Manrope']">
            Special Conditions
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

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col flex-1 min-h-0'
        >
          {/* Body - Scrollable */}
          <div className='flex-1 overflow-y-auto p-4 min-h-0'>
            {/* Loading State */}
            {loading && (
              <div className='flex items-center justify-center py-8'>
                <div className='text-[#565e64] font-normal text-[14px]'>
                  Loading special conditions...
                </div>
              </div>
            )}

            {/* Conditions List */}
            {!loading && (
              <div className='space-y-4'>
                {allConditions.map((condition) => {
                  const isSelected = selectedConditions.includes(condition.id);

                  return (
                    <div
                      key={condition.id}
                      className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors'
                    >
                      <div className='flex items-center gap-2.5 flex-1'>
                        <div className="text-[#000101] font-normal text-[14px] font-['Manrope'] leading-[1.4]">
                          {condition.condition}
                        </div>
                      </div>

                      <button
                        type='button'
                        onClick={() => handleConditionToggle(condition.id)}
                        className='w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-colors hover:bg-gray-200'
                        aria-label={`${isSelected ? 'Unselect' : 'Select'} ${
                          condition.condition
                        }`}
                      >
                        <div className='w-[18px] h-[18px] relative'>
                          {isSelected ? (
                            <div className='w-full h-full bg-[#fc5858] rounded-sm flex items-center justify-center'>
                              <svg
                                className='w-3 h-3 text-white'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                  clipRule='evenodd'
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className='w-full h-full border-2 border-gray-300 rounded-sm bg-white'></div>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}

                {allConditions.length === 0 && !loading && (
                  <div className='text-center py-4'>
                    <p className='text-[#565e64] font-normal text-[14px]'>
                      No special conditions available
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer - Fixed */}
          <div className='flex gap-2 justify-end p-4 border-t border-gray-200'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-[11px] h-[49px] w-[84px] border border-[#fc5858] rounded-lg text-[#fc5858] font-semibold text-[18px] font-['Manrope'] hover:bg-[#fc5858] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting || loading}
              className="px-4 py-[11px] h-[49px] w-[84px] bg-[#fc5858] rounded-lg text-white font-semibold text-[18px] font-['Manrope'] hover:bg-[#e54848] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
