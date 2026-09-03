import { useState } from 'react';
import { Award, CheckCircle, ExternalLink, GitBranch, Save, Lock, AlertCircle, BarChart2 } from 'lucide-react';
import { JUDGING_CRITERIA } from '../../constants/judgingCriteria';

interface TeamEvaluation {
  teamId: string;
  teamName: string;
  projectTitle: string;
  track: string;
  repoLink: string;
  demoLink: string;
  description: string;
  scores: Record<string, number>;
  comments: string;
  isFinalized: boolean;
}

const MOCK_ASSIGNED_TEAMS: TeamEvaluation[] = [
  {
    teamId: 'FUZON-TEAM-409',
    teamName: 'CyberKnights',
    projectTitle: 'EcoGrid: Smart Renewable Energy Dispatcher',
    track: 'AI / Machine Learning',
    repoLink: 'https://github.com/cyberknights/ecogrid',
    demoLink: 'https://ecogrid-demo.web.app',
    description: 'An AI-powered local grid balancer that predicts peak load surges and dynamically shifts battery storage dispatches.',
    scores: {
      innovation: 18,
      technicalImplementation: 22,
      problemSolving: 18,
      uiUx: 14,
      impactPracticalValue: 9,
      presentation: 9,
    },
    comments: 'Solid architecture and impressive prototype demonstration.',
    isFinalized: false,
  },
  {
    teamId: 'FUZON-TEAM-410',
    teamName: 'ByteBusters',
    projectTitle: 'MediVerify: Tamper-proof Rx Records',
    track: 'Web & Mobile',
    repoLink: 'https://github.com/bytebusters/mediverify',
    demoLink: '',
    description: 'Web portal for digital verification of pharmaceutical prescriptions preventing counterfeit dispensing.',
    scores: {
      innovation: 15,
      technicalImplementation: 18,
      problemSolving: 16,
      uiUx: 12,
      impactPracticalValue: 8,
      presentation: 7,
    },
    comments: 'Good UI, but needed deeper database constraint handling.',
    isFinalized: true,
  },
];

