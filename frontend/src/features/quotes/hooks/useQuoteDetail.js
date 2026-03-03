import { useState, useCallback } from 'react';
import { getQuoteById, sendToApproval, deleteQuote } from '../../../api/quoteApi';

export function useQuoteDetail(id) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalError, setApprovalError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const fetchQuote = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getQuoteById(id);
      setQuote(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const submitToApproval = useCallback(async () => {
    setApprovalLoading(true);
    setApprovalError(null);
    try {
      await sendToApproval(id);
      // API returns void; refetch to get updated status
      const res = await getQuoteById(id);
      setQuote(res.data);
    } catch (err) {
      setApprovalError(err.response?.data?.message || err.message || 'Failed to send to approval');
    } finally {
      setApprovalLoading(false);
    }
  }, [id]);

  const removeQuote = useCallback(async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      await deleteQuote(id);
    } catch (err) {
      setDeleteError(err.response?.data?.message || err.message || 'Failed to delete quote');
      throw err;
    } finally {
      setDeleteLoading(false);
    }
  }, [id]);

  return {
    quote, loading, error, fetchQuote,
    approvalLoading, approvalError, submitToApproval,
    deleteLoading, deleteError, removeQuote,
  };
}
