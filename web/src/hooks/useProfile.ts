'use client';

import { useState, useCallback, useEffect } from 'react';
import { useEnhancedAuth } from './useEnhancedAuth';
import { ProfileData, ProfileUpdateRequest, FileAttachment } from '@/types/profile';
import { uploadProfileImageToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

export interface ProfileState {
  data: ProfileData | null;
  originalData: ProfileData | null; // Track original data for change detection
  loading: boolean;
  error: string | null;
  hasChanges: boolean;
  isSaving: boolean;
  uploadingImage: boolean;
}

export interface ProfileUpdateOptions {
  onSuccess?: (data: ProfileData) => void;
  onError?: (error: string) => void;
}

/**
 * Custom hook for profile data management
 * Follows the same pattern as useUsers and StaffProfileSection
 */
export function useProfile() {
  const { user } = useEnhancedAuth();
  
  const [state, setState] = useState<ProfileState>({
    data: null,
    originalData: null,
    loading: false,
    error: null,
    hasChanges: false,
    isSaving: false,
    uploadingImage: false,
  });

  /**
   * Fetch profile data for the current user
   */
  const fetchProfile = useCallback(async () => {
    console.log('fetchProfile called with user?.id:', user?.id);
    if (!user?.id) {
      setState(prev => ({ ...prev, error: 'No user ID available' }));
      return;
    }

    console.log('Starting to fetch profile data...');
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // First try to get user by Clerk ID
      const response = await fetch(`/api/users?clerkId=${user.id}`);

      if (!response.ok) {
        if (response.status === 404) {
          // If user doesn't exist, create a new profile
          await createProfile();
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch profile');
      }

      const data = await response.json();
      
             if (data.users && data.users.length > 0) {
         const profileData = data.users[0];
         console.log('Profile data fetched successfully:', profileData);

        setState(prev => ({
          ...prev,
          data: profileData,
          originalData: profileData, // Store original data for change detection
          loading: false,
          hasChanges: false,
        }));
      } else {
        // No user found, create a new profile
        console.log('No user found, creating new profile...');
        await createProfile();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      console.error('Error fetching profile:', err);
    }
  }, [user?.id]);

  /**
   * Create a new profile for the current user
   */
  const createProfile = useCallback(async () => {
    if (!user) {
      setState(prev => ({ ...prev, error: 'No user data available' }));
      return;
    }

    try {
      const newProfileData: Partial<ProfileData> = {
        email: user.email || '',
        firstName: user.firstName || null,
        lastName: user.lastName || null,
        clerkId: user.id,
        status: 'Active',
        role: 'staff',
        primary_phone: null,
        signature: null,
        title: null,
        bio: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip_code: null,
        date_of_birth: null,
        gender: null,
        work_phone: null,
        home_phone: null,
        social_security_number: null,
        imageUrl: user.imageUrl || null,
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProfileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create profile');
      }

      const data = await response.json();
      setState(prev => ({
        ...prev,
        data: data.user,
        originalData: data.user, // Store original data for change detection
        loading: false,
        hasChanges: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      console.error('Error creating profile:', err);
    }
  }, [user?.id, user?.email, user?.firstName, user?.lastName, user?.imageUrl]);

  /**
   * Upload profile image to Cloudinary
   */
  const uploadProfileImage = useCallback(async (file: File): Promise<string> => {
    setState(prev => ({ ...prev, uploadingImage: true, error: null }));
    
    try {
      // Upload to Cloudinary
      const result = await uploadProfileImageToCloudinary(file);
      
      // Save the image URL to the database
      setState(prev => {
        if (prev.data?.id) {
          const updateData = {
            imageUrl: result.url,
            email: prev.data.email, // Include existing email to avoid validation errors
          };

          // Make the API call to update the database
          fetch(`/api/users/${prev.data.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
          })
          .then(response => {
            if (!response.ok) {
              return response.json().then(errorData => {
                throw new Error(errorData.error || 'Failed to update profile image');
              });
            }
            return response.json();
          })
          .then(data => {
            // Update local state with the response
            setState(currentState => ({
              ...currentState,
              data: data.user,
              originalData: data.user,
              uploadingImage: false
            }));
          })
          .catch(error => {
            console.error('Error updating profile image in database:', error);
            setState(currentState => ({
              ...currentState,
              error: error.message,
              uploadingImage: false
            }));
          });
        }
        
        return {
          ...prev,
          uploadingImage: false
        };
      });
      
      return result.url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload image';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage, 
        uploadingImage: false 
      }));
      throw error;
    }
  }, []);

  /**
   * Delete profile image from Cloudinary
   */
  const deleteProfileImage = useCallback(async (publicId: string): Promise<void> => {
    try {
      // Delete from Cloudinary
      await deleteFromCloudinary(publicId);
      
      // Update profile to remove image URL
      setState(prev => {
        if (prev.data?.id) {
          const updateData = {
            imageUrl: null,
            email: prev.data.email, // Include existing email to avoid validation errors
          };

          // Make the API call to update the database
          fetch(`/api/users/${prev.data.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
          })
          .then(response => {
            if (!response.ok) {
              return response.json().then(errorData => {
                throw new Error(errorData.error || 'Failed to remove profile image');
              });
            }
            return response.json();
          })
          .then(data => {
            // Update local state with the response
            setState(currentState => ({
              ...currentState,
              data: data.user,
              originalData: data.user,
            }));
          })
          .catch(error => {
            console.error('Error removing profile image from database:', error);
            setState(currentState => ({
              ...currentState,
              error: error.message,
            }));
          });
        }
        
        return prev;
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete image';
      setState(prev => ({ ...prev, error: errorMessage }));
      console.error('Error deleting profile image:', err);
      throw err;
    }
  }, []);

  /**
   * Update profile data
   */
  const updateProfile = useCallback(
    async (updates: ProfileUpdateRequest, options?: ProfileUpdateOptions) => {
      if (!state.data?.id) {
        const error = 'No profile data available for update';
        setState(prev => ({ ...prev, error }));
        options?.onError?.(error);
        return;
      }

      setState(prev => ({ ...prev, isSaving: true, error: null }));

      try {
        // Include the email field to avoid validation errors (following StaffProfileSection pattern)
        const updateData = {
          ...updates,
          email: state.data.email, // Include existing email
        };

        const response = await fetch(`/api/users/${state.data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update profile');
        }

        const data = await response.json();
        
        setState(prev => ({
          ...prev,
          data: data.user,
          originalData: data.user, // Update original data after successful save
          isSaving: false,
          hasChanges: false,
        }));

        options?.onSuccess?.(data.user);
        console.log('Profile updated successfully');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
        setState(prev => ({
          ...prev,
          error: errorMessage,
          isSaving: false,
        }));
        console.error('Error updating profile:', err);
        options?.onError?.(errorMessage);
      }
    },
    [state.data]
  );

  /**
   * Update a single field in the profile
   */
  const updateField = useCallback(
    (field: keyof ProfileData, value: any) => {
      if (!state.data || !state.originalData) return;

      // Check if the value is actually different from the original
      const originalValue = state.originalData[field];
      const hasChanged = value !== originalValue;

      console.log(`Updating field ${field}:`, { originalValue, newValue: value, hasChanged });

      setState(prev => {
        const newData = prev.data ? { ...prev.data, [field]: value } : null;
        
        // Check if any field has changed from original
        let hasAnyChanges = false;
        if (newData && prev.originalData) {
          Object.keys(newData).forEach((key) => {
            const fieldKey = key as keyof ProfileData;
            if (['id', 'clerkId', 'created_at', 'updated_at', 'status', 'role'].includes(key)) {
              return;
            }
            if (newData[fieldKey] !== prev.originalData![fieldKey]) {
              hasAnyChanges = true;
            }
          });
        }

        return {
          ...prev,
          data: newData,
          hasChanges: hasAnyChanges,
          error: null, // Clear any previous errors when user makes changes
        };
      });
    },
    [state.data, state.originalData]
  );

  /**
   * Save all pending changes
   */
  const saveChanges = useCallback(
    async (options?: ProfileUpdateOptions) => {
      if (!state.hasChanges || !state.data || !state.originalData) return;

      const changes: ProfileUpdateRequest = {};
      const currentData = state.data;
      const originalData = state.originalData;

      // Compare current data with original data to find changed fields
      Object.keys(currentData).forEach((key) => {
        const fieldKey = key as keyof ProfileData;
        const currentValue = currentData[fieldKey];
        const originalValue = originalData[fieldKey];

        // Skip certain fields that shouldn't be updated
        if (['id', 'clerkId', 'created_at', 'updated_at', 'status', 'role'].includes(key)) {
          return;
        }

        // Check if the value has changed
        if (currentValue !== originalValue) {
          console.log(`Field ${fieldKey} changed:`, { originalValue, currentValue });
          (changes as any)[fieldKey] = currentValue;
        }
      });

      // If no changes detected, return early
      if (Object.keys(changes).length === 0) {
        console.log('No changes detected');
        return;
      }

      console.log('Saving changes:', changes);
      await updateProfile(changes, options);
    },
    [state.hasChanges, state.data, state.originalData, updateProfile]
  );

  /**
   * Reset profile data to original state
   */
  const resetProfile = useCallback(() => {
    setState(prev => ({
      ...prev,
      data: prev.originalData, // Reset to original data
      hasChanges: false,
      error: null,
    }));
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  /**
   * Refresh profile data from server
   */
  const refreshProfile = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  /**
   * Deactivate user account by setting status to "Inactive"
   */
  const deactivateAccount = useCallback(async (options?: ProfileUpdateOptions) => {
    if (!state.data?.id) {
      const errorMessage = 'No user ID available for deactivation';
      options?.onError?.(errorMessage);
      return;
    }

    setState(prev => ({ ...prev, isSaving: true, error: null }));

    try {
      const response = await fetch(`/api/users/${state.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'Inactive',
          email: state.data.email, // Include email to satisfy API validation
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to deactivate account');
      }

      const updatedUser = await response.json();
      console.log('Account deactivated successfully:', updatedUser);

      // Update local state
      setState(prev => ({
        ...prev,
        data: updatedUser.user, // Access the user object from the response
        originalData: updatedUser.user, // Access the user object from the response
        isSaving: false,
        hasChanges: false,
      }));

      options?.onSuccess?.(updatedUser.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate account';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isSaving: false,
      }));
      console.error('Error deactivating account:', err);
      options?.onError?.(errorMessage);
    }
  }, [state.data?.id, state.data?.email]);

  // Auto-fetch profile when user changes
  useEffect(() => {
    console.log('useEffect triggered - user?.id:', user?.id);
    if (user?.id) {
      console.log('Fetching profile for user:', user.id);
      fetchProfile();
    }
  }, [user?.id, fetchProfile]);

  return {
    // State
    profile: state.data,
    loading: state.loading,
    error: state.error,
    hasChanges: state.hasChanges,
    isSaving: state.isSaving,
    uploadingImage: state.uploadingImage,

    // Actions
    fetchProfile,
    updateProfile,
    updateField,
    saveChanges,
    resetProfile,
    clearError,
    refreshProfile,
    uploadProfileImage,
    deleteProfileImage,
    deactivateAccount,
  };
}
