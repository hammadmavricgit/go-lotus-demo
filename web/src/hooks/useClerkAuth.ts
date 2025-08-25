'use client';

import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { useCallback, useEffect } from 'react';

// Ensure user sync runs only once per user per session across all consumers of this hook
const syncedUserIds = new Set<string>();

/**
 * Custom Clerk Authentication Hook
 * Provides authentication state and user management functionality
 */
export function useAuth() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerkAuth();

  /**
   * Sync user data to backend when user signs in
   */
  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user?.id) return;

    const userId = user.id;
    if (syncedUserIds.has(userId)) return;

    // mark as synced immediately to prevent duplicate calls across multiple components/effects
    syncedUserIds.add(userId);

    const syncUserData = async () => {
      try {
        const response = await fetch('/api/users/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress || '',
            firstName: (user.publicMetadata as any)?.firstName || '',
            lastName: (user.publicMetadata as any)?.lastName || '',
            fullName: user.fullName || '',
            imageUrl: user.imageUrl || '',
          }),
        });

        if (response.ok) {
          console.log('User data synced to backend successfully');
        } else {
          console.error('Failed to sync user data to backend');
        }
      } catch (error) {
        console.error('Error syncing user data to backend:', error);
        // Don't throw error to avoid breaking the auth flow
      }
    };

    syncUserData();
  }, [isLoaded, isSignedIn, user?.id]);

  /**
   * Get current user data
   */
  const getCurrentUser = useCallback(() => {
    if (!isLoaded || !isSignedIn || !user) {
      return null;
    }

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.publicMetadata.firstName || '',
      lastName: user.publicMetadata.lastName || '',
      clerkId: user.id,
      fullName: user.fullName || '',
      imageUrl: user.imageUrl || '',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }, [isLoaded, isSignedIn, user]);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useCallback(() => {
    return isLoaded && isSignedIn && !!user;
  }, [isLoaded, isSignedIn, user]);

  /**
   * Check if user is loading
   */
  const isLoading = useCallback(() => {
    return !isLoaded;
  }, [isLoaded]);

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
   * Get user role from backend
   */
  const getUserRole = useCallback(async () => {
    if (!user) return 'staff';

    try {
      const response = await fetch(`/api/users/${user.id}/role`);
      if (response.ok) {
        const data = await response.json();
        return data.role || 'staff';
      }
      return 'staff';
    } catch (error) {
      console.error('Error getting user role from backend:', error);
      return 'staff';
    }
  }, [user]);

  /**
   * Check if user has specific role
   */
  const hasRole = useCallback(
    async (role: string) => {
      const userRole = await getUserRole();
      return userRole === role;
    },
    [getUserRole]
  );

  /**
   * Check if user is admin
   */
  const isAdmin = useCallback(async () => {
    return await hasRole('admin');
  }, [hasRole]);

  /**
   * Check if user is staff
   */
  const isStaff = useCallback(async () => {
    return await hasRole('staff');
  }, [hasRole]);

  /**
   * Update user role in backend
   */
  const updateUserRole = useCallback(
    async (role: 'admin' | 'staff') => {
      if (!user) throw new Error('No user authenticated');

      try {
        const response = await fetch(`/api/users/${user.id}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user role');
        }
      } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
      }
    },
    [user]
  );

  /**
   * Update user status in backend
   */
  const updateUserStatus = useCallback(
    async (status: 'Active' | 'Inactive' | 'Delete') => {
      if (!user) throw new Error('No user authenticated');

      try {
        const response = await fetch(`/api/users/${user.id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          throw new Error('Failed to update user status');
        }
      } catch (error) {
        console.error('Error updating user status:', error);
        throw error;
      }
    },
    [user]
  );

  return {
    // User data
    user: getCurrentUser(),
    isAuthenticated: isLoaded && isSignedIn && !!user,
    isLoading: !isLoaded,

    // Authentication actions
    logout,

    // Role-based access control (async)
    getUserRole,
    hasRole,
    isAdmin,
    isStaff,

    // User management
    updateUserRole,
    updateUserStatus,

    clerkUser: user,
    isSignedIn,
    isLoaded,
  };
}
