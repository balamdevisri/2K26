import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: send to Cloud Function or email service
    setSubmitted(true);
  };

  return (
    <div style={{ paddingBottom: 'var(--space-20)' }}>
      <section className="page-hero">
        <div className="page-hero-bg" />
        <div className="container page-hero-content">
          <div className="section-tag">
            <MessageCircle size={12} />
            Contact
          </div>
          <h1>Get in Touch</h1>
          <p className="section-subheading" style={{ margin: '0 auto' }}>
            Have questions about FUZON 2K26? Reach out to the organizing team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 960, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-12)', alignItems: 'start' }}>
          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="card">
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Contact Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {[
                  { icon: <Mail size={18} />, label: 'Email', value: 'fuzon@skucet.ac.in', href: 'mailto:fuzon@skucet.ac.in' },
                  { icon: <Phone size={18} />, label: 'Phone', value: 'To be announced', href: null },
                  { icon: <MapPin size={18} />, label: 'Address', value: 'Dept. of CSE, SKUCET, Ananthapuramu, Andhra Pradesh', href: null },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'rgba(91,110,245,0.12)', border: '1px solid rgba(91,110,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-brand-primary)', textDecoration: 'none' }}>{item.value}</a>
                      ) : (
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                <Clock size={16} style={{ color: 'var(--color-text-muted)' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Response Time</h4>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                We aim to respond to all enquiries within 24–48 hours on working days. For urgent matters during the event, visit the organizing team desk at the venue.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', color: 'var(--color-success)' }}>
                  <Send size={24} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>Message Sent!</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  Thank you for reaching out. We'll get back to you within 24–48 hours.
                </p>
                <button className="btn btn-secondary" style={{ marginTop: 'var(--space-6)' }} onClick={() => setSubmitted(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-6)' }}>Send a Message</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label required">Your Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label required">Email</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="What is your enquiry about?"
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Message</label>
                    <textarea
                      className="form-input form-textarea"
                      placeholder="Describe your question or concern..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
