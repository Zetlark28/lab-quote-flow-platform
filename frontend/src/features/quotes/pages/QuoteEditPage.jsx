import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Spin, Alert, message } from 'antd';
import { getQuoteById, updateQuote } from '../../../api/quoteApi';
import QuoteForm from '../components/QuoteForm';

const { Title } = Typography;

export default function QuoteEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFetchLoading(true);
    getQuoteById(id)
      .then((res) => {
        const { description, author, customerName, customerEmail, totalAmount } = res.data;
        setInitialValues({ description, author, customerName, customerEmail, totalAmount });
      })
      .catch((err) => {
        setFetchError(err.response?.data?.message || err.message || 'Failed to load quote');
      })
      .finally(() => setFetchLoading(false));
  }, [id]);

  const handleFinish = async (values) => {
    setSaving(true);
    try {
      await updateQuote(id, values);
      message.success('Quote updated successfully!');
      navigate(`/quotes/${id}`);
    } catch (err) {
      message.error(err.response?.data?.message || err.message || 'Failed to update quote');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Title level={3}>Edit Quote</Title>

      {fetchLoading && <Spin size="large" style={{ display: 'block', margin: '40px auto' }} />}

      {fetchError && !fetchLoading && (
        <Alert type="error" message={fetchError} showIcon style={{ marginBottom: 16 }} />
      )}

      {initialValues && !fetchLoading && (
        <QuoteForm
          onFinish={handleFinish}
          loading={saving}
          initialValues={initialValues}
          submitLabel="Save Changes"
          onCancel={() => navigate(`/quotes/${id}`)}
        />
      )}
    </div>
  );
}
