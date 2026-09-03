import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: 'General',
    questions: [
      { q: 'What is FUZON 2K26?', a: 'FUZON 2K26 is a two-day mini hackathon organized by the Department of CSE, SKUCET. Teams compete to build functional prototypes that address real-world problems across multiple technology tracks.' },
      { q: 'When and where is the event?', a: 'Exact dates and the detailed venue will be announced soon. The event is hosted at the SKUCET campus, Ananthapuramu. Registered participants will be notified via announcements.' },
      { q: 'Is this event open to all students?', a: 'Yes, currently enrolled students at SKUCET or affiliated institutions under Sri Krishnadevaraya University are eligible. Refer to the Rules page for complete eligibility criteria.' },
    ],
  },
  {
    category: 'Registration & Payment',
    questions: [
      { q: 'How do I register?', a: 'Click "Register Now" from the home page or navigation bar, complete the multi-step registration form, and complete the payment to confirm your spot.' },
      { q: 'Is there a registration fee?', a: 'Yes, a nominal registration fee applies per participant. The exact amount is displayed on the registration page.' },
      { q: 'Can I register as an individual?', a: 'No — FUZON 2K26 is a team event. You must either create a team or join an existing one as part of registration. Check the Rules page for team size requirements.' },
      { q: 'What happens after I register?', a: 'You will receive a Registration ID and QR code on the confirmation screen. Use these to log in to your dashboard, manage your team, and check in on the event day.' },
      { q: 'Can I get a refund if I cancel?', a: 'Refund policy is at the discretion of the organizing committee. Contact the organizers for refund requests before the event.' },
    ],
  },
  {
    category: 'Teams',
    questions: [
      { q: 'What is the team size limit?', a: 'Team size requirements are published on the registration page. The organizing committee sets the minimum and maximum team sizes.' },
      { q: 'Can my team members be from different departments?', a: 'Yes, cross-department teams are allowed.' },
      { q: 'Can I change my team after registering?', a: 'Team changes are allowed during the team formation phase (before the hackathon starts). Once the event begins, team composition is locked.' },
      { q: 'What if my teammate drops out before the event?', a: 'Contact the organizing team immediately. Replacements may be allowed before the event begins, subject to eligibility verification.' },
    ],
  },
  {
    category: 'Hackathon & Submission',
    questions: [
      { q: 'Can we use existing code or projects?', a: 'No. All code must be written during the hackathon window. You may use open-source libraries, frameworks, and APIs, but the core project must be new.' },
      { q: 'What is the submission format?', a: 'Submissions include: a GitHub repository link, project title, description, tech stack, and optionally a demo link or presentation document. See the submission form for exact requirements.' },
      { q: 'What happens if we miss the submission deadline?', a: 'Submissions must be finalized before the deadline. Late submissions will not be accepted, regardless of reason.' },
      { q: 'Will there be mentors available during the hackathon?', a: 'Yes. Mentors will be available for scheduled sessions during the event. Schedule details will be in the announcements.' },
    ],
  },
  {
    category: 'Judging & Results',
    questions: [
      { q: 'How are teams judged?', a: 'Teams are evaluated on: Innovation (20%), Technical Implementation (25%), Problem Solving (20%), UI/UX (15%), Impact & Practical Value (10%), and Presentation (10%).' },
      { q: 'Can I appeal a judging decision?', a: 'Results are final unless a clear scoring error is identified. Contact the organizing team with specific evidence of an error.' },
      { q: 'When will results be announced?', a: 'Results are announced at the valedictory session on Day 2, after judges finalize scores.' },
    ],
  },
  {
    category: 'Technical & Logistics',
    questions: [
      { q: 'What should I bring on event day?', a: 'Your student ID card, your registration QR code (digital or printed), a laptop with your development environment, and any hardware you plan to use.' },
      { q: 'Will Wi-Fi be provided?', a: 'Yes, Wi-Fi will be available at the venue. However, we recommend having a mobile hotspot as a backup.' },
      { q: 'Will food be arranged?', a: 'Food and refreshment arrangements will be announced before the event.' },
    ],
  },
];

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid var(--color-border)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          padding: 'var(--space-5) 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          gap: 'var(--space-4)',
          textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--text-base)', lineHeight: 1.5 }}>
          {question}
        </span>
        <span style={{ color: 'var(--color-text-muted)', flexShrink: 0, marginTop: 2 }}>
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: 'var(--space-5)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.8 }}>
          {answer}
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <HelpCircle size={12} />
            FAQ
          </div>
          <h1>Frequently Asked Questions</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Everything you need to know about FUZON 2K26 — registration, teams, hacking, and results.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          {FAQ_ITEMS.map(category => (
            <div key={category.category} style={{ marginBottom: 'var(--space-10)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-brand-primary)', marginBottom: 'var(--space-2)', paddingBottom: 'var(--space-3)', borderBottom: '2px solid rgba(91,110,245,0.2)' }}>
                {category.category}
              </h2>
              <div className="card" style={{ padding: '0 var(--space-6)' }}>
                {category.questions.map((item, i) => (
                  <FAQAccordion key={i} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
