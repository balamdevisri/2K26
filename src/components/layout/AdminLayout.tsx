import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, QrCode, Code2, Bell,
  FileText, Award, BarChart3, Download, Settings, Menu, X,
  Zap, LogOut, ChevronRight
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { ROUTES } from '../../constants/routes';

const ADMIN_NAV = [
  { to: ROUTES.ADMIN, icon: <LayoutDashboard size={18} />, label: 'Dashboard', exact: true },
  { to: ROUTES.ADMIN_PARTICIPANTS, icon: <Users size={18} />, label: 'Participants' },
  { to: ROUTES.ADMIN_TEAMS, icon: <Users size={18} />, label: 'Teams' },
  { to: ROUTES.ADMIN_PAYMENTS, icon: <CreditCard size={18} />, label: 'Payments' },
  { to: ROUTES.ADMIN_CHECKINS, icon: <QrCode size={18} />, label: 'Check-ins' },
  { to: ROUTES.ADMIN_PROBLEMS, icon: <Code2 size={18} />, label: 'Problems' },
  { to: ROUTES.ADMIN_ANNOUNCEMENTS, icon: <Bell size={18} />, label: 'Announcements' },
  { to: ROUTES.ADMIN_SUBMISSIONS, icon: <FileText size={18} />, label: 'Submissions' },
  { to: ROUTES.ADMIN_JUDGES, icon: <Award size={18} />, label: 'Judges' },
  { to: ROUTES.ADMIN_SCORES, icon: <BarChart3 size={18} />, label: 'Scores' },
  { to: ROUTES.ADMIN_RESULTS, icon: <Award size={18} />, label: 'Results' },
  { to: ROUTES.ADMIN_EXPORTS, icon: <Download size={18} />, label: 'Exports' },
  { to: ROUTES.ADMIN_SETTINGS, icon: <Settings size={18} />, label: 'Settings' },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => { await logout(); navigate(ROUTES.HOME); };
  const isActive = (to: string, exact = false) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      {/* Backdrop */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 'calc(var(--z-sticky) - 1)', backdropFilter: 'blur(4px)' }} />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 240, minHeight: '100vh', background: 'var(--color-bg-secondary)', borderRight: '1px solid var(--color-border)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, zIndex: 'var(--z-sticky)',
        transition: 'transform var(--transition-slow)',
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }}>
        {/* Logo */}
        <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ width: 30, height: 30, borderRadius: 'var(--radius-md)', background: 'var(--color-brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Zap size={14} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 800, color: 'var(--color-text-primary)' }}>FUZON 2K26</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', fontWeight: 600 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* User */}
        <div style={{ padding: 'var(--space-3) var(--space-5)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)', flexShrink: 0 }}>
            {user?.displayName?.[0]?.toUpperCase() || 'A'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.displayName || 'Admin'}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)' }}>Administrator</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: 'var(--space-2) 0', overflowY: 'auto' }}>
          {ADMIN_NAV.map(item => (
            <Link key={item.to} to={item.to}
              onClick={() => setSidebarOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                padding: 'var(--space-2) var(--space-5)',
                color: isActive(item.to, item.exact) ? '#F87171' : 'var(--color-text-muted)',
                fontSize: 'var(--text-sm)', fontWeight: isActive(item.to, item.exact) ? 600 : 400,
                background: isActive(item.to, item.exact) ? 'rgba(239,68,68,0.08)' : 'transparent',
                borderLeft: `2px solid ${isActive(item.to, item.exact) ? 'var(--color-error)' : 'transparent'}`,
                textDecoration: 'none', transition: 'all var(--transition-fast)',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: 'var(--space-2) 0', borderTop: '1px solid var(--color-border)' }}>
          <Link to={ROUTES.HOME} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-5)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', textDecoration: 'none' }}>
            <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
            Public Site
          </Link>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-5)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div style={{ flex: 1, marginLeft: 240, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Mobile header */}
        <header style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, zIndex: 'var(--z-elevated)' }} className="hide-desktop">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.06)', border: 'none', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-primary)' }}>Admin</span>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}><LogOut size={16} /></button>
        </header>

        <div style={{ flex: 1, padding: 'var(--space-8)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
