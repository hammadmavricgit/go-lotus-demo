import { useState, useEffect, useCallback } from 'react';
import { SpecialCondition } from '@/lib/types/special-conditions';

interface UseAllSpecialConditionsReturn {
  allConditions: SpecialCondition[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAllSpecialConditions(): UseAllSpecialConditionsReturn {
  const [allConditions, setAllConditions] = useState<SpecialCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllConditions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('useAllSpecialConditions - Fetching all special conditions');

      const response = await fetch('/api/SpecialConditions');

      if (!response.ok) {
        throw new Error('Failed to fetch special conditions');
      }

      const data = await response.json();
      console.log('useAllSpecialConditions - Received data:', data);

      // The response could be in data.data or directly in data
      const conditions = data.data || data || [];
      console.log(
        'useAllSpecialConditions - Processed conditions:',
        conditions
      );

      setAllConditions(conditions);
    } catch (err) {
      console.error('AllSpecialConditions fetch error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setAllConditions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchAllConditions();
  }, [fetchAllConditions]);

  useEffect(() => {
    fetchAllConditions();
  }, [fetchAllConditions]);

  return {
    allConditions,
    loading,
    error,
    refetch,
  };
}
