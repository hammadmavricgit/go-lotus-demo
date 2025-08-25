import { useState, useEffect, useCallback } from 'react';
import {
  SpecialCondition,
  StaffSpecialCondition,
} from '@/lib/types/special-conditions';
import {
  validateSpecialConditions,
  transformBackendSpecialConditionsToSpecialConditions,
} from '@/lib/validation/staff-details';

interface UseSpecialConditionsReturn {
  specialConditions: StaffSpecialCondition[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addSpecialCondition: (condition: string) => Promise<void>;
  removeSpecialCondition: (conditionId: number) => Promise<void>;
  createSpecialCondition: (data: {
    condition: string;
  }) => Promise<SpecialCondition>;
}

export function useSpecialConditions(
  staffId: string
): UseSpecialConditionsReturn {
  const [specialConditions, setSpecialConditions] = useState<
    StaffSpecialCondition[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSpecialConditions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch special conditions via User entity with join
      const response = await fetch(
        `/api/users/${staffId}?join=specialConditions`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      const user = userData.user || userData;

      // Get the special conditions from the user relationship
      if (user.specialConditions && Array.isArray(user.specialConditions)) {
        const conditionsData = user.specialConditions;

        // Check if the data is in the format we expect (with junction table) or direct conditions
        if (conditionsData.length > 0) {
          // Check the structure of the first item to determine the format
          const firstItem = conditionsData[0];

          let transformedConditions;

          if (firstItem.specialCondition) {
            // Junction table format - use existing transformation
            transformedConditions =
              transformBackendSpecialConditionsToSpecialConditions(
                conditionsData
              );
          } else {
            // Direct conditions format - create the expected structure
            transformedConditions = conditionsData.map((condition: SpecialCondition, index: number) => ({
              id: index + 1, // Temporary ID for the junction
              userId: parseInt(staffId),
              specialConditionId: condition.id,
              specialCondition: {
                id: condition.id,
                condition: condition.condition,
                createdAt: condition.createdAt,
                updatedAt: condition.updatedAt,
              },
              createdAt: new Date().toISOString(), // Temporary creation date
              updatedAt: new Date().toISOString(),
            }));
          }

          // Validate the transformed data
          const validationResult = validateSpecialConditions(
            transformedConditions
          );
          if (!validationResult.success) {
            console.error(
              'useSpecialConditions - Validation failed:',
              validationResult.error
            );
            // Still set the data even if validation fails due to structure differences
            setSpecialConditions(transformedConditions);
          } else {
            setSpecialConditions(transformedConditions);
          }
        } else {
          setSpecialConditions([]);
        }
      } else {
        setSpecialConditions([]);
      }
    } catch (err) {
      console.error('SpecialConditions fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSpecialConditions([]);
    } finally {
      setLoading(false);
    }
  }, [staffId]);

  const createSpecialCondition = useCallback(
    async (data: { condition: string }) => {
      try {
        setError(null);

        const response = await fetch('/api/SpecialConditions', {
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
          throw new Error('Failed to create special condition');
        }

        const newCondition = await response.json();
        return newCondition;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [staffId]
  );

  const addSpecialCondition = useCallback(
    async (condition: string) => {
      try {
        // First create the special condition
        const newCondition = await createSpecialCondition({ condition });

        // Then associate it with the user by updating the user's specialConditions array
        const currentConditionIds = specialConditions.map(
          (sc) => sc.specialCondition.id
        );
        const updatedConditionIds = [...currentConditionIds, newCondition.id];

        const userUpdateResponse = await fetch(`/api/users/${staffId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            specialConditions: updatedConditionIds.map((id) => ({ id })),
          }),
        });

        if (!userUpdateResponse.ok) {
          throw new Error('Failed to associate special condition with user');
        }

        await fetchSpecialConditions();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [createSpecialCondition, fetchSpecialConditions, staffId, specialConditions]
  );

  const removeSpecialCondition = useCallback(
    async (conditionId: number) => {
      try {
        setError(null);

        // Remove the association from the user's specialConditions array
        const currentConditionIds = specialConditions.map(
          (sc) => sc.specialCondition.id
        );
        const updatedConditionIds = currentConditionIds.filter(
          (id) => id !== conditionId
        );

        const userUpdateResponse = await fetch(`/api/users/${staffId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            specialConditions: updatedConditionIds.map((id) => ({ id })),
          }),
        });

        if (!userUpdateResponse.ok) {
          throw new Error(
            'Failed to remove special condition association from user'
          );
        }

        await fetchSpecialConditions();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        throw err;
      }
    },
    [fetchSpecialConditions, staffId, specialConditions]
  );

  const refetch = useCallback(async () => {
    await fetchSpecialConditions();
  }, [fetchSpecialConditions]);

  useEffect(() => {
    if (staffId) {
      fetchSpecialConditions();
    }
  }, [staffId, fetchSpecialConditions]);

  return {
    specialConditions,
    loading,
    error,
    refetch,
    addSpecialCondition,
    removeSpecialCondition,
    createSpecialCondition,
  };
}
