# FactoryIQ Manufacturing Excellence Portal — Project Overview

## 1. What Is This Project?

FactoryIQ is a **single-page application (SPA)** built with React that simulates a professional enterprise manufacturing dashboard — similar to platforms like SAP, Oracle, or Jira. It provides end-to-end visibility across manufacturing operations: programs, production, quality, supply chain, after-sales, collaboration, and analytics.

> **Note:** This is a front-end-only application. All data is mock/static — there is no backend server or database. The focus is on UI architecture, component design, and data visualization.

---

## 2. Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | Component-based UI framework |
| **Vite 7** | Dev server & production bundler (faster than CRA) |
| **React Router v6** | Client-side routing between modules |
| **Ant Design (antd)** | Enterprise UI component library (tables, menus, tags, etc.) |
| **Recharts** | Charting library built on D3 (line, bar, area, radar, etc.) |
| **@ant-design/icons** | Icon set for sidebar, headers, and actions |
| **dayjs** | Lightweight date utility |

---

## 3. Project Structure

```
src/
├── main.jsx                  ← Entry point: mounts React to DOM
├── App.jsx                   ← Router configuration (all routes defined here)
├── index.css                 ← Global styles, design tokens, responsive rules
│
├── layouts/
│   └── MainLayout.jsx        ← Shell: sidebar + header + content area (shared across all pages)
│
├── pages/
│   ├── Dashboard.jsx          ← KPI cards, charts, tables (home page)
│   ├── ProgramTracking.jsx    ← Program overview table + detail view with tabs
│   ├── ProductionVisibility.jsx ← Production metrics, throughput, Pareto chart
│   ├── QualityManagement.jsx  ← NCR/CAPA workflows, Cp/Cpk charts, audits
│   ├── SupplyChain.jsx        ← PO tracking, inventory levels, shipments
│   ├── AfterSales.jsx         ← RMA, repairs, warranty, spare parts
│   ├── Collaboration.jsx      ← Documents, BOM viewer, knowledge base
│   └── Analytics.jsx          ← Multi-chart reporting with filters + export
│
└── mockData/
    └── index.js               ← All mock data (arrays of objects) for every module
```

---

## 4. How It Works — Step by Step

### 4.1 Application Bootstrap

```
index.html  →  main.jsx  →  App.jsx  →  MainLayout  →  Page Component
```

1. **`index.html`** has a `<div id="root">` — the mount point.
2. **`main.jsx`** calls `createRoot(document.getElementById('root')).render(<App />)` and imports global CSS.
3. **`App.jsx`** defines a **React Router** with a `createBrowserRouter()` that maps URL paths to components.

### 4.2 Routing Architecture

```jsx
// App.jsx — simplified
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,      // ← wraps ALL pages
    children: [
      { index: true, element: <Dashboard /> },        // "/"
      { path: 'programs', element: <ProgramTracking /> },
      { path: 'production', element: <ProductionVisibility /> },
      { path: 'quality', element: <QualityManagement /> },
      { path: 'supply-chain', element: <SupplyChain /> },
      { path: 'after-sales', element: <AfterSales /> },
      { path: 'collaboration', element: <Collaboration /> },
      { path: 'analytics', element: <Analytics /> },
    ],
  },
]);
```

**Key concept:** `MainLayout` is the **parent route** — it renders the sidebar and header once, and its `<Outlet />` component is where child pages are injected. This means the sidebar/header never re-renders when you switch pages.

### 4.3 Layout System (MainLayout.jsx)

The layout uses Ant Design's `<Layout>` with three regions:

```
┌──────────────────────────────────────────────────┐
│                    HEADER                         │
│  [☰ Toggle]  [🔍 Search...]     [🔔 3] [👤 NC]  │
├──────────┬───────────────────────────────────────┤
│          │                                       │
│ SIDEBAR  │         CONTENT AREA                  │
│          │         (<Outlet /> renders            │
│ Dashboard│          the active page here)        │
│ Programs │                                       │
│ Productn │                                       │
│ Quality  │                                       │
│ Supply   │                                       │
│ AfterSls │                                       │
│ Collab   │                                       │
│ Analytics│                                       │
│          │                                       │
└──────────┴───────────────────────────────────────┘
```

**How sidebar navigation works:**
- The sidebar uses Ant Design's `<Menu>` component in `inline` mode
- Each menu item's `key` is the route path (e.g., `'/programs'`)
- When a menu item is clicked, `useNavigate()` from React Router navigates to that path
- `useLocation()` reads the current URL to highlight the active menu item

