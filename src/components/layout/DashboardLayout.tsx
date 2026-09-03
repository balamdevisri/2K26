import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Bell, QrCode, FileText, Trophy,
  Menu, X, Zap, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { ROUTES } from '../../constants/routes';
import './DashboardLayout.css';

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, icon: <LayoutDashboard size={18} />, label: 'Overview', exact: true },
  { to: ROUTES.DASHBOARD_TEAM, icon: <Users size={18} />, label: 'Team' },
  { to: ROUTES.DASHBOARD_ANNOUNCEMENTS, icon: <Bell size={18} />, label: 'Announcements' },
  { to: ROUTES.DASHBOARD_CHECKIN, icon: <QrCode size={18} />, label: 'Check-in' },
  { to: ROUTES.DASHBOARD_SUBMISSION, icon: <FileText size={18} />, label: 'Submission' },
  { to: ROUTES.DASHBOARD_RESULT, icon: <Trophy size={18} />, label: 'Results' },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  const isActive = (to: string, exact = false) => {
    if (exact) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Backdrop (mobile) */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <Link to={ROUTES.HOME} className="sidebar-logo-link">
            <div className="sidebar-logo-icon">
              <Zap size={16} />
            </div>
            <div>
              <div className="sidebar-logo-title">FUZON 2K26</div>
              <div className="sidebar-logo-sub">Participant Portal</div>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {user?.displayName?.[0]?.toUpperCase() || 'P'}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.displayName || 'Participant'}</div>
            <div className="sidebar-user-email">{user?.email}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar-nav-item ${isActive(item.to, item.exact) ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
              {isActive(item.to, item.exact) && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="sidebar-footer">
          <Link to={ROUTES.HOME} className="sidebar-nav-item">
            <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
            <span>Back to Site</span>
          </Link>
          <button className="sidebar-nav-item" onClick={handleLogout} style={{ width: '100%', textAlign: 'left' }}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="dashboard-main">
        {/* Mobile header */}
        <header className="dashboard-mobile-header">
          <button
            className="dashboard-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Zap size={14} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>FUZON 2K26</span>
          </Link>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </header>

        <div className="dashboard-content-area">
          {children}
        </div>
      </div>
    </div>
  );
}
