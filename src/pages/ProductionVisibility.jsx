import { useState } from 'react';
import { Table, Tag, Tabs, Select, Modal } from 'antd';
import {
  AreaChart, Area, BarChart, Bar, ComposedChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import {
  productionMetrics, productionThroughput, cycleTimeData,
  defectDistribution, machineUtilization, inspectionResults, facilityStatus,
} from '../mockData';

const machineStatusColors = { Running: 'success', Maintenance: 'warning', Idle: 'default' };

export default function ProductionVisibility() {
  const [siteFilter, setSiteFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('today');

  const showBatchDetail = (record) => {
    Modal.info({
      title: `Inspection Detail — ${record.batchId}`,
      width: 520,
      content: (
        <div>
          <p><strong>Product:</strong> {record.product}</p>
          <p><strong>Inspected:</strong> {record.inspected}</p>
          <p><strong>Passed:</strong> <span style={{ color: '#52c41a' }}>{record.passed}</span></p>
          <p><strong>Failed:</strong> <span style={{ color: '#f5222d' }}>{record.failed}</span></p>
          <p><strong>Yield:</strong> {record.yieldPct}</p>
          <p><strong>Inspector:</strong> {record.inspector}</p>
        </div>
      ),
    });
  };

  const showMachineDetail = (record) => {
    Modal.info({
      title: `Machine Detail — ${record.machine}`,
      width: 480,
      content: (
        <div>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Utilization:</strong> {record.utilization}%</p>
          <p><strong>Current Job:</strong> {record.currentJob}</p>
          <p><strong>Operator:</strong> {record.operator}</p>
          <p><strong>Uptime:</strong> {record.uptime}</p>
        </div>
      ),
    });
  };

  const machineCols = [
    { title: 'Machine', dataIndex: 'machine', key: 'machine', render: (t, r) => <a onClick={() => showMachineDetail(r)}><strong>{t}</strong></a> },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={machineStatusColors[s]}>{s}</Tag>,
    },
    { title: 'Utilization', dataIndex: 'utilization', key: 'utilization', render: (v) => `${v}%` },
    { title: 'Current Job', dataIndex: 'currentJob', key: 'currentJob' },
    { title: 'Operator', dataIndex: 'operator', key: 'operator' },
    { title: 'Uptime', dataIndex: 'uptime', key: 'uptime' },
  ];

  const inspectionCols = [
    { title: 'Batch ID', dataIndex: 'batchId', key: 'batchId', render: (t, r) => <a onClick={() => showBatchDetail(r)}>{t}</a> },
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Inspected', dataIndex: 'inspected', key: 'inspected' },
    { title: 'Passed', dataIndex: 'passed', key: 'passed', render: (v) => <span style={{ color: '#52c41a' }}>{v}</span> },
    { title: 'Failed', dataIndex: 'failed', key: 'failed', render: (v) => <span style={{ color: v > 0 ? '#f5222d' : 'inherit' }}>{v}</span> },
    { title: 'Yield', dataIndex: 'yieldPct', key: 'yieldPct' },
    { title: 'Inspector', dataIndex: 'inspector', key: 'inspector' },
  ];

  const facilityCols = [
    { title: 'Site', dataIndex: 'site', key: 'site', render: (t) => <strong>{t}</strong> },
    { title: 'Lines', dataIndex: 'lines', key: 'lines' },
    { title: 'Active', dataIndex: 'active', key: 'active' },
    { title: 'Capacity', dataIndex: 'capacity', key: 'capacity' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Operational' ? 'success' : s === 'Near Capacity' ? 'warning' : 'processing'}>{s}</Tag>,
    },
    { title: 'Shift', dataIndex: 'shift', key: 'shift' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Production Visibility</h1>
        <p>Real-time manufacturing operations and performance monitoring</p>
      </div>

      <div className="metrics-grid">
        {productionMetrics.map((m, i) => (
          <div className="metric-card" key={i} style={{ borderTopColor: m.color }}>
            <div className="metric-card-value">{m.value}</div>
            <div className="metric-card-title">{m.title}</div>
            <div className="metric-card-subtitle">{m.subtitle}</div>
          </div>
        ))}
      </div>

      <div className="filter-bar">
        <Select value={siteFilter} onChange={setSiteFilter} style={{ width: 160 }}
          options={[{ value: 'all', label: 'All Sites' }, { value: 'a', label: 'Plant A' }, { value: 'b', label: 'Plant B' }, { value: 'c', label: 'Plant C' }]}
        />
        <Select value={timeFilter} onChange={setTimeFilter} style={{ width: 140 }}
          options={[{ value: 'today', label: 'Today' }, { value: 'week', label: 'This Week' }, { value: 'month', label: 'This Month' }]}
        />
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-card-title">Production Throughput (units/hr)</div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={productionThroughput}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="line1" stroke="#4f8cff" fill="#4f8cff" fillOpacity={0.1} strokeWidth={2} name="Line 1" />
              <Area type="monotone" dataKey="line2" stroke="#722ed1" fill="#722ed1" fillOpacity={0.1} strokeWidth={2} name="Line 2" />
              <Area type="monotone" dataKey="line3" stroke="#13c2c2" fill="#13c2c2" fillOpacity={0.1} strokeWidth={2} name="Line 3" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Cycle Time Analysis (minutes)</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cycleTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="process" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="target" fill="#4f8cff" name="Target" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill="#52c41a" name="Actual" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card" style={{ gridColumn: 'span 2' }}>
          <div className="chart-card-title">Defect Distribution (Pareto Chart)</div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={defectDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="type" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Defect Count" radius={[4, 4, 0, 0]}>
                {defectDistribution.map((_, i) => (
                  <Cell key={i} fill={i < 3 ? '#f5222d' : i < 5 ? '#fa8c16' : '#faad14'} />
                ))}
              </Bar>
              <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#722ed1" strokeWidth={2} dot={{ r: 4 }} name="Cumulative %" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Tabs defaultActiveKey="machines" className="module-tabs">
        <Tabs.TabPane tab="Machine Utilization" key="machines">
          <div className="table-card">
            <Table columns={machineCols} dataSource={machineUtilization} pagination={false} size="middle" />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inspection Results" key="inspection">
          <div className="table-card">
            <Table columns={inspectionCols} dataSource={inspectionResults} pagination={false} size="middle" />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Facility Status" key="facility">
          <div className="table-card">
            <Table columns={facilityCols} dataSource={facilityStatus} pagination={false} size="middle" />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
