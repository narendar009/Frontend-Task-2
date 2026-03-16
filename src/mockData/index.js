import dayjs from 'dayjs';

// ========== DASHBOARD ==========
export const kpiCards = [
  { title: 'Program Health', value: '87%', trend: '+2.3%', color: '#52c41a', icon: 'project' },
  { title: 'Production Output', value: '12,458', trend: '+5.1%', color: '#1890ff', icon: 'dashboard' },
  { title: 'On-Time Delivery', value: '94.2%', trend: '+1.8%', color: '#722ed1', icon: 'clock-circle' },
  { title: 'Quality Yield', value: '98.6%', trend: '+0.4%', color: '#13c2c2', icon: 'safety' },
  { title: 'Inventory Status', value: '$2.4M', trend: '-3.2%', color: '#fa8c16', icon: 'database' },
];

export const productionTrend = [
  { month: 'Jul', planned: 4200, actual: 4100 },
  { month: 'Aug', planned: 4400, actual: 4350 },
  { month: 'Sep', planned: 4600, actual: 4520 },
  { month: 'Oct', planned: 4500, actual: 4480 },
  { month: 'Nov', planned: 4800, actual: 4750 },
  { month: 'Dec', planned: 5000, actual: 4920 },
  { month: 'Jan', planned: 5200, actual: 5150 },
  { month: 'Feb', planned: 5100, actual: 5080 },
  { month: 'Mar', planned: 5400, actual: 5320 },
];

export const defectRateData = [
  { month: 'Jul', rate: 2.1, target: 1.5 },
  { month: 'Aug', rate: 1.9, target: 1.5 },
  { month: 'Sep', rate: 1.7, target: 1.5 },
  { month: 'Oct', rate: 1.8, target: 1.5 },
  { month: 'Nov', rate: 1.4, target: 1.5 },
  { month: 'Dec', rate: 1.3, target: 1.5 },
  { month: 'Jan', rate: 1.2, target: 1.5 },
  { month: 'Feb', rate: 1.1, target: 1.5 },
  { month: 'Mar', rate: 1.0, target: 1.5 },
];

export const shipmentPerformance = [
  { month: 'Jul', onTime: 89, delayed: 11 },
  { month: 'Aug', onTime: 91, delayed: 9 },
  { month: 'Sep', onTime: 93, delayed: 7 },
  { month: 'Oct', onTime: 90, delayed: 10 },
  { month: 'Nov', onTime: 94, delayed: 6 },
  { month: 'Dec', onTime: 92, delayed: 8 },
  { month: 'Jan', onTime: 95, delayed: 5 },
  { month: 'Feb', onTime: 94, delayed: 6 },
  { month: 'Mar', onTime: 96, delayed: 4 },
];

export const capacityUtilization = [
  { site: 'Plant A', utilization: 87 },
  { site: 'Plant B', utilization: 92 },
  { site: 'Plant C', utilization: 78 },
  { site: 'Plant D', utilization: 95 },
  { site: 'Plant E', utilization: 83 },
];

export const activePrograms = [
  { key: '1', name: 'Project Atlas', status: 'Green', owner: 'Sarah Chen', milestone: 'Production Ramp', progress: 78, updated: '2026-03-05' },
  { key: '2', name: 'Program Orion', status: 'Yellow', owner: 'James Miller', milestone: 'NPI Validation', progress: 55, updated: '2026-03-04' },
  { key: '3', name: 'Initiative Nova', status: 'Green', owner: 'Priya Patel', milestone: 'Design Review', progress: 92, updated: '2026-03-06' },
  { key: '4', name: 'Project Titan', status: 'Red', owner: 'Mike Johnson', milestone: 'Supplier Qual', progress: 34, updated: '2026-03-03' },
  { key: '5', name: 'Program Vega', status: 'Green', owner: 'Lisa Wang', milestone: 'Mass Production', progress: 100, updated: '2026-03-01' },
];

export const recentQualityIssues = [
  { key: '1', id: 'NCR-2026-0089', type: 'NCR', description: 'Surface finish out of spec on housing', severity: 'High', status: 'Open', date: '2026-03-05' },
  { key: '2', id: 'CAPA-2026-0034', type: 'CAPA', description: 'Recurring solder void defect', severity: 'Critical', status: 'In Progress', date: '2026-03-04' },
  { key: '3', id: 'NCR-2026-0088', type: 'NCR', description: 'Dimensional deviation on shaft', severity: 'Medium', status: 'Resolved', date: '2026-03-03' },
  { key: '4', id: 'CAPA-2026-0033', type: 'CAPA', description: 'Contamination in clean room B', severity: 'High', status: 'In Progress', date: '2026-03-02' },
];

