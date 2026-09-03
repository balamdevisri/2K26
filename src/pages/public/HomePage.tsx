import { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Zap, Code2, Users, Trophy, Clock, ArrowRight,
  Cpu, Globe, Lightbulb, Shield, Star, CalendarDays, BookOpen,
  HelpCircle, Target, Rocket
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import './HomePage.css';

// ─── Configurable placeholders (admin sets these via eventConfig) ───────────
const EVENT_CONFIG = {
  eventName: 'FUZON 2K26',
  tagline: 'Two Days. Infinite Ideas.',
  description: 'A 48-hour mini hackathon hosted by the Department of CSE at Sri Krishnadevaraya University College of Engineering and Technology (SKUCET), designed to challenge students to ideate, build, and present innovative solutions to real-world problems.',
  theme: 'Innovation · Technology · Impact',
  registrationStatus: 'OPEN', // OPEN | CLOSED | COMING_SOON
  venue: 'SKUCET Campus, Ananthapuramu',
  prizeDetails: 'Exciting prizes for top teams — announced soon!',
  dates: 'Dates announced shortly',
  tracks: ['Web & Mobile', 'AI/ML', 'Blockchain', 'IoT & Hardware', 'Open Innovation'],
};

const HIGHLIGHTS = [
  { icon: <Users size={24} />, label: 'Team Event', desc: 'Collaborate and build together' },
  { icon: <Clock size={24} />, label: '48 Hours', desc: 'Intense, focused hackathon' },
  { icon: <Code2 size={24} />, label: 'Multiple Tracks', desc: 'Web, AI/ML, IoT, Blockchain & more' },
  { icon: <Trophy size={24} />, label: 'Prizes', desc: 'Rewards for top innovators' },
];

const WHY_PARTICIPATE = [
  {
    icon: <Rocket size={22} />,
    title: 'Build Real Projects',
    desc: 'Move beyond classroom assignments — create something that solves actual problems.',
  },
  {
    icon: <Users size={22} />,
    title: 'Team Experience',
    desc: 'Practice real-world collaboration, version control, and role-based work.',
  },
  {
    icon: <Lightbulb size={22} />,
    title: 'Mentorship',
    desc: 'Get guidance from industry mentors and faculty during the hackathon.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Exposure',
    desc: 'Present your ideas before judges, peers, and institutional leadership.',
  },
  {
    icon: <Shield size={22} />,
    title: 'Certification',
    desc: 'Receive digital certificates for participation and achievement.',
  },
  {
    icon: <Star size={22} />,
    title: 'Recognition',
    desc: 'Winner teams get featured and special recognition from the department.',
  },
];

const PROBLEM_TRACKS = [
  { track: 'Web & Mobile', icon: <Globe size={20} />, desc: 'Progressive web apps, mobile-first products, full-stack solutions' },
  { track: 'AI / Machine Learning', icon: <Cpu size={20} />, desc: 'Intelligent systems, NLP, computer vision, predictive analytics' },
  { track: 'IoT & Hardware', icon: <Zap size={20} />, desc: 'Embedded systems, sensor networks, smart devices' },
  { track: 'Open Innovation', icon: <Lightbulb size={20} />, desc: 'Any technology, any domain — creativity is the only rule' },
];

const FAQ_PREVIEW = [
  {
    q: 'Who can participate?',
    a: 'Any student currently enrolled at SKUCET or an affiliated institution. Check the Rules page for full eligibility criteria.',
  },
  {
    q: 'Is it free to participate?',
    a: 'A nominal registration fee applies. See the registration page for details.',
  },
  {
    q: 'Can I participate solo?',
    a: 'Teams are required. Check the Rules page for minimum and maximum team size.',
  },
  {
    q: 'Will we get project mentorship?',
    a: 'Yes — mentors will be available during the hackathon to guide your team.',
  },
];

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-bg-glow hero-bg-glow-1" />
        <div className="hero-bg-glow hero-bg-glow-2" />

        <div className="container hero-content" ref={heroRef}>
          <div className="hero-badge">
            <span className="status-dot live" />
            <span>Registration Open</span>
            <span className="hero-badge-sep">·</span>
            <span>SKUCET · Dept. of CSE</span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">{EVENT_CONFIG.eventName}</span>
            <br />
            <span className="hero-title-sub">{EVENT_CONFIG.tagline}</span>
          </h1>

          <p className="hero-description">{EVENT_CONFIG.description}</p>

          <div className="hero-meta">
            <div className="hero-meta-item">
              <CalendarDays size={16} />
              <span>{EVENT_CONFIG.dates}</span>
            </div>
            <div className="hero-meta-sep" />
            <div className="hero-meta-item">
              <Target size={16} />
              <span>{EVENT_CONFIG.theme}</span>
            </div>
          </div>

          <div className="hero-actions">
            <Link to={ROUTES.REGISTER} className="btn btn-primary btn-lg">
              <Zap size={18} />
              Register Now
              <ChevronRight size={18} />
            </Link>
            <Link to={ROUTES.ABOUT} className="btn btn-secondary btn-lg">
              Explore Event
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Stat pills */}
          <div className="hero-stats">
            {HIGHLIGHTS.map((h, i) => (
              <div className="hero-stat-card" key={i}>
                <div className="hero-stat-icon">{h.icon}</div>
                <div>
                  <div className="hero-stat-label">{h.label}</div>
                  <div className="hero-stat-desc">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="hero-scroll-dot" />
        </div>
      </section>

      {/* ── Problem Tracks Preview ── */}
      <section className="section" id="tracks">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="section-tag">
              <Code2 size={12} />
              Problem Tracks
            </div>
            <h2 className="section-heading">Choose Your Domain</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              Problem statements span multiple tracks. Your team selects one problem at the start of the hackathon.
            </p>
          </div>

          <div className="grid-4">
            {PROBLEM_TRACKS.map((track, i) => (
              <div className="card card-hover track-card" key={i}>
                <div className="track-icon">{track.icon}</div>
                <h3 className="track-title">{track.track}</h3>
                <p className="track-desc">{track.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link to={ROUTES.PROBLEMS} className="btn btn-secondary">
              View All Problem Statements
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Participate ── */}
      <section className="section why-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="section-tag">
              <Star size={12} />
              Why Join
            </div>
            <h2 className="section-heading">Why Participate in FUZON 2K26?</h2>
            <p className="section-subheading" style={{ margin: '0 auto' }}>
              More than a competition — it's a two-day experience that accelerates your growth as an engineer.
            </p>
          </div>

          <div className="grid-3">
            {WHY_PARTICIPATE.map((item, i) => (
              <div className="card card-hover why-card" key={i}>
                <div className="why-icon">{item.icon}</div>
                <h4 className="why-title">{item.title}</h4>
                <p className="why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule Preview ── */}
      <section className="section" id="schedule">
        <div className="container">
          <div className="schedule-preview-wrapper">
            <div className="schedule-preview-content">
              <div className="section-tag">
                <CalendarDays size={12} />
                Schedule
              </div>
              <h2 className="section-heading">What to Expect</h2>
              <p className="section-subheading">
                Two action-packed days of hacking, mentoring, pitching, and judging. Full schedule will be published once dates are confirmed.
              </p>
              <div className="schedule-timeline-preview">
                {[
                  { day: 'Day 1', time: 'Morning', title: 'Opening Ceremony & Briefing', type: 'ceremony' },
                  { day: 'Day 1', time: 'Afternoon', title: 'Hackathon Begins — Hacking Phase', type: 'hacking' },
                  { day: 'Day 2', time: 'Morning', title: 'Submission Deadline', type: 'submission' },
                  { day: 'Day 2', time: 'Afternoon', title: 'Judging & Presentations', type: 'judging' },
                  { day: 'Day 2', time: 'Evening', title: 'Results & Valedictory', type: 'ceremony' },
                ].map((item, i) => (
                  <div className="schedule-preview-item" key={i}>
                    <div className="schedule-preview-day">{item.day}</div>
                    <div className="schedule-preview-time">{item.time}</div>
                    <div className="schedule-preview-title">{item.title}</div>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.SCHEDULE} className="btn btn-secondary" style={{ marginTop: 'var(--space-6)' }}>
                <CalendarDays size={16} />
                Full Schedule
              </Link>
            </div>

            <div className="schedule-preview-visual">
              <div className="schedule-visual-card">
                <div className="schedule-visual-header">
                  <span className="badge badge-primary">FUZON 2K26</span>
                  <span className="badge badge-success">
                    <span className="status-dot live" />
                    Live Soon
                  </span>
                </div>
                <div className="schedule-visual-prize">
                  <Trophy size={48} className="schedule-visual-trophy" />
                  <div className="schedule-visual-prize-text">
                    <div className="schedule-visual-prize-label">Prize Pool</div>
                    <div className="schedule-visual-prize-value">{EVENT_CONFIG.prizeDetails}</div>
                  </div>
                </div>
                <div className="schedule-visual-venue">
                  <Target size={16} />
                  {EVENT_CONFIG.venue}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Rules Preview ── */}
      <section className="section rules-preview-section">
        <div className="container">
          <div className="rules-preview-grid">
            <div className="rules-preview-col">
              <div className="section-tag">
                <BookOpen size={12} />
                Rules
              </div>
              <h2 className="section-heading">Play Fair, Build Bold</h2>
              <p className="section-subheading">
                FUZON 2K26 follows clear rules to ensure a level playing field. Review full eligibility, team requirements, and submission guidelines before registering.
              </p>
              <Link to={ROUTES.RULES} className="btn btn-secondary" style={{ marginTop: 'var(--space-6)' }}>
                <BookOpen size={16} />
                View Full Rules
              </Link>
            </div>
            <div className="rules-preview-checklist">
              {[
                'All team members must be currently enrolled students',
                'Teams must have the minimum required members',
                'All code must be written during the hackathon',
                'One problem statement per team — locked at start',
                'Final submissions must include a working demo',
                'Respect for all participants, mentors, and judges is mandatory',
              ].map((rule, i) => (
                <div className="rules-preview-item" key={i}>
                  <div className="rules-preview-check">✓</div>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Preview ── */}
      <section className="section" id="faq">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="section-tag">
              <HelpCircle size={12} />
              FAQ
            </div>
            <h2 className="section-heading">Common Questions</h2>
          </div>

          <div className="faq-preview-grid">
            {FAQ_PREVIEW.map((item, i) => (
              <div className="card faq-preview-card" key={i}>
                <h4 className="faq-question">{item.q}</h4>
                <p className="faq-answer">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
            <Link to={ROUTES.FAQ} className="btn btn-secondary">
              <HelpCircle size={16} />
              All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-section">
        <div className="cta-bg-glow" />
        <div className="container cta-content">
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            <Zap size={12} />
            Ready to Hack?
          </div>
          <h2 className="section-heading text-center">
            Join FUZON 2K26 — Register Your Team Today
          </h2>
          <p className="section-subheading text-center" style={{ margin: '0 auto var(--space-8)' }}>
            Registration is open. Don't miss the opportunity to build, compete, and showcase your engineering skills.
          </p>
          <div className="cta-actions">
            <Link to={ROUTES.REGISTER} className="btn btn-primary btn-lg">
              <Zap size={18} />
              Register Now
              <ChevronRight size={18} />
            </Link>
            <Link to={ROUTES.CONTACT} className="btn btn-secondary btn-lg">
              Have Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
