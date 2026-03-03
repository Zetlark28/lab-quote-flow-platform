import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuoteList } from '../features/quotes/hooks/useQuoteList';
import * as quoteApi from '../api/quoteApi';

vi.mock('../api/quoteApi');

describe('useQuoteList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchAll sets quotes from content array', async () => {
    quoteApi.getAllQuotes.mockResolvedValue({
      data: { content: [{ id: 1 }, { id: 2 }], totalElements: 2 },
    });
    const { result } = renderHook(() => useQuoteList());
    await act(() => result.current.fetchAll());
    expect(result.current.quotes).toHaveLength(2);
    expect(result.current.pagination.total).toBe(2);
  });

  it('fetchAll handles plain array response', async () => {
    quoteApi.getAllQuotes.mockResolvedValue({ data: [{ id: 1 }] });
    const { result } = renderHook(() => useQuoteList());
    await act(() => result.current.fetchAll());
    expect(result.current.quotes).toHaveLength(1);
  });

  it('fetchAll sets error on failure', async () => {
    quoteApi.getAllQuotes.mockRejectedValue({ message: 'Network Error' });
    const { result } = renderHook(() => useQuoteList());
    await act(() => result.current.fetchAll());
    expect(result.current.error).toBe('Network Error');
    expect(result.current.quotes).toHaveLength(0);
  });

  it('fetchById sets a single quote', async () => {
    quoteApi.getQuoteById.mockResolvedValue({ data: { id: 5 } });
    const { result } = renderHook(() => useQuoteList());
    await act(() => result.current.fetchById(5));
    expect(result.current.quotes).toEqual([{ id: 5 }]);
  });

  it('fetchById sets error on failure', async () => {
    quoteApi.getQuoteById.mockRejectedValue({
      response: { data: { message: 'Not found' } },
    });
    const { result } = renderHook(() => useQuoteList());
    await act(() => result.current.fetchById(99));
    expect(result.current.error).toBe('Not found');
  });
});