export const latestShipments = [
  { key: '1', id: 'SHP-90234', destination: 'Detroit, MI', carrier: 'FedEx Freight', eta: '2026-03-07', status: 'In Transit', items: 240 },
  { key: '2', id: 'SHP-90233', destination: 'Stuttgart, DE', carrier: 'DHL Global', eta: '2026-03-10', status: 'Customs', items: 180 },
  { key: '3', id: 'SHP-90232', destination: 'Shanghai, CN', carrier: 'Maersk', eta: '2026-03-15', status: 'In Transit', items: 500 },
  { key: '4', id: 'SHP-90231', destination: 'Nagoya, JP', carrier: 'UPS Supply Chain', eta: '2026-03-08', status: 'Delivered', items: 120 },
];

// ========== PROGRAM TRACKING ==========
export const programs = [
  { key: '1', name: 'Project Atlas', status: 'Green', owner: 'Sarah Chen', milestone: 'Production Ramp-Up', progress: 78, updated: '2026-03-05', customer: 'TechCorp Industries', site: 'Plant A', startDate: '2025-06-01', endDate: '2026-09-30' },
  { key: '2', name: 'Program Orion', status: 'Yellow', owner: 'James Miller', milestone: 'NPI Validation', progress: 55, updated: '2026-03-04', customer: 'AutoMotive Global', site: 'Plant B', startDate: '2025-09-15', endDate: '2026-12-31' },
  { key: '3', name: 'Initiative Nova', status: 'Green', owner: 'Priya Patel', milestone: 'Design Review', progress: 92, updated: '2026-03-06', customer: 'AeroSpace Corp', site: 'Plant A', startDate: '2025-03-01', endDate: '2026-06-30' },
  { key: '4', name: 'Project Titan', status: 'Red', owner: 'Mike Johnson', milestone: 'Supplier Qualification', progress: 34, updated: '2026-03-03', customer: 'MedDevice Inc', site: 'Plant C', startDate: '2025-11-01', endDate: '2027-03-31' },
  { key: '5', name: 'Program Vega', status: 'Green', owner: 'Lisa Wang', milestone: 'Mass Production', progress: 100, updated: '2026-03-01', customer: 'ElectroParts Ltd', site: 'Plant D', startDate: '2024-12-01', endDate: '2026-02-28' },
  { key: '6', name: 'Project Mercury', status: 'Yellow', owner: 'David Kim', milestone: 'Prototype Build', progress: 42, updated: '2026-03-05', customer: 'TechCorp Industries', site: 'Plant B', startDate: '2026-01-15', endDate: '2027-06-30' },
];

export const milestones = [
  { label: 'Concept Review', date: '2025-06-15', status: 'completed' },
  { label: 'Design Freeze', date: '2025-09-01', status: 'completed' },
  { label: 'Prototype Build', date: '2025-12-01', status: 'completed' },
  { label: 'Design Validation', date: '2026-02-01', status: 'completed' },
  { label: 'NPI Validation', date: '2026-04-15', status: 'active' },
  { label: 'Production Trial Run', date: '2026-06-01', status: 'upcoming' },
  { label: 'Production Ramp-Up', date: '2026-07-15', status: 'upcoming' },
  { label: 'Mass Production', date: '2026-09-30', status: 'upcoming' },
];

export const workOrders = [
  { key: '1', id: 'WO-10234', description: 'Fabricate prototype housing v3', quantity: 50, status: 'In Progress', dueDate: '2026-03-15', assignee: 'Team Alpha' },
  { key: '2', id: 'WO-10235', description: 'Assemble test units batch 2', quantity: 100, status: 'Pending', dueDate: '2026-03-20', assignee: 'Team Beta' },
  { key: '3', id: 'WO-10236', description: 'Machine shaft components', quantity: 200, status: 'Completed', dueDate: '2026-03-10', assignee: 'CNC Shop' },
  { key: '4', id: 'WO-10237', description: 'PCB assembly lot 5', quantity: 500, status: 'In Progress', dueDate: '2026-03-18', assignee: 'SMT Line 2' },
];

