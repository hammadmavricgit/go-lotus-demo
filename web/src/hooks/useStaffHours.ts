import { useState, useEffect, useCallback } from 'react';
import { StaffHours } from '@/lib/types/staff-hours';
import {
  validateStaffHours,
  transformBackendHoursToStaffHours,
} from '@/lib/validation/staff-details';
import {
  staffHoursCache,
  generateStaffHoursKey,
} from '@/lib/cache/staff-details-cache';

interface UseStaffHoursReturn {
  hours: StaffHours | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createHours: (
    data: Omit<StaffHours, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateHours: (data: Partial<StaffHours>) => Promise<void>;
}

export function useStaffHours(staffId: string): UseStaffHoursReturn {
  const [hours, setHours] = useState<StaffHours | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHours = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cacheKey = generateStaffHoursKey(staffId);
      // Temporarily disable cache for debugging
      // const cachedData = staffHoursCache.get<StaffHours>(cacheKey);
      // if (cachedData) {
      //   setHours(cachedData);
      //   setLoading(false);
      //   return;
      // }

      const response = await fetch(`/api/users/${staffId}?join=staffHour`);

      if (!response.ok) {
        throw new Error('Failed to fetch staff hours');
      }

      const userData = await response.json();

      // Get the staff hours from the user relationship
      // The frontend API wraps the response in a 'user' object
      const user = userData.user || userData;
      if (user.staffHour) {
        const hoursData = user.staffHour;

        // Transform first, then validate the transformed data
        const transformedHours = transformBackendHoursToStaffHours(hoursData);

        // Validate the transformed data
        const validationResult = validateStaffHours(transformedHours);
        if (!validationResult.success) {
          console.error(
            'Staff Hours - Validation failed:',
            validationResult.error
          );
          throw new Error(
            `Data validation failed: ${validationResult.error.message}`
          );
        }

        // Cache the data
        staffHoursCache.set(cacheKey, transformedHours);

        setHours(transformedHours);
      } else {
        setHours(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setHours(null);
      console.error('Error fetching staff hours:', err);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createHours = useCallback(
    async (data: Omit<StaffHours, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);

        // Ensure all required fields have default values
        const completeData = {
          userId: parseInt(staffId),
          expectedHours: data.expectedHours ?? 0,
          maxHours: data.maxHours ?? 0,
          maxOvertimeHours: data.maxOvertimeHours ?? 0,
          supervisedHours: data.supervisedHours ?? 0,
          vacationTimeAlloted: data.vacationTimeAlloted ?? 0,
          sickTimeAlloted: data.sickTimeAlloted ?? 0,
        };

        const response = await fetch('/api/staffHours', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(completeData),
        });

        if (!response.ok) {
          throw new Error('Failed to create staff hours');
        }

        const createdHours = await response.json();

        // Associate the staff hours with the user
        if (createdHours?.id) {
          const userUpdateResponse = await fetch(`/api/users/${staffId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              staffHour: { id: createdHours.id },
            }),
          });

          if (!userUpdateResponse.ok) {
            console.warn('Failed to associate staff hours with user');
          }
        }

        await fetchHours();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchHours]
  );

  const updateHours = useCallback(
    async (data: Partial<StaffHours>) => {
      if (!hours?.id) {
        throw new Error('No hours record to update');
      }

      try {
        setError(null);

        const response = await fetch(`/api/staffHours/${hours.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to update staff hours');
        }

        await fetchHours();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [hours?.id, fetchHours]
  );

  const refetch = useCallback(async () => {
    // Invalidate cache and refetch
    const cacheKey = generateStaffHoursKey(staffId);
    staffHoursCache.delete(cacheKey);
    await fetchHours();
  }, [fetchHours, staffId]);

  useEffect(() => {
    if (staffId) {
      fetchHours();
    }
  }, [staffId, fetchHours]);

  return {
    hours,
    loading,
    error,
    refetch,
    createHours,
    updateHours,
  };
}
