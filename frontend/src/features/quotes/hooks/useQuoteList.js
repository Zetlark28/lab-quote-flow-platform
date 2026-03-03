import { useState, useCallback } from 'react';
import { getAllQuotes, getQuoteById } from '../../../api/quoteApi';

export function useQuoteList() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 0, size: 10, total: 0 });

  const fetchAll = useCallback(async (page = 0, size = 10) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllQuotes({ page, size });
      const data = res.data;
      // Paginated response has `.content`; plain-array fallback for non-paginated backends
      setQuotes(data?.content || data || []);
      setPagination((prev) => ({
        ...prev,
        page,
        size,
        total: data?.totalElements ?? (Array.isArray(data) ? data.length : 0),
      }));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch quotes');
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

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

  return { quotes, loading, error, fetchById, fetchAll, pagination };
}
