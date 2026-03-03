import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuoteStatusTag from '../features/quotes/components/QuoteStatusTag';

describe('QuoteStatusTag', () => {
  it('renders DRAFT status', () => {
    render(<QuoteStatusTag status="DRAFT" />);
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });

  it('renders PENDING_APPROVAL status', () => {
    render(<QuoteStatusTag status="PENDING_APPROVAL" />);
    expect(screen.getByText('Pending Approval')).toBeInTheDocument();
  });

  it('renders APPROVED status', () => {
    render(<QuoteStatusTag status="APPROVED" />);
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('renders REJECTED status', () => {
    render(<QuoteStatusTag status="REJECTED" />);
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  it('renders unknown status as-is', () => {
    render(<QuoteStatusTag status="UNKNOWN" />);
    expect(screen.getByText('UNKNOWN')).toBeInTheDocument();
  });
});
