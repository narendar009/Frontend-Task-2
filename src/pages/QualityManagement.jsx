import { useState } from 'react';
import { Table, Tag, Tabs, Select, Card, Row, Col, Statistic, Modal } from 'antd';
import {
  LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  qualityDocuments, qualityWorkflow, cpkData, yieldTrendData, auditSchedule,
} from '../mockData';

export default function QualityManagement() {
  const [typeFilter, setTypeFilter] = useState(null);
  const [severityFilter, setSeverityFilter] = useState(null);

  const showIssueDetail = (record) => {
    Modal.info({
      title: `${record.type} Detail — ${record.id}`,
      width: 560,
      content: (
        <div>
          <p><strong>Description:</strong> {record.description}</p>
          <p><strong>Type:</strong> {record.type}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Root Cause:</strong> {record.rootCause}</p>
          <p><strong>Severity:</strong> {record.severity}</p>
          <p><strong>Assigned To:</strong> {record.assignedTo}</p>
          <p><strong>Date:</strong> {record.date}</p>
        </div>
      ),
    });
  };

  const showAuditDetail = (record) => {
    Modal.info({
      title: `Audit Detail — ${record.id}`,
      width: 520,
      content: (
        <div>
          <p><strong>Type:</strong> {record.type}</p>
          <p><strong>Scope:</strong> {record.scope}</p>
          <p><strong>Auditor:</strong> {record.auditor}</p>
          <p><strong>Scheduled Date:</strong> {record.scheduledDate}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Findings:</strong> {record.findings}</p>
        </div>
      ),
    });
  };

  const filteredWorkflow = qualityWorkflow.filter((item) => {
    if (typeFilter && item.type !== typeFilter) return false;
    if (severityFilter && item.severity !== severityFilter) return false;
    return true;
  });

  const docCols = [
    { title: 'Standard', dataIndex: 'standard', key: 'standard', render: (t) => <strong>{t}</strong> },
    { title: 'Document Title', dataIndex: 'title', key: 'title' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    {
      title: 'Category', dataIndex: 'category', key: 'category',
      render: (c) => <span className={`doc-category ${c.toLowerCase()}`}>{c}</span>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Current' ? 'success' : 'processing'}>{s}</Tag>,
    },
    { title: 'Expiry', dataIndex: 'expiry', key: 'expiry' },
  ];

  const workflowCols = [
    { title: 'Issue ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showIssueDetail(r)}>{t}</a> },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag color={t === 'NCR' ? 'orange' : 'blue'}>{t}</Tag> },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Open' ? 'red' : s === 'In Progress' ? 'processing' : s === 'Resolved' ? 'success' : 'default'}>{s}</Tag>,
      filters: [{ text: 'Open', value: 'Open' }, { text: 'In Progress', value: 'In Progress' }, { text: 'Resolved', value: 'Resolved' }, { text: 'Closed', value: 'Closed' }],
      onFilter: (v, r) => r.status === v,
    },
    { title: 'Root Cause', dataIndex: 'rootCause', key: 'rootCause' },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
    {
      title: 'Severity', dataIndex: 'severity', key: 'severity',
      render: (s) => <Tag color={s === 'Critical' ? 'red' : s === 'High' ? 'volcano' : s === 'Medium' ? 'gold' : 'green'}>{s}</Tag>,
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const auditCols = [
    { title: 'Audit ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showAuditDetail(r)}>{t}</a> },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag color={t === 'Internal' ? 'blue' : t === 'External' ? 'purple' : 'cyan'}>{t}</Tag> },
    { title: 'Scope', dataIndex: 'scope', key: 'scope' },
    { title: 'Auditor', dataIndex: 'auditor', key: 'auditor' },
    { title: 'Scheduled Date', dataIndex: 'scheduledDate', key: 'scheduledDate' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Completed' ? 'success' : s === 'Scheduled' ? 'processing' : 'default'}>{s}</Tag>,
    },
    { title: 'Findings', dataIndex: 'findings', key: 'findings', render: (f) => f > 0 ? <Tag color="warning">{f}</Tag> : <Tag color="success">0</Tag> },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Quality Management & Compliance</h1>
        <p>Quality workflows, compliance documents, and audit management</p>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}><Card><Statistic title="Active NCRs" value={3} valueStyle={{ color: '#fa8c16' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="Open CAPAs" value={2} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="Upcoming Audits" value={3} valueStyle={{ color: '#722ed1' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="Cpk (avg)" value={1.67} precision={2} valueStyle={{ color: '#52c41a' }} /></Card></Col>
      </Row>

      <Tabs defaultActiveKey="workflow" className="module-tabs">
        <Tabs.TabPane tab="Quality Workflow" key="workflow">
          <div className="filter-bar">
            <Select placeholder="Type" allowClear style={{ width: 130 }} value={typeFilter} onChange={setTypeFilter}
              options={[{ value: 'NCR', label: 'NCR' }, { value: 'CAPA', label: 'CAPA' }]} />
            <Select placeholder="Severity" allowClear style={{ width: 130 }} value={severityFilter} onChange={setSeverityFilter}
              options={[{ value: 'Critical', label: 'Critical' }, { value: 'High', label: 'High' }, { value: 'Medium', label: 'Medium' }, { value: 'Low', label: 'Low' }]} />
          </div>
          <div className="table-card">
            <Table columns={workflowCols} dataSource={filteredWorkflow} pagination={false} size="middle" scroll={{ x: 1000 }} />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Document Library" key="docs">
          <div className="table-card">
            <div className="table-card-title">Compliance Document Library</div>
            <Table columns={docCols} dataSource={qualityDocuments} pagination={false} size="middle" />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Quality Analytics" key="analytics">
          <div className="chart-grid">
            <div className="chart-card">
              <div className="chart-card-title">Cp/Cpk Control Chart — Critical Dimension (mm)</div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cpkData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="sample" tick={{ fontSize: 12 }} label={{ value: 'Sample #', position: 'bottom', fontSize: 12 }} />
                  <YAxis domain={[9.8, 10.2]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#1890ff" strokeWidth={2} dot={{ r: 3 }} name="Measured" />
                  <Line type="monotone" dataKey="ucl" stroke="#f5222d" strokeDasharray="5 5" dot={false} name="UCL" />
                  <Line type="monotone" dataKey="lcl" stroke="#f5222d" strokeDasharray="5 5" dot={false} name="LCL" />
                  <Line type="monotone" dataKey="target" stroke="#52c41a" strokeDasharray="3 3" dot={false} name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card">
              <div className="chart-card-title">Yield Trend (%)</div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={yieldTrendData}>
                  <defs>
                    <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#52c41a" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#52c41a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis domain={[95, 100]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="yield" stroke="#52c41a" fill="url(#yieldGrad)" strokeWidth={2} name="Yield %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Audit Management" key="audits">
          <div className="table-card">
            <div className="table-card-title">Audit Schedules & Findings</div>
            <Table columns={auditCols} dataSource={auditSchedule} pagination={false} size="middle" />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
