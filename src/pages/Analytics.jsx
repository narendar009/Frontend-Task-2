import { useState } from 'react';
import { Select, Button, Card, Row, Col, Divider, Space, message } from 'antd';
import {
  FilePdfOutlined, FileExcelOutlined, FileTextOutlined,
  DownloadOutlined, FilterOutlined,
} from '@ant-design/icons';
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area,
} from 'recharts';
import {
  programPerformanceData, qualityTrendsData, shipmentPerformance,
  capacityUtilization, productionTrend, yieldTrendData,
} from '../mockData';

export default function Analytics() {
  const [program, setProgram] = useState(null);
  const [site, setSite] = useState(null);
  const [period, setPeriod] = useState('all');

  const handleExport = (type) => {
    message.success(`${type.toUpperCase()} export started. Download will begin shortly.`);
  };

  return (
    <div>
      <div className="page-header">
        <h1>Analytics & Reports</h1>
        <p>Comprehensive analytics across programs, quality, shipments, and capacity</p>
      </div>

      {/* Filters */}
      <div className="filter-bar" style={{ marginBottom: 24 }}>
        <FilterOutlined style={{ color: '#8c8c8c' }} />
        <Select
          placeholder="Program" allowClear style={{ width: 180 }} value={program} onChange={setProgram}
          options={[
            { value: 'atlas', label: 'Project Atlas' }, { value: 'orion', label: 'Program Orion' },
            { value: 'nova', label: 'Initiative Nova' }, { value: 'titan', label: 'Project Titan' },
          ]}
        />
        <Select
          placeholder="Site" allowClear style={{ width: 160 }} value={site} onChange={setSite}
          options={[
            { value: 'a', label: 'Plant A' }, { value: 'b', label: 'Plant B' },
            { value: 'c', label: 'Plant C' }, { value: 'd', label: 'Plant D' },
          ]}
        />
        <Select
          placeholder="Time Period" style={{ width: 160 }} value={period} onChange={setPeriod}
          options={[
            { value: 'all', label: 'All Time' }, { value: 'ytd', label: 'Year to Date' },
            { value: 'q1', label: 'Q1 2026' }, { value: 'q4', label: 'Q4 2025' },
          ]}
        />
        <Divider type="vertical" style={{ height: 24 }} />
        <div className="export-bar">
          <span style={{ fontSize: 13, color: '#5a6173', marginRight: 4 }}>Export:</span>
          <Button icon={<FilePdfOutlined />} size="small" onClick={() => handleExport('pdf')}>PDF</Button>
          <Button icon={<FileExcelOutlined />} size="small" onClick={() => handleExport('excel')}>Excel</Button>
          <Button icon={<FileTextOutlined />} size="small" onClick={() => handleExport('csv')}>CSV</Button>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-card-title">Program Performance Radar</div>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={programPerformanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Radar name="Budget" dataKey="budget" stroke="#4f8cff" fill="#4f8cff" fillOpacity={0.15} />
              <Radar name="Schedule" dataKey="schedule" stroke="#f5222d" fill="#f5222d" fillOpacity={0.1} />
              <Radar name="Quality" dataKey="quality" stroke="#52c41a" fill="#52c41a" fillOpacity={0.1} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Quality Trends (Quarterly)</div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={qualityTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="fpy" name="FPY %" fill="#4f8cff" radius={[4, 4, 0, 0]} />
              <Bar dataKey="customerComplaints" name="Customer Complaints" fill="#fa8c16" radius={[4, 4, 0, 0]} />
              <Bar dataKey="scrapRate" name="Scrap Rate %" fill="#f5222d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Shipment On-Time Performance</div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={shipmentPerformance}>
              <defs>
                <linearGradient id="onTimeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52c41a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#52c41a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="onTime" stroke="#52c41a" fill="url(#onTimeGrad)" strokeWidth={2} name="On-Time %" />
              <Line type="monotone" dataKey="delayed" stroke="#f5222d" strokeWidth={2} dot={{ r: 3 }} name="Delayed %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Capacity Utilization by Plant</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={capacityUtilization} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} unit="%" />
              <YAxis dataKey="site" type="category" width={70} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="utilization" name="Utilization %" fill="#722ed1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Production Output Trend</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="planned" stroke="#4f8cff" strokeWidth={2} dot={{ r: 3 }} name="Planned" />
              <Line type="monotone" dataKey="actual" stroke="#52c41a" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Yield Trend</div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={yieldTrendData}>
              <defs>
                <linearGradient id="yieldGrad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#13c2c2" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#13c2c2" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[95, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="yield" stroke="#13c2c2" fill="url(#yieldGrad2)" strokeWidth={2} name="Yield %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
