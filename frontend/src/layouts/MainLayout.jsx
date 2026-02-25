import { Layout, Menu, Typography } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title } = Typography;

const NAV_ITEMS = [
  { key: '/quotes', label: 'Quotes' },
  { key: '/quotes/create', label: 'Create Quote' },
];

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKey = NAV_ITEMS.find((item) =>
    location.pathname === item.key
  )?.key || '/quotes';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', gap: 32, padding: '0 24px' }}>
        <Title level={4} style={{ color: '#fff', margin: 0, whiteSpace: 'nowrap' }}>
          Quote Flow Platform
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={NAV_ITEMS.map((item) => ({
            key: item.key,
            label: item.label,
            onClick: () => navigate(item.key),
          }))}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: 24, maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {children}
      </Content>
    </Layout>
  );
}