export function JudgeDashboard() {
  const [teams, setTeams] = useState<TeamEvaluation[]>(MOCK_ASSIGNED_TEAMS);
  const [selectedTeamId, setSelectedTeamId] = useState<string>(teams[0]?.teamId || '');
  const [saveToast, setSaveToast] = useState('');

  const currentTeam = teams.find(t => t.teamId === selectedTeamId);

  const calculateTotal = (scores: Record<string, number>) => {
    return Object.values(scores).reduce((acc, curr) => acc + (curr || 0), 0);
  };

  const handleScoreChange = (criterionKey: string, val: number, maxScore: number) => {
    if (!currentTeam || currentTeam.isFinalized) return;
    const clamped = Math.max(0, Math.min(maxScore, val));

    setTeams(prev => prev.map(t => {
      if (t.teamId === currentTeam.teamId) {
        return {
          ...t,
          scores: { ...t.scores, [criterionKey]: clamped }
        };
      }
      return t;
    }));
  };

  const handleCommentChange = (val: string) => {
    if (!currentTeam || currentTeam.isFinalized) return;
    setTeams(prev => prev.map(t => {
      if (t.teamId === currentTeam.teamId) {
        return { ...t, comments: val };
      }
      return t;
    }));
  };

  const handleSaveDraft = () => {
    setSaveToast('Scores saved as draft. You can continue updating before finalization.');
    setTimeout(() => setSaveToast(''), 3500);
  };

  const handleFinalize = () => {
    if (!currentTeam) return;
    if (window.confirm('Finalize score? Once finalized, scores cannot be modified.')) {
      setTeams(prev => prev.map(t => {
        if (t.teamId === currentTeam.teamId) {
          return { ...t, isFinalized: true };
        }
        return t;
      }));
      setSaveToast('Evaluation finalized and submitted to the Results Engine.');
      setTimeout(() => setSaveToast(''), 4000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 1100, margin: '0 auto', padding: 'var(--space-8) var(--space-4)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div className="badge badge-primary" style={{ marginBottom: 'var(--space-2)' }}>
            Judges Evaluation Console
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800 }}>
            Assigned Team Evaluation
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Strict evaluation across the 6 standard criteria (Total: 100 points).
          </p>
        </div>
      </div>

      {saveToast && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          <CheckCircle size={16} /> {saveToast}
        </div>
      )}

      {/* Main Layout: Sidebar of Teams + Evaluation Sheet */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 'var(--space-6)' }}>
        {/* Teams List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
            Assigned Teams ({teams.length})
          </h3>
          {teams.map(t => {
            const total = calculateTotal(t.scores);
            const isSelected = t.teamId === selectedTeamId;
            return (
              <div
                key={t.teamId}
                className="card card-hover"
                onClick={() => setSelectedTeamId(t.teamId)}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-border)',
                  background: isSelected ? 'rgba(91,110,245,0.08)' : 'var(--color-bg-card)',
                  padding: 'var(--space-4)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                    {t.teamName}
                  </span>
                  {t.isFinalized ? (
                    <span className="badge badge-success"><Lock size={10} /> Final</span>
                  ) : (
                    <span className="badge badge-warning">Draft</span>
                  )}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                  {t.track}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--text-xs)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Current Score:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-brand-primary)' }}>
                    {total} / 100
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scoring Sheet */}
        {currentTeam ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {/* Team details & links */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <span className="font-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-brand-primary)' }}>
                    {currentTeam.teamId} · {currentTeam.track}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: 2 }}>
                    {currentTeam.projectTitle}
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  {currentTeam.repoLink && (
                    <a href={currentTeam.repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <GitBranch size={14} /> Repository
                    </a>
                  )}
                  {currentTeam.demoLink && (
                    <a href={currentTeam.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {currentTeam.description}
              </p>
            </div>

            {/* Criteria Evaluation Form */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <BarChart2 size={20} style={{ color: 'var(--color-brand-primary)' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                    Scoring Matrix
                  </h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Aggregated Total:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-brand-primary)' }}>
                    {calculateTotal(currentTeam.scores)} / 100
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {Object.entries(JUDGING_CRITERIA).map(([key, config]) => {
                  const currentScore = currentTeam.scores[key] ?? 0;

                  return (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                            {config.label}
                          </span>
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginLeft: 8 }}>
                            ({config.description})
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                          <input
                            type="number"
                            min={0}
                            max={config.maxScore}
                            disabled={currentTeam.isFinalized}
                            value={currentScore}
                            onChange={e => handleScoreChange(key, parseFloat(e.target.value) || 0, config.maxScore)}
                            style={{
                              width: 65,
                              padding: 'var(--space-1) var(--space-2)',
                              background: 'var(--color-bg-tertiary)',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-md)',
                              color: 'var(--color-text-primary)',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              textAlign: 'center',
                            }}
                          />
                          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                            / {config.maxScore}
                          </span>
                        </div>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={config.maxScore}
                        step={0.5}
                        disabled={currentTeam.isFinalized}
                        value={currentScore}
                        onChange={e => handleScoreChange(key, parseFloat(e.target.value), config.maxScore)}
                        style={{ width: '100%', accentColor: 'var(--color-brand-primary)' }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="form-group" style={{ marginTop: 'var(--space-6)' }}>
                <label className="form-label">Judge Comments & Qualitative Feedback</label>
                <textarea
                  className="form-input form-textarea"
                  rows={3}
                  disabled={currentTeam.isFinalized}
                  placeholder="Provide strengths, architectural trade-offs, and presentation feedback..."
                  value={currentTeam.comments}
                  onChange={e => handleCommentChange(e.target.value)}
                />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                {!currentTeam.isFinalized ? (
                  <>
                    <button type="button" className="btn btn-secondary" onClick={handleSaveDraft}>
                      <Save size={16} /> Save Evaluation Draft
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleFinalize}>
                      <Award size={16} /> Finalize Score
                    </button>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                    <Lock size={16} /> Evaluation Finalized & Locked
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="card" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          <AlertCircle size={14} style={{ color: 'var(--color-info)' }} />
          Scores are saved individually per judge and aggregate dynamically in the Admin Results calculation matrix.
        </div>
      </div>
    </div>
  );
}

export const JudgeTeamsPage = () => <JudgeDashboard />;
export const SubmissionViewPage = () => <JudgeDashboard />;
export const ScoreEntryPage = () => <JudgeDashboard />;
