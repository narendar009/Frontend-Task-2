import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Divider, Tag, Space } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth, MOCK_USERS } from '../services/AuthContext';

const { Title, Text, Paragraph } = Typography;

const demoAccounts = [
  { username: 'admin', password: 'admin123', role: 'Admin', color: '#f5222d' },
  { username: 'engineering', password: 'eng123', role: 'Engineering', color: '#1890ff' },
  { username: 'quality', password: 'qual123', role: 'Quality', color: '#52c41a' },
  { username: 'supplychain', password: 'sc123', role: 'Supply Chain', color: '#722ed1' },
  { username: 'logistics', password: 'log123', role: 'Logistics', color: '#fa8c16' },
  { username: 'customer', password: 'cust123', role: 'Customer', color: '#13c2c2' },
];

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));
    const result = login(values.username, values.password);
    setLoading(false);

    if (result.success) {
      message.success('Signed in successfully!');
      navigate('/', { replace: true });
    } else {
      message.error(result.error);
    }
  };

  const quickLogin = (account) => {
    form.setFieldsValue({ username: account.username, password: account.password });
    handleLogin({ username: account.username, password: account.password });
  };

  return (
    <div className="login-page">
      <div className="login-bg-pattern" />
      <div className="login-container">
        {/* Left branding panel */}
        <div className="login-branding">
          <div className="login-brand-content">
            <div className="login-logo">
              <div className="login-logo-icon">F</div>
              <span className="login-logo-text">FactoryIQ</span>
            </div>
            <Title level={2} style={{ color: '#fff', marginTop: 32, marginBottom: 8, fontWeight: 700 }}>
              Manufacturing Excellence Portal
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.6 }}>
              End-to-end visibility for manufacturing programs across R&D, NPI, production, supply chain, quality, and after-sales.
            </Paragraph>
            <div className="login-features">
              <div className="login-feature-item">
                <SafetyCertificateOutlined /> Real-time production monitoring
              </div>
              <div className="login-feature-item">
                <SafetyCertificateOutlined /> Quality & compliance tracking
              </div>
              <div className="login-feature-item">
                <SafetyCertificateOutlined /> Supply chain visibility
              </div>
              <div className="login-feature-item">
                <SafetyCertificateOutlined /> Cross-functional analytics
              </div>
            </div>
          </div>
        </div>

        {/* Right login form */}
        <div className="login-form-panel">
          <div className="login-form-wrapper">
            <Title level={3} style={{ marginBottom: 4 }}>Sign In</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 28 }}>
              Enter your credentials to access the portal
            </Text>

            <Form form={form} onFinish={handleLogin} layout="vertical" size="large">
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter your username' }]}
              >
                <Input
                  prefix={<UserOutlined style={{ color: '#bfbfbf' }} />}
                  placeholder="Username"
                  autoComplete="username"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
                  placeholder="Password"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  loading={loading}
                  className="login-btn"
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            <Divider plain style={{ margin: '16px 0', color: '#bfbfbf', fontSize: 13 }}>
              Quick Demo Login
            </Divider>

            <div className="demo-accounts-grid">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.username}
                  className="demo-account-btn"
                  onClick={() => quickLogin(acc)}
                  style={{ borderLeftColor: acc.color }}
                >
                  <span className="demo-account-role" style={{ color: acc.color }}>{acc.role}</span>
                  <span className="demo-account-cred">{acc.username} / {acc.password}</span>
                </button>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                © 2026 FactoryIQ — Manufacturing Excellence Portal
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
