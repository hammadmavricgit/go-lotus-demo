'use client';

import { AccountManagement } from '@/components/profile/AccountManagement';
import { AddressInformation } from '@/components/profile/AddressInformation';
import { ProfileInformation } from '@/components/profile/ProfileInformation';
import { PublicProfile } from '@/components/profile/PublicProfile';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedAuth } from '@/hooks/useEnhancedAuth';
import { useNotes } from '@/hooks/useNotes';
import { useProfile } from '@/hooks/useProfile';
import { ProfileData } from '@/types/profile';
import React from 'react';

export default function ProfilePage() {
  const { user, loading, logout } = useEnhancedAuth();
  const { toast } = useToast();
  const {
    profile: profileData,
    loading: profileLoading,
    error: profileError,
    hasChanges,
    isSaving,
    updateField,
    saveChanges,
    deactivateAccount,
    refreshProfile,
  } = useProfile();

  // Fetch notes for the current user (only if user is staff and profile data is loaded
  const notesUserId =
    user?.role === 'staff' && profileData?.id && !profileLoading
      ? profileData.id.toString()
      : '';
  const {
    notes: userNotes,
    loading: notesLoading,
    error: notesError,
  } = useNotes(notesUserId);

  // Loading and error states for different sections
  const [loadingStates, setLoadingStates] = React.useState({
    profileInfo: false,
    publicProfile: false,
    addressInfo: false,
    accountManagement: false,
    notes: false,
  });

  const [errorStates, setErrorStates] = React.useState({
    profileInfo: null as string | null,
    publicProfile: null as string | null,
    addressInfo: null as string | null,
    accountManagement: null as string | null,
    notes: null as string | null,
  });

  // Global save function
  const handleSaveAllChanges = async () => {
    if (!hasChanges || !profileData) return;

    try {
      await saveChanges({
        onSuccess: (data) => {
          console.log('Profile saved successfully');
          // Show success toast notification
          toast({
            title: 'Success!',
            description: 'Profile updated successfully!',
            variant: 'default',
          });
        },
        onError: (error) => {
          // Show error toast notification
          toast({
            title: 'Error',
            description: error || 'Failed to save profile changes',
            variant: 'destructive',
          });
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to save profile changes';
      // Show error toast notification
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Error saving profile:', error);
    }
  };

  // Update profile data and mark as changed
  const updateProfileData = (
    field: keyof ProfileData,
    value: string | number
  ) => {
    updateField(field, value);
  };

  // Handle account deactivation
  const handleDeactivateAccount = async () => {
    try {
      await deactivateAccount({
        onSuccess: async (data) => {
          console.log('Account deactivated successfully');
          // Show success toast notification
          toast({
            title: 'Account Deactivated',
            description:
              'Your account has been deactivated successfully. You will be logged out immediately.',
            variant: 'default',
          });

          // Logout immediately after successful deactivation
          await logout();
        },
        onError: (error) => {
          // Show error toast notification
          toast({
            title: 'Error',
            description: error || 'Failed to deactivate account',
            variant: 'destructive',
          });
        },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to deactivate account';
      // Show error toast notification
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      console.error('Error deactivating account:', error);
    }
  };

  if (loading || profileLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#FC5858] mx-auto mb-4'></div>
          <div className='text-lg text-[#11151B] font-manrope'>
            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='text-lg text-[#11151B] font-manrope mb-2'>
            Please sign in to view your profile.
          </div>
          <div className='text-[14px] text-[#565E64] font-manrope'>
            You need to be authenticated to access this page.
          </div>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='text-lg text-[#11151B] font-manrope mb-2'>
            Error loading profile
          </div>
          <div className='text-[14px] text-[#565E64] font-manrope mb-4'>
            {profileError}
          </div>
          <button
            onClick={() => window.location.reload()}
            className='bg-[#FC5858] text-white px-4 py-2 rounded-lg hover:bg-[#e04a4a] transition-colors cursor-pointer'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <div className='border-b border-gray-200 bg-white'>
        <div className='px-4 py-6 sm:py-10 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h1 className='text-[24px] sm:text-[36px] font-semibold text-[#000101] font-manrope'>
                Welcome back, {user.firstName || 'User'}!
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'
        role='main'
        aria-label='Profile management'
      >
        <div className='space-y-8'>
          {/* Profile Information Section */}
          <section aria-labelledby='profile-info-heading'>
            <ProfileInformation
              user={{
                firstName: profileData?.firstName || null,
                lastName: profileData?.lastName || null,
                primary_phone: profileData?.primary_phone || null,
                email: profileData?.email || user.email || '',
                signature: profileData?.signature || null,
                imageUrl: profileData?.imageUrl || user.imageUrl,
              }}
              notes={
                user?.role === 'staff' && profileData?.id
                  ? userNotes.map((note) => ({
                      id: note.id,
                      issue_date: note.issueDate,
                      label: note.label,
                      note: note.note,
                      file_url: note.fileUrl,
                      created_at: new Date(note.createdAt),
                      updated_at: new Date(note.updatedAt),
                    }))
                  : []
              }
              lastLoginDate={user.updatedAt?.toString()}
              loading={
                loadingStates.profileInfo ||
                (user?.role === 'staff' && profileData?.id
                  ? notesLoading
                  : false)
              }
              error={
                errorStates.profileInfo ||
                (user?.role === 'staff' && profileData?.id ? notesError : null)
              }
              showNotes={user?.role === 'staff' && !!profileData?.id}
              onImageUpload={async (file) => {
                // Will be implemented in future tasks
                console.log('Image upload:', file);
              }}
              onFieldChange={(field, value) => {
                updateProfileData(field as keyof ProfileData, value);
              }}
              onSignatureSave={async (signatureData) => {
                try {
                  // Save signature directly to database first
                  if (!profileData?.id) {
                    throw new Error('No profile ID available');
                  }

                  const response = await fetch(`/api/users/${profileData.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      signature: signatureData,
                      email: profileData.email, // Include email to satisfy API validation
                    }),
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(
                      errorData.error || 'Failed to save signature'
                    );
                  }

                  const data = await response.json();

                  // Update local state immediately with the new signature
                  updateProfileData('signature', signatureData);

                  // Force a refresh of the profile data to ensure UI is in sync
                  // This ensures the signature appears immediately
                  await refreshProfile();

                  console.log('Signature saved successfully');
                  toast({
                    title: 'Success!',
                    description: 'Signature updated successfully!',
                    variant: 'default',
                  });
                } catch (error) {
                  console.error('Error saving signature:', error);
                  toast({
                    title: 'Error',
                    description: 'Failed to save signature',
                    variant: 'destructive',
                  });
                }
              }}
            />
          </section>

          {/* Public Profile Section */}
          <section aria-labelledby='public-profile-heading'>
            <PublicProfile
              data={{
                title: profileData?.title || null,
                bio: profileData?.bio || null,
              }}
              loading={loadingStates.publicProfile}
              error={errorStates.publicProfile}
              onChange={(field, value) => {
                updateProfileData(field as keyof ProfileData, value);
              }}
            />
          </section>

          {/* Address Information Section */}
          <section aria-labelledby='address-info-heading'>
            <AddressInformation
              data={{
                address1: profileData?.address1 || null,
                address2: profileData?.address2 || null,
                city: profileData?.city || null,
                state: profileData?.state || null,
                zip_code: profileData?.zip_code || null,
              }}
              onChange={(field, value) => {
                updateProfileData(field as keyof ProfileData, value);
              }}
              onSaveAllChanges={handleSaveAllChanges}
              hasChanges={hasChanges}
              isSaving={isSaving}
              loading={loadingStates.addressInfo}
              error={errorStates.addressInfo}
            />
          </section>

          {/* Account Management Section */}
          <section aria-labelledby='account-management-heading'>
            <AccountManagement
              data={{
                subscription: {
                  plan: null, // Will be fetched from backend in future tasks
                  status: null, // Will be fetched from backend in future tasks
                  nextBillingDate: null, // Will be fetched from backend in future tasks
                  amount: null, // Will be fetched from backend in future tasks
                },
                accountManager: {
                  name: null, // Will be fetched from backend in future tasks
                  email: null, // Will be fetched from backend in future tasks
                  phone: null, // Will be fetched from backend in future tasks
                },
              }}
              loading={loadingStates.accountManagement}
              error={errorStates.accountManagement}
              onDeactivateAccount={handleDeactivateAccount}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
