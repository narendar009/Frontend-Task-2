import { useState } from 'react';
import { Table, Tag, Progress, Tabs, Timeline, Button, Input, Select, Badge, Modal, message } from 'antd';
import {
  SearchOutlined, PlusOutlined,
  CheckCircleOutlined, ClockCircleOutlined, SyncOutlined,
  FileTextOutlined, ToolOutlined, ExperimentOutlined,
} from '@ant-design/icons';
import { programs, milestones, workOrders, bomItems, ecoLog, testReports } from '../mockData';

const statusColors = { Green: 'success', Yellow: 'warning', Red: 'error' };
const milestoneColors = { completed: 'green', active: 'blue', upcoming: 'gray' };

export default function ProgramTracking() {
  const [view, setView] = useState('overview');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [siteFilter, setSiteFilter] = useState(null);

  const openDetail = (record) => {
    setSelectedProgram(record);
    setView('detail');
  };

  const showNewProgramModal = () => {
    Modal.info({
      title: 'Create New Program',
      width: 480,
      content: (
        <div style={{ padding: '8px 0' }}>
          <p>This would open a program creation form with fields for:</p>
          <ul style={{ paddingLeft: 20 }}>
            <li>Program Name</li>
            <li>Customer</li>
            <li>Site Assignment</li>
            <li>Owner / Program Manager</li>
            <li>Target Start & End Dates</li>
            <li>Initial Milestone Plan</li>
          </ul>
          <p style={{ color: '#8c8c8c', marginTop: 8 }}>Feature available in production version with backend integration.</p>
        </div>
      ),
    });
  };

  const showWoDetail = (record) => {
    Modal.info({
      title: `Work Order — ${record.id}`,
      width: 480,
      content: (
        <div>
          <p><strong>Description:</strong> {record.description}</p>
          <p><strong>Quantity:</strong> {record.quantity}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Due Date:</strong> {record.dueDate}</p>
          <p><strong>Assignee:</strong> {record.assignee}</p>
        </div>
      ),
    });
  };

  const showEcoDetail = (record) => {
    Modal.info({
      title: `Engineering Change — ${record.id}`,
      width: 520,
      content: (
        <div>
          <p><strong>Description:</strong> {record.description}</p>
          <p><strong>Reason:</strong> {record.reason}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Requested By:</strong> {record.requestedBy}</p>
          <p><strong>Date:</strong> {record.date}</p>
        </div>
      ),
    });
  };

  const showTestReport = (record) => {
    Modal.info({
      title: `Test Report — ${record.name}`,
      width: 520,
      content: (
        <div>
          <p><strong>Type:</strong> {record.type}</p>
          <p><strong>Date:</strong> {record.date}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Author:</strong> {record.author}</p>
          <p style={{ marginTop: 12, color: '#8c8c8c' }}>Full report would be available for download in production version.</p>
        </div>
      ),
    });
  };

  // Apply filters
  const filteredPrograms = programs.filter((p) => {
    if (searchText && !p.name.toLowerCase().includes(searchText.toLowerCase())) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    if (siteFilter && p.site !== siteFilter) return false;
    return true;
  });

  const programCols = [
    { title: 'Program Name', dataIndex: 'name', key: 'name', render: (t) => <strong>{t}</strong>, sorter: (a, b) => a.name.localeCompare(b.name) },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={statusColors[s]}><span className={`status-dot ${s.toLowerCase()}`} />{s}</Tag>,
      filters: [{ text: 'Green', value: 'Green' }, { text: 'Yellow', value: 'Yellow' }, { text: 'Red', value: 'Red' }],
      onFilter: (v, r) => r.status === v,
    },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Site', dataIndex: 'site', key: 'site' },
    { title: 'Milestone', dataIndex: 'milestone', key: 'milestone' },
    {
      title: 'Progress', dataIndex: 'progress', key: 'progress', width: 160,
      render: (p) => <Progress percent={p} size="small" strokeColor={p >= 80 ? '#52c41a' : p >= 50 ? '#faad14' : '#f5222d'} />,
      sorter: (a, b) => a.progress - b.progress,
    },
    { title: 'Last Update', dataIndex: 'updated', key: 'updated', sorter: (a, b) => a.updated.localeCompare(b.updated) },
  ];

  const woCols = [
    { title: 'WO ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showWoDetail(r)}>{t}</a> },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Completed' ? 'success' : s === 'In Progress' ? 'processing' : 'default'}>{s}</Tag>,
    },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    { title: 'Assignee', dataIndex: 'assignee', key: 'assignee' },
  ];

  const bomCols = [
    { title: 'Part Number', dataIndex: 'partNumber', key: 'partNumber', render: (t) => <code>{t}</code> },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Unit', dataIndex: 'unit', key: 'unit' },
    { title: 'Material', dataIndex: 'material', key: 'material' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Lead Time', dataIndex: 'leadTime', key: 'leadTime' },
  ];

  const ecoCols = [
    { title: 'ECO ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showEcoDetail(r)}>{t}</a> },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Approved' ? 'success' : 'processing'}>{s}</Tag>,
    },
    { title: 'Requested By', dataIndex: 'requestedBy', key: 'requestedBy' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  const testCols = [
    { title: 'Report Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag>{t}</Tag> },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Passed' ? 'success' : s === 'Failed' ? 'error' : 'processing'}>{s}</Tag>,
    },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    {
      title: 'Action', key: 'action',
      render: (_, r) => <Button type="link" size="small" icon={<FileTextOutlined />} onClick={() => showTestReport(r)}>View</Button>,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Program / Project Tracking</h1>
        <p>Track programs from R&D through NPI to Production</p>
      </div>

      {view === 'overview' ? (
        <>
          <div className="filter-bar">
            <Input
              placeholder="Search programs..."
              prefix={<SearchOutlined />}
              style={{ width: 260 }}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Status"
              allowClear
              style={{ width: 140 }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[{ value: 'Green', label: 'Green' }, { value: 'Yellow', label: 'Yellow' }, { value: 'Red', label: 'Red' }]}
            />
            <Select
              placeholder="Site"
              allowClear
              style={{ width: 140 }}
              value={siteFilter}
              onChange={setSiteFilter}
              options={[{ value: 'Plant A', label: 'Plant A' }, { value: 'Plant B', label: 'Plant B' }, { value: 'Plant C', label: 'Plant C' }, { value: 'Plant D', label: 'Plant D' }]}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={showNewProgramModal}>New Program</Button>
          </div>
          <div className="table-card">
            <Table
              columns={[...programCols, {
                title: 'Action', key: 'action',
                render: (_, r) => <Button type="link" onClick={() => openDetail(r)}>Details →</Button>,
              }]}
              dataSource={filteredPrograms}
              pagination={{ pageSize: 10 }}
              size="middle"
              scroll={{ x: 1000 }}
            />
          </div>
        </>
      ) : (
        <>
          <Button onClick={() => setView('overview')} style={{ marginBottom: 16 }}>← Back to Programs</Button>
          <div className="table-card" style={{ marginBottom: 24 }}>
            <h2 style={{ marginBottom: 4 }}>{selectedProgram?.name}</h2>
            <p style={{ color: '#5a6173', marginBottom: 16 }}>
              Owner: {selectedProgram?.owner} | Customer: {selectedProgram?.customer} | Site: {selectedProgram?.site}
            </p>
            <Tag color={statusColors[selectedProgram?.status]} style={{ marginRight: 8 }}>{selectedProgram?.status}</Tag>
            <Progress percent={selectedProgram?.progress} style={{ maxWidth: 300, display: 'inline-flex' }} />
          </div>

          <div className="timeline-section">
            <h3>Milestone Timeline</h3>
            <Timeline mode="left">
              {milestones.map((m, i) => (
                <Timeline.Item
                  key={i}
                  color={milestoneColors[m.status]}
                  dot={m.status === 'active' ? <SyncOutlined spin style={{ fontSize: 16 }} /> :
                    m.status === 'completed' ? <CheckCircleOutlined style={{ fontSize: 16 }} /> :
                      <ClockCircleOutlined style={{ fontSize: 16 }} />}
                >
                  <strong>{m.label}</strong>
                  <br />
                  <span style={{ color: '#8c8c8c', fontSize: 12 }}>{m.date}</span>
                  {m.status === 'active' && <Badge status="processing" text="In Progress" style={{ marginLeft: 8 }} />}
                </Timeline.Item>
              ))}
            </Timeline>
          </div>

          <Tabs defaultActiveKey="wo" className="module-tabs">
            <Tabs.TabPane tab={<span><ToolOutlined /> Work Orders</span>} key="wo">
              <div className="table-card">
                <Table columns={woCols} dataSource={workOrders} pagination={false} size="middle" />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span><FileTextOutlined /> BOM</span>} key="bom">
              <div className="table-card">
                <div className="table-card-title">Bill of Materials — Project Atlas <Tag color="blue">Rev C</Tag></div>
                <Table columns={bomCols} dataSource={bomItems} pagination={false} size="middle" scroll={{ x: 800 }} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span><SyncOutlined /> ECO Log</span>} key="eco">
              <div className="table-card">
                <Table columns={ecoCols} dataSource={ecoLog} pagination={false} size="middle" scroll={{ x: 800 }} />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span><ExperimentOutlined /> Evidence Repository</span>} key="evidence">
              <div className="table-card">
                <div className="table-card-title">Test Reports & Qualification Documents</div>
                <Table columns={testCols} dataSource={testReports} pagination={false} size="middle" scroll={{ x: 700 }} />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
}
