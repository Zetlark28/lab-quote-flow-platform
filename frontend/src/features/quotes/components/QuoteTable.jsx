import { Table, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import QuoteStatusTag from './QuoteStatusTag';

const columns = (navigate) => [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName' },
  { title: 'Author', dataIndex: 'author', key: 'author' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => <QuoteStatusTag status={status} />,
  },
  {
    title: 'Total Amount',
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    render: (val) => (val != null ? `$${Number(val).toFixed(2)}` : '—'),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space>
        <Button type="link" onClick={() => navigate(`/quotes/${record.id}`)}>
          View
        </Button>
      </Space>
    ),
  },
];

export default function QuoteTable({ quotes, loading, statusFilter }) {
  const navigate = useNavigate();
  const filtered = statusFilter
    ? quotes.filter((q) => q.status === statusFilter)
    : quotes;

  return (
    <Table
      dataSource={filtered}
      columns={columns(navigate)}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: 'No quotes found' }}
    />
  );
}
