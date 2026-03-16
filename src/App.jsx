import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthContext';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProgramTracking from './pages/ProgramTracking';
import ProductionVisibility from './pages/ProductionVisibility';
import QualityManagement from './pages/QualityManagement';
import SupplyChain from './pages/SupplyChain';
import AfterSales from './pages/AfterSales';
import Collaboration from './pages/Collaboration';
import Analytics from './pages/Analytics';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// Role-based route guard: redirects to dashboard if user doesn't have access
function RoleRoute({ path, children }) {
  const { canAccess } = useAuth();
  if (!canAccess(path)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'programs', element: <RoleRoute path="/programs"><ProgramTracking /></RoleRoute> },
        { path: 'production', element: <RoleRoute path="/production"><ProductionVisibility /></RoleRoute> },
        { path: 'quality', element: <RoleRoute path="/quality"><QualityManagement /></RoleRoute> },
        { path: 'supply-chain', element: <RoleRoute path="/supply-chain"><SupplyChain /></RoleRoute> },
        { path: 'after-sales', element: <RoleRoute path="/after-sales"><AfterSales /></RoleRoute> },
        { path: 'collaboration', element: <RoleRoute path="/collaboration"><Collaboration /></RoleRoute> },
        { path: 'analytics', element: <RoleRoute path="/analytics"><Analytics /></RoleRoute> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