export const bomItems = [
  { key: '1', partNumber: 'ATL-HSG-001', description: 'Main Housing Assembly', quantity: 1, unit: 'EA', material: 'AL6061-T6', supplier: 'MetalWorks Inc', leadTime: '4 weeks' },
  { key: '2', partNumber: 'ATL-PCB-002', description: 'Main Controller PCB', quantity: 1, unit: 'EA', material: 'FR-4', supplier: 'CircuitPro Ltd', leadTime: '3 weeks' },
  { key: '3', partNumber: 'ATL-SFT-003', description: 'Drive Shaft Assembly', quantity: 2, unit: 'EA', material: '4140 Steel', supplier: 'PrecisionParts Co', leadTime: '6 weeks' },
  { key: '4', partNumber: 'ATL-SEN-004', description: 'Temperature Sensor', quantity: 4, unit: 'EA', material: 'N/A', supplier: 'SensorTech GmbH', leadTime: '2 weeks' },
  { key: '5', partNumber: 'ATL-FAS-005', description: 'M6 Hex Bolt Kit', quantity: 24, unit: 'EA', material: 'SS 304', supplier: 'FastenerWorld', leadTime: '1 week' },
  { key: '6', partNumber: 'ATL-GSK-006', description: 'Seal Gasket Set', quantity: 2, unit: 'SET', material: 'Viton', supplier: 'SealPro Inc', leadTime: '2 weeks' },
];

export const ecoLog = [
  { key: '1', id: 'ECO-2026-012', description: 'Update housing wall thickness from 2.5mm to 3.0mm', reason: 'Structural integrity improvement', status: 'Approved', requestedBy: 'Sarah Chen', date: '2026-02-20' },
  { key: '2', id: 'ECO-2026-015', description: 'Change PCB connector from 8-pin to 12-pin', reason: 'Additional sensor interface', status: 'Pending Review', requestedBy: 'James Miller', date: '2026-03-01' },
  { key: '3', id: 'ECO-2026-018', description: 'Replace shaft material from 1045 to 4140', reason: 'Fatigue life requirement', status: 'Approved', requestedBy: 'Priya Patel', date: '2026-03-04' },
];

export const testReports = [
  { key: '1', name: 'Vibration Test Report - Housing v2', type: 'PDF', date: '2026-02-15', status: 'Passed', author: 'Test Lab A' },
  { key: '2', name: 'Thermal Cycle Test - PCB Assembly', type: 'PDF', date: '2026-02-20', status: 'Passed', author: 'Test Lab B' },
  { key: '3', name: 'Salt Spray Corrosion Test', type: 'PDF', date: '2026-03-01', status: 'In Progress', author: 'Test Lab A' },
  { key: '4', name: 'EMC Compliance Test Report', type: 'PDF', date: '2026-02-28', status: 'Failed', author: 'EMC Lab' },
  { key: '5', name: 'Prototype Performance Validation', type: 'Excel', date: '2026-03-05', status: 'Passed', author: 'Engineering' },
];

// ========== PRODUCTION VISIBILITY ==========
export const productionMetrics = [
  { title: 'Line Assignment', value: '6 / 8 Lines', subtitle: '75% allocated', color: '#1890ff' },
  { title: 'Work in Progress', value: '1,234', subtitle: 'units in process', color: '#fa8c16' },
  { title: 'Output vs Plan', value: '96.8%', subtitle: '+2.1% vs last week', color: '#52c41a' },
  { title: 'First Pass Yield', value: '97.2%', subtitle: 'target: 98%', color: '#13c2c2' },
  { title: 'Rework Rate', value: '2.8%', subtitle: '-0.5% vs last month', color: '#f5222d' },
];

export const productionThroughput = [
  { hour: '06:00', line1: 42, line2: 38, line3: 45 },
  { hour: '07:00', line1: 48, line2: 44, line3: 50 },
  { hour: '08:00', line1: 52, line2: 48, line3: 55 },
  { hour: '09:00', line1: 50, line2: 46, line3: 53 },
  { hour: '10:00', line1: 55, line2: 50, line3: 58 },
  { hour: '11:00', line1: 53, line2: 49, line3: 56 },
  { hour: '12:00', line1: 30, line2: 28, line3: 32 },
  { hour: '13:00', line1: 52, line2: 47, line3: 54 },
  { hour: '14:00', line1: 54, line2: 51, line3: 57 },
  { hour: '15:00', line1: 51, line2: 48, line3: 55 },
];

export const cycleTimeData = [
  { process: 'Machining', target: 12, actual: 13.2 },
  { process: 'Assembly', target: 8, actual: 7.8 },
  { process: 'Testing', target: 5, actual: 5.5 },
  { process: 'Painting', target: 15, actual: 14.8 },
  { process: 'Packaging', target: 3, actual: 3.1 },
];

