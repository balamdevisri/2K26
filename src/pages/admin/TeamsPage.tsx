import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

interface AdminTeam {
  teamId: string;
  teamName: string;
  leader: string;
  membersCount: number;
  maxMembers: number;
  problemId: string;
  isLocked: boolean;
  status: string;
}

const MOCK_TEAMS: AdminTeam[] = [
  {
    teamId: 'FUZON-TEAM-409',
    teamName: 'CyberKnights',
    leader: 'Alex Mercer',
    membersCount: 3,
    maxMembers: 4,
    problemId: 'PS-001 (Smart Campus Utility)',
    isLocked: false,
    status: 'FORMING',
  },
  {
    teamId: 'FUZON-TEAM-410',
    teamName: 'ByteBusters',
    leader: 'Vikram Reddy',
    membersCount: 4,
    maxMembers: 4,
    problemId: 'PS-002 (Grievance Portal)',
    isLocked: true,
    status: 'HACKING',
  },
];

export function AdminTeamsPage() {
  const [teams, setTeams] = useState<AdminTeam[]>(MOCK_TEAMS);

  const toggleLock = (teamId: string) => {
    setTeams(prev => prev.map(t => {
      if (t.teamId === teamId) {
        return { ...t, isLocked: !t.isLocked };
      }
      return t;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
          Teams Administration ({teams.length})
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Monitor squads, problem statement assignments, and toggle modifications locks.
        </p>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Team ID</th>
              <th>Team Name</th>
              <th>Leader</th>
              <th>Members</th>
              <th>Problem Statement</th>
              <th>Lock State</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(t => (
              <tr key={t.teamId}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                  {t.teamId}
                </td>
                <td style={{ fontWeight: 600 }}>{t.teamName}</td>
                <td>{t.leader}</td>
                <td>
                  <span className="badge badge-primary">{t.membersCount} / {t.maxMembers}</span>
                </td>
                <td style={{ fontSize: 'var(--text-xs)' }}>{t.problemId}</td>
                <td>
                  {t.isLocked ? (
                    <span className="badge badge-error"><Lock size={12} /> Locked</span>
                  ) : (
                    <span className="badge badge-success"><Unlock size={12} /> Editable</span>
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-sm ${t.isLocked ? 'btn-secondary' : 'btn-ghost'}`}
                    onClick={() => toggleLock(t.teamId)}
                  >
                    {t.isLocked ? 'Unlock Team' : 'Lock Team'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
