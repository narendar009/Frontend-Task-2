import { useState } from 'react';
import { Table, Tag, Tabs, Badge, Avatar, List, Typography, Button, Modal, Input, Form, Upload, message } from 'antd';
import {
  FileTextOutlined, MessageOutlined, BookOutlined,
  DownloadOutlined, EyeOutlined,
  FolderOpenOutlined, TeamOutlined, InboxOutlined,
} from '@ant-design/icons';
import { documents as initialDocs, communicationThreads as initialThreads, knowledgeBase } from '../mockData';

const { Text } = Typography;
const { TextArea } = Input;
const { Dragger } = Upload;

export default function Collaboration() {
  const [threads, setThreads] = useState(initialThreads);
  const [docs] = useState(initialDocs);
  const [newThreadModalOpen, setNewThreadModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [threadDetailModal, setThreadDetailModal] = useState(null);
  const [newThreadForm] = Form.useForm();

  // ===== Thread creation =====
  const handleCreateThread = () => {
    newThreadForm.validateFields().then((values) => {
      const newThread = {
        key: String(threads.length + 1),
        subject: values.subject,
        participants: values.participants,
        lastMessage: values.message,
        date: new Date().toISOString().split('T')[0],
        unread: 0,
      };
      setThreads([newThread, ...threads]);
      setNewThreadModalOpen(false);
      newThreadForm.resetFields();
      message.success('Communication thread created successfully');
    });
  };

  // ===== Thread detail =====
  const openThread = (thread) => {
    setThreadDetailModal(thread);
  };

  // ===== Document actions =====
  const handleViewDoc = (record) => {
    Modal.info({
      title: `Document Preview — ${record.fileName}`,
      width: 560,
      content: (
        <div>
          <p><strong>File:</strong> {record.fileName}</p>
          <p><strong>Version:</strong> {record.version}</p>
          <p><strong>Owner:</strong> {record.owner}</p>
          <p><strong>Category:</strong> {record.category}</p>
          <p><strong>Approval Status:</strong> {record.approvalStatus}</p>
          <p><strong>Last Modified:</strong> {record.lastModified}</p>
          <p><strong>Size:</strong> {record.size}</p>
          <div style={{ marginTop: 16, padding: 20, background: '#fafafa', borderRadius: 8, textAlign: 'center', color: '#8c8c8c' }}>
            <FileTextOutlined style={{ fontSize: 48, marginBottom: 8 }} />
            <br />
            Document preview would render here in production.
          </div>
        </div>
      ),
    });
  };

  const handleDownloadDoc = (record) => {
    message.success(`Downloading ${record.fileName} (${record.size})...`);
  };

  // ===== Upload =====
  const handleUpload = () => {
    setUploadModalOpen(false);
    message.success('Document uploaded successfully and sent for approval');
  };

  // ===== KB detail =====
  const showKbArticle = (item) => {
    Modal.info({
      title: item.title,
      width: 560,
      content: (
        <div>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Views:</strong> {item.views}</p>
          <p><strong>Last Updated:</strong> {item.lastUpdated}</p>
          <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 8 }}>
            <p>This knowledge base article contains detailed procedures and guidelines for "{item.title}".</p>
            <p style={{ color: '#8c8c8c', marginTop: 8 }}>Full article content would be loaded from the backend in production.</p>
          </div>
        </div>
      ),
    });
  };

  const docCols = [
    { title: 'File Name', dataIndex: 'fileName', key: 'fileName', render: (t, r) => <a onClick={() => handleViewDoc(r)}><FileTextOutlined style={{ marginRight: 8, color: '#1890ff' }} />{t}</a> },
    { title: 'Version', dataIndex: 'version', key: 'version', render: (v) => <Tag>{v}</Tag> },
    { title: 'Owner', dataIndex: 'owner', key: 'owner' },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (c) => <Tag color="blue">{c}</Tag> },
    {
      title: 'Approval', dataIndex: 'approvalStatus', key: 'approvalStatus',
      render: (s) => <Tag color={s === 'Approved' ? 'success' : s === 'In Review' ? 'processing' : 'warning'}>{s}</Tag>,
    },
    { title: 'Modified', dataIndex: 'lastModified', key: 'lastModified' },
    { title: 'Size', dataIndex: 'size', key: 'size' },
    {
      title: 'Actions', key: 'actions',
      render: (_, r) => (
        <span>
          <Button type="link" size="small" icon={<EyeOutlined />} onClick={() => handleViewDoc(r)} />
          <Button type="link" size="small" icon={<DownloadOutlined />} onClick={() => handleDownloadDoc(r)} />
        </span>
      ),
    },
  ];

  const bomViewerData = [
    { key: '1', level: 0, part: 'Atlas Controller Assembly', partNo: 'ATL-ASY-000', qty: 1, children: [
      { key: '1-1', level: 1, part: 'Main Housing', partNo: 'ATL-HSG-001', qty: 1 },
      { key: '1-2', level: 1, part: 'Controller PCB', partNo: 'ATL-PCB-002', qty: 1, children: [
        { key: '1-2-1', level: 2, part: 'MCU Chip', partNo: 'ATL-MCU-010', qty: 1 },
        { key: '1-2-2', level: 2, part: 'Power Regulator IC', partNo: 'ATL-PWR-011', qty: 2 },
      ]},
      { key: '1-3', level: 1, part: 'Drive Shaft Assembly', partNo: 'ATL-SFT-003', qty: 2 },
      { key: '1-4', level: 1, part: 'Sensor Kit', partNo: 'ATL-SEN-004', qty: 4 },
      { key: '1-5', level: 1, part: 'Fastener Kit', partNo: 'ATL-FAS-005', qty: 1 },
    ]},
  ];

  const bomViewerCols = [
    { title: 'Part Name', dataIndex: 'part', key: 'part' },
    { title: 'Part Number', dataIndex: 'partNo', key: 'partNo', render: (t) => <code>{t}</code> },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Collaboration & Documents</h1>
        <p>Project communications, document management, and knowledge sharing</p>
      </div>

      <Tabs defaultActiveKey="threads" className="module-tabs">
        <Tabs.TabPane tab={<span><MessageOutlined /> Communication</span>} key="threads">
          <div className="table-card">
            <div className="table-card-title">
              Project Communication Threads
              <Button type="primary" size="small" onClick={() => setNewThreadModalOpen(true)}>+ New Thread</Button>
            </div>
            <List
              dataSource={threads}
              renderItem={(item) => (
                <List.Item
                  style={{ padding: '16px 0', cursor: 'pointer' }}
                  onClick={() => openThread(item)}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<TeamOutlined />} style={{ background: '#4f8cff' }} />}
                    title={
                      <span>
                        {item.subject}
                        {item.unread > 0 && <Badge count={item.unread} style={{ marginLeft: 8 }} />}
                      </span>
                    }
                    description={
                      <div>
                        <Text style={{ fontSize: 13 }}>{item.lastMessage}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.participants} · {item.date}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab={<span><FolderOpenOutlined /> Documents</span>} key="documents">
          <div className="table-card">
            <div className="table-card-title">
              Document Management
              <Button type="primary" size="small" onClick={() => setUploadModalOpen(true)}>Upload Document</Button>
            </div>
            <Table columns={docCols} dataSource={docs} pagination={false} size="middle" scroll={{ x: 900 }} />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab={<span><FileTextOutlined /> BOM Viewer</span>} key="bom">
          <div className="table-card">
            <div className="chart-card-title">Interactive BOM Viewer — Atlas Controller Assembly</div>
            <Table
              columns={bomViewerCols}
              dataSource={bomViewerData}
              pagination={false}
              size="middle"
              defaultExpandAllRows
            />
          </div>
          <div className="table-card">
            <div className="chart-card-title">CAD Viewer</div>
            <div style={{
              height: 250, background: '#f5f5f5', borderRadius: 8, display: 'flex',
              alignItems: 'center', justifyContent: 'center', border: '2px dashed #d9d9d9',
              color: '#8c8c8c', flexDirection: 'column', gap: 8,
            }}>
              <FileTextOutlined style={{ fontSize: 48 }} />
              <Text type="secondary">CAD Viewer — Drag & drop STEP/IGES files or select from repository</Text>
            </div>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab={<span><BookOutlined /> Knowledge Base</span>} key="kb">
          <div className="table-card">
            <div className="table-card-title">Knowledge Base</div>
            {knowledgeBase.map((item) => (
              <div className="kb-item" key={item.key} onClick={() => showKbArticle(item)}>
                <div className="kb-item-title">{item.title}</div>
                <div className="kb-item-meta">
                  <span><Tag size="small">{item.category}</Tag></span>
                  <span>{item.views} views</span>
                  <span>Updated: {item.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
      </Tabs>

      {/* New Thread Modal */}
      <Modal
        title="Create New Communication Thread"
        open={newThreadModalOpen}
        onOk={handleCreateThread}
        onCancel={() => { setNewThreadModalOpen(false); newThreadForm.resetFields(); }}
        okText="Create Thread"
        width={520}
      >
        <Form form={newThreadForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter a subject' }]}>
            <Input placeholder="e.g. Project Atlas — NPI Gate Review" />
          </Form.Item>
          <Form.Item name="participants" label="Participants" rules={[{ required: true, message: 'Please enter participants' }]}>
            <Input placeholder="e.g. Sarah Chen, James Miller, Priya Patel" />
          </Form.Item>
          <Form.Item name="message" label="Initial Message" rules={[{ required: true, message: 'Please enter a message' }]}>
            <TextArea rows={3} placeholder="Type your message..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Thread Detail Modal */}
      <Modal
        title={threadDetailModal?.subject}
        open={!!threadDetailModal}
        onCancel={() => setThreadDetailModal(null)}
        footer={null}
        width={560}
      >
        {threadDetailModal && (
          <div>
            <p><strong>Participants:</strong> {threadDetailModal.participants}</p>
            <p><strong>Date:</strong> {threadDetailModal.date}</p>
            <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 8 }}>
              <p style={{ marginBottom: 8 }}><strong>Latest Message:</strong></p>
              <p>{threadDetailModal.lastMessage}</p>
            </div>
            <div style={{ marginTop: 16 }}>
              <TextArea rows={2} placeholder="Type a reply..." style={{ marginBottom: 8 }} />
              <Button type="primary" onClick={() => { message.success('Reply sent'); setThreadDetailModal(null); }}>Send Reply</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        title="Upload Document"
        open={uploadModalOpen}
        onOk={handleUpload}
        onCancel={() => setUploadModalOpen(false)}
        okText="Upload"
        width={480}
      >
        <Dragger
          name="file"
          multiple={false}
          beforeUpload={() => false}
          style={{ marginBottom: 16 }}
        >
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Supports PDF, XLSX, DOCX, and CAD files up to 50MB</p>
        </Dragger>
        <Form layout="vertical">
          <Form.Item label="Category">
            <Input placeholder="e.g. Engineering, Quality, Production" />
          </Form.Item>
          <Form.Item label="Version">
            <Input placeholder="e.g. Rev A, 1.0" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