export const defectDistribution = [
  { type: 'Solder Void', count: 45, cumulative: 32 },
  { type: 'Scratch', count: 32, cumulative: 55 },
  { type: 'Dimension', count: 23, cumulative: 71 },
  { type: 'Contamination', count: 15, cumulative: 82 },
  { type: 'Missing Part', count: 12, cumulative: 90 },
  { type: 'Alignment', count: 8, cumulative: 96 },
  { type: 'Other', count: 6, cumulative: 100 },
];

export const machineUtilization = [
  { key: '1', machine: 'CNC Mill A1', status: 'Running', utilization: 94, currentJob: 'WO-10234', operator: 'J. Smith', uptime: '22h 15m' },
  { key: '2', machine: 'CNC Lathe B2', status: 'Running', utilization: 88, currentJob: 'WO-10237', operator: 'M. Lee', uptime: '20h 30m' },
  { key: '3', machine: 'SMT Line 1', status: 'Maintenance', utilization: 0, currentJob: 'N/A', operator: 'N/A', uptime: '0h' },
  { key: '4', machine: 'SMT Line 2', status: 'Running', utilization: 91, currentJob: 'WO-10237', operator: 'A. Patel', uptime: '21h 45m' },
  { key: '5', machine: 'Paint Booth C1', status: 'Idle', utilization: 45, currentJob: 'Awaiting WO', operator: 'R. Garcia', uptime: '10h 20m' },
  { key: '6', machine: 'Assembly Station D1', status: 'Running', utilization: 82, currentJob: 'WO-10235', operator: 'K. Chen', uptime: '19h 00m' },
  { key: '7', machine: 'Test Chamber E1', status: 'Running', utilization: 76, currentJob: 'WO-10236', operator: 'S. Kim', uptime: '17h 30m' },
];

export const inspectionResults = [
  { key: '1', batchId: 'BATCH-2026-0342', product: 'Housing Assembly', inspected: 200, passed: 196, failed: 4, yieldPct: '98.0%', inspector: 'Quality Team A' },
  { key: '2', batchId: 'BATCH-2026-0343', product: 'PCB Assembly', inspected: 500, passed: 488, failed: 12, yieldPct: '97.6%', inspector: 'Quality Team B' },
  { key: '3', batchId: 'BATCH-2026-0344', product: 'Shaft Component', inspected: 150, passed: 149, failed: 1, yieldPct: '99.3%', inspector: 'Quality Team A' },
  { key: '4', batchId: 'BATCH-2026-0345', product: 'Final Assembly', inspected: 100, passed: 97, failed: 3, yieldPct: '97.0%', inspector: 'Quality Team C' },
];

export const facilityStatus = [
  { key: '1', site: 'Plant A - Detroit', lines: 8, active: 7, capacity: '87%', status: 'Operational', shift: '3-Shift' },
  { key: '2', site: 'Plant B - Munich', lines: 6, active: 5, capacity: '83%', status: 'Operational', shift: '2-Shift' },
  { key: '3', site: 'Plant C - Shanghai', lines: 10, active: 9, capacity: '90%', status: 'Operational', shift: '3-Shift' },
  { key: '4', site: 'Plant D - Nagoya', lines: 4, active: 4, capacity: '95%', status: 'Near Capacity', shift: '3-Shift' },
  { key: '5', site: 'Plant E - Guadalajara', lines: 5, active: 3, capacity: '60%', status: 'Ramp-Up', shift: '1-Shift' },
];

// ========== QUALITY MANAGEMENT ==========
export const qualityDocuments = [
  { key: '1', standard: 'ISO 9001:2015', title: 'Quality Management System Manual', version: 'Rev 5.2', status: 'Current', expiry: '2027-08-15', category: 'ISO' },
  { key: '2', standard: 'IATF 16949:2016', title: 'Automotive QMS Procedures', version: 'Rev 3.1', status: 'Current', expiry: '2027-03-20', category: 'IATF' },
  { key: '3', standard: 'FDA 21 CFR 820', title: 'Medical Device QSR Compliance', version: 'Rev 2.0', status: 'Under Review', expiry: '2026-11-30', category: 'FDA' },
  { key: '4', standard: 'NADCAP AC7004', title: 'Special Process: Heat Treatment', version: 'Rev 4.0', status: 'Current', expiry: '2026-09-15', category: 'NADCAP' },
  { key: '5', standard: 'ISO 14001:2015', title: 'Environmental Management System', version: 'Rev 3.0', status: 'Current', expiry: '2027-05-01', category: 'ISO' },
];

