import { Form, Input, InputNumber, Button, Space } from 'antd';

export default function QuoteForm({ onFinish, loading, initialValues, submitLabel = 'Create Quote', onCancel }) {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Description is required' }]}
      >
        <Input.TextArea rows={3} />
      </Form.Item>

      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: 'Author is required' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="customerName" label="Customer Name">
        <Input />
      </Form.Item>

      <Form.Item
        name="customerEmail"
        label="Customer Email"
        rules={[{ type: 'email', message: 'Enter a valid email' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="totalAmount"
        label="Total Amount"
        rules={[{ type: 'number', min: 0, message: 'Must be a positive number' }]}
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={2} prefix="$" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            {submitLabel}
          </Button>
          {onCancel && (
            <Button onClick={onCancel}>Cancel</Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
}
