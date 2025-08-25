'use client';

import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { useCallback, useEffect, useState } from 'react';

export interface EnhancedUser {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  clerkId: string;
  fullName: string;
  imageUrl: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  role: 'admin' | 'staff';
  status: 'Active' | 'Inactive' | 'Delete';
}

/**
 * Enhanced Clerk Authentication Hook with Backend User Data
 * Provides authentication state and user management functionality with role and status
 */
export function useEnhancedAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerkAuth();
  const [enhancedUser, setEnhancedUser] = useState<EnhancedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch complete user data from backend
   */
  const fetchUserData = useCallback(async () => {
    if (!isLoaded || !isSignedIn || !user) {
      setEnhancedUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // First, check if user exists in backend and get current data
      const response = await fetch(
        `/api/users?filter=clerkId||eq||${user.id}`
      );

      if (response.ok) {
        const data = await response.json();
        const backendUser = data.users?.[0];

        if (backendUser) {
          // User exists in backend - check if we need to sync missing name fields
          const needsFirstNameUpdate = 
            !backendUser.firstName || backendUser.firstName.trim() === '';
          const needsLastNameUpdate = 
            !backendUser.lastName || backendUser.lastName.trim() === '';

          // Only sync if we have missing name fields and Clerk has them
          const hasFirstNameFromClerk = (user.publicMetadata as any)?.firstName;
          const hasLastNameFromClerk = (user.publicMetadata as any)?.lastName;

          if ((needsFirstNameUpdate && hasFirstNameFromClerk) || 
              (needsLastNameUpdate && hasLastNameFromClerk)) {
            
            console.log('Syncing missing name fields for existing user');
            const syncResponse = await fetch('/api/users/sync', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                clerkId: user.id,
                email: user.emailAddresses[0]?.emailAddress || '',
                firstName: hasFirstNameFromClerk || '',
                lastName: hasLastNameFromClerk || '',
                imageUrl: user.imageUrl || '',
              }),
            });

            if (!syncResponse.ok) {
              console.warn('Failed to sync missing name fields');
            }
          } else {
            console.log('No name updates needed for existing user; skipping sync');
          }

          // Set enhanced user with backend data
          setEnhancedUser({
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            firstName: backendUser.firstName || null,
            lastName: backendUser.lastName || null,
            clerkId: user.id,
            fullName: user.fullName || '',
            imageUrl: user.imageUrl || '',
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: backendUser.role || 'staff',
            status: backendUser.status || 'Active',
          });
        } else {
          // User doesn't exist in backend - create new user
          console.log('Creating new user in backend');
          const syncResponse = await fetch('/api/users/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clerkId: user.id,
              email: user.emailAddresses[0]?.emailAddress || '',
              firstName: (user.publicMetadata as any)?.firstName || '',
              lastName: (user.publicMetadata as any)?.lastName || '',
              imageUrl: user.imageUrl || '',
            }),
          });

          if (syncResponse.ok) {
            // Fetch the newly created user data
            const newUserResponse = await fetch(
              `/api/users?filter=clerkId||eq||${user.id}`
            );
            
            if (newUserResponse.ok) {
              const newUserData = await newUserResponse.json();
              const newBackendUser = newUserData.users?.[0];
              
              if (newBackendUser) {
                setEnhancedUser({
                  id: user.id,
                  email: user.emailAddresses[0]?.emailAddress || '',
                  firstName: newBackendUser.firstName || null,
                  lastName: newBackendUser.lastName || null,
                  clerkId: user.id,
                  fullName: user.fullName || '',
                  imageUrl: user.imageUrl || '',
                  createdAt: user.createdAt,
                  updatedAt: user.updatedAt,
                  role: newBackendUser.role || 'staff',
                  status: newBackendUser.status || 'Active',
                });
              }
            }
          } else {
            throw new Error(`Failed to create user in backend: ${syncResponse.statusText}`);
          }
        }
      } else {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to basic user data
      setEnhancedUser({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || '',
        firstName: (user.publicMetadata as any)?.firstName || null,
        lastName: (user.publicMetadata as any)?.lastName || null,
        clerkId: user.id,
        fullName: user.fullName || '',
        imageUrl: user.imageUrl || '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        role: 'staff',
        status: 'Active',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  // Fetch user data when auth state changes
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  /**
   * Get current user data
   */
  const getCurrentUser = useCallback(() => {
    return enhancedUser;
  }, [enhancedUser]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useCallback(() => {
    return isLoaded && isSignedIn && !!user && !!enhancedUser;
  }, [isLoaded, isSignedIn, user, enhancedUser]);

  /**
   * Check if user is loading
   */
  const isLoadingAuth = useCallback(() => {
    return !isLoaded || isLoading;
  }, [isLoaded, isLoading]);

  /**
   * Sign out user
   */
  const logout = useCallback(async () => {
    try {
      await signOut({ redirectUrl: '/auth' });
      // Force redirect to auth page
      window.location.href = '/auth';
    } catch (error) {
      console.error('Error signing out:', error);
      // Fallback redirect
      window.location.href = '/auth';
    }
  }, [signOut]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    (role: string) => {
      return enhancedUser?.role === role;
    },
    [enhancedUser]
  );

  /**
   * Check if user is admin
   */
  const isAdmin = useCallback(() => {
    return enhancedUser?.role === 'admin';
  }, [enhancedUser]);

  /**
   * Check if user is staff
   */
  const isStaff = useCallback(() => {
    return enhancedUser?.role === 'staff';
  }, [enhancedUser]);

  /**
   * Refresh user data
   */
  const refreshUserData = useCallback(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    user: enhancedUser,
    loading: isLoadingAuth(),
    isAuthenticated: isAuthenticated(),
    getCurrentUser,
    logout,
    hasRole,
    isAdmin,
    isStaff,
    refreshUserData,
  };
}
