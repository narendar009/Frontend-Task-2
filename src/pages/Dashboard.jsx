import { Row, Col, Tag, Table, Progress, Modal, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import {
  ProjectOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined,
  DatabaseOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import {
  kpiCards, productionTrend, defectRateData, shipmentPerformance,
  capacityUtilization, activePrograms, recentQualityIssues, latestShipments,
} from '../mockData';

const iconMap = {
  project: <ProjectOutlined />,
  dashboard: <DashboardOutlined />,
  'clock-circle': <ClockCircleOutlined />,
  safety: <SafetyCertificateOutlined />,
  database: <DatabaseOutlined />,
};

const capColors = ['#4f8cff', '#722ed1', '#fa8c16', '#f5222d', '#13c2c2'];

const kpiRoutes = {
  'Program Health': '/programs',
  'Production Output': '/production',
  'On-Time Delivery': '/supply-chain',
  'Quality Yield': '/quality',
  'Inventory Status': '/supply-chain',
};

// Greetings by role
const roleGreetings = {
  Admin: 'Full system access — all modules and data visible.',
  Engineering: 'Engineering view — programs, production, and collaboration.',
  Quality: 'Quality focus — quality issues, production metrics, and analytics.',
  'Supply Chain': 'Supply chain view — POs, inventory, and shipment tracking.',
  Logistics: 'Logistics view — shipments, deliveries, and after-sales.',
  Customer: 'Customer portal — your orders, deliveries, and support.',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, roleKpis, roleCharts, roleTables, canAccess } = useAuth();

  // Filter KPI cards by role
  const visibleKpis = roleKpis.map(i => kpiCards[i]).filter(Boolean);

  // Filter active programs for customer (only their company's programs)
  // TechCorp Industries is associated with Project Atlas and Program Vega in mock data
  const filteredPrograms = user?.company
    ? activePrograms.filter(p => p.owner === 'Lisa Wang' || p.name === 'Project Atlas')
    : activePrograms;

  // Filter shipments for customer role
  const filteredShipments = user?.role === 'Customer'
    ? latestShipments.filter(s => s.destination === 'Detroit, MI' || s.destination === 'Nagoya, JP')
    : latestShipments;

  const showQualityDetail = (record) => {
    Modal.info({
      title: `${record.type} Detail — ${record.id}`,
      width: 520,
      content: (
        <div>
          <p><strong>Description:</strong> {record.description}</p>
          <p><strong>Severity:</strong> {record.severity}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Date:</strong> {record.date}</p>
        </div>
      ),
    });
  };

  const showShipmentDetail = (record) => {
    Modal.info({
      title: `Shipment Detail — ${record.id}`,
      width: 520,
      content: (
        <div>
          <p><strong>Destination:</strong> {record.destination}</p>
          <p><strong>Carrier:</strong> {record.carrier}</p>
          <p><strong>ETA:</strong> {record.eta}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Items:</strong> {record.items} units</p>
        </div>
      ),
    });
  };

  const programCols = [
    {
      title: 'Program', dataIndex: 'name', key: 'name',
      render: (t) => <a onClick={() => canAccess('/programs') ? navigate('/programs') : null}><strong>{t}</strong></a>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Green' ? 'success' : s === 'Yellow' ? 'warning' : 'error'}>{s}</Tag>,
    },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Milestone', dataIndex: 'milestone', key: 'milestone' },
    {
      title: 'Progress', dataIndex: 'progress', key: 'progress',
      render: (p) => <Progress percent={p} size="small" strokeColor={p >= 80 ? '#52c41a' : p >= 50 ? '#faad14' : '#f5222d'} />,
    },
    { title: 'Last Update', dataIndex: 'updated', key: 'updated' },
  ];

  const qualityCols = [
    { title: 'ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showQualityDetail(r)}>{t}</a> },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag color={t === 'NCR' ? 'orange' : 'blue'}>{t}</Tag> },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Severity', dataIndex: 'severity', key: 'severity',
      render: (s) => <Tag color={s === 'Critical' ? 'red' : s === 'High' ? 'volcano' : s === 'Medium' ? 'gold' : 'green'}>{s}</Tag>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Open' ? 'red' : s === 'In Progress' ? 'processing' : 'success'}>{s}</Tag>,
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const shipmentCols = [
    { title: 'Shipment ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showShipmentDetail(r)}>{t}</a> },
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: 'Carrier', dataIndex: 'carrier', key: 'carrier' },
    { title: 'ETA', dataIndex: 'eta', key: 'eta' },
    { title: 'Items', dataIndex: 'items', key: 'items' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'In Transit' ? 'processing' : s === 'Delivered' ? 'success' : 'warning'}>{s}</Tag>,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {user?.name}</h1>
        <p>{roleGreetings[user?.role] || 'Manufacturing operations overview'}</p>
      </div>

      {user?.role !== 'Admin' && (
        <Alert
          message={`${user?.role} Dashboard`}
          description={`You are viewing data relevant to your ${user?.role} role. Contact admin for expanded access.`}
          type="info"
          showIcon
          closable
          style={{ marginBottom: 20, borderRadius: 8 }}
        />
      )}

      {/* KPI Cards — filtered by role */}
      <div className="kpi-grid">
        {visibleKpis.map((kpi, i) => (
          <div
            className="kpi-card"
            key={i}
            style={{ borderTop: `3px solid ${kpi.color}`, cursor: canAccess(kpiRoutes[kpi.title]) ? 'pointer' : 'default' }}
            onClick={() => canAccess(kpiRoutes[kpi.title]) && navigate(kpiRoutes[kpi.title])}
          >
            <div className="kpi-card-header">
              <span className="kpi-card-title">{kpi.title}</span>
              <div className="kpi-card-icon" style={{ background: kpi.color }}>
                {iconMap[kpi.icon]}
              </div>
            </div>
            <div className="kpi-card-value">{kpi.value}</div>
            <span className={`kpi-card-trend ${kpi.trend.startsWith('+') ? 'positive' : 'negative'}`}>
              {kpi.trend.startsWith('+') ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {kpi.trend} vs last month
            </span>
          </div>
        ))}
      </div>

      {/* Charts — filtered by role */}
      <div className="chart-grid">
        {roleCharts.includes('production') && (
          <div className="chart-card">
            <div className="chart-card-title">Production Trend</div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={productionTrend}>
                <defs>
                  <linearGradient id="plannedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f8cff" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#4f8cff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#52c41a" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#52c41a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="planned" stroke="#4f8cff" fill="url(#plannedGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" stroke="#52c41a" fill="url(#actualGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {roleCharts.includes('defect') && (
          <div className="chart-card">
            <div className="chart-card-title">Defect Rate (%)</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={defectRateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[0, 3]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rate" stroke="#f5222d" strokeWidth={2} dot={{ r: 4 }} name="Defect Rate" />
                <Line type="monotone" dataKey="target" stroke="#52c41a" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {roleCharts.includes('shipment') && (
          <div className="chart-card">
            <div className="chart-card-title">Shipment Performance (%)</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={shipmentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="onTime" fill="#52c41a" name="On-Time" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" fill="#f5222d" name="Delayed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {roleCharts.includes('capacity') && (
          <div className="chart-card">
            <div className="chart-card-title">Capacity Utilization by Site</div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={capacityUtilization} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                <YAxis dataKey="site" type="category" width={70} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="utilization" radius={[0, 4, 4, 0]} name="Utilization %">
                  {capacityUtilization.map((_, i) => (
                    <Cell key={i} fill={capColors[i % capColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Tables — filtered by role */}
      {roleTables.includes('programs') && (
        <div className="table-card">
          <div className="table-card-title">Active Programs</div>
          <Table columns={programCols} dataSource={filteredPrograms} pagination={false} size="middle" />
        </div>
      )}

      <Row gutter={16}>
        {roleTables.includes('quality') && (
          <Col xs={24} lg={roleTables.includes('shipments') ? 12 : 24}>
            <div className="table-card">
              <div className="table-card-title">Recent Quality Issues</div>
              <Table columns={qualityCols} dataSource={recentQualityIssues} pagination={false} size="small" scroll={{ x: 600 }} />
            </div>
          </Col>
        )}
        {roleTables.includes('shipments') && (
          <Col xs={24} lg={roleTables.includes('quality') ? 12 : 24}>
            <div className="table-card">
              <div className="table-card-title">{user?.role === 'Customer' ? 'Your Shipments' : 'Latest Shipments'}</div>
              <Table columns={shipmentCols} dataSource={filteredShipments} pagination={false} size="small" scroll={{ x: 600 }} />
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
}
