'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useCredentials } from '@/hooks/useCredentials';
import { CredentialName } from '@/lib/types/credentials';

interface CredentialsSectionProps {
  staffId: string;
}

const CREDENTIAL_OPTIONS: { value: CredentialName; label: string }[] = [
  { value: 'CPR_TRAINING', label: 'CPR Training' },
  { value: 'MEDICAL_TRAINING', label: 'Medical Training' },
  { value: 'PHYSIOTHERAPY', label: 'Physiotherapy' },
];

export function CredentialsSection({ staffId }: CredentialsSectionProps) {
  const { credentials, loading, error, createCredential, deleteCredential } =
    useCredentials(staffId);
  const [formData, setFormData] = useState({
    credentialName: '' as CredentialName | '',
    issueDate: '',
    expireDate: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAdd = async () => {
    if (!formData.credentialName) {
      console.error('Please select a credential type');
      return;
    }

    try {
      setIsSubmitting(true);
      await createCredential({
        credentialName: formData.credentialName as CredentialName,
        issueDate: formData.issueDate || null,
        expireDate: formData.expireDate || null,
        note: formData.note || null,
        userId: parseInt(staffId),
      });

      // Reset form
      setFormData({
        credentialName: '',
        issueDate: '',
        expireDate: '',
        note: '',
      });
    } catch (error) {
      console.error('Error adding credential:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (credentialId: number) => {
    if (!confirm('Are you sure you want to delete this credential?')) {
      return;
    }

    try {
      await deleteCredential(credentialId);
    } catch (error) {
      console.error('Error deleting credential:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const formatCredentialName = (name: CredentialName) => {
    const option = CREDENTIAL_OPTIONS.find((opt) => opt.value === name);
    return option ? option.label : name.replace(/_/g, ' ');
  };

  if (loading) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Credentials
            </h2>
          </div>

          {/* Loading Content */}
          <div className='flex items-center justify-center py-8'>
            <LoadingSpinner size='md' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Credentials
            </h2>
          </div>

          {/* Error Content */}
          <div className='text-center py-8'>
            <p className='text-[#565e64] font-normal text-[14px]'>
              Failed to load credentials: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
      <div className='p-4'>
        {/* Header */}
        <div className='flex items-center justify-start mb-4'>
          <h2 className='text-[#11151b] font-semibold text-[18px]'>
            Credentials
          </h2>
        </div>

        {/* Add Credential Form */}
        <div className='flex flex-col lg:flex-row gap-4 items-start mb-6'>
          {/* Form Fields Container */}
          <div className='flex flex-col sm:flex-row gap-4 flex-1 w-full'>
            {/* Credential Type Dropdown */}
            <div className='h-[49px] relative rounded-lg flex-1 min-w-0 lg:flex-[2] border border-[rgba(108,117,125,0.5)]'>
              <select
                value={formData.credentialName}
                onChange={(e) =>
                  handleInputChange('credentialName', e.target.value)
                }
                className='w-full h-full px-3 py-2 rounded-lg bg-transparent text-[#000101] font-normal text-[14px] outline-none appearance-none cursor-pointer'
                disabled={isSubmitting}
              >
                <option value='' className='text-[#565e64]'>
                  Choose one
                </option>
                {CREDENTIAL_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className='absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none'>
                <div className='w-[7px] h-1'>
                  <div
                    className='w-full h-full bg-gray-400'
                    style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
                  />
                </div>
              </div>
            </div>

            {/* Issue Date */}
            <div className='h-[49px] relative rounded-lg flex-1 min-w-0 border border-[rgba(108,117,125,0.5)]'>
              <input
                type='date'
                value={formData.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
                className='w-full h-full px-3 py-2 rounded-lg bg-transparent text-[#000101] font-normal text-[14px] outline-none'
                placeholder='Issued Date'
                disabled={isSubmitting}
              />
            </div>

            {/* Expire Date */}
            <div className='h-[49px] relative rounded-lg flex-1 min-w-0 border border-[rgba(108,117,125,0.5)]'>
              <input
                type='date'
                value={formData.expireDate}
                onChange={(e) =>
                  handleInputChange('expireDate', e.target.value)
                }
                className='w-full h-full px-3 py-2 rounded-lg bg-transparent text-[#000101] font-normal text-[14px] outline-none'
                placeholder='Expire Date'
                disabled={isSubmitting}
              />
            </div>

            {/* Notes */}
            <div className='h-[49px] relative rounded-lg flex-1 min-w-0 border border-[rgba(108,117,125,0.5)]'>
              <input
                type='text'
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className='w-full h-full px-3 py-2 rounded-lg bg-transparent text-[#000101] font-normal text-[14px] outline-none'
                placeholder='Notes'
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={isSubmitting || !formData.credentialName}
            className='bg-[#fc5858] text-white font-semibold text-[18px] px-6 py-3 rounded-lg h-[52px] hover:bg-[#e54545] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto whitespace-nowrap'
          >
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
        </div>

        {/* Credentials Table */}
        {credentials.length > 0 ? (
          <div className='space-y-0'>
            {/* Desktop Table Header (hidden on mobile) */}
            <div className='hidden lg:flex gap-4 items-center py-2 border-b border-gray-200 bg-gray-50'>
              <div className='flex-[2] px-4 py-2'>
                <span className='text-[#565e64] font-semibold text-[12px] uppercase tracking-wide'>
                  Credential Type
                </span>
              </div>
              <div className='flex-1 px-4 py-2'>
                <span className='text-[#565e64] font-semibold text-[12px] uppercase tracking-wide'>
                  Issue Date
                </span>
              </div>
              <div className='flex-1 px-4 py-2'>
                <span className='text-[#565e64] font-semibold text-[12px] uppercase tracking-wide'>
                  Expire Date
                </span>
              </div>
              <div className='flex-1 px-4 py-2'>
                <span className='text-[#565e64] font-semibold text-[12px] uppercase tracking-wide'>
                  Notes
                </span>
              </div>
              <div className='w-12 px-2 py-2'>
                <span className='text-[#565e64] font-semibold text-[12px] uppercase tracking-wide'>
                  Action
                </span>
              </div>
            </div>

            {credentials.map((credential) => (
              <div
                key={credential.id}
                className='flex flex-col lg:flex-row gap-2 lg:gap-4 lg:items-center py-3 lg:py-2.5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors'
              >
                {/* Mobile Card Layout */}
                <div className='lg:hidden space-y-2'>
                  <div className='flex justify-between items-start'>
                    <div>
                      <div className='text-[#000101] font-semibold text-[14px] mb-1'>
                        {formatCredentialName(credential.credentialName)}
                      </div>
                      <div className='space-y-1 text-[#565e64] text-[12px]'>
                        {(credential.issueDate || credential.expireDate) && (
                          <div>
                            {credential.issueDate && (
                              <span>
                                Issue: {formatDate(credential.issueDate)}
                              </span>
                            )}
                            {credential.issueDate && credential.expireDate && (
                              <span className='mx-2'>•</span>
                            )}
                            {credential.expireDate && (
                              <span>
                                Expire: {formatDate(credential.expireDate)}
                              </span>
                            )}
                          </div>
                        )}
                        {credential.note && (
                          <div className='text-[#000101]'>
                            Notes: {credential.note}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(credential.id)}
                      className='w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded transition-colors text-red-600 hover:text-red-700 ml-2'
                      aria-label='Delete credential'
                      title='Delete credential'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>

                {/* Desktop Table Layout */}
                <div className='hidden lg:flex gap-4 items-center flex-1'>
                  {/* Credential Name */}
                  <div className='flex-[2] px-4 py-2.5'>
                    <span className='text-[#000101] font-normal text-[14px]'>
                      {formatCredentialName(credential.credentialName)}
                    </span>
                  </div>

                  {/* Issue Date */}
                  <div className='flex-1 px-4 py-2.5'>
                    <span className='text-[#000101] font-normal text-[14px]'>
                      {formatDate(credential.issueDate) || 'Not set'}
                    </span>
                  </div>

                  {/* Expire Date */}
                  <div className='flex-1 px-4 py-2.5'>
                    <span className='text-[#000101] font-normal text-[14px]'>
                      {formatDate(credential.expireDate) || 'Not set'}
                    </span>
                  </div>

                  {/* Notes */}
                  <div className='flex-1 px-4 py-2.5'>
                    <span
                      className='text-[#000101] font-normal text-[14px] truncate'
                      title={credential.note || 'No notes'}
                    >
                      {credential.note || 'No notes'}
                    </span>
                  </div>

                  {/* Delete Button */}
                  <div className='w-12 flex items-center justify-center px-2 py-2.5'>
                    <button
                      onClick={() => handleDelete(credential.id)}
                      className='w-8 h-8 flex items-center justify-center hover:bg-red-50 rounded transition-colors text-red-600 hover:text-red-700'
                      aria-label='Delete credential'
                      title='Delete credential'
                    >
                      <Trash2 className='w-4 h-4' />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='text-center py-8'>
            <p className='text-[#565e64] font-normal text-[14px]'>
              No credentials added yet. Use the form above to add credentials.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
