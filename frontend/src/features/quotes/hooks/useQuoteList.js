import { useState, useCallback } from 'react';
import { getQuoteById, getAllQuotes } from '../../../api/quoteApi';

export function useQuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getQuoteById(id);
      setQuotes([res.data]);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch quote');
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllQuotes();
      setQuotes(res.data || []);
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { quotes, loading, error, fetchById, fetchAll };
}
