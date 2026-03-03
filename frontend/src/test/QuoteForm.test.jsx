import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuoteForm from '../features/quotes/components/QuoteForm';

describe('QuoteForm', () => {
  it('renders all fields', () => {
    render(<QuoteForm onFinish={vi.fn()} loading={false} />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customer name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/customer email/i)).toBeInTheDocument();
  });

  it('shows default submit label "Create Quote"', () => {
    render(<QuoteForm onFinish={vi.fn()} loading={false} />);
    expect(screen.getByRole('button', { name: /create quote/i })).toBeInTheDocument();
  });

  it('shows custom submit label', () => {
    render(<QuoteForm onFinish={vi.fn()} loading={false} submitLabel="Save Changes" />);
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  it('shows Cancel button when onCancel is provided', () => {
    render(<QuoteForm onFinish={vi.fn()} loading={false} onCancel={vi.fn()} />);
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('does not show Cancel button when onCancel is not provided', () => {
    render(<QuoteForm onFinish={vi.fn()} loading={false} />);
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  it('populates initialValues', () => {
    const initial = { description: 'Test Desc', author: 'Alice', customerName: 'Acme' };
    render(<QuoteForm onFinish={vi.fn()} loading={false} initialValues={initial} />);
    expect(screen.getByDisplayValue('Test Desc')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Acme')).toBeInTheDocument();
  });

  it('shows loading state on submit button', () => {
    render(<QuoteForm onFinish={vi.fn()} loading={true} />);
    const submitBtn = screen.getByRole('button', { name: /create quote/i });
    // Ant Design loading button has ant-btn-loading class
    expect(submitBtn.className).toContain('ant-btn-loading');
  });

  it('calls onFinish with form values on submit', async () => {
    const onFinish = vi.fn();
    render(
      <QuoteForm
        onFinish={onFinish}
        loading={false}
        initialValues={{ description: 'A desc', author: 'Bob' }}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: /create quote/i }));
    await waitFor(() => {
      expect(onFinish).toHaveBeenCalledWith(
        expect.objectContaining({ description: 'A desc', author: 'Bob' }),
      );
    });
  });
});
