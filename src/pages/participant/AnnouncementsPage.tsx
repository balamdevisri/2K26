import { useState } from 'react';
import { Bell, AlertTriangle, Info, Terminal, CheckCircle2, Filter } from 'lucide-react';

interface AnnouncementItem {
  id: string;
  title: string;
  message: string;
  type: 'URGENT' | 'TECHNICAL' | 'GENERAL' | 'REMINDER' | 'RESULT';
  priority: number;
  audience: string;
  createdAt: string;
}

const MOCK_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Wi-Fi Credentials & Lab Access',
    message: 'Connect to SKUCET-HACKATHON using your team registration ID as username. Passkey is available at the registration desk.',
    type: 'TECHNICAL',
    priority: 1,
    audience: 'ALL',
    createdAt: '10 mins ago',
  },
  {
    id: 'ann-2',
    title: 'Mandatory Submission Window & Git Check',
    message: 'Remember that all repositories must be initialized fresh during the event window. Pre-built code will lead to direct disqualification.',
    type: 'URGENT',
    priority: 1,
    audience: 'PARTICIPANTS',
    createdAt: '1 hour ago',
  },
  {
    id: 'ann-3',
    title: 'Mentor Round 1 Commencing at 2:00 PM',
    message: 'Faculty and industry mentors will be visiting team tables. Please ensure your prototype architecture diagram is ready.',
    type: 'GENERAL',
    priority: 2,
    audience: 'PARTICIPANTS',
    createdAt: '3 hours ago',
  },
];

export function AnnouncementsPage() {
  const [filter, setFilter] = useState<string>('ALL');

  const filtered = filter === 'ALL'
    ? MOCK_ANNOUNCEMENTS
    : MOCK_ANNOUNCEMENTS.filter(a => a.type === filter);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'URGENT':
        return <span className="badge badge-error"><AlertTriangle size={12} /> Urgent</span>;
      case 'TECHNICAL':
        return <span className="badge badge-info"><Terminal size={12} /> Technical</span>;
      case 'RESULT':
        return <span className="badge badge-success"><CheckCircle2 size={12} /> Results</span>;
      default:
        return <span className="badge badge-primary"><Info size={12} /> General</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Announcements & Live Feed
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Real-time broadcasts from the FUZON 2K26 Organizing Committee.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
        <Filter size={16} style={{ color: 'var(--color-text-muted)', marginRight: 4 }} />
        {['ALL', 'URGENT', 'TECHNICAL', 'GENERAL'].map(category => (
          <button
            key={category}
            className={`btn btn-sm ${filter === category ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filtered.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <Bell size={32} style={{ color: 'var(--color-text-muted)', margin: '0 auto var(--space-2)' }} />
            <p style={{ color: 'var(--color-text-secondary)' }}>No announcements in this category.</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              className="card card-hover"
              style={{
                borderLeft: item.type === 'URGENT' ? '4px solid var(--color-error)' : '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {getTypeBadge(item.type)}
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    Audience: {item.audience}
                  </span>
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {item.createdAt}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
