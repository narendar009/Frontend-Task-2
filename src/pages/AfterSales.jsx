import { Table, Tag, Tabs, Card, Row, Col, Statistic, Badge, Modal } from 'antd';
import { rmaRequests, repairCases, warrantyClaims, spareParts } from '../mockData';
import { useAuth } from '../services/AuthContext';

export default function AfterSales() {
  const { user } = useAuth();
  const isCustomer = user?.role === 'Customer';
  const customerCompany = user?.company;

  // Filter data by customer's company if logged in as Customer
  const filteredRma = isCustomer && customerCompany
    ? rmaRequests.filter(r => r.customer === customerCompany)
    : rmaRequests;

  const filteredWarranty = isCustomer && customerCompany
    ? warrantyClaims.filter(w => w.customer === customerCompany)
    : warrantyClaims;

  // Repairs linked to the customer's RMAs
  const customerRmaIds = filteredRma.map(r => r.id);
  const filteredRepairs = isCustomer
    ? repairCases.filter(r => customerRmaIds.some(id => r.rmaId.includes(id.split('-').pop())))
    : repairCases;

  // Stats based on filtered data
  const openRmas = filteredRma.filter(r => r.status === 'Open' || r.status === 'Diagnosed').length;
  const inRepair = filteredRma.filter(r => r.status === 'In Repair').length;
  const warrantyCount = filteredWarranty.length;
  const lowStockParts = spareParts.filter(p => p.availability === 'Low Stock' || p.availability === 'Out of Stock').length;

  const showRmaDetail = (record) => {
    Modal.info({
      title: `RMA Detail — ${record.id}`,
      width: 560,
      content: (
        <div>
          <p><strong>Customer:</strong> {record.customer}</p>
          <p><strong>Product:</strong> {record.product}</p>
          <p><strong>Issue:</strong> {record.issue}</p>
          <p><strong>Priority:</strong> {record.priority}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Created:</strong> {record.createdDate}</p>
        </div>
      ),
    });
  };

  const showRepairDetail = (record) => {
    Modal.info({
      title: `Repair Case — ${record.rmaId}`,
      width: 560,
      content: (
        <div>
          <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
          <p><strong>Repair Actions:</strong> {record.repairActions}</p>
          <p><strong>Test Result:</strong> {record.testResult}</p>
          <p><strong>Technician:</strong> {record.technician}</p>
          <p><strong>Est. Completion:</strong> {record.estCompletion}</p>
        </div>
      ),
    });
  };

  const showWarrantyDetail = (record) => {
    Modal.info({
      title: `Warranty Claim — ${record.claimId}`,
      width: 560,
      content: (
        <div>
          <p><strong>Customer:</strong> {record.customer}</p>
          <p><strong>Product:</strong> {record.product}</p>
          <p><strong>Type:</strong> {record.type}</p>
          <p><strong>Claim Date:</strong> {record.claimDate}</p>
          <p><strong>Warranty End:</strong> {record.warrantyEnd}</p>
          <p><strong>Amount:</strong> {record.amount}</p>
          <p><strong>Status:</strong> {record.status}</p>
        </div>
      ),
    });
  };

  const showSparePartDetail = (record) => {
    Modal.info({
      title: `Spare Part — ${record.partNumber}`,
      width: 480,
      content: (
        <div>
          <p><strong>Name:</strong> {record.name}</p>
          <p><strong>Category:</strong> {record.category}</p>
          <p><strong>Availability:</strong> {record.availability}</p>
          <p><strong>Quantity:</strong> {record.quantity}</p>
          <p><strong>Price:</strong> {record.price}</p>
          <p><strong>Order Status:</strong> {record.orderStatus}</p>
        </div>
      ),
    });
  };

  const rmaCols = [
    { title: 'Request ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showRmaDetail(r)}>{t}</a> },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Issue', dataIndex: 'issue', key: 'issue' },
    {
      title: 'Priority', dataIndex: 'priority', key: 'priority',
      render: (p) => <Tag color={p === 'Critical' ? 'red' : p === 'High' ? 'volcano' : p === 'Medium' ? 'gold' : 'green'}>{p}</Tag>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={
        s === 'Open' ? 'red' : s === 'Diagnosed' ? 'orange' : s === 'In Repair' ? 'processing' : s === 'Repaired' ? 'success' : 'default'
      }>{s}</Tag>,
    },
    { title: 'Created', dataIndex: 'createdDate', key: 'createdDate' },
  ];

  const repairCols = [
    { title: 'RMA ID', dataIndex: 'rmaId', key: 'rmaId', render: (t, r) => <a onClick={() => showRepairDetail(r)}>{t}</a> },
    { title: 'Diagnosis', dataIndex: 'diagnosis', key: 'diagnosis' },
    { title: 'Repair Actions', dataIndex: 'repairActions', key: 'repairActions' },
    {
      title: 'Test Result', dataIndex: 'testResult', key: 'testResult',
      render: (s) => <Tag color={s === 'Passed' ? 'success' : 'processing'}>{s}</Tag>,
    },
    { title: 'Technician', dataIndex: 'technician', key: 'technician' },
    { title: 'Est. Completion', dataIndex: 'estCompletion', key: 'estCompletion' },
  ];

  const warrantyCols = [
    { title: 'Claim ID', dataIndex: 'claimId', key: 'claimId', render: (t, r) => <a onClick={() => showWarrantyDetail(r)}>{t}</a> },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Product', dataIndex: 'product', key: 'product' },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (t) => <Tag>{t}</Tag> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    { title: 'Warranty End', dataIndex: 'warrantyEnd', key: 'warrantyEnd' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Completed' ? 'success' : s === 'Approved' ? 'processing' : 'warning'}>{s}</Tag>,
    },
  ];

  const sparePartsCols = [
    { title: 'Part Number', dataIndex: 'partNumber', key: 'partNumber', render: (t, r) => <a onClick={() => showSparePartDetail(r)}><code>{t}</code></a> },
    { title: 'Part Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category', render: (c) => <Tag color="blue">{c}</Tag> },
    {
      title: 'Availability', dataIndex: 'availability', key: 'availability',
      render: (a) => <Badge status={a === 'In Stock' ? 'success' : a === 'Low Stock' ? 'warning' : 'error'} text={a} />,
    },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Order Status', dataIndex: 'orderStatus', key: 'orderStatus',
      render: (s) => s !== 'N/A' ? <Tag color={s === 'On Order' ? 'processing' : 'warning'}>{s}</Tag> : <span style={{ color: '#8c8c8c' }}>—</span>,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>{isCustomer ? 'My Support & Returns' : 'After Sales Service'}</h1>
        <p>{isCustomer ? `Viewing RMA, repair, and warranty data for ${customerCompany}` : 'RMA requests, repair tracking, warranty claims, and spare parts management'}</p>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}><Card><Statistic title={isCustomer ? 'My Open RMAs' : 'Open RMAs'} value={openRmas} valueStyle={{ color: '#fa8c16' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="In Repair" value={inRepair} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title={isCustomer ? 'My Claims' : 'Warranty Claims'} value={warrantyCount} valueStyle={{ color: '#722ed1' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="Parts Low Stock" value={lowStockParts} valueStyle={{ color: '#f5222d' }} /></Card></Col>
      </Row>

      <Tabs defaultActiveKey="rma" className="module-tabs">
        <Tabs.TabPane tab={isCustomer ? 'My RMA Requests' : 'RMA Requests'} key="rma">
          <div className="table-card">
            <div className="table-card-title">{isCustomer ? `RMA Requests — ${customerCompany}` : 'Return Merchandise Authorization'}</div>
            <Table columns={rmaCols} dataSource={filteredRma} pagination={false} size="middle" scroll={{ x: 800 }} />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Repair Tracking" key="repair">
          <div className="table-card">
            <div className="table-card-title">Active Repairs</div>
            <Table columns={repairCols} dataSource={filteredRepairs} pagination={false} size="middle" scroll={{ x: 800 }} />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab={isCustomer ? 'My Warranty Claims' : 'Warranty Claims'} key="warranty">
          <div className="table-card">
            <div className="table-card-title">{isCustomer ? `Warranty Claims — ${customerCompany}` : 'Warranty Claims Dashboard'}</div>
            <Table columns={warrantyCols} dataSource={filteredWarranty} pagination={false} size="middle" scroll={{ x: 800 }} />
          </div>
        </Tabs.TabPane>

        {!isCustomer && (
          <Tabs.TabPane tab="Spare Parts" key="spare">
            <div className="table-card">
              <div className="table-card-title">Spare Parts Catalog</div>
              <Table columns={sparePartsCols} dataSource={spareParts} pagination={false} size="middle" scroll={{ x: 800 }} />
            </div>
          </Tabs.TabPane>
        )}
      </Tabs>
    </div>
  );
}
