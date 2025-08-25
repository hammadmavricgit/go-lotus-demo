import { useState, useEffect, useCallback } from 'react';
import { Staff } from '@/lib/types/staff';
import {
  validateStaffProfile,
  transformBackendUserToStaff,
} from '@/lib/validation/staff-details';
import {
  staffProfileCache,
  generateStaffProfileKey,
  invalidateStaffData,
} from '@/lib/cache/staff-details-cache';

interface UseStaffDetailsReturn {
  staff: Staff | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStaffDetails(staffId: string): UseStaffDetailsReturn {
  const [staff, setStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = generateStaffProfileKey(staffId);
      const cachedData = staffProfileCache.get<Staff>(cacheKey);

      if (cachedData) {
        setStaff(cachedData);
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/users/${staffId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Staff member not found');
        }
        throw new Error('Failed to fetch staff details');
      }

      const data = await response.json();

      // Transform the data first - API returns { user: userData }
      const staffData = transformBackendUserToStaff(data.user);

      // Then validate the transformed data
      const validationResult = validateStaffProfile(staffData);
      if (!validationResult.success) {
        throw new Error(
          `Data validation failed: ${validationResult.error.message}`
        );
      }

      // Cache the data
      staffProfileCache.set(cacheKey, staffData);

      setStaff(staffData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStaff(null);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const refetch = useCallback(async () => {
    // Invalidate cache and refetch
    const cacheKey = generateStaffProfileKey(staffId);
    staffProfileCache.delete(cacheKey);
    await fetchStaff();
  }, [fetchStaff, staffId]);

  useEffect(() => {
    if (staffId) {
      fetchStaff();
    }
  }, [staffId, fetchStaff]);

  return {
    staff,
    loading,
    error,
    refetch,
  };
}
