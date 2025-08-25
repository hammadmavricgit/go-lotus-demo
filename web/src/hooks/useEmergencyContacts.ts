import { useState, useEffect, useCallback } from 'react';
import { EmergencyContact } from '@/lib/types/emergency-contacts';
import {
  validateEmergencyContacts,
  transformBackendEmergencyContactsToEmergencyContacts,
} from '@/lib/validation/staff-details';

interface UseEmergencyContactsReturn {
  emergencyContacts: EmergencyContact[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createEmergencyContact: (
    data: Omit<EmergencyContact, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;
  updateEmergencyContact: (
    id: number,
    data: Partial<EmergencyContact>
  ) => Promise<void>;
  deleteEmergencyContact: (id: number) => Promise<void>;
}

export function useEmergencyContacts(
  staffId: string
): UseEmergencyContactsReturn {
  const [emergencyContacts, setEmergencyContacts] = useState<
    EmergencyContact[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmergencyContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/users/${staffId}?join=emergencyContacts`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch emergency contacts');
      }

      const userData = await response.json();

      // Get the emergency contacts from the user relationship
      // The frontend API wraps the response in a 'user' object
      const user = userData.user || userData;
      if (user.emergencyContacts && Array.isArray(user.emergencyContacts)) {
        const contactsData = user.emergencyContacts;

        // Transform first, then validate
        const transformedContacts =
          transformBackendEmergencyContactsToEmergencyContacts(contactsData);

        // Validate the transformed data
        const validationResult = validateEmergencyContacts(transformedContacts);
        if (!validationResult.success) {
          console.error(
            'useEmergencyContacts - Validation failed:',
            validationResult.error
          );
          throw new Error(
            `Data validation failed: ${JSON.stringify(
              validationResult.error.issues
            )}`
          );
        }

        setEmergencyContacts(transformedContacts);
      } else {
        setEmergencyContacts([]);
      }
    } catch (err) {
      console.error('EmergencyContacts fetch error:', err);
      // Set error so we can see what's wrong
      setError(
        err instanceof Error ? err.message : 'Failed to load emergency contacts'
      );
      setEmergencyContacts([]);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createEmergencyContact = useCallback(
    async (data: Omit<EmergencyContact, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);

        const response = await fetch('/api/EmergencyContacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            userId: parseInt(staffId),
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create emergency contact');
        }

        const newContact = await response.json();

        // Refresh the data to get the updated list
        await fetchEmergencyContacts();
      } catch (err) {
        console.error('Error creating emergency contact:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [staffId, fetchEmergencyContacts]
  );

  const updateEmergencyContact = useCallback(
    async (id: number, data: Partial<EmergencyContact>) => {
      try {
        setError(null);

        const response = await fetch(`/api/EmergencyContacts/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to update emergency contact');
        }

        const updatedContact = await response.json();

        // Refresh the data to get the updated list
        await fetchEmergencyContacts();
      } catch (err) {
        console.error('Error updating emergency contact:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchEmergencyContacts]
  );

  const deleteEmergencyContact = useCallback(
    async (id: number) => {
      try {
        setError(null);

        const response = await fetch(`/api/EmergencyContacts/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete emergency contact');
        }

        // Refresh the data to get the updated list
        await fetchEmergencyContacts();
      } catch (err) {
        console.error('Error deleting emergency contact:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchEmergencyContacts]
  );

  const refetch = useCallback(async () => {
    await fetchEmergencyContacts();
  }, [fetchEmergencyContacts]);

  useEffect(() => {
    if (staffId) {
      fetchEmergencyContacts();
    }
  }, [staffId, fetchEmergencyContacts]);

  return {
    emergencyContacts,
    loading,
    error,
    refetch,
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
  };
}