export const qualityWorkflow = [
  { key: '1', id: 'NCR-2026-0089', type: 'NCR', description: 'Surface finish out of spec', status: 'Open', rootCause: 'Tool wear not detected', assignedTo: 'Quality Team A', date: '2026-03-05', severity: 'High' },
  { key: '2', id: 'CAPA-2026-0034', type: 'CAPA', description: 'Recurring solder void defect', status: 'In Progress', rootCause: 'Paste viscosity variation', assignedTo: 'Process Engineering', date: '2026-03-04', severity: 'Critical' },
  { key: '3', id: 'NCR-2026-0088', type: 'NCR', description: 'Dimensional deviation on shaft', status: 'Resolved', rootCause: 'Fixture misalignment', assignedTo: 'CNC Shop Lead', date: '2026-03-03', severity: 'Medium' },
  { key: '4', id: 'CAPA-2026-0033', type: 'CAPA', description: 'Contamination in clean room', status: 'In Progress', rootCause: 'HEPA filter degradation', assignedTo: 'Facilities', date: '2026-03-02', severity: 'High' },
  { key: '5', id: 'NCR-2026-0087', type: 'NCR', description: 'Wrong component installed', status: 'Resolved', rootCause: 'BOM version mismatch', assignedTo: 'Assembly Lead', date: '2026-03-01', severity: 'Medium' },
  { key: '6', id: 'CAPA-2026-0032', type: 'CAPA', description: 'Paint adhesion failure', status: 'Closed', rootCause: 'Surface prep procedure gap', assignedTo: 'Paint Shop', date: '2026-02-28', severity: 'Low' },
];

export const cpkData = [
  { sample: 1, value: 10.02, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 2, value: 9.98, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 3, value: 10.05, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 4, value: 9.95, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 5, value: 10.08, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 6, value: 10.01, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 7, value: 9.92, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 8, value: 10.10, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 9, value: 9.97, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 10, value: 10.03, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 11, value: 9.99, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 12, value: 10.06, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 13, value: 9.93, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 14, value: 10.11, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 15, value: 10.00, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 16, value: 9.96, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 17, value: 10.04, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 18, value: 9.91, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 19, value: 10.07, ucl: 10.15, lcl: 9.85, target: 10.0 },
  { sample: 20, value: 10.02, ucl: 10.15, lcl: 9.85, target: 10.0 },
];

export const yieldTrendData = [
  { month: 'Jul', yield: 96.5 },
  { month: 'Aug', yield: 96.8 },
  { month: 'Sep', yield: 97.1 },
  { month: 'Oct', yield: 96.9 },
  { month: 'Nov', yield: 97.4 },
  { month: 'Dec', yield: 97.8 },
  { month: 'Jan', yield: 98.0 },
  { month: 'Feb', yield: 98.2 },
  { month: 'Mar', yield: 98.6 },
];

export const auditSchedule = [
  { key: '1', id: 'AUD-2026-010', type: 'Internal', scope: 'ISO 9001 - Production', auditor: 'Quality Assurance Team', scheduledDate: '2026-03-15', status: 'Scheduled', findings: 0 },
  { key: '2', id: 'AUD-2026-009', type: 'External', scope: 'IATF 16949 - Surveillance', auditor: 'Bureau Veritas', scheduledDate: '2026-04-10', status: 'Scheduled', findings: 0 },
  { key: '3', id: 'AUD-2026-008', type: 'Internal', scope: 'NADCAP - Heat Treatment', auditor: 'Process Engineering', scheduledDate: '2026-02-28', status: 'Completed', findings: 2 },
  { key: '4', id: 'AUD-2026-007', type: 'Supplier', scope: 'Vendor Quality Assessment', auditor: 'SQE Team', scheduledDate: '2026-02-15', status: 'Completed', findings: 4 },
  { key: '5', id: 'AUD-2026-006', type: 'External', scope: 'FDA QSR Compliance', auditor: 'FDA Inspector', scheduledDate: '2026-05-20', status: 'Planned', findings: 0 },
];

