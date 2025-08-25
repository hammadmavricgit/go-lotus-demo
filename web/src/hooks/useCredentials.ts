import { useState, useEffect, useCallback } from 'react';
import { Credential } from '@/lib/types/credentials';
import {
  validateCredentials,
  transformBackendCredentialsToCredentials,
} from '@/lib/validation/staff-details';

interface UseCredentialsReturn {
  credentials: Credential[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createCredential: (
    data: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateCredential: (
    credentialId: number,
    data: Partial<Credential>
  ) => Promise<void>;
  deleteCredential: (credentialId: number) => Promise<void>;
}

export function useCredentials(staffId: string): UseCredentialsReturn {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCredentials = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/Credentials?filter=userId||$eq||${staffId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch credentials');
      }

      const data = await response.json();

      // Transform first, then validate
      const transformedCredentials = transformBackendCredentialsToCredentials(
        data.data || []
      );

      // Validate the transformed data
      const validationResult = validateCredentials(transformedCredentials);
      if (!validationResult.success) {
        console.error(
          'useCredentials - Validation failed:',
          validationResult.error
        );
        throw new Error(
          `Data validation failed: ${JSON.stringify(
            validationResult.error.issues
          )}`
        );
      }

      setCredentials(transformedCredentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCredentials([]);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createCredential = useCallback(
    async (data: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);

        const response = await fetch('/api/Credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create credential');
        }

        await fetchCredentials();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchCredentials]
  );

  const updateCredential = useCallback(
    async (credentialId: number, data: Partial<Credential>) => {
      try {
        setError(null);

        const response = await fetch(`/api/Credentials/${credentialId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to update credential');
        }

        await fetchCredentials();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchCredentials]
  );

  const deleteCredential = useCallback(
    async (credentialId: number) => {
      try {
        setError(null);

        const response = await fetch(`/api/Credentials/${credentialId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete credential');
        }

        await fetchCredentials();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchCredentials]
  );

  const refetch = useCallback(async () => {
    await fetchCredentials();
  }, [fetchCredentials]);

  useEffect(() => {
    if (staffId) {
      fetchCredentials();
    }
  }, [staffId, fetchCredentials]);

  return {
    credentials,
    loading,
    error,
    refetch,
    createCredential,
    updateCredential,
    deleteCredential,
  };
}
