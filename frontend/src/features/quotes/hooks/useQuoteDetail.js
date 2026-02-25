import { useState, useCallback } from 'react';
import { getQuoteById, sendToApproval } from '../../../api/quoteApi';

export function useQuoteDetail(id) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [approvalLoading, setApprovalLoading] = useState(false);
  const [approvalError, setApprovalError] = useState(null);

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
      const res = await sendToApproval(id);
      setQuote(res.data);
    } catch (err) {
      setApprovalError(err.response?.data?.message || err.message || 'Failed to send to approval');
    } finally {
      setApprovalLoading(false);
    }
  }, [id]);

  return { quote, loading, error, fetchQuote, approvalLoading, approvalError, submitToApproval };
}