// ========== SUPPLY CHAIN ==========
export const purchaseOrders = [
  { key: '1', poNumber: 'PO-2026-4501', supplier: 'MetalWorks Inc', description: 'AL6061 Housing Blanks', quantity: 500, leadTime: '4 weeks', inspectionStatus: 'Pending', deliveryStatus: 'On Track', amount: '$125,000' },
  { key: '2', poNumber: 'PO-2026-4502', supplier: 'CircuitPro Ltd', description: 'PCB Assembly Lot 6', quantity: 1000, leadTime: '3 weeks', inspectionStatus: 'Passed', deliveryStatus: 'Delivered', amount: '$89,000' },
  { key: '3', poNumber: 'PO-2026-4503', supplier: 'PrecisionParts Co', description: '4140 Steel Shafts', quantity: 200, leadTime: '6 weeks', inspectionStatus: 'Not Started', deliveryStatus: 'Delayed', amount: '$67,500' },
  { key: '4', poNumber: 'PO-2026-4504', supplier: 'SensorTech GmbH', description: 'Temperature Sensors', quantity: 2000, leadTime: '2 weeks', inspectionStatus: 'In Progress', deliveryStatus: 'On Track', amount: '$34,000' },
  { key: '5', poNumber: 'PO-2026-4505', supplier: 'FastenerWorld', description: 'SS304 Fastener Kits', quantity: 5000, leadTime: '1 week', inspectionStatus: 'Passed', deliveryStatus: 'Delivered', amount: '$12,500' },
  { key: '6', poNumber: 'PO-2026-4506', supplier: 'SealPro Inc', description: 'Viton Gasket Sets', quantity: 800, leadTime: '2 weeks', inspectionStatus: 'Not Started', deliveryStatus: 'On Track', amount: '$28,000' },
];

export const inventoryLevels = [
  { item: 'AL6061 Blanks', current: 320, min: 100, max: 500 },
  { item: 'PCB Boards', current: 450, min: 200, max: 800 },
  { item: 'Steel Shafts', current: 85, min: 100, max: 400 },
  { item: 'Sensors', current: 1200, min: 500, max: 2000 },
  { item: 'Fastener Kits', current: 3500, min: 1000, max: 5000 },
  { item: 'Gasket Sets', current: 180, min: 150, max: 600 },
];

export const warehouseInventory = [
  { key: '1', sku: 'WH-A-001', item: 'AL6061 Housing Blanks', location: 'Warehouse A - Bay 3', quantity: 320, unit: 'EA', value: '$80,000', lastCount: '2026-03-01' },
  { key: '2', sku: 'WH-A-002', item: 'PCB Assemblies', location: 'Warehouse A - Bay 7', quantity: 450, unit: 'EA', value: '$40,050', lastCount: '2026-03-02' },
  { key: '3', sku: 'WH-B-001', item: '4140 Steel Shafts', location: 'Warehouse B - Bay 1', quantity: 85, unit: 'EA', value: '$28,900', lastCount: '2026-03-03' },
  { key: '4', sku: 'WH-A-003', item: 'Temperature Sensors', location: 'Warehouse A - Bay 12', quantity: 1200, unit: 'EA', value: '$20,400', lastCount: '2026-03-01' },
];

export const shipmentTracking = [
  { key: '1', id: 'SHP-90234', origin: 'Detroit, MI', destination: 'Stuttgart, DE', carrier: 'DHL Global', eta: '2026-03-10', status: 'In Transit', location: 'Atlantic Ocean', exceptions: 'None' },
  { key: '2', id: 'SHP-90235', origin: 'Shanghai, CN', destination: 'Detroit, MI', carrier: 'Maersk', eta: '2026-03-15', status: 'In Transit', location: 'Pacific Ocean', exceptions: 'Weather delay' },
  { key: '3', id: 'SHP-90236', origin: 'Nagoya, JP', destination: 'Munich, DE', carrier: 'FedEx Freight', eta: '2026-03-08', status: 'Customs', location: 'Frankfurt Airport', exceptions: 'Customs hold' },
  { key: '4', id: 'SHP-90237', origin: 'Detroit, MI', destination: 'Guadalajara, MX', carrier: 'UPS Freight', eta: '2026-03-07', status: 'Delivered', location: 'Destination', exceptions: 'None' },
  { key: '5', id: 'SHP-90238', origin: 'Munich, DE', destination: 'Shanghai, CN', carrier: 'DHL Global', eta: '2026-03-20', status: 'Booked', location: 'Origin', exceptions: 'None' },
];

// ========== AFTER SALES ==========
export const rmaRequests = [
  { key: '1', id: 'RMA-2026-0120', customer: 'TechCorp Industries', product: 'Atlas Controller Unit', issue: 'Intermittent power failure', status: 'Open', createdDate: '2026-03-04', priority: 'High' },
  { key: '2', id: 'RMA-2026-0119', customer: 'AutoMotive Global', product: 'Orion Sensor Module', issue: 'Calibration drift after 6 months', status: 'In Repair', createdDate: '2026-03-02', priority: 'Medium' },
  { key: '3', id: 'RMA-2026-0118', customer: 'AeroSpace Corp', product: 'Nova Drive Assembly', issue: 'Bearing noise under load', status: 'Diagnosed', createdDate: '2026-02-28', priority: 'High' },
  { key: '4', id: 'RMA-2026-0117', customer: 'MedDevice Inc', product: 'Titan PCB Module', issue: 'Component failure - capacitor', status: 'Repaired', createdDate: '2026-02-25', priority: 'Critical' },
  { key: '5', id: 'RMA-2026-0116', customer: 'ElectroParts Ltd', product: 'Vega Power Supply', issue: 'Overheating during extended use', status: 'Returned', createdDate: '2026-02-20', priority: 'Low' },
];

