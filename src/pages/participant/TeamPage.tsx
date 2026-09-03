import { useState } from 'react';
import { Users, Copy, Check, Lock, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

export function TeamPage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState('PS-001');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Mock team state — in full production connected to Firestore 'teams' collection
  const team = {
    teamId: 'FUZON-TEAM-409',
    teamName: 'CyberKnights',
    leaderName: user?.displayName || 'Alex Mercer',
    isLeader: true,
    isLocked: false,
    selectedTrack: 'AI / Machine Learning',
    members: [
      { id: '1', name: user?.displayName || 'Alex Mercer', email: user?.email || 'alex@skucet.ac.in', role: 'Team Leader', checkedIn: true },
      { id: '2', name: 'Rohan Sharma', email: 'rohan.s@skucet.ac.in', role: 'Member', checkedIn: false },
      { id: '3', name: 'Priya Patel', email: 'priya.p@skucet.ac.in', role: 'Member', checkedIn: false },
    ],
    maxMembers: 4,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(team.teamId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectProblem = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          My Team: {team.teamName}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Manage your teammates, invite code, and selected problem statement.
        </p>
      </div>

      {/* Team Code & Invite Banner */}
      <div className="card card-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#818CF8', fontWeight: 600 }}>
            Shareable Team Code
          </span>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: 4 }}>
            {team.teamId}
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 4 }}>
            Share this code with your teammates during their registration to join your squad.
          </p>
        </div>
        <button className="btn btn-primary" onClick={copyCode}>
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Code Copied!' : 'Copy Invite Code'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Members List */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Users size={20} style={{ color: 'var(--color-brand-primary)' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
                Team Members ({team.members.length}/{team.maxMembers})
              </h3>
            </div>
            <span className="badge badge-primary">
              {team.maxMembers - team.members.length} spots remaining
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {team.members.map(member => (
              <div
                key={member.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                    {member.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {member.email}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span className={`badge ${member.role === 'Team Leader' ? 'badge-primary' : 'badge-neutral'}`}>
                    {member.role}
                  </span>
                  <span className={`badge ${member.checkedIn ? 'badge-success' : 'badge-warning'}`}>
                    {member.checkedIn ? 'Checked-in' : 'Pending Check-in'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Problem Statement Selection */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <BookOpen size={20} style={{ color: 'var(--color-brand-accent)' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
              Problem Statement
            </h3>
          </div>

          {team.isLocked ? (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-warning-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(245,158,11,0.3)' }}>
              <Lock size={18} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>Selection Locked</div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  The hackathon has officially started. Problem statement changes are locked unless authorized by an organizer.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSelectProblem} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Choose Problem Statement</label>
                <select
                  className="form-input form-select"
                  value={selectedProblem}
                  onChange={e => setSelectedProblem(e.target.value)}
                >
                  <option value="PS-001">PS-001: Smart Campus Utility Monitor (IoT & Hardware)</option>
                  <option value="PS-002">PS-002: Student Grievance & Feedback Portal (Web & Mobile)</option>
                  <option value="PS-003">PS-003: AI-Assisted Academic Resource Finder (AI/ML)</option>
                  <option value="PS-004">PS-004: Decentralized Credential Verification (Open)</option>
                </select>
              </div>

              {saveSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-success)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                  <Check size={14} /> Problem statement saved successfully!
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                <Sparkles size={16} /> Save Problem Choice
              </button>
            </form>
          )}

          <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <AlertCircle size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
            Selection becomes immutable once the hackathon countdown ends.
          </div>
        </div>
      </div>
    </div>
  );
}
