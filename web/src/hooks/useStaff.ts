import { useState, useEffect, useCallback } from 'react';
import {
  Staff,
  StaffListResponse,
  StaffFilters,
  StaffCreate,
} from '@/lib/types/staff';

interface UseStaffReturn {
  staff: Staff[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pageCount: number;
  fetchStaff: (filters?: StaffFilters) => Promise<void>;
  createStaff: (staffData: StaffCreate) => Promise<Staff | null>;
  createBulkStaff: (staffData: StaffCreate[]) => Promise<Staff[] | null>;
  refreshStaff: () => Promise<void>;
}

export function useStaff(): UseStaffReturn {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchStaff = useCallback(async (filters: StaffFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (filters.page) params.set('page', filters.page.toString());
      if (filters.limit) params.set('limit', filters.limit.toString());
      if (filters.search) params.set('search', filters.search);
      if (filters.status) {
        const backendStatus =
          filters.status === 'Current' ? 'Active' : 'Inactive';
        params.set('status', backendStatus);
      }

      // Always filter by role=staff
      params.set('role', 'staff');

      const url = `/api/users?${params.toString()}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch staff: ${response.statusText}`);
      }

      const data = await response.json();

      // Transform users to staff format
      const transformedStaff = (data.users || []).map((user: any) => ({
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        status: user.status === 'Active' ? 'Current' : 'Archived',
        role: user.role || 'staff',
        primaryPhone:
          user.phone || user.mobilePhone || user.primaryPhone || null,
        signature: user.signature || null,
        title: user.title || null,
        bio: user.bio || null,
        address1: user.address1 || null,
        address2: user.address2 || null,
        city: user.city || null,
        state: user.state || null,
        zipCode: user.zipCode || null,
        dateOfBirth: user.dateOfBirth || null,
        gender: user.gender || null,
        workPhone: user.workPhone || null,
        homePhone: user.homePhone || null,
        socialSecurityNumber: user.socialSecurityNumber || null,
      }));

      setStaff(transformedStaff);
      setTotal(data.total);
      setPage(data.page);
      setPageCount(data.pageCount);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch staff data';
      setError(errorMessage);
      console.error('Error fetching staff:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStaff = useCallback(
    async (staffData: StaffCreate): Promise<Staff | null> => {
      setLoading(true);
      setError(null);

      try {
        // Transform staff data to user format
        const userData = {
          email: staffData.email,
          firstName: staffData.firstName,
          lastName: staffData.lastName,
          role: 'staff',
          status: staffData.status === 'Current' ? 'Active' : 'Inactive',
          title: staffData.title,
          phone: staffData.primaryPhone,
        };

        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error(`Failed to create staff: ${response.statusText}`);
        }

        const newUser = await response.json();

        // Transform user back to staff format
        const newStaff: Staff = {
          id: newUser.id,
          firstName: newUser.firstName || '',
          lastName: newUser.lastName || '',
          email: newUser.email || '',
          status: newUser.status === 'Active' ? 'Current' : 'Archived',
          role: newUser.role || 'staff',
          primaryPhone:
            newUser.phone ||
            newUser.mobilePhone ||
            newUser.primaryPhone ||
            null,
          signature: newUser.signature || null,
          title: newUser.title || null,
          bio: newUser.bio || null,
          address1: newUser.address1 || null,
          address2: newUser.address2 || null,
          city: newUser.city || null,
          state: newUser.state || null,
          zipCode: newUser.zipCode || null,
          dateOfBirth: newUser.dateOfBirth || null,
          gender: newUser.gender || null,
          workPhone: newUser.workPhone || null,
          homePhone: newUser.homePhone || null,
          socialSecurityNumber: newUser.socialSecurityNumber || null,
        };

        // Refresh the staff list to include the new member
        await fetchStaff();

        return newStaff;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create staff member';
        setError(errorMessage);
        console.error('Error creating staff:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchStaff]
  );

  const createBulkStaff = useCallback(
    async (staffData: StaffCreate[]): Promise<Staff[] | null> => {
      setLoading(true);
      setError(null);

      try {
        // Create staff members one by one since we don't have a bulk endpoint
        const createdStaff: Staff[] = [];

        for (const staff of staffData) {
          // Transform staff data to user format
          const userData = {
            email: staff.email,
            firstName: staff.firstName,
            lastName: staff.lastName,
            role: 'staff',
            status: staff.status === 'Current' ? 'Active' : 'Inactive',
            title: staff.title,
            phone: staff.primaryPhone,
          };

          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            throw new Error(
              `Failed to create staff member: ${response.statusText}`
            );
          }

          const newUser = await response.json();

          // Transform user back to staff format
          const newStaff: Staff = {
            id: newUser.id,
            firstName: newUser.firstName || '',
            lastName: newUser.lastName || '',
            email: newUser.email || '',
            status: newUser.status === 'Active' ? 'Current' : 'Archived',
            role: newUser.role || 'staff',
            primaryPhone:
              newUser.phone ||
              newUser.mobilePhone ||
              newUser.primaryPhone ||
              null,
            signature: newUser.signature || null,
            title: newUser.title || null,
            bio: newUser.bio || null,
            address1: newUser.address1 || null,
            address2: newUser.address2 || null,
            city: newUser.city || null,
            state: newUser.state || null,
            zipCode: newUser.zipCode || null,
            dateOfBirth: newUser.dateOfBirth || null,
            gender: newUser.gender || null,
            workPhone: newUser.workPhone || null,
            homePhone: newUser.homePhone || null,
            socialSecurityNumber: newUser.socialSecurityNumber || null,
          };

          createdStaff.push(newStaff);
        }

        // Refresh the staff list to include the new members
        await fetchStaff();

        return createdStaff;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to create staff members';
        setError(errorMessage);
        console.error('Error creating staff members:', err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [fetchStaff]
  );

  const refreshStaff = useCallback(async () => {
    await fetchStaff();
  }, [fetchStaff]);

  // Initial fetch on mount
  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return {
    staff,
    loading,
    error,
    total,
    page,
    pageCount,
    fetchStaff,
    createStaff,
    createBulkStaff,
    refreshStaff,
  };
}
