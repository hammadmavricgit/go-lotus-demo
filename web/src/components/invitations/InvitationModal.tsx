'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { Select, SelectOption } from '@/components/ui/Select/Select';
import { X, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
// Email validation function (moved from invitation-utils)
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';

interface InvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function InvitationModal({
  isOpen,
  onClose,
  onSuccess,
}: InvitationModalProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useEnhancedAuth();

  // Reset form when modal opens/closes
  const handleClose = (): void => {
    if (!isLoading) {
      setEmail('');
      setFirstName('');
      setLastName('');
      setError('');
      setSuccess(false);
      onClose();
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Reset previous states
    setError('');
    setSuccess(false);

    // Check if user is admin
    if (!user || user.role !== 'admin') {
      setError('You do not have permission to send invitations');
      return;
    }

    // Validate email
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Create user invitation through Clerk API
      const response = await fetch('/api/invitations/clerk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send invitation');
      }

      // Success!
      setSuccess(true);
      setEmail('');
      setFirstName('');
      setLastName('');

      // Call success callback after a short delay
      setTimeout(() => {
        onSuccess?.();
        handleClose();
      }, 1500);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to send invitation';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return <></>;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={handleClose}
      />

      {/* Modal */}
      <div className='relative bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-4'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='font-["Manrope:SemiBold",_sans-serif] font-semibold text-[#11151b] text-[18px] leading-[100%]'>
            Add Staff Member
          </h2>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className='p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Description */}
        <p className='font-["Manrope:Regular",_sans-serif] font-normal text-[#000101] text-[16px] leading-[100%] mb-6'>
          If the user doesn&apos;t have a goLOTUS account yet, an e-mail will be
          sent inviting to join the platform. Once this is done, the user will
          be added to your organization.
        </p>

        {/* Success State */}
        {success && (
          <div className='text-center py-8'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4'>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Done!</h3>
            <p className='text-gray-600 text-sm mb-6'>
              The invite was sent successfully
            </p>
            <Button
              onClick={handleClose}
              className='bg-[#FC5858] hover:bg-[#e54d4d] text-white px-6 py-2 rounded-lg'
            >
              Ok
            </Button>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-4'>
              <Input
                id='firstName'
                type='text'
                label='First Name'
                required
                placeholder='Enter First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
              />

              <Input
                id='lastName'
                type='text'
                label='Last Name'
                required
                placeholder='Enter Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
              />

              <Input
                id='email'
                type='email'
                label='E-mail'
                required
                placeholder='Enter e-mail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                aria-describedby={error ? 'email-error' : undefined}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className='flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg'>
                <AlertCircle className='w-4 h-4 text-red-600 flex-shrink-0' />
                <p id='email-error' className='text-sm text-red-600'>
                  {error}
                </p>
              </div>
            )}

            {/* Subscription Info */}
            <div className='space-y-2'>
              <p className='font-["Manrope:Regular",_sans-serif] font-normal text-[#000101] text-[16px] leading-[100%]'>
                Adding a user to the goLOTUS account will increase the
                subscription from 27 seats to 28 seats.
              </p>
              <div className='bg-[#fcfaf7] rounded-lg p-4'>
                <p className='font-["Manrope:Regular",_sans-serif] font-normal text-[#000101] text-[16px] leading-[100%]'>
                  By applying this change, a prorated charge/credit will be
                  applied to your next invoice.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className='flex gap-2 pt-2 justify-end'>
              <Button
                type='button'
                onClick={handleClose}
                disabled={isLoading}
                className='h-[49px] px-4 py-[11px] border border-[#fc5858] text-[#fc5858] bg-white rounded-lg font-["Manrope:SemiBold",_sans-serif] font-semibold text-[18px] leading-[100%] hover:bg-gray-50'
              >
                Cancel
              </Button>

              <Button
                type='submit'
                disabled={
                  isLoading ||
                  !firstName.trim() ||
                  !lastName.trim() ||
                  !email.trim()
                }
                className='h-[49px] px-4 py-[11px] bg-[#fc5858] hover:bg-[#e54d4d] text-white rounded-lg font-["Manrope:SemiBold",_sans-serif] font-semibold text-[18px] leading-[100%]'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    Sending...
                  </>
                ) : (
                  'Add'
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
