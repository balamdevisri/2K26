import { useState } from 'react';
import { Trophy, Award, BarChart3, Star, Clock } from 'lucide-react';
import { RESULT_STATUS, type ResultStatus } from '../../constants/statusEnums';
import { JUDGING_CRITERIA } from '../../constants/judgingCriteria';

export function ResultPage() {
  const [resultStatus] = useState<ResultStatus>(RESULT_STATUS.DRAFT);

  const isPublished = resultStatus === RESULT_STATUS.PUBLISHED;

  // Mock results for when published
  const teamResult = {
    rank: 2,
    teamName: 'CyberKnights',
    aggregatedScore: 88.5,
    criteriaScores: {
      innovation: 18,
      technicalImplementation: 22.5,
      problemSolving: 17.5,
      uiUx: 13.5,
      impactPracticalValue: 8.5,
      presentation: 8.5,
    },
    comments: 'Superb architecture with solid offline-first resilience. Impressive demonstration.',
  };

  if (!isPublished) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: 'var(--space-12)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(91,110,245,0.15)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <Clock size={32} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
            Judging & Validation in Progress
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto var(--space-6)' }}>
            The judging panel is currently scoring submissions across the 6 weighted criteria. Once finalized and approved by the organizing committee, your official score and ranking will appear here.
          </p>
          <div className="badge badge-primary">
            Event Stage: Evaluation
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 760, margin: '0 auto' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Official Hackathon Results
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Validated by the FUZON 2K26 Evaluation Committee.
        </p>
      </div>

      {/* Rank Card */}
      <div className="card card-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-8)' }}>
        <div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-brand-primary)' }}>
            Final Standings
          </span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--color-text-primary)', marginTop: 4 }}>
            Rank #{teamResult.rank}
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 4 }}>
            Team: {teamResult.teamName}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Trophy size={48} style={{ color: '#F59E0B', margin: '0 0 var(--space-2) auto' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-success)' }}>
            {teamResult.aggregatedScore} / 100
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Aggregate Score</span>
        </div>
      </div>

      {/* Criteria Breakdown */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
          <BarChart3 size={20} style={{ color: 'var(--color-brand-primary)' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
            Criteria Score Breakdown
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {Object.entries(JUDGING_CRITERIA).map(([key, config]) => {
            const score = (teamResult.criteriaScores as any)[key] || 0;
            const percentage = (score / config.maxScore) * 100;

            return (
              <div key={key} style={{ padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                      {config.label}
                    </span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginLeft: 8 }}>
                      (Weight: {config.weight}%)
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-brand-primary)' }}>
                    {score} / {config.maxScore}
                  </span>
                </div>
                <div style={{ height: 6, background: 'var(--color-bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${percentage}%`, background: 'var(--color-brand-gradient)', borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>

        {teamResult.comments && (
          <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
              <Star size={14} style={{ color: '#F59E0B' }} /> Judge Panel Feedback
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 4, fontStyle: 'italic' }}>
              "{teamResult.comments}"
            </p>
          </div>
        )}
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
            Digital Certificate of Achievement
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
            Issued by Department of CSE, Sri Krishnadevaraya University College of Engineering & Technology.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => alert('Certificate download will be unlocked after the valedictory ceremony.')}>
          <Award size={16} /> Download Certificate
        </button>
      </div>
    </div>
  );
}
