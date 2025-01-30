import { useState } from 'react';
import apiClient from '../api';

export function useCompetition() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCompetition = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getCurrentCompetition();
      setLoading(false);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      setLoading(false);
    }
  };

  return { fetchCompetition, loading, error };
}