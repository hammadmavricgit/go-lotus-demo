import { useState, useEffect, useCallback } from 'react';
import { ClinicInformation } from '@/lib/types/clinic-information';
import {
  validateClinicInformation,
  transformBackendClinicInfoToClinicInfo,
} from '@/lib/validation/staff-details';

interface UseClinicInformationReturn {
  clinicInfo: ClinicInformation | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createClinicInfo: (
    data: Omit<ClinicInformation, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateClinicInfo: (data: Partial<ClinicInformation>) => Promise<void>;
}

export function useClinicInformation(
  staffId: string
): UseClinicInformationReturn {
  const [clinicInfo, setClinicInfo] = useState<ClinicInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClinicInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/users/${staffId}?join=clinicInformation`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch clinic information');
      }

      const userData = await response.json();

      // Get the clinic information from the user relationship
      // The frontend API wraps the response in a 'user' object
      const user = userData.user || userData;
      if (user.clinicInformation) {
        const clinicData = user.clinicInformation;

        // Transform first, then validate the transformed data
        const transformedClinicInfo =
          transformBackendClinicInfoToClinicInfo(clinicData);

        // Validate the transformed data
        const validationResult = validateClinicInformation(
          transformedClinicInfo
        );
        if (!validationResult.success) {
          console.error(
            'Clinic Info - Validation failed:',
            validationResult.error
          );
          throw new Error(
            `Data validation failed: ${validationResult.error.message}`
          );
        }

        setClinicInfo(transformedClinicInfo);
      } else {
        setClinicInfo(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setClinicInfo(null);
      console.error('Error fetching clinic information:', err);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createClinicInfo = useCallback(
    async (data: Omit<ClinicInformation, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);

        const response = await fetch('/api/ClinicInformations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create clinic information');
        }

        const createdClinicInfo = await response.json();

        // Associate the clinic information with the user
        if (createdClinicInfo?.id) {
          const userUpdateResponse = await fetch(`/api/users/${staffId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              clinicInformation: { id: createdClinicInfo.id },
            }),
          });

          if (!userUpdateResponse.ok) {
            console.warn('Failed to associate clinic information with user');
          }
        }

        await fetchClinicInfo();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchClinicInfo]
  );

  const updateClinicInfo = useCallback(
    async (data: Partial<ClinicInformation>) => {
      if (!clinicInfo?.id) {
        throw new Error('No clinic information record to update');
      }

      try {
        setError(null);

        const response = await fetch(
          `/api/ClinicInformations/${clinicInfo.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update clinic information');
        }

        await fetchClinicInfo();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [clinicInfo?.id, fetchClinicInfo]
  );

  const refetch = useCallback(async () => {
    await fetchClinicInfo();
  }, [fetchClinicInfo]);

  useEffect(() => {
    if (staffId) {
      fetchClinicInfo();
    }
  }, [staffId, fetchClinicInfo]);

  return {
    clinicInfo,
    loading,
    error,
    refetch,
    createClinicInfo,
    updateClinicInfo,
  };
}
