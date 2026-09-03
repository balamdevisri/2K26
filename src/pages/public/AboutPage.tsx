import { Link } from 'react-router-dom';
import { Zap, Target, Users, BookOpen, Award, Lightbulb } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

const OBJECTIVES = [
  {
    icon: <Lightbulb size={22} />,
    title: 'Foster Innovation',
    desc: 'Encourage creative thinking and novel approaches to real-world problems across domains.',
  },
  {
    icon: <Users size={22} />,
    title: 'Build Teamwork',
    desc: 'Develop collaborative skills by working in cross-functional teams under time pressure.',
  },
  {
    icon: <Target size={22} />,
    title: 'Rapid Prototyping',
    desc: 'Practice designing and building functional prototypes within a constrained timeframe.',
  },
  {
    icon: <BookOpen size={22} />,
    title: 'Applied Learning',
    desc: 'Bridge the gap between academic knowledge and industry-relevant engineering practice.',
  },
  {
    icon: <Award size={22} />,
    title: 'Competitive Excellence',
    desc: 'Experience a structured competitive environment that mirrors real hackathons.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Industry Exposure',
    desc: 'Interact with mentors who bring industry experience and provide professional guidance.',
  },
];

export function AboutPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <Zap size={12} />
            About FUZON 2K26
          </div>
          <h1>The Hackathon That Builds Engineers</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            FUZON 2K26 is not just a competition — it's a two-day experience designed to challenge your thinking, sharpen your skills, and connect you with fellow innovators.
          </p>
        </div>
      </section>

      {/* What is FUZON */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
            <div>
              <div className="section-tag">
                <Target size={12} />
                What is FUZON?
              </div>
              <h2 className="section-heading">A Mini Hackathon with Maximum Impact</h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                FUZON 2K26 is a two-day mini hackathon organized by the Department of Computer Science and Engineering at Sri Krishnadevaraya University College of Engineering and Technology (SKUCET), Ananthapuramu.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 'var(--space-4)' }}>
                The event challenges student teams to identify a real-world problem, design a solution, build a functional prototype, and present it to a panel of judges — all within 48 hours.
              </p>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
                FUZON focuses on three pillars: <strong style={{ color: 'var(--color-text-primary)' }}>Innovation</strong>, <strong style={{ color: 'var(--color-text-primary)' }}>Teamwork</strong>, and <strong style={{ color: 'var(--color-text-primary)' }}>Rapid Problem-Solving</strong>.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { label: 'Format', value: 'In-person, 2-day hackathon' },
                { label: 'Organized by', value: 'Dept. of CSE, SKUCET' },
                { label: 'Institution', value: 'Sri Krishnadevaraya University College of Engineering & Technology' },
                { label: 'Location', value: 'Ananthapuramu, Andhra Pradesh' },
                { label: 'Focus', value: 'Innovation · Technology · Impact' },
              ].map((item, i) => (
                <div key={i} className="card" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: 100, paddingTop: 2 }}>
                    {item.label}
                  </span>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>
              <Target size={12} />
              Objectives
            </div>
            <h2 className="section-heading">What FUZON 2K26 Sets Out to Achieve</h2>
          </div>
          <div className="grid-3">
            {OBJECTIVES.map((obj, i) => (
              <div className="card card-hover" key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'rgba(91, 110, 245, 0.12)', border: '1px solid rgba(91, 110, 245, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)' }}>
                  {obj.icon}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 700 }}>{obj.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container text-center">
          <h2 className="section-heading">Ready to Be Part of It?</h2>
          <p className="section-subheading" style={{ margin: '0 auto var(--space-8)' }}>
            Register your team and show what you can build in 48 hours.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={ROUTES.REGISTER} className="btn btn-primary btn-lg">
              <Zap size={18} />
              Register Now
            </Link>
            <Link to={ROUTES.RULES} className="btn btn-secondary btn-lg">
              <BookOpen size={18} />
              Read the Rules
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
