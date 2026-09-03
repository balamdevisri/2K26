import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle, Clock, QrCode, Users, FileText,
  Bell, ChevronRight, Zap, Copy
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../features/auth/AuthContext';
import { ROUTES } from '../../constants/routes';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

// ─── Event Stage Indicator ────────────────────────────────────────────────────
const STAGES = ['Registration', 'Hacking', 'Submission', 'Judging', 'Results'];

function EventStageIndicator({ currentStage }: { currentStage: string }) {
  const currentIndex = STAGES.findIndex(s => s.toLowerCase() === currentStage.toLowerCase());

  return (
    <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>Event Stage</h3>
        <span className="badge badge-primary">
          <span className="status-dot live" />
          {STAGES[currentIndex] || 'Registration'}
        </span>
      </div>

      <div className="event-stage" style={{ padding: 'var(--space-5) var(--space-3)' }}>
        {STAGES.map((stage, i) => {
          const isCompleted = i < currentIndex;
          const isActive = i === currentIndex;

          return (
            <div key={stage} className={`event-stage-item ${isCompleted ? 'completed' : isActive ? 'active' : ''}`}>
              <div className="event-stage-dot">
                {isCompleted ? <CheckCircle size={14} /> : isActive ? <Zap size={12} /> : <span style={{ fontSize: 10, fontWeight: 700 }}>{i + 1}</span>}
              </div>
              <span className="event-stage-label">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Status Card ─────────────────────────────────────────────────────────────
function StatusCard({
  title, value, icon, variant, action
}: {
  title: string;
  value: string;
  icon: ReactNode;
  variant: 'success' | 'warning' | 'info' | 'neutral';
  action?: { label: string; to: string };
}) {
  const variantMap = {
    success: { bg: 'var(--color-success-bg)', border: 'rgba(16,185,129,0.3)', color: 'var(--color-success)' },
    warning: { bg: 'var(--color-warning-bg)', border: 'rgba(245,158,11,0.3)', color: 'var(--color-warning)' },
    info: { bg: 'var(--color-info-bg)', border: 'rgba(59,130,246,0.3)', color: 'var(--color-info)' },
    neutral: { bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.3)', color: 'var(--color-text-muted)' },
  };
  const v = variantMap[variant];

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: v.bg, border: `1px solid ${v.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: v.color }}>
          {icon}
        </div>
        {action && (
          <Link to={action.to} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-primary)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2 }}>
            {action.label} <ChevronRight size={12} />
          </Link>
        )}
      </div>
      <div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: v.color }}>{value}</p>
      </div>
    </div>
  );
}

// ─── Main Dashboard Page ──────────────────────────────────────────────────────
export function DashboardPage() {
  const { user } = useAuth();

  // In production these would come from Firestore via useDocument / useCollection hooks
  const mockRegistration = {
    registrationId: 'FUZON-2K26-DEMO',
    status: 'CONFIRMED',
    paymentStatus: 'SUCCESS',
    teamName: 'Code Crushers',
    teamId: 'FUZON-TEAM-001',
    checkedIn: false,
    submissionStatus: null,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
          Welcome, {user?.displayName?.split(' ')[0] || 'Participant'}! 👋
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          FUZON 2K26 · Dept. of CSE, SKUCET
        </p>
      </div>

      {/* Event Stage */}
      <EventStageIndicator currentStage="Registration" />

      {/* Status Grid */}
      <div className="grid-4" style={{ marginBottom: 'var(--space-6)' }}>
        <StatusCard
          title="Registration"
          value="Confirmed ✓"
          icon={<CheckCircle size={18} />}
          variant="success"
        />
        <StatusCard
          title="Payment"
          value="Verified ✓"
          icon={<CheckCircle size={18} />}
          variant="success"
        />
        <StatusCard
          title="Team"
          value={mockRegistration.teamName}
          icon={<Users size={18} />}
          variant="info"
          action={{ label: 'View', to: ROUTES.DASHBOARD_TEAM }}
        />
        <StatusCard
          title="Check-in"
          value="Not yet"
          icon={<Clock size={18} />}
          variant="neutral"
          action={{ label: 'Details', to: ROUTES.DASHBOARD_CHECKIN }}
        />
      </div>

      {/* Registration ID + QR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <div className="card">
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            Your Registration ID
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              color: 'var(--color-brand-primary)',
              background: 'rgba(91,110,245,0.1)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(91,110,245,0.25)',
              flex: 1,
            }}>
              {mockRegistration.registrationId}
            </div>
            <button
              className="btn btn-secondary btn-icon"
              onClick={() => handleCopy(mockRegistration.registrationId)}
              title="Copy"
            >
              <Copy size={15} />
            </button>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Present this ID to the volunteer at check-in if the QR scan fails.
          </p>
          <Link to={ROUTES.DASHBOARD_CHECKIN} className="btn btn-secondary" style={{ marginTop: 'var(--space-4)', width: '100%', justifyContent: 'center' }}>
            <QrCode size={16} />
            View Check-in QR
          </Link>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>
            Check-in QR Code
          </p>
          <div style={{ padding: 'var(--space-3)', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <QRCodeSVG value={mockRegistration.registrationId} size={120} level="H" includeMargin={false} />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center' }}>
            Show this on event day for check-in
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>
          Quick Actions
        </h3>
        <div className="grid-3">
          {[
            { icon: <Users size={20} />, label: 'Manage Team', desc: 'View members, invite, select problem', to: ROUTES.DASHBOARD_TEAM, variant: 'info' },
            { icon: <Bell size={20} />, label: 'Announcements', desc: 'Stay updated with event news', to: ROUTES.DASHBOARD_ANNOUNCEMENTS, variant: 'warning' },
            { icon: <FileText size={20} />, label: 'Submission', desc: 'Draft and submit your project', to: ROUTES.DASHBOARD_SUBMISSION, variant: 'success' },
          ].map((item, i) => (
            <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
              <div className="card card-hover" style={{ background: 'var(--color-bg-tertiary)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', height: '100%' }}>
                <div style={{ color: 'var(--color-brand-primary)' }}>{item.icon}</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{item.desc}</p>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--color-text-muted)', marginTop: 'auto' }} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Announcement Preview */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
            Latest Announcements
          </h3>
          <Link to={ROUTES.DASHBOARD_ANNOUNCEMENTS} style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-primary)', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
            View All <ChevronRight size={12} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-8) 0', color: 'var(--color-text-muted)' }}>
          <Bell size={32} style={{ opacity: 0.3 }} />
          <p style={{ fontSize: 'var(--text-sm)' }}>No announcements yet. Check back soon!</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
