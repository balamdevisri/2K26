import { useState, type FormEvent } from 'react';
import { Plus, Trash2, Send } from 'lucide-react';
import { ANNOUNCEMENT_TYPE } from '../../constants/statusEnums';

interface AdminAnnouncement {
  id: string;
  title: string;
  message: string;
  type: string;
  audience: string;
  createdAt: string;
  isActive: boolean;
}

const MOCK_ADMIN_ANNOUNCEMENTS: AdminAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Wi-Fi Credentials & Lab Access',
    message: 'Connect to SKUCET-HACKATHON using your team registration ID as username. Passkey is available at the registration desk.',
    type: ANNOUNCEMENT_TYPE.TECHNICAL,
    audience: 'ALL',
    createdAt: '2026-09-03 10:00',
    isActive: true,
  },
  {
    id: 'ann-2',
    title: 'Mandatory Submission Window & Git Check',
    message: 'All repositories must be initialized fresh during the event window.',
    type: ANNOUNCEMENT_TYPE.URGENT,
    audience: 'PARTICIPANTS',
    createdAt: '2026-09-03 11:30',
    isActive: true,
  },
];

export function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AdminAnnouncement[]>(MOCK_ADMIN_ANNOUNCEMENTS);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<string>(ANNOUNCEMENT_TYPE.GENERAL);
  const [audience, setAudience] = useState('ALL');
  const [success, setSuccess] = useState('');

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newAnn: AdminAnnouncement = {
      id: 'ann-' + Date.now(),
      title: title.trim(),
      message: message.trim(),
      type,
      audience,
      createdAt: 'Just now',
      isActive: true,
    };

    setAnnouncements([newAnn, ...announcements]);
    setTitle('');
    setMessage('');
    setSuccess('Announcement published to live feed!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
          Announcements Broadcaster
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Broadcast real-time messages, urgent alerts, and operational directives.
        </p>
      </div>

      {success && (
        <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Create Form */}
        <form onSubmit={handleCreate} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Plus size={18} style={{ color: 'var(--color-brand-primary)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
              Compose Announcement
            </h3>
          </div>

          <div className="form-group">
            <label className="form-label required">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Lunch Served at Dining Hall B"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-input form-select" value={type} onChange={e => setType(e.target.value)}>
                <option value={ANNOUNCEMENT_TYPE.GENERAL}>GENERAL</option>
                <option value={ANNOUNCEMENT_TYPE.URGENT}>URGENT (Top Banner)</option>
                <option value={ANNOUNCEMENT_TYPE.TECHNICAL}>TECHNICAL</option>
                <option value={ANNOUNCEMENT_TYPE.REMINDER}>REMINDER</option>
                <option value={ANNOUNCEMENT_TYPE.RESULT}>RESULT</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select className="form-input form-select" value={audience} onChange={e => setAudience(e.target.value)}>
                <option value="ALL">ALL (Everyone)</option>
                <option value="PARTICIPANTS">PARTICIPANTS Only</option>
                <option value="JUDGES">JUDGES Only</option>
                <option value="VOLUNTEERS">VOLUNTEERS Only</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label required">Message Content</label>
            <textarea
              className="form-input form-textarea"
              rows={4}
              placeholder="Write the full broadcast announcement..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            <Send size={16} /> Broadcast Now
          </button>
        </form>

        {/* Existing Announcements */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
            Active Announcements ({announcements.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxHeight: 480, overflowY: 'auto' }}>
            {announcements.map(a => (
              <div
                key={a.id}
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 'var(--space-3)',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 2 }}>
                    <span className={`badge ${a.type === ANNOUNCEMENT_TYPE.URGENT ? 'badge-error' : 'badge-primary'}`}>
                      {a.type}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{a.audience}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                    {a.message}
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-icon"
                  style={{ color: 'var(--color-error)' }}
                  onClick={() => handleDelete(a.id)}
                  title="Delete announcement"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminProblemsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
          Problem Statements Management
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Publish and configure tracks, constraints, and requirements.
        </p>
      </div>

      <div className="card">
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          4 Problem statements currently published and open for team selection.
        </p>
      </div>
    </div>
  );
}
