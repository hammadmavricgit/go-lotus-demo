'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Label } from '@/components/ui/Label/Label';

interface AccountManagementProps {
  data: {
    subscription: {
      plan: string | null;
      status: string | null;
      nextBillingDate: string | null;
      amount: number | null;
    };
    accountManager: {
      name: string | null;
      email: string | null;
      phone: string | null;
    };
  };
  loading?: boolean;
  error?: string | null;
  onDeactivateAccount: () => void;
}

export const AccountManagement: React.FC<AccountManagementProps> = ({
  data,
  loading = false,
  error = null,
  onDeactivateAccount,
}) => {
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleDeactivateClick = () => {
    setShowDeactivateConfirm(true);
  };

  const handleConfirmDeactivate = () => {
    onDeactivateAccount();
    setShowDeactivateConfirm(false);
  };

  const handleCancelDeactivate = () => {
    setShowDeactivateConfirm(false);
  };

  return (
    <div className='space-y-8'>
      {/* Loading Overlay */}
      {loading && (
        <div className='absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#FC5858] mx-auto mb-2'></div>
            <div className='text-[14px] text-[#565E64] font-manrope'>
              Loading account information...
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

      {/* Account Manager Information */}
      <Card className='p-8 border border-[#6C757D80] rounded-lg'>
        <div className='flex flex-col gap-8'>
          <div>
            <h2 className='text-[24px] font-semibold text-[#000101] font-manrope mb-4'>
              Subscription and Billing
            </h2>
            <p className='text-[14px] text-[#000101] leading-[1.4] font-manrope'>
              Your subscription is managed by Kelly Whitney (goLOTUS Platinum).
            </p>
          </div>
        </div>
      </Card>

      {/* Account Deactivation */}
      <Card className='p-8 border border-[#6C757D80] rounded-lg'>
        <div className='flex flex-col gap-8'>
          <div>
            <h2 className='text-[24px] font-semibold text-[#000101] font-manrope mb-4'>
              Deactivate Account
            </h2>
          </div>

          {!showDeactivateConfirm ? (
            <div className='flex justify-start'>
              <Button
                onClick={handleDeactivateClick}
                variant='secondary'
                className='font-semibold text-[18px] px-6 py-3'
              >
                Deactivate Account
              </Button>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-[14px] text-red-800 font-manrope'>
                  <strong>Warning:</strong> You will no longer use this account
                  and will be logged out immediately after confirmation.
                </p>
                <ul className='list-disc list-inside mt-2 text-[14px] text-red-800 font-manrope space-y-1'>
                  <li>
                    Your account status will be changed from "Active" to
                    "Inactive"
                  </li>
                  <li>You will be immediately logged out of the system</li>
                  <li>You will lose access to all services and features</li>
                  <li>This action cannot be undone</li>
                </ul>
              </div>
              <div className='flex justify-end gap-4'>
                <Button
                  onClick={handleCancelDeactivate}
                  variant='secondary'
                  className='border-[#6C757D80] text-[#11151B] hover:bg-gray-100 font-semibold text-[18px] px-6 py-3'
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirmDeactivate}
                  className='bg-red-600 hover:bg-red-700 text-white font-semibold text-[18px] px-6 py-3'
                >
                  Confirm Deactivation
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
