import { CalendarDays, Clock, MapPin, Flag, Code2, Trophy, Mic } from 'lucide-react';

const SCHEDULE = {
  day1: [
    { time: 'TBD', title: 'Registration & Check-in', desc: 'Participants check in, receive ID badges and kits', type: 'registration', icon: <Flag size={16} /> },
    { time: 'TBD', title: 'Opening Ceremony', desc: 'Welcome address, event briefing, and rules overview', type: 'ceremony', icon: <Mic size={16} /> },
    { time: 'TBD', title: 'Problem Statement Reveal', desc: 'Final problem statements published; team selection begins', type: 'hacking', icon: <Code2 size={16} /> },
    { time: 'TBD', title: 'Hackathon Begins', desc: 'Official start of the 48-hour hacking window', type: 'hacking', icon: <Code2 size={16} /> },
    { time: 'TBD', title: 'Mentor Sessions', desc: 'Mentors available for guidance and feedback', type: 'other', icon: <Flag size={16} /> },
    { time: 'TBD', title: 'Mid-point Check (Day 1 Evening)', desc: 'Optional progress check with mentors', type: 'other', icon: <Flag size={16} /> },
  ],
  day2: [
    { time: 'TBD', title: 'Hacking Continues', desc: 'Continue building — mentors available for support', type: 'hacking', icon: <Code2 size={16} /> },
    { time: 'TBD', title: 'Submission Deadline', desc: 'All teams must finalize and lock their submissions', type: 'submission', icon: <Flag size={16} /> },
    { time: 'TBD', title: 'Judging & Presentations', desc: 'Teams present to assigned judges; Q&A session', type: 'judging', icon: <Mic size={16} /> },
    { time: 'TBD', title: 'Results & Scoring', desc: 'Judges finalize scores; results calculated', type: 'judging', icon: <Trophy size={16} /> },
    { time: 'TBD', title: 'Valedictory & Prize Distribution', desc: 'Announcement of winners, certificates, and closing ceremony', type: 'ceremony', icon: <Trophy size={16} /> },
  ],
};

const TYPE_STYLES: Record<string, string> = {
  registration: 'rgba(59,130,246,0.12)',
  ceremony: 'rgba(124,58,237,0.12)',
  hacking: 'rgba(91,110,245,0.12)',
  submission: 'rgba(245,158,11,0.12)',
  judging: 'rgba(16,185,129,0.12)',
  other: 'rgba(100,116,139,0.12)',
};

const TYPE_COLORS: Record<string, string> = {
  registration: 'var(--color-info)',
  ceremony: '#A855F7',
  hacking: 'var(--color-brand-primary)',
  submission: 'var(--color-warning)',
  judging: 'var(--color-success)',
  other: 'var(--color-text-muted)',
};

function DaySchedule({ day, items }: { day: string; items: typeof SCHEDULE.day1 }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        <div style={{ background: 'var(--color-brand-gradient)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2) var(--space-4)', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 700 }}>
          {day}
        </div>
        <div style={{ height: 1, flex: 1, background: 'var(--color-border)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', position: 'relative', paddingLeft: 'var(--space-8)' }}>
        <div style={{ position: 'absolute', left: 11, top: 0, bottom: 0, width: 2, background: 'var(--color-border)' }} />

        {items.map((item, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: -20,
              top: 14,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: TYPE_STYLES[item.type],
              border: `2px solid ${TYPE_COLORS[item.type]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: TYPE_COLORS[item.type],
              zIndex: 1,
            }}>
              {item.icon}
            </div>

            <div className="card card-hover" style={{ padding: 'var(--space-4)', display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 80, color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>
                <Clock size={12} />
                {item.time}
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>{item.title}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SchedulePage() {
  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <CalendarDays size={12} />
            Schedule
          </div>
          <h1>Event Timeline</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Two days of innovation, building, and pitching. Exact times will be updated once confirmed.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="card" style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.3)', marginBottom: 'var(--space-8)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <Clock size={18} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              All times are tentative. Final schedule will be published once event dates are confirmed. Registered participants will be notified via announcements.
            </p>
          </div>

          {/* Venue info */}
          <div className="card" style={{ marginBottom: 'var(--space-10)', display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-5)' }}>
            <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'rgba(91,110,245,0.12)', border: '1px solid rgba(91,110,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', flexShrink: 0 }}>
              <MapPin size={20} />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 2 }}>Venue</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>SKUCET Campus, Ananthapuramu, Andhra Pradesh</p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
            <DaySchedule day="Day 1" items={SCHEDULE.day1} />
            <DaySchedule day="Day 2" items={SCHEDULE.day2} />
          </div>
        </div>
      </section>
    </div>
  );
}
