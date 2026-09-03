import { Trophy, Lock } from 'lucide-react';

export function ResultsPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <Trophy size={12} />
            Results
          </div>
          <h1>FUZON 2K26 Results</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Results will be published here after the judging phase is complete and validated by the organizing team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 600, textAlign: 'center' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-12)' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(91,110,245,0.12)', border: '1px solid rgba(91,110,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)' }}>
              <Lock size={32} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                Results Not Yet Published
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
                Results will appear here once the hackathon is complete, scores are finalized by all judges, and results are validated and published by the organizing team.
              </p>
            </div>
            <div className="badge badge-neutral">
              Coming After the Hackathon
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
