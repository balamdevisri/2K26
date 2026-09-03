import type { ReactNode } from 'react';
import { Code2, Lock, Loader, Globe, Cpu, Zap, Lightbulb } from 'lucide-react';

// Placeholder — admin configures actual problem statements via /admin/problems
const PLACEHOLDER_PROBLEMS = [
  {
    id: 'PS-001',
    title: 'Smart Campus Utility Monitor',
    track: 'IoT & Hardware',
    status: 'PUBLISHED',
    description: 'Design and build a system that monitors real-time electricity, water, or facility usage across campus buildings and presents actionable insights to administrators.',
    requirements: ['Real-time data collection', 'Dashboard with analytics', 'Alert system for anomalies', 'Historical data view'],
    constraints: ['Solution must work with simulated sensor data during judging', 'Web-based dashboard required'],
  },
  {
    id: 'PS-002',
    title: 'Student Grievance & Feedback Portal',
    track: 'Web & Mobile',
    status: 'PUBLISHED',
    description: 'Build a secure, anonymous grievance submission and tracking system for students, with a moderation interface for faculty and administrators.',
    requirements: ['Anonymous submission option', 'Status tracking for grievances', 'Admin dashboard for moderation', 'Email/notification integration'],
    constraints: ['Must handle authentication', 'Mobile-responsive required'],
  },
  {
    id: 'PS-003',
    title: 'AI-Assisted Academic Resource Finder',
    track: 'AI / Machine Learning',
    status: 'PUBLISHED',
    description: 'Create an intelligent search and recommendation system that helps students find relevant academic papers, notes, and resources based on their subject or query.',
    requirements: ['Natural language search', 'Relevance ranking', 'Bookmarking/saving feature', 'Simple resource ingestion pipeline'],
    constraints: ['Use a free or open-source LLM/embedding model', 'Must demo with at least 50 sample documents'],
  },
  {
    id: 'PS-004',
    title: 'Decentralized Credential Verification',
    track: 'Open Innovation',
    status: 'PUBLISHED',
    description: 'Prototype a system that allows educational institutions to issue tamper-proof digital certificates that employers or other institutions can verify independently.',
    requirements: ['Issuance interface', 'Verifier interface', 'Tamper detection', 'User-friendly verification link'],
    constraints: ['No real blockchain transactions required — simulation acceptable', 'Must explain trust model clearly in presentation'],
  },
];

const TRACK_ICONS: Record<string, ReactNode> = {
  'IoT & Hardware': <Zap size={16} />,
  'Web & Mobile': <Globe size={16} />,
  'AI / Machine Learning': <Cpu size={16} />,
  'Open Innovation': <Lightbulb size={16} />,
};

const STATUS_CONFIG = {
  PUBLISHED: { label: 'Open', variant: 'badge-success' },
  DRAFT: { label: 'Coming Soon', variant: 'badge-neutral' },
  ARCHIVED: { label: 'Archived', variant: 'badge-neutral' },
};

export function ProblemsPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <Code2 size={12} />
            Problem Statements
          </div>
          <h1>Choose Your Challenge</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Teams select one problem statement at the start of the hackathon. Once selected and the event begins, the choice is locked.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ background: 'var(--color-info-bg)', borderColor: 'rgba(59,130,246,0.3)', marginBottom: 'var(--space-8)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <Lock size={20} style={{ color: 'var(--color-info)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--color-info)', marginBottom: 'var(--space-1)' }}>Problem Selection Notice</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                Problem selection is locked once the hackathon officially starts. Study all problem statements before the event begins.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {PLACEHOLDER_PROBLEMS.map(problem => (
              <div key={problem.id} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <span className="font-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', background: 'var(--color-bg-tertiary)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                      {problem.id}
                    </span>
                    <span className={`badge badge-primary`} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
                      {TRACK_ICONS[problem.track]}
                      {problem.track}
                    </span>
                    <span className={`badge ${STATUS_CONFIG[problem.status as keyof typeof STATUS_CONFIG]?.variant}`}>
                      {STATUS_CONFIG[problem.status as keyof typeof STATUS_CONFIG]?.label}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {problem.title}
                </h3>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                  {problem.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
                      Requirements
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {problem.requirements.map((req, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-success)', marginTop: 7, flexShrink: 0 }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
                      Constraints
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {problem.constraints.map((con, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-warning)', marginTop: 7, flexShrink: 0 }} />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="card" style={{ marginTop: 'var(--space-8)', textAlign: 'center', background: 'rgba(91,110,245,0.06)', borderColor: 'rgba(91,110,245,0.2)' }}>
            <Loader size={20} style={{ color: 'var(--color-brand-primary)', margin: '0 auto var(--space-3)' }} />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              Additional problem statements may be added before the event. Registered teams will be notified via announcements.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
