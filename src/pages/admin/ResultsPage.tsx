import { useState } from 'react';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';

interface RankedTeam {
  rank: number;
  teamId: string;
  teamName: string;
  track: string;
  aggregateScore: number;
  techScore: number;
  innovationScore: number;
  status: string;
}

const MOCK_RANKED_TEAMS: RankedTeam[] = [
  {
    rank: 1,
    teamId: 'FUZON-TEAM-409',
    teamName: 'CyberKnights',
    track: 'AI / Machine Learning',
    aggregateScore: 90.5,
    techScore: 23.5,
    innovationScore: 19.0,
    status: 'VALIDATED',
  },
  {
    rank: 2,
    teamId: 'FUZON-TEAM-410',
    teamName: 'ByteBusters',
    track: 'Web & Mobile',
    aggregateScore: 84.0,
    techScore: 21.0,
    innovationScore: 17.5,
    status: 'VALIDATED',
  },
];

export function AdminResultsPage() {
  const [teams] = useState<RankedTeam[]>(MOCK_RANKED_TEAMS);
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState('');

  const handlePublish = () => {
    if (window.confirm('Publish final results to the public /results route and participant dashboards?')) {
      setPublished(true);
      setToast('Official Results Published! Accessible on public /results portal.');
      setTimeout(() => setToast(''), 4000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
            Results Calculation & Publishing Engine
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Weighted scores aggregated across all judges. Tie-breaker rules: 1st Tech Implementation, 2nd Innovation.
          </p>
        </div>
        <div>
          {published ? (
            <span className="badge badge-success" style={{ padding: 'var(--space-2) var(--space-4)' }}>
              <CheckCircle2 size={14} /> Results Live & Published
            </span>
          ) : (
            <button className="btn btn-primary" onClick={handlePublish}>
              <Award size={16} /> Publish Results to Public Site
            </button>
          )}
        </div>
      </div>

      {toast && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          <CheckCircle2 size={16} /> {toast}
        </div>
      )}

      {/* Tie-breaker notice */}
      <div className="card card-brand">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <TrendingUp size={18} style={{ color: 'var(--color-brand-primary)' }} />
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Configured Tie-Break Precedence
          </span>
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 4 }}>
          In case of tie: Higher Technical Implementation score → Higher Innovation score → Higher Problem Solving score.
        </p>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>Track</th>
              <th>Technical (25%)</th>
              <th>Innovation (20%)</th>
              <th>Aggregated Total</th>
              <th>Validation Status</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(t => (
              <tr key={t.teamId}>
                <td style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-base)', color: t.rank === 1 ? '#F59E0B' : 'var(--color-text-primary)' }}>
                  #{t.rank}
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{t.teamName}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{t.teamId}</div>
                </td>
                <td style={{ fontSize: 'var(--text-xs)' }}>{t.track}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{t.techScore}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{t.innovationScore}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 'var(--text-sm)', color: 'var(--color-brand-primary)' }}>
                  {t.aggregateScore} / 100
                </td>
                <td>
                  <span className="badge badge-success">{t.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminExportsPage() {
  const exportCategory = (name: string) => {
    const csvContent = `Export: ${name}\nTimestamp: ${new Date().toISOString()}\nFUZON 2K26 CSE SKUCET\n`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FUZON_${name.replace(/\s+/g, '_')}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
          Data Backup & Operational Exports
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Export point-in-time operational manifests for venue management, printed rosters, and Google Sheets sync.
        </p>
      </div>

      <div className="grid-3">
        {[
          { title: 'Participants Master Sheet', desc: 'All registrations with roll numbers, contact info, and payment status.' },
          { title: 'Teams & Problem Assignments', desc: 'Squad groupings, selected tracks, and leader details.' },
          { title: 'Gate Check-in Manifest', desc: 'Checked-in attendees and pending arrivals for entrance volunteers.' },
          { title: 'Judge Evaluations & Scores', desc: 'Raw score matrices across all 6 criteria for audit.' },
        ].map(item => (
          <div key={item.title} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700 }}>
              {item.title}
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', flex: 1 }}>
              {item.desc}
            </p>
            <button className="btn btn-secondary" onClick={() => exportCategory(item.title)}>
              Download CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminSettingsPage() {
  const [fee, setFee] = useState('500');
  const [venue, setVenue] = useState('SKUCET Campus, Ananthapuramu');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 680 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
          Event Configuration Settings
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Configure dynamic parameters without code redeployment.
        </p>
      </div>

      {saved && (
        <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          Settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div className="form-group">
          <label className="form-label">Registration Fee (₹ INR)</label>
          <input
            type="number"
            className="form-input"
            value={fee}
            onChange={e => setFee(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Official Venue</label>
          <input
            type="text"
            className="form-input"
            value={venue}
            onChange={e => setVenue(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
          Save Configuration
        </button>
      </form>
    </div>
  );
}

export const AdminSubmissionsPage = () => (
  <div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
      Team Submissions Review
    </h1>
    <div className="card">
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
        All finalized team repositories and prototypes queued for judge scoring.
      </p>
    </div>
  </div>
);

export const AdminJudgesPage = () => (
  <div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
      Judges & Track Allocation
    </h1>
    <div className="card">
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
        Assign evaluation panels and distribute team cohorts to judges.
      </p>
    </div>
  </div>
);

export const AdminScoresPage = () => (
  <div>
    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-4)' }}>
      Raw Score Audit Matrix
    </h1>
    <div className="card">
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
        Inspect judge-by-judge criteria breakdowns before publishing rankings.
      </p>
    </div>
  </div>
);
