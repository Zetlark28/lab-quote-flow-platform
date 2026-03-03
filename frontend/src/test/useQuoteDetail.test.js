import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuoteDetail } from '../features/quotes/hooks/useQuoteDetail';
import * as quoteApi from '../api/quoteApi';

vi.mock('../api/quoteApi');

describe('useQuoteDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchQuote loads quote data', async () => {
    quoteApi.getQuoteById.mockResolvedValue({ data: { id: 1, status: 'DRAFT' } });
    const { result } = renderHook(() => useQuoteDetail(1));
    await act(() => result.current.fetchQuote());
    expect(result.current.quote).toEqual({ id: 1, status: 'DRAFT' });
    expect(result.current.loading).toBe(false);
  });

  it('fetchQuote sets error on failure', async () => {
    quoteApi.getQuoteById.mockRejectedValue({ message: 'Not found' });
    const { result } = renderHook(() => useQuoteDetail(99));
    await act(() => result.current.fetchQuote());
    expect(result.current.error).toBe('Not found');
  });

  it('submitToApproval calls sendToApproval and refetches', async () => {
    quoteApi.sendToApproval.mockResolvedValue({});
    quoteApi.getQuoteById.mockResolvedValue({ data: { id: 1, status: 'PENDING_APPROVAL' } });
    const { result } = renderHook(() => useQuoteDetail(1));
    await act(() => result.current.submitToApproval());
    expect(quoteApi.sendToApproval).toHaveBeenCalledWith(1);
    expect(result.current.quote?.status).toBe('PENDING_APPROVAL');
  });

  it('submitToApproval sets approvalError on failure', async () => {
    quoteApi.sendToApproval.mockRejectedValue({ message: 'Already sent' });
    const { result } = renderHook(() => useQuoteDetail(1));
    await act(() => result.current.submitToApproval());
    expect(result.current.approvalError).toBe('Already sent');
  });

  it('removeQuote calls deleteQuote', async () => {
    quoteApi.deleteQuote.mockResolvedValue({});
    const { result } = renderHook(() => useQuoteDetail(1));
    await act(() => result.current.removeQuote());
    expect(quoteApi.deleteQuote).toHaveBeenCalledWith(1);
  });

  it('removeQuote sets deleteError and rethrows on failure', async () => {
    const err = { message: 'Forbidden' };
    quoteApi.deleteQuote.mockRejectedValue(err);
    const { result } = renderHook(() => useQuoteDetail(1));
    let threw = false;
    await act(async () => {
      try {
        await result.current.removeQuote();
      } catch {
        threw = true;
      }
    });
    expect(threw).toBe(true);
    expect(result.current.deleteError).toBe('Forbidden');
  });
});
