import { useState } from 'react';
import { Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createQuote } from '../../../api/quoteApi';
import QuoteForm from '../components/QuoteForm';

const { Title } = Typography;

export default function QuoteCreatePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const payload = { ...values, status: 'DRAFT' };
      const res = await createQuote(payload);
      message.success('Quote created successfully!');
      navigate(`/quotes/${res.data.id}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create quote';
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={3}>Create Quote</Title>
      <QuoteForm onFinish={handleFinish} loading={loading} />
    </div>
  );
}
