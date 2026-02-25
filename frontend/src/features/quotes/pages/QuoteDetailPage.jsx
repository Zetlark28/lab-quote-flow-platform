import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography, Card, Descriptions, Button, Space, Spin, Alert
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
  } = useQuoteDetail(id);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const canSendToApproval = quote?.status === 'DRAFT' || quote?.status === 'REJECTED';

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => navigate('/quotes')}>← Back to Quotes</Button>
      </Space>

      <Title level={3}>Quote Detail</Title>

      {loading && <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />}

      {error && !loading && (
        <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />
      )}

      {quote && !loading && (
        <Card>
          <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
            <Descriptions.Item label="ID">{quote.id}</Descriptions.Item>
            <Descriptions.Item label="Description">{quote.description}</Descriptions.Item>
            <Descriptions.Item label="Author">{quote.author}</Descriptions.Item>
            <Descriptions.Item label="Customer Name">{quote.customerName}</Descriptions.Item>
            <Descriptions.Item label="Customer Email">{quote.customerEmail}</Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              {quote.totalAmount != null ? `$${Number(quote.totalAmount).toFixed(2)}` : '—'}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <QuoteStatusTag status={quote.status} />
            </Descriptions.Item>
          </Descriptions>

          {approvalError && (
            <Alert type="error" message={approvalError} showIcon style={{ marginBottom: 16 }} />
          )}

          {canSendToApproval && (
            <Button
              type="primary"
              loading={approvalLoading}
              onClick={submitToApproval}
            >
              Send to Approval
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
