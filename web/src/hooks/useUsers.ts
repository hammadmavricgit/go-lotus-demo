'use client';

import { useState, useCallback } from 'react';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  clerkId: string;
  status: 'Active' | 'Inactive' | 'Delete';
  role: 'admin' | 'staff';
  created_at: Date;
  updated_at: Date;
}

export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  pageCount: number;
  limit: number;
}

export interface UpdateUserRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: 'admin' | 'staff';
  status?: 'Active' | 'Inactive' | 'Delete';
}

/**
 * Custom hook for user management
 */
export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(20);

  /**
   * Fetch users with filters
   */
  const fetchUsers = useCallback(async (filters: UserFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (filters.page) params.set('page', filters.page.toString());
      if (filters.limit) params.set('limit', filters.limit.toString());
      if (filters.search) params.set('search', filters.search);
      if (filters.role) params.set('role', filters.role);
      if (filters.status) params.set('status', filters.status);

      const response = await fetch(`/api/users?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }

      const data: UserListResponse = await response.json();

      setUsers(data.users);
      setTotal(data.total);
      setPage(data.page);
      setPageCount(data.pageCount);
      setLimit(data.limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get a single user by ID
   */
  const getUser = useCallback(async (id: number): Promise<User | null> => {
    try {
      const response = await fetch(`/api/users/${id}`);

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user');
      }

      const data = await response.json();
      return data.user;
    } catch (err) {
      console.error('Error fetching user:', err);
      throw err;
    }
  }, []);

  /**
   * Update user information
   */
  const updateUser = useCallback(
    async (id: number, updates: UpdateUserRequest): Promise<User> => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update user');
        }

        const data = await response.json();
        return data.user;
      } catch (err) {
        console.error('Error updating user:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Update user role
   */
  const updateUserRole = useCallback(
    async (id: number, role: 'admin' | 'staff'): Promise<User> => {
      try {
        const response = await fetch(`/api/users/${id}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ role }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update user role');
        }

        const data = await response.json();
        return data.user;
      } catch (err) {
        console.error('Error updating user role:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Update user status
   */
  const updateUserStatus = useCallback(
    async (
      id: number,
      status: 'Active' | 'Inactive' | 'Delete'
    ): Promise<User> => {
      try {
        const response = await fetch(`/api/users/${id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update user status');
        }

        const data = await response.json();
        return data.user;
      } catch (err) {
        console.error('Error updating user status:', err);
        throw err;
      }
    },
    []
  );

  /**
   * Delete user
   */
  const deleteUser = useCallback(async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      throw err;
    }
  }, []);

  /**
   * Refresh users list
   */
  const refreshUsers = useCallback(() => {
    fetchUsers({ page, limit });
  }, [fetchUsers, page, limit]);

  return {
    users,
    loading,
    error,
    total,
    page,
    pageCount,
    limit,
    fetchUsers,
    getUser,
    updateUser,
    updateUserRole,
    updateUserStatus,
    deleteUser,
    refreshUsers,
  };
}
