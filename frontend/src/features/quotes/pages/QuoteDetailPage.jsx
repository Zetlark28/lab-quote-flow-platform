import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Card, Descriptions, Button, Space, Spin, Alert, Popconfirm, message,
} from 'antd';
import { useQuoteDetail } from '../hooks/useQuoteDetail';
import QuoteStatusTag from '../components/QuoteStatusTag';

const { Title } = Typography;

export default function QuoteDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    quote, loading, error,
    fetchQuote, approvalLoading, approvalError, submitToApproval,
    deleteLoading, removeQuote,
  } = useQuoteDetail(id);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const canSendToApproval = quote?.status === 'DRAFT' || quote?.status === 'REJECTED';
  const canEdit = quote?.status === 'DRAFT' || quote?.status === 'REJECTED';

  const handleDelete = async () => {
    try {
      await removeQuote();
      message.success('Quote deleted');
      navigate('/quotes');
    } catch {
      message.error('Failed to delete quote');
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button onClick={() => navigate('/quotes')}>← Back to Quotes</Button>
      </Space>

      <Title level={3}>Quote Detail</Title>

      {loading && <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />}

      {error && !loading && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
      )}

      {quote && !loading && (
        <Card>
          <Descriptions bordered column={{ xs: 1, sm: 1, md: 2 }} style={{ marginBottom: 24 }}>
            <Descriptions.Item label="ID">{quote.id}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <QuoteStatusTag status={quote.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={2}>{quote.description}</Descriptions.Item>
            <Descriptions.Item label="Author">{quote.author}</Descriptions.Item>
            <Descriptions.Item label="Customer Name">{quote.customerName}</Descriptions.Item>
            <Descriptions.Item label="Customer Email">{quote.customerEmail}</Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              {quote.totalAmount != null ? `$${Number(quote.totalAmount).toFixed(2)}` : '—'}
            </Descriptions.Item>
          </Descriptions>

          {approvalError && (
            <Alert type="error" message={approvalError} showIcon style={{ marginBottom: 16 }} />
          )}

          <Space wrap>
            {canSendToApproval && (
              <Button
                type="primary"
                loading={approvalLoading}
                onClick={submitToApproval}
              >
                Send to Approval
              </Button>
            )}
            {canEdit && (
              <Button onClick={() => navigate(`/quotes/${id}/edit`)}>
                Edit
              </Button>
            )}
            <Popconfirm
              title="Delete this quote?"
              description="This action cannot be undone."
              onConfirm={handleDelete}
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Button danger loading={deleteLoading}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </Card>
      )}
    </div>
  );
}
