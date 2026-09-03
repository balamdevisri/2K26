import { useState, type FormEvent } from 'react';
import { FileCode2, GitBranch, ExternalLink, Lock, Check, AlertCircle, Sparkles } from 'lucide-react';
import { SUBMISSION_STATUS } from '../../constants/statusEnums';

export function SubmissionPage() {
  const [status, setStatus] = useState<string>(SUBMISSION_STATUS.DRAFT);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('React, Firebase, TailwindCSS, Node.js');
  const [repoLink, setRepoLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [deckLink, setDeckLink] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isLocked = status === SUBMISSION_STATUS.FINAL_SUBMITTED || status === SUBMISSION_STATUS.LOCKED;

  const handleSaveDraft = (e: FormEvent) => {
    e.preventDefault();
    setToastMessage('Draft saved successfully! You can continue editing before the deadline.');
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !repoLink.trim() || !confirmed) {
      alert('Please fill out all required fields and verify team confirmation.');
      return;
    }

    if (window.confirm('Are you sure you want to finalize your submission? Once submitted, it will be locked for judging.')) {
      setStatus(SUBMISSION_STATUS.FINAL_SUBMITTED);
      setToastMessage('Final submission recorded! Your project is locked and queued for judging.');
      setTimeout(() => setToastMessage(''), 5000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 840 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
            Project Submission
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Submit your working prototype, repository link, and pitch deck for evaluation.
          </p>
        </div>
        <div>
          {isLocked ? (
            <span className="badge badge-success" style={{ padding: 'var(--space-2) var(--space-4)' }}>
              <Lock size={14} /> Final Submitted & Locked
            </span>
          ) : (
            <span className="badge badge-warning" style={{ padding: 'var(--space-2) var(--space-4)' }}>
              Draft Mode
            </span>
          )}
        </div>
      </div>

      {toastMessage && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          <Check size={18} /> {toastMessage}
        </div>
      )}

      {isLocked ? (
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: 'var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)' }}>
            <Lock size={32} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
            Submission Locked & Queued
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', maxWidth: 500, margin: '0 auto var(--space-6)', lineHeight: 1.6 }}>
            Your project <strong>"{title || 'Submitted Project'}"</strong> has been locked. The judging panel now has access to evaluate your solution. If you need to make urgent emergency corrections, request an unlock from an organizer.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
            {repoLink && (
              <a href={repoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <GitBranch size={16} /> View GitHub Repo
              </a>
            )}
            {demoLink && (
              <a href={demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <ExternalLink size={16} /> View Demo URL
              </a>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveDraft} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
              Project Information
            </h3>

            <div className="form-group">
              <label className="form-label required">Project Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. EcoGrid: Smart Renewable Energy Dispatcher"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">Solution Overview & Problem Approach</label>
              <textarea
                className="form-input form-textarea"
                rows={4}
                placeholder="Describe your architecture, the core innovation, and how it directly solves the chosen problem statement..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label required">Technology Stack (Comma separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="React, TypeScript, Firebase, Python, TensorFlow"
                value={techStack}
                onChange={e => setTechStack(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-base)' }}>
              Code Repository & Deliverables
            </h3>

            <div className="form-group">
              <label className="form-label required">Public GitHub / GitLab Repository</label>
              <div style={{ position: 'relative' }}>
                <GitBranch size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="url"
                  className="form-input"
                  style={{ paddingLeft: 40 }}
                  placeholder="https://github.com/team/fuzon-2k26-project"
                  value={repoLink}
                  onChange={e => setRepoLink(e.target.value)}
                  required
                />
              </div>
              <span className="form-hint">Must be public or accessible to judges with commit history during the event window.</span>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Live Prototype Demo URL (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <ExternalLink size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="url"
                    className="form-input"
                    style={{ paddingLeft: 40 }}
                    placeholder="https://demo.fuzon.app"
                    value={demoLink}
                    onChange={e => setDemoLink(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Pitch Deck / Documentation Link (Optional)</label>
                <div style={{ position: 'relative' }}>
                  <FileCode2 size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="url"
                    className="form-input"
                    style={{ paddingLeft: 40 }}
                    placeholder="https://drive.google.com/... or Notion link"
                    value={deckLink}
                    onChange={e => setDeckLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ background: 'var(--color-bg-tertiary)' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                style={{ marginTop: 4 }}
                checked={confirmed}
                onChange={e => setConfirmed(e.target.checked)}
              />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                I confirm on behalf of my team that all code presented was written during FUZON 2K26, open-source dependencies are acknowledged, and this constitutes our official submission.
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-secondary">
              Save Draft
            </button>
            <button type="button" className="btn btn-primary" onClick={handleFinalSubmit} disabled={!confirmed}>
              <Sparkles size={16} /> Final Submit & Lock
            </button>
          </div>
        </form>
      )}

      <div className="card" style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <AlertCircle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Per §6.7 of the FUZON Master Specification, final submissions are locked with cryptographic timestamps. Once locked, only an authorized organizer can reopen the submission upon request.
          </p>
        </div>
      </div>
    </div>
  );
}
