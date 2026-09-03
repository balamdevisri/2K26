import {
  Users, CreditCard, QrCode, FileText, BarChart3,
  Clock, TrendingUp, Download
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

function MetricCard({ label, value, icon, trend, variant }: {
  label: string; value: string | number; icon: React.ReactNode;
  trend?: string; variant: 'primary' | 'success' | 'warning' | 'error' | 'info';
}) {
  const colors = {
    primary: { icon: 'rgba(91,110,245,0.15)', color: 'var(--color-brand-primary)', border: 'rgba(91,110,245,0.3)' },
    success: { icon: 'var(--color-success-bg)', color: 'var(--color-success)', border: 'rgba(16,185,129,0.3)' },
    warning: { icon: 'var(--color-warning-bg)', color: 'var(--color-warning)', border: 'rgba(245,158,11,0.3)' },
    error: { icon: 'var(--color-error-bg)', color: 'var(--color-error)', border: 'rgba(239,68,68,0.3)' },
    info: { icon: 'var(--color-info-bg)', color: 'var(--color-info)', border: 'rgba(59,130,246,0.3)' },
  };
  const c = colors[variant];

  return (
    <div className="card card-hover">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: c.icon, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color }}>
          {icon}
        </div>
        {trend && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', color: 'var(--color-success)', fontWeight: 600 }}>
            <TrendingUp size={12} />
            {trend}
          </div>
        )}
      </div>
      <div style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontFamily: 'var(--font-display)', fontWeight: 800, color: c.color, lineHeight: 1, marginBottom: 4 }}>
        {value}
      </div>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </div>
    </div>
  );
}

export function AdminDashboard() {
  // In production these come from Firestore aggregation queries or a summary document
  const metrics = {
    totalRegistrations: 0,
    confirmedPayments: 0,
    pendingPayments: 0,
    totalTeams: 0,
    checkedIn: 0,
    submissions: 0,
    judgingComplete: 0,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Admin Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          FUZON 2K26 Operations Center · Real-time overview
        </p>
      </div>

      {/* Metrics */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-8)' }}>
        <MetricCard label="Total Registrations" value={metrics.totalRegistrations} icon={<Users size={20} />} variant="primary" />
        <MetricCard label="Confirmed Payments" value={metrics.confirmedPayments} icon={<CreditCard size={20} />} variant="success" />
        <MetricCard label="Pending Payments" value={metrics.pendingPayments} icon={<Clock size={20} />} variant="warning" />
        <MetricCard label="Teams Formed" value={metrics.totalTeams} icon={<Users size={20} />} variant="info" />
        <MetricCard label="Checked In" value={metrics.checkedIn} icon={<QrCode size={20} />} variant="success" />
        <MetricCard label="Submissions" value={metrics.submissions} icon={<FileText size={20} />} variant="primary" />
        <MetricCard label="Judging Done" value={metrics.judgingComplete} icon={<BarChart3 size={20} />} variant="info" />
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Download size={24} style={{ color: 'var(--color-text-muted)' }} />
          <Link to={ROUTES.ADMIN_EXPORTS} style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-brand-primary)', textDecoration: 'none' }}>
            Export Data
          </Link>
        </div>
      </div>

      {/* Quick Actions + Status */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        {/* Quick admin actions */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-5)', fontSize: 'var(--text-base)' }}>
            Quick Actions
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {[
              { label: 'Verify Pending Payments', to: ROUTES.ADMIN_PAYMENTS, badge: metrics.pendingPayments, color: 'warning' },
              { label: 'View All Participants', to: ROUTES.ADMIN_PARTICIPANTS, badge: metrics.totalRegistrations, color: 'info' },
              { label: 'Manage Problem Statements', to: ROUTES.ADMIN_PROBLEMS, badge: null, color: 'primary' },
              { label: 'Post Announcement', to: ROUTES.ADMIN_ANNOUNCEMENTS, badge: null, color: 'primary' },
              { label: 'Monitor Check-ins', to: ROUTES.ADMIN_CHECKINS, badge: metrics.checkedIn, color: 'success' },
              { label: 'Event Settings', to: ROUTES.ADMIN_SETTINGS, badge: null, color: 'neutral' },
            ].map((item, i) => (
              <Link key={i} to={item.to} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-tertiary)', textDecoration: 'none', transition: 'background var(--transition-fast)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-tertiary)'}
              >
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {item.badge !== null && (
                    <span className="badge badge-neutral">{item.badge}</span>
                  )}
                  <span style={{ color: 'var(--color-text-muted)' }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-5)', fontSize: 'var(--text-base)' }}>
            System Status
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { label: 'Registration', status: 'OPEN', color: 'var(--color-success)' },
              { label: 'Payment Gateway', status: 'Active', color: 'var(--color-success)' },
              { label: 'Firebase Auth', status: 'Online', color: 'var(--color-success)' },
              { label: 'Firestore', status: 'Online', color: 'var(--color-success)' },
              { label: 'Event Stage', status: 'Registration', color: 'var(--color-brand-primary)' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-sm)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>{item.label}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: item.color, fontWeight: 600, fontSize: 'var(--text-xs)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, display: 'inline-block' }} />
                  {item.status}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'rgba(91,110,245,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(91,110,245,0.2)' }}>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
              Configure event settings (dates, fees, team limits) in{' '}
              <Link to={ROUTES.ADMIN_SETTINGS} style={{ color: 'var(--color-brand-primary)', textDecoration: 'none' }}>Settings</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
