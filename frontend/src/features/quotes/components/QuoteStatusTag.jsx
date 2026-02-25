import { Tag } from 'antd';

const STATUS_MAP = {
  DRAFT: { color: 'default', label: 'Draft' },
  PENDING_APPROVAL: { color: 'processing', label: 'Pending Approval' },
  APPROVED: { color: 'success', label: 'Approved' },
  REJECTED: { color: 'error', label: 'Rejected' },
};

export default function QuoteStatusTag({ status }) {
  const config = STATUS_MAP[status] || { color: 'default', label: status };
  return <Tag color={config.color}>{config.label}</Tag>;
}
