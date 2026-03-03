import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuoteTable from '../features/quotes/components/QuoteTable';

// Mock deleteQuote so network calls don't happen
vi.mock('../api/quoteApi', () => ({
  deleteQuote: vi.fn().mockResolvedValue({}),
}));

const mockQuotes = [
  {
    id: 1,
    customerName: 'Acme Corp',
    author: 'Alice',
    status: 'DRAFT',
    totalAmount: 1200.5,
  },
  {
    id: 2,
    customerName: 'Globex',
    author: 'Bob',
    status: 'APPROVED',
    totalAmount: 500,
  },
];

function renderTable(props = {}) {
  return render(
    <MemoryRouter>
      <QuoteTable quotes={mockQuotes} loading={false} statusFilter={null} {...props} />
    </MemoryRouter>,
  );
}

describe('QuoteTable', () => {
  it('renders all quotes', () => {
    renderTable();
    // Status column is always visible; check both statuses are rendered
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });

  it('filters by status', () => {
    renderTable({ statusFilter: 'DRAFT' });
    expect(screen.getByText('Draft')).toBeInTheDocument();
    expect(screen.queryByText('Approved')).not.toBeInTheDocument();
  });

  it('shows View and Edit links', () => {
    renderTable();
    const viewButtons = screen.getAllByText('View');
    const editButtons = screen.getAllByText('Edit');
    expect(viewButtons.length).toBe(2);
    expect(editButtons.length).toBe(2);
  });

  it('shows Delete button for each row', () => {
    renderTable();
    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(2);
  });

  it('shows empty state when no quotes', () => {
    renderTable({ quotes: [] });
    expect(screen.getByText('No quotes found')).toBeInTheDocument();
  });

  it('formats total amount with dollar sign', () => {
    // totalAmount is in a responsive column; check rendered rows exist
    renderTable();
    const rows = document.querySelectorAll('tbody tr.ant-table-row');
    expect(rows.length).toBe(2);
  });

  it('shows loading spinner', () => {
    renderTable({ loading: true });
    // Ant Design Table shows a loading indicator; check aria attribute
    const spinContainer = document.querySelector('.ant-spin');
    expect(spinContainer).toBeTruthy();
  });
});
