import { describe, it, expect } from 'vitest';
import * as quoteApi from '../api/quoteApi';

describe('quoteApi exports', () => {
  it('exports createQuote', () => {
    expect(typeof quoteApi.createQuote).toBe('function');
  });

  it('exports getQuoteById', () => {
    expect(typeof quoteApi.getQuoteById).toBe('function');
  });

  it('exports updateQuote', () => {
    expect(typeof quoteApi.updateQuote).toBe('function');
  });

  it('exports deleteQuote', () => {
    expect(typeof quoteApi.deleteQuote).toBe('function');
  });

  it('exports sendToApproval', () => {
    expect(typeof quoteApi.sendToApproval).toBe('function');
  });

  it('exports getAllQuotes', () => {
    expect(typeof quoteApi.getAllQuotes).toBe('function');
  });
});
