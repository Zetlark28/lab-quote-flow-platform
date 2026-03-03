import { Table, Button, Space, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { deleteQuote } from '../../../api/quoteApi';
import QuoteStatusTag from './QuoteStatusTag';

const columns = (navigate, onDeleted) => [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
  { title: 'Customer Name', dataIndex: 'customerName', key: 'customerName', responsive: ['sm'] },
  { title: 'Author', dataIndex: 'author', key: 'author', responsive: ['md'] },
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
    responsive: ['sm'],
    render: (val) => (val != null ? `$${Number(val).toFixed(2)}` : '—'),
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <Space wrap>
        <Button size="small" type="link" onClick={() => navigate(`/quotes/${record.id}`)}>
          View
        </Button>
        <Button size="small" type="link" onClick={() => navigate(`/quotes/${record.id}/edit`)}>
          Edit
        </Button>
        <Popconfirm
          title="Delete this quote?"
          description="This action cannot be undone."
          onConfirm={async () => {
            try {
              await deleteQuote(record.id);
              message.success('Quote deleted');
              onDeleted?.();
            } catch {
              message.error('Failed to delete quote');
            }
          }}
          okText="Delete"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <Button size="small" type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];

export default function QuoteTable({ quotes, loading, statusFilter, onDeleted }) {
  const navigate = useNavigate();
  const filtered = statusFilter
    ? quotes.filter((q) => q.status === statusFilter)
    : quotes;

  return (
    <Table
      dataSource={filtered}
      columns={columns(navigate, onDeleted)}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
      locale={{ emptyText: 'No quotes found' }}
      scroll={{ x: 'max-content' }}
    />
  );
}
