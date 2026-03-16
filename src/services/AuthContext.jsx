import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock user accounts
const MOCK_USERS = {
  admin: {
    username: 'admin',
    password: 'admin123',
    name: 'Admin User',
    role: 'Admin',
    email: 'admin@factoryiq.com',
    department: 'IT Administration',
    site: 'All Sites',
    avatar: 'AU',
  },
  engineering: {
    username: 'engineering',
    password: 'eng123',
    name: 'Sarah Chen',
    role: 'Engineering',
    email: 'sarah.chen@factoryiq.com',
    department: 'Manufacturing Engineering',
    site: 'Plant A – Detroit',
    avatar: 'SC',
  },
  quality: {
    username: 'quality',
    password: 'qual123',
    name: 'James Miller',
    role: 'Quality',
    email: 'james.miller@factoryiq.com',
    department: 'Quality Assurance',
    site: 'Plant B – Munich',
    avatar: 'JM',
  },
  supplychain: {
    username: 'supplychain',
    password: 'sc123',
    name: 'Priya Patel',
    role: 'Supply Chain',
    email: 'priya.patel@factoryiq.com',
    department: 'Supply Chain Management',
    site: 'Plant A – Detroit',
    avatar: 'PP',
  },
  logistics: {
    username: 'logistics',
    password: 'log123',
    name: 'Mike Johnson',
    role: 'Logistics',
    email: 'mike.johnson@factoryiq.com',
    department: 'Logistics & Shipping',
    site: 'Plant C – Shanghai',
    avatar: 'MJ',
  },
  customer: {
    username: 'customer',
    password: 'cust123',
    name: 'Lisa Wang',
    role: 'Customer',
    email: 'lisa.wang@techcorp.com',
    department: 'Procurement (TechCorp)',
    site: 'External',
    avatar: 'LW',
    company: 'TechCorp Industries',
  },
};

// Role → allowed route paths
const ROLE_ACCESS = {
  Admin: ['/', '/programs', '/production', '/quality', '/supply-chain', '/after-sales', '/collaboration', '/analytics'],
  Engineering: ['/', '/programs', '/production', '/collaboration', '/analytics'],
  Quality: ['/', '/quality', '/production', '/analytics'],
  'Supply Chain': ['/', '/supply-chain', '/analytics'],
  Logistics: ['/', '/supply-chain', '/after-sales', '/analytics'],
  Customer: ['/', '/after-sales', '/collaboration'],
};

// Role → which KPI cards to show on dashboard (by index)
const ROLE_KPIS = {
  Admin: [0, 1, 2, 3, 4],                // All 5
  Engineering: [0, 1, 3],                // Program Health, Production Output, Quality Yield
  Quality: [3, 1, 0],                    // Quality Yield, Production Output, Program Health
  'Supply Chain': [4, 2, 0],             // Inventory Status, On-Time Delivery, Program Health
  Logistics: [2, 4],                     // On-Time Delivery, Inventory Status
  Customer: [2, 3],                      // On-Time Delivery, Quality Yield
};

// Role → which dashboard chart sections to show
const ROLE_CHARTS = {
  Admin: ['production', 'defect', 'shipment', 'capacity'],
  Engineering: ['production', 'defect', 'capacity'],
  Quality: ['defect', 'production'],
  'Supply Chain': ['shipment', 'capacity'],
  Logistics: ['shipment'],
  Customer: ['shipment'],
};

// Role → which dashboard tables to show
const ROLE_TABLES = {
  Admin: ['programs', 'quality', 'shipments'],
  Engineering: ['programs', 'quality'],
  Quality: ['quality', 'programs'],
  'Supply Chain': ['shipments', 'programs'],
  Logistics: ['shipments'],
  Customer: ['shipments'],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('factoryiq_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('factoryiq_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('factoryiq_user');
    }
  }, [user]);

  const login = (username, password) => {
    const account = MOCK_USERS[username];
    if (!account) {
      return { success: false, error: 'User not found' };
    }
    if (account.password !== password) {
      return { success: false, error: 'Invalid password' };
    }
    const { password: _, ...userData } = account;
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = user?.role === 'Admin';

  // Get allowed routes for the current user
  const allowedRoutes = user ? (ROLE_ACCESS[user.role] || ['/']) : [];

  // Check if a specific route is allowed
  const canAccess = (path) => {
    if (!user) return false;
    if (user.role === 'Admin') return true;
    return allowedRoutes.includes(path);
  };

  // Get role-specific KPI indices
  const roleKpis = user ? (ROLE_KPIS[user.role] || [0, 1, 2, 3, 4]) : [];

  // Get role-specific chart keys
  const roleCharts = user ? (ROLE_CHARTS[user.role] || []) : [];

  // Get role-specific table keys
  const roleTables = user ? (ROLE_TABLES[user.role] || []) : [];

  return (
    <AuthContext.Provider value={{
      user, login, logout, isAdmin, isAuthenticated: !!user,
      allowedRoutes, canAccess, roleKpis, roleCharts, roleTables,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export { MOCK_USERS, ROLE_ACCESS };
