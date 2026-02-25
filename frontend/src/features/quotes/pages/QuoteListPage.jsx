import { useState } from 'react';
import { Typography, Select, Space, Input, Button, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuoteList } from '../hooks/useQuoteList';
import QuoteTable from '../components/QuoteTable';

const { Title } = Typography;
const { Option } = Select;

export default function QuoteListPage() {
  const navigate = useNavigate();
  const { quotes, loading, error, fetchById } = useQuoteList();
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  const handleSearch = () => {
    if (searchId.trim()) {
      fetchById(searchId.trim());
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 16, justifyContent: 'space-between', width: '100%' }} wrap>
        <Title level={3} style={{ margin: 0 }}>Quotes</Title>
        <Button type="primary" onClick={() => navigate('/quotes/create')}>
          Create Quote
        </Button>
      </Space>

      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onPressEnter={handleSearch}
          style={{ width: 200 }}
          allowClear
          onClear={() => setSearchId('')}
        />
        <Button onClick={handleSearch} type="default">
          Search
        </Button>
        <Select
          placeholder="Filter by status"
          allowClear
          style={{ width: 200 }}
          onChange={setStatusFilter}
          value={statusFilter}
        >
          <Option value="DRAFT">Draft</Option>
          <Option value="PENDING_APPROVAL">Pending Approval</Option>
          <Option value="APPROVED">Approved</Option>
          <Option value="REJECTED">Rejected</Option>
        </Select>
      </Space>

      {error && (
        <Alert type="error" message={error} style={{ marginBottom: 16 }} showIcon />
      )}

      <QuoteTable quotes={quotes} loading={loading} statusFilter={statusFilter} />
    </div>
  );
}
