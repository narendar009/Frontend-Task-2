import { Table, Tag, Tabs, Card, Row, Col, Statistic, Modal } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell,
} from 'recharts';
import {
  purchaseOrders, inventoryLevels, warehouseInventory, shipmentTracking,
} from '../mockData';

export default function SupplyChain() {
  const showPoDetail = (record) => {
    Modal.info({
      title: `Purchase Order — ${record.poNumber}`,
      width: 560,
      content: (
        <div>
          <p><strong>Supplier:</strong> {record.supplier}</p>
          <p><strong>Description:</strong> {record.description}</p>
          <p><strong>Quantity:</strong> {record.quantity}</p>
          <p><strong>Lead Time:</strong> {record.leadTime}</p>
          <p><strong>Inspection Status:</strong> {record.inspectionStatus}</p>
          <p><strong>Delivery Status:</strong> {record.deliveryStatus}</p>
          <p><strong>Amount:</strong> {record.amount}</p>
        </div>
      ),
    });
  };

  const showShipmentDetail = (record) => {
    Modal.info({
      title: `Shipment Detail — ${record.id}`,
      width: 560,
      content: (
        <div>
          <p><strong>Origin:</strong> {record.origin}</p>
          <p><strong>Destination:</strong> {record.destination}</p>
          <p><strong>Carrier:</strong> {record.carrier}</p>
          <p><strong>ETA:</strong> {record.eta}</p>
          <p><strong>Status:</strong> {record.status}</p>
          <p><strong>Current Location:</strong> {record.location}</p>
          <p><strong>Exceptions:</strong> {record.exceptions}</p>
        </div>
      ),
    });
  };

  const poCols = [
    { title: 'PO Number', dataIndex: 'poNumber', key: 'poNumber', render: (t, r) => <a onClick={() => showPoDetail(r)}>{t}</a> },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Lead Time', dataIndex: 'leadTime', key: 'leadTime' },
    {
      title: 'Inspection', dataIndex: 'inspectionStatus', key: 'inspectionStatus',
      render: (s) => <Tag color={s === 'Passed' ? 'success' : s === 'In Progress' ? 'processing' : s === 'Pending' ? 'warning' : 'default'}>{s}</Tag>,
    },
    {
      title: 'Delivery', dataIndex: 'deliveryStatus', key: 'deliveryStatus',
      render: (s) => <Tag color={s === 'Delivered' ? 'success' : s === 'On Track' ? 'processing' : 'error'}>{s}</Tag>,
    },
    { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  ];

  const warehouseCols = [
    { title: 'SKU', dataIndex: 'sku', key: 'sku', render: (t) => <code>{t}</code> },
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Qty', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
    { title: 'Last Count', dataIndex: 'lastCount', key: 'lastCount' },
  ];

  const shipmentCols = [
    { title: 'Shipment ID', dataIndex: 'id', key: 'id', render: (t, r) => <a onClick={() => showShipmentDetail(r)}>{t}</a> },
    { title: 'Origin', dataIndex: 'origin', key: 'origin' },
    { title: 'Destination', dataIndex: 'destination', key: 'destination' },
    { title: 'Carrier', dataIndex: 'carrier', key: 'carrier' },
    { title: 'ETA', dataIndex: 'eta', key: 'eta' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Delivered' ? 'success' : s === 'In Transit' ? 'processing' : s === 'Customs' ? 'warning' : 'default'}>{s}</Tag>,
    },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    {
      title: 'Exceptions', dataIndex: 'exceptions', key: 'exceptions',
      render: (e) => e !== 'None' ? <Tag color="error">{e}</Tag> : <Tag color="success">None</Tag>,
    },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Supply Chain & Materials</h1>
        <p>Purchase orders, inventory management, and shipment tracking</p>
      </div>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={12} sm={6}><Card><Statistic title="Active POs" value={6} valueStyle={{ color: '#1890ff' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="In Transit" value={3} valueStyle={{ color: '#fa8c16' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="Delivered (MTD)" value={8} valueStyle={{ color: '#52c41a' }} /></Card></Col>
        <Col xs={12} sm={6}><Card><Statistic title="Below Min Stock" value={1} valueStyle={{ color: '#f5222d' }} /></Card></Col>
      </Row>

      <Tabs defaultActiveKey="po" className="module-tabs">
        <Tabs.TabPane tab="PO Tracking" key="po">
          <div className="table-card">
            <div className="table-card-title">Purchase Order Tracking</div>
            <Table columns={poCols} dataSource={purchaseOrders} pagination={false} size="middle" scroll={{ x: 900 }} />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Inventory Dashboard" key="inventory">
          <div className="chart-card" style={{ marginBottom: 24 }}>
            <div className="chart-card-title">Inventory Levels vs Min/Max Thresholds</div>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={inventoryLevels} barSize={40}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="item" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" name="Current Stock" radius={[4, 4, 0, 0]}>
                  {inventoryLevels.map((entry, i) => (
                    <Cell key={i} fill={entry.current < entry.min ? '#f5222d' : '#4f8cff'} />
                  ))}
                </Bar>
                <Bar dataKey="min" name="Min Level" fill="#faad14" radius={[4, 4, 0, 0]} fillOpacity={0.4} />
                <Bar dataKey="max" name="Max Level" fill="#52c41a" radius={[4, 4, 0, 0]} fillOpacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="table-card">
            <div className="table-card-title">Warehouse Inventory</div>
            <Table columns={warehouseCols} dataSource={warehouseInventory} pagination={false} size="middle" />
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Shipment Tracking" key="shipments">
          <div className="table-card">
            <div className="table-card-title">Active Shipments</div>
            <Table columns={shipmentCols} dataSource={shipmentTracking} pagination={false} size="middle" scroll={{ x: 1000 }} />
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
