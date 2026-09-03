import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Users, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

// Content is admin-configurable; this is the structural placeholder
const RULES_SECTIONS = [
  {
    id: 'eligibility',
    title: 'Eligibility',
    icon: <Users size={18} />,
    content: [
      'Participants must be currently enrolled students at SKUCET or an affiliated institution recognized by Sri Krishnadevaraya University.',
      'All team members must carry a valid student ID card and produce it on the day of the event.',
      'Faculty members, alumni, and non-students are not eligible to participate as team members.',
      'Each participant may register for and be part of only one team.',
    ],
  },
  {
    id: 'team',
    title: 'Team Requirements',
    icon: <Users size={18} />,
    content: [
      'Team size requirements are configured by the organizing committee — check the registration page for current limits.',
      'Each team must designate a single team leader who is the primary point of contact.',
      'Team members must complete individual registration and payment before the deadline.',
      'Teams may include members from different departments or years.',
      'Once the hackathon begins, the team composition and team leader cannot be changed without explicit admin approval.',
    ],
  },
  {
    id: 'problem',
    title: 'Problem Statement & Track',
    icon: <CheckCircle size={18} />,
    content: [
      'Each team selects exactly one problem statement from the published list during the registration/team formation phase.',
      'Problem selection is locked once the hackathon officially begins. Changes after lock-in require organizer approval.',
      'Teams must build a solution relevant to their selected problem statement.',
      'Attempting to build for a problem statement other than the one selected without approval will result in disqualification.',
    ],
  },
  {
    id: 'submission',
    title: 'Submission Requirements',
    icon: <CheckCircle size={18} />,
    content: [
      'All code must be written during the hackathon window. Pre-existing projects or codebases are not permitted.',
      'Teams may use open-source libraries, APIs, and publicly available datasets.',
      'Final submissions must include: a working prototype, a public GitHub repository link, a project description, and the tech stack used.',
      'A demo link or presentation document may be required (see submission form).',
      'Submissions must be finalized before the submission deadline — no extensions will be granted.',
      'Submissions that are not in final-submitted status at the deadline will not be judged.',
    ],
  },
  {
    id: 'judging',
    title: 'Judging & Scoring',
    icon: <CheckCircle size={18} />,
    content: [
      'Submissions are evaluated by an assigned panel of judges.',
      'Criteria: Innovation (20%), Technical Implementation (25%), Problem Solving (20%), UI/UX (15%), Impact & Practical Value (10%), Presentation (10%).',
      'Judge scores are aggregated and validated by the organizing team before results are published.',
      'Judge decisions are final unless a clear scoring error is identified and reported to the organizing committee.',
    ],
  },
  {
    id: 'conduct',
    title: 'Code of Conduct',
    icon: <AlertTriangle size={18} />,
    content: [
      'All participants must treat fellow participants, mentors, judges, and organizers with respect.',
      'Harassment, discrimination, or disruptive behavior of any kind will result in immediate disqualification.',
      'Plagiarism, submitting another team\'s work, or any form of cheating is strictly prohibited.',
      'Participants must not attempt to access other teams\' systems, data, or code.',
      'Organizers reserve the right to disqualify any team found violating these rules.',
    ],
  },
  {
    id: 'restrictions',
    title: 'Restrictions',
    icon: <XCircle size={18} />,
    content: [
      'Using pre-built commercial SaaS products as the primary submission is not permitted.',
      'AI-generated code used extensively without understanding will be flagged during judging.',
      'Participants may not share their work publicly (e.g., on social media) before the results are announced.',
      'Organizers may add or clarify rules before the event. Changes will be announced via the announcement system.',
    ],
  },
];

function RuleSection({ section }: { section: typeof RULES_SECTIONS[0] }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          gap: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'rgba(91,110,245,0.12)', border: '1px solid rgba(91,110,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', flexShrink: 0 }}>
            {section.icon}
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
            {section.title}
          </h3>
        </div>
        <div style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </button>

      {expanded && (
        <ul style={{ marginTop: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingLeft: 0, listStyle: 'none' }}>
          {section.content.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-brand-primary)', marginTop: 7, flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function RulesPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <BookOpen size={12} />
            Rules & Guidelines
          </div>
          <h1>Event Rules</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            All participants are expected to read, understand, and comply with these rules. Violations may result in disqualification.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="card" style={{ background: 'var(--color-warning-bg)', borderColor: 'rgba(245,158,11,0.3)', marginBottom: 'var(--space-8)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
            <AlertTriangle size={20} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--color-warning)', marginBottom: 'var(--space-1)' }}>Important Notice</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                Rules are subject to update before the event begins. Any changes will be communicated via the announcements system. Please check back regularly.
              </p>
            </div>
          </div>

          {RULES_SECTIONS.map(section => (
            <RuleSection key={section.id} section={section} />
          ))}
        </div>
      </section>
    </div>
  );
}