export const repairCases = [
  { key: '1', rmaId: 'RMA-2026-0119', diagnosis: 'Sensor element degradation due to chemical exposure', repairActions: 'Replace sensor element, recalibrate', testResult: 'Pending', technician: 'Tech A', startDate: '2026-03-03', estCompletion: '2026-03-10' },
  { key: '2', rmaId: 'RMA-2026-0118', diagnosis: 'Bearing preload incorrect from manufacturing', repairActions: 'Replace bearing set, adjust preload to spec', testResult: 'Pending', technician: 'Tech B', startDate: '2026-03-01', estCompletion: '2026-03-08' },
  { key: '3', rmaId: 'RMA-2026-0117', diagnosis: 'Electrolytic capacitor ESR out of range', repairActions: 'Replace C12, C15 capacitors, reflow solder joints', testResult: 'Passed', technician: 'Tech C', startDate: '2026-02-26', estCompletion: '2026-03-02' },
];

export const warrantyClaims = [
  { key: '1', claimId: 'WC-2026-0055', customer: 'TechCorp Industries', product: 'Atlas Controller', type: 'Full Replacement', claimDate: '2026-03-04', warrantyEnd: '2027-06-01', amount: '$2,400', status: 'Under Review' },
  { key: '2', claimId: 'WC-2026-0054', customer: 'AutoMotive Global', product: 'Orion Sensor', type: 'Repair', claimDate: '2026-03-01', warrantyEnd: '2027-09-15', amount: '$800', status: 'Approved' },
  { key: '3', claimId: 'WC-2026-0053', customer: 'MedDevice Inc', product: 'Titan PCB', type: 'Repair', claimDate: '2026-02-25', warrantyEnd: '2027-03-01', amount: '$1,200', status: 'Completed' },
  { key: '4', claimId: 'WC-2026-0052', customer: 'AeroSpace Corp', product: 'Nova Drive', type: 'Partial Credit', claimDate: '2026-02-20', warrantyEnd: '2026-12-31', amount: '$3,500', status: 'Approved' },
];

export const spareParts = [
  { key: '1', partNumber: 'SP-SEN-001', name: 'Temperature Sensor Element', category: 'Sensors', availability: 'In Stock', quantity: 150, price: '$45.00', orderStatus: 'N/A' },
  { key: '2', partNumber: 'SP-BRG-002', name: 'Drive Bearing Set', category: 'Mechanical', availability: 'In Stock', quantity: 80, price: '$120.00', orderStatus: 'N/A' },
  { key: '3', partNumber: 'SP-CAP-003', name: 'Electrolytic Capacitor Kit', category: 'Electronics', availability: 'Low Stock', quantity: 12, price: '$25.00', orderStatus: 'On Order' },
  { key: '4', partNumber: 'SP-GSK-004', name: 'Seal Gasket Kit', category: 'Seals', availability: 'In Stock', quantity: 200, price: '$35.00', orderStatus: 'N/A' },
  { key: '5', partNumber: 'SP-PCB-005', name: 'Controller PCB Assembly', category: 'Electronics', availability: 'Out of Stock', quantity: 0, price: '$289.00', orderStatus: 'Backordered' },
  { key: '6', partNumber: 'SP-MTR-006', name: 'Drive Motor Assembly', category: 'Mechanical', availability: 'In Stock', quantity: 35, price: '$450.00', orderStatus: 'N/A' },
];

