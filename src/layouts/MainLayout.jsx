import { useState } from 'react';
import { Layout, Menu, Input, Badge, Avatar, Dropdown, Popover, List, Typography, Modal, message, Tag } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  ToolOutlined,
  SafetyCertificateOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { notifications } from '../mockData';
import { useAuth } from '../services/AuthContext';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

const allMenuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/programs', icon: <ProjectOutlined />, label: 'Program Tracking' },
  { key: '/production', icon: <ToolOutlined />, label: 'Production Visibility' },
  { key: '/quality', icon: <SafetyCertificateOutlined />, label: 'Quality Management' },
  { key: '/supply-chain', icon: <ShoppingCartOutlined />, label: 'Supply Chain' },
  { key: '/after-sales', icon: <CustomerServiceOutlined />, label: 'After Sales Service' },
  { key: '/collaboration', icon: <TeamOutlined />, label: 'Collaboration' },
  { key: '/analytics', icon: <BarChartOutlined />, label: 'Analytics & Reports' },
];

const notificationIcons = {
  warning: '⚠️',
  error: '🔴',
  info: 'ℹ️',
  success: '✅',
};

const roleColors = {
  Admin: '#f5222d',
  Engineering: '#1890ff',
  Quality: '#52c41a',
  'Supply Chain': '#722ed1',
  Logistics: '#fa8c16',
  Customer: '#13c2c2',
};

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin, allowedRoutes } = useAuth();

  // Filter sidebar items based on role
  const menuItems = allMenuItems.filter(item => allowedRoutes.includes(item.key));

  const selectedKey = menuItems.find(item => 
    item.key !== '/' && location.pathname.startsWith(item.key)
  )?.key || '/';

  const handleUserMenu = ({ key }) => {
    if (key === 'profile') {
      Modal.info({
        title: 'User Profile',
        content: (
          <div>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Role:</strong> <Tag color={roleColors[user.role]}>{user.role}</Tag></p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Department:</strong> {user.department}</p>
            <p><strong>Site:</strong> {user.site}</p>
            {user.company && <p><strong>Company:</strong> {user.company}</p>}
            {isAdmin && <p style={{ marginTop: 12, color: '#f5222d' }}><strong>⚡ Full administrator access</strong></p>}
            <div style={{ marginTop: 12, padding: 8, background: '#fafafa', borderRadius: 6 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>Accessible modules: {allowedRoutes.length}</Text>
            </div>
          </div>
        ),
      });
    } else if (key === 'settings') {
      Modal.info({
        title: 'Settings',
        content: (
          <div>
            <p><strong>Theme:</strong> Light</p>
            <p><strong>Language:</strong> English (US)</p>
            <p><strong>Notifications:</strong> Enabled</p>
            <p><strong>Timezone:</strong> Asia/Kolkata (IST)</p>
            <p><strong>Access Level:</strong> <Tag color={roleColors[user.role]}>{user.role}</Tag></p>
          </div>
        ),
      });
    } else if (key === 'logout') {
      Modal.confirm({
        title: 'Sign Out',
        content: `Are you sure you want to sign out, ${user.name}?`,
        okText: 'Sign Out',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => {
          logout();
          message.success('Signed out successfully');
          navigate('/login', { replace: true });
        },
      });
    }
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      const lower = value.toLowerCase();
      const routeMatch = menuItems.find(item =>
        item.label.toLowerCase().includes(lower)
      );
      if (routeMatch) {
        navigate(routeMatch.key);
        setSearchValue('');
        message.success(`Navigated to ${routeMatch.label}`);
      } else {
        message.info(`No accessible module matches "${value}"`);
      }
    }
  };

  const handleNotificationClick = (notification) => {
    message.info(`${notification.title}: ${notification.message}`);
  };

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Sign Out', danger: true },
  ];

  const notificationContent = (
    <List
      dataSource={notifications}
      style={{ width: 320 }}
      renderItem={(item) => (
        <List.Item
          style={{ padding: '10px 0', cursor: 'pointer' }}
          onClick={() => handleNotificationClick(item)}
        >
          <List.Item.Meta
            avatar={<span style={{ fontSize: 16 }}>{notificationIcons[item.type]}</span>}
            title={<Text strong style={{ fontSize: 13 }}>{item.title}</Text>}
            description={
              <div>
                <Text style={{ fontSize: 12 }}>{item.message}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 11 }}>{item.time}</Text>
              </div>
            }
          />
        </List.Item>
      )}
      header={<Text strong>Notifications</Text>}
    />
  );

  return (
    <Layout className="app-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={256}
        className={`app-sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <div className="sidebar-logo">
          <div className="logo-icon">F</div>
          {!collapsed && <span className="logo-text">FactoryIQ</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ marginTop: 8 }}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 256, transition: 'margin-left 0.2s' }}>
        <Header className="app-header">
          <div className="header-left">
            <span className="header-trigger" onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <Input.Search
              className="header-search"
              placeholder="Search modules..."
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
              allowClear
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch}
              enterButton={false}
            />
          </div>
          <div className="header-right">
            <Tag color={roleColors[user?.role]} style={{ marginRight: 4, borderRadius: 12 }}>
              {user?.role}
            </Tag>
            <Popover content={notificationContent} trigger="click" placement="bottomRight">
              <Badge count={3} size="small">
                <BellOutlined className="header-notification" />
              </Badge>
            </Popover>
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenu }} placement="bottomRight">
              <div className="header-user">
                <Avatar
                  size={32}
                  style={{ background: `linear-gradient(135deg, ${roleColors[user?.role] || '#4f8cff'}, #722ed1)` }}
                >
                  {user?.avatar || 'U'}
                </Avatar>
                <div className="header-user-info">
                  <div className="header-user-name">{user?.name}</div>
                  <div className="header-user-role">{user?.department}</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="app-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