**Responsive behavior:**
- The sidebar is `collapsible` — a toggle button collapses it to icon-only mode
- At the `lg` breakpoint (992px), it auto-collapses via `onBreakpoint`
- The content area's `margin-left` adjusts dynamically based on collapsed state

**Header features:**
- Global search bar (Ant Design `Input` with search icon)
- Notification bell with `Popover` dropdown showing recent alerts
- User avatar with `Dropdown` menu for profile/settings/logout

### 4.4 Dashboard Page — Component Anatomy

The Dashboard is a good example of how every page is structured:

```jsx
export default function Dashboard() {
  return (
    <div>
      {/* 1) Page title */}
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Manufacturing operations overview</p>
      </div>

      {/* 2) KPI Cards — mapped from mock data */}
      <div className="kpi-grid">
        {kpiCards.map((kpi, i) => (
          <div className="kpi-card" key={i}>
            {/* icon, title, value, trend */}
          </div>
        ))}
      </div>

      {/* 3) Charts — using Recharts */}
      <div className="chart-grid">
        <div className="chart-card">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={productionTrend}>
              <XAxis /><YAxis /><Tooltip /><Legend />
              <Area dataKey="planned" />
              <Area dataKey="actual" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* ... more charts */}
      </div>

      {/* 4) Tables — using Ant Design Table */}
      <Table columns={programCols} dataSource={activePrograms} />
    </div>
  );
}
```

**Pattern used across ALL pages:**
1. **Page header** — title + subtitle
2. **KPI/metric cards** — CSS Grid layout
3. **Charts** — Recharts wrapped in `<ResponsiveContainer>` for auto-sizing
4. **Tables** — Ant Design `<Table>` with column definitions + mock data

### 4.5 How Charts Work (Recharts)

Every chart follows this pattern:

```jsx
<ResponsiveContainer width="100%" height={280}>   {/* auto-resizes */}
  <LineChart data={dataArray}>                      {/* chart type */}
    <CartesianGrid strokeDasharray="3 3" />         {/* background grid */}
    <XAxis dataKey="month" />                       {/* x-axis labels */}
    <YAxis />                                       {/* y-axis scale */}
    <Tooltip />                                     {/* hover tooltips */}
    <Legend />                                      {/* legend labels */}
    <Line dataKey="rate" stroke="#f5222d" />         {/* data series */}
  </LineChart>
</ResponsiveContainer>
```

Charts used: `LineChart`, `AreaChart`, `BarChart`, `ComposedChart` (Pareto), `RadarChart`.

### 4.6 How Tables Work (Ant Design)

Tables are configured declaratively with column definitions:

```jsx
const columns = [
  {
    title: 'Status',                    // column header
    dataIndex: 'status',                // which field from data
    key: 'status',
    render: (s) => <Tag color="green">{s}</Tag>,  // custom rendering
    filters: [...],                     // dropdown filter
    sorter: (a, b) => a.status.localeCompare(b.status),  // sort function
  },
];

<Table columns={columns} dataSource={mockDataArray} />
```

### 4.7 Mock Data Layer

All mock data lives in `src/mockData/index.js` as **exported arrays of JavaScript objects**:

```js
export const activePrograms = [
  { key: '1', name: 'Project Atlas', status: 'Green', owner: 'Sarah Chen', progress: 78, ... },
  { key: '2', name: 'Program Orion', status: 'Yellow', owner: 'James Miller', ... },
];
```

Each page imports only what it needs:
```js
import { activePrograms, recentQualityIssues } from '../mockData';
```

> In a real application, these would be replaced with API calls using `fetch()` or `axios`, and data would come from a backend database.

---

## 5. Module-by-Module Summary

| # | Module | Route | Key Features |
|---|--------|-------|-------------|
| 1 | **Dashboard** | `/` | 5 KPI cards, 4 charts (area, line, bar), 3 data tables |
| 2 | **Program Tracking** | `/programs` | Overview table → click for detail view with milestone timeline, work orders, BOM, ECO log, and test evidence (all in tabs) |
| 3 | **Production Visibility** | `/production` | 5 metric cards, throughput area chart, cycle time bars, Pareto defect chart, machine/inspection/facility tables |
| 4 | **Quality Management** | `/quality` | NCR/CAPA workflow table, compliance document library, Cp/Cpk control chart, yield trend, audit schedules |
| 5 | **Supply Chain** | `/supply-chain` | PO tracking table, inventory bar chart (with min/max thresholds), warehouse inventory, shipment tracking |
| 6 | **After Sales** | `/after-sales` | RMA requests, repair tracking, warranty claims, spare parts catalog (all tabbed) |
| 7 | **Collaboration** | `/collaboration` | Communication threads, document management with versioning, interactive BOM tree viewer, CAD placeholder, knowledge base |
| 8 | **Analytics** | `/analytics` | Radar chart (program performance), quality trends, shipment trends, capacity utilization, with filters (program/site/period) and PDF/Excel/CSV export buttons |