// ========== COLLABORATION ==========
export const documents = [
  { key: '1', fileName: 'Quality Manual v5.2.pdf', version: '5.2', owner: 'Quality Director', approvalStatus: 'Approved', lastModified: '2026-02-15', category: 'Quality', size: '2.4 MB' },
  { key: '2', fileName: 'Atlas BOM Rev C.xlsx', version: 'Rev C', owner: 'Sarah Chen', approvalStatus: 'Approved', lastModified: '2026-03-04', category: 'Engineering', size: '1.1 MB' },
  { key: '3', fileName: 'Production SOP - Line 2.pdf', version: '3.1', owner: 'Production Manager', approvalStatus: 'Approved', lastModified: '2026-01-20', category: 'Production', size: '890 KB' },
  { key: '4', fileName: 'Supplier Audit Report - MetalWorks.pdf', version: '1.0', owner: 'SQE Team', approvalStatus: 'Pending', lastModified: '2026-03-05', category: 'Supply Chain', size: '3.2 MB' },
  { key: '5', fileName: 'ECO-2026-015 Package.pdf', version: 'Draft', owner: 'James Miller', approvalStatus: 'In Review', lastModified: '2026-03-06', category: 'Engineering', size: '5.7 MB' },
  { key: '6', fileName: 'Training Record - Q1 2026.xlsx', version: '1.0', owner: 'HR Department', approvalStatus: 'Approved', lastModified: '2026-03-01', category: 'Training', size: '420 KB' },
];

export const communicationThreads = [
  { key: '1', subject: 'Project Atlas - NPI Gate Review Action Items', participants: 'Sarah Chen, James Miller, Priya Patel', lastMessage: 'Gate review rescheduled to March 15th', date: '2026-03-06', unread: 2 },
  { key: '2', subject: 'NCR-0089 Root Cause Investigation', participants: 'Quality Team A, CNC Shop Lead', lastMessage: 'Tool wear data collected, analysis in progress', date: '2026-03-05', unread: 0 },
  { key: '3', subject: 'Supplier Delivery Delay - PrecisionParts', participants: 'Supply Chain Team, James Miller', lastMessage: 'Expedited shipping arranged, new ETA March 12', date: '2026-03-04', unread: 1 },
  { key: '4', subject: 'Plant D Capacity Planning Q2', participants: 'Operations, Production Planning', lastMessage: 'Overtime schedule approved for April', date: '2026-03-03', unread: 0 },
];

export const knowledgeBase = [
  { key: '1', title: 'How to Submit an ECO Request', category: 'Procedures', views: 234, lastUpdated: '2026-02-01' },
  { key: '2', title: 'NCR/CAPA Workflow Guide', category: 'Procedures', views: 189, lastUpdated: '2026-01-15' },
  { key: '3', title: 'Production Line Setup - Quick Reference', category: 'Training', views: 156, lastUpdated: '2026-02-20' },
  { key: '4', title: 'Supplier Quality Requirements Manual', category: 'FAQs', views: 312, lastUpdated: '2026-03-01' },
  { key: '5', title: 'Safety Procedures - Chemical Handling', category: 'Training', views: 98, lastUpdated: '2025-12-10' },
  { key: '6', title: 'ERP System FAQ', category: 'FAQs', views: 445, lastUpdated: '2026-02-28' },
];

// ========== ANALYTICS ==========
export const programPerformanceData = [
  { name: 'Atlas', budget: 92, schedule: 85, quality: 98, scope: 95 },
  { name: 'Orion', budget: 78, schedule: 65, quality: 94, scope: 88 },
  { name: 'Nova', budget: 96, schedule: 92, quality: 99, scope: 97 },
  { name: 'Titan', budget: 55, schedule: 40, quality: 91, scope: 72 },
  { name: 'Vega', budget: 100, schedule: 100, quality: 97, scope: 100 },
  { name: 'Mercury', budget: 85, schedule: 72, quality: 93, scope: 80 },
];

export const qualityTrendsData = [
  { quarter: 'Q2 2025', fpy: 95.2, customerComplaints: 12, scrapRate: 3.1 },
  { quarter: 'Q3 2025', fpy: 95.8, customerComplaints: 10, scrapRate: 2.8 },
  { quarter: 'Q4 2025', fpy: 96.5, customerComplaints: 8, scrapRate: 2.5 },
  { quarter: 'Q1 2026', fpy: 97.2, customerComplaints: 6, scrapRate: 2.1 },
];

export const notifications = [
  { id: 1, type: 'warning', title: 'Delivery Delay', message: 'PO-4503 steel shafts delayed by 1 week', time: '2 hours ago' },
  { id: 2, type: 'error', title: 'Quality Alert', message: 'NCR-0089: Surface finish out of spec', time: '4 hours ago' },
  { id: 3, type: 'info', title: 'Shipment Update', message: 'SHP-90234 cleared customs in Frankfurt', time: '6 hours ago' },
  { id: 4, type: 'warning', title: 'Certificate Expiry', message: 'NADCAP cert expires in 30 days', time: '1 day ago' },
  { id: 5, type: 'success', title: 'Audit Complete', message: 'Internal ISO audit completed - 2 minor findings', time: '2 days ago' },
];