---

## 6. Styling Approach

**No Tailwind CSS** — the project uses **vanilla CSS** in `index.css` with:

- **CSS Custom Properties (variables)** for a consistent design system:
  ```css
  :root {
    --primary: #1a3353;
    --accent: #4f8cff;
    --bg-body: #f0f2f5;
    --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
    --radius-lg: 12px;
    /* ... */
  }
  ```
- **CSS Grid** for card layouts (`grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`)
- **Responsive breakpoints** at 1200px, 768px, and 480px
- **Ant Design overrides** for table headers, cards, and tags
- **Hover animations** with `transform: translateY(-2px)` and `box-shadow` transitions
- **Google Fonts** — Inter for modern typography

---

## 7. Key React Patterns Used

| Pattern | Where | Why |
|---------|-------|-----|
| **Component composition** | `MainLayout` wraps all pages via `<Outlet />` | Single layout, multiple pages |
| **Declarative routing** | `App.jsx` with `createBrowserRouter` | Clean URL-to-component mapping |
| **State management** | `useState` in `ProgramTracking` (overview ↔ detail toggle) | Local state, no Redux needed |
| **Conditional rendering** | `{view === 'overview' ? <Table /> : <DetailView />}` | Toggle between views |
| **Array mapping** | `{kpiCards.map(kpi => <Card />)}` | Render lists from data |
| **Custom render functions** | `render: (status) => <Tag color="green">{status}</Tag>` | Format table cells |
| **Props via data** | Column definitions describe table structure declaratively | Separation of config from UI |

---

## 8. How To Run

```bash
# Install dependencies
npm install

# Start development server (hot-reload)
npm run dev

# Build for production
npm run build
```

---

## 9. What Would Change in Production

| Current (Mock) | Production Version |
|---|---|
| Mock data arrays in `mockData/index.js` | REST API calls to a backend (e.g., Node/Express, Spring Boot) |
| No authentication | JWT/OAuth login with role-based access control |
| Client-side filtering | Server-side pagination, filtering, sorting |
| Static notifications | WebSocket/SSE for real-time alerts |
| No state management library | Redux Toolkit or Zustand for shared state |
| Single bundle | Code-splitting with `React.lazy()` and `Suspense` |

---

## 10. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (SPA)                         │
│                                                              │
│  ┌──────────┐    ┌─────────────────────────────────────┐    │
│  │          │    │            React Router              │    │
│  │  Vite    │───▶│  "/"        → Dashboard.jsx          │    │
│  │  (Build) │    │  "/programs" → ProgramTracking.jsx   │    │
│  │          │    │  "/quality"  → QualityManagement.jsx  │    │
│  └──────────┘    │  "/analytics"→ Analytics.jsx         │    │
│                  │   ... (8 routes total)                │    │
│                  └──────────┬──────────────────────────┘    │
│                             │                                │
│                  ┌──────────▼──────────────────────────┐    │
│                  │         MainLayout.jsx               │    │
│                  │  ┌─────────┐ ┌───────────────────┐  │    │
│                  │  │ Sidebar │ │ Header             │  │    │
│                  │  │ (Menu)  │ │ (Search,Notif,User)│  │    │
│                  │  └─────────┘ └───────────────────┘  │    │
│                  │  ┌──────────────────────────────┐   │    │
│                  │  │      <Outlet />               │   │    │
│                  │  │  (Active page renders here)   │   │    │
│                  │  └──────────────────────────────┘   │    │
│                  └─────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Ant Design  │  │  Recharts    │  │  mockData/       │  │
│  │  (Table,Menu │  │  (Line,Bar,  │  │  index.js        │  │
│  │   Card,Tag)  │  │   Area,Radar)│  │  (static arrays) │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

*Built with React + Vite + Ant Design + Recharts. No backend, no Tailwind — pure vanilla CSS with enterprise design tokens.*
