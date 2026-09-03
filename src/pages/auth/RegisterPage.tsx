import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, School, Hash, Users, Plus, Key,
  ChevronRight, ChevronLeft, Check, AlertCircle, Zap, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { ROUTES } from '../../constants/routes';

// ─── Step type ───────────────────────────────────────────────────────────────
type TeamMode = 'CREATE' | 'JOIN';

interface FormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  rollNumber: string;
  college: string;
  department: string;
  yearOfStudy: string;
  // Step 2: Team
  teamMode: TeamMode;
  teamName: string;    // if CREATE
  teamCode: string;    // if JOIN
  // Step 3: Consent
  termsAccepted: boolean;
  codeOfConductAccepted: boolean;
}

const INITIAL_FORM: FormData = {
  fullName: '', email: '', password: '', confirmPassword: '',
  phone: '', rollNumber: '', college: 'SKUCET', department: '', yearOfStudy: '',
  teamMode: 'CREATE', teamName: '', teamCode: '',
  termsAccepted: false, codeOfConductAccepted: false,
};

const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Information Technology',
  'Other',
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// ─── Validation ──────────────────────────────────────────────────────────────
function validateStep1(form: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.fullName.trim()) errors.fullName = 'Full name is required';
  else if (form.fullName.trim().length < 3) errors.fullName = 'Enter your full name';
  if (!form.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email';
  if (!form.password) errors.password = 'Password is required';
  else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (!form.confirmPassword) errors.confirmPassword = 'Please confirm your password';
  else if (form.password !== form.confirmPassword) errors.confirmPassword = 'Passwords do not match';
  if (!form.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errors.phone = 'Enter a valid 10-digit Indian mobile number';
  if (!form.rollNumber.trim()) errors.rollNumber = 'Roll number is required';
  if (!form.college.trim()) errors.college = 'College/institution name is required';
  if (!form.department) errors.department = 'Department is required';
  if (!form.yearOfStudy) errors.yearOfStudy = 'Year of study is required';
  return errors;
}

function validateStep2(form: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (form.teamMode === 'CREATE') {
    if (!form.teamName.trim()) errors.teamName = 'Team name is required';
    else if (form.teamName.trim().length < 3) errors.teamName = 'Team name must be at least 3 characters';
  } else {
    if (!form.teamCode.trim()) errors.teamCode = 'Team code is required';
  }
  return errors;
}

function validateStep3(form: FormData): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!form.termsAccepted) errors.terms = 'You must accept the terms and conditions';
  if (!form.codeOfConductAccepted) errors.conduct = 'You must accept the code of conduct';
  return errors;
}

// ─── Field Component ─────────────────────────────────────────────────────────
function Field({
  label, required, error, hint, children
}: {
  label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="form-group">
      <label className={`form-label ${required ? 'required' : ''}`}>{label}</label>
      {children}
      {error && <span className="form-error"><AlertCircle size={12} />{error}</span>}
      {hint && !error && <span className="form-hint">{hint}</span>}
    </div>
  );
}

// ─── Step 1: Personal Info ────────────────────────────────────────────────────
function Step1Personal({ form, setForm, errors }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}) {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const f = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div className="grid-2">
        <Field label="Full Name" required error={errors.fullName}>
          <div style={{ position: 'relative' }}>
            <User size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              style={{ paddingLeft: 40 }}
              placeholder="Your full name"
              value={form.fullName}
              onChange={f('fullName')}
              autoComplete="name"
            />
          </div>
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <div style={{ position: 'relative' }}>
            <Mail size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              style={{ paddingLeft: 40 }}
              placeholder="you@email.com"
              value={form.email}
              onChange={f('email')}
              autoComplete="email"
            />
          </div>
        </Field>
      </div>

      <div className="grid-2">
        <Field label="Password" required error={errors.password} hint="Minimum 8 characters">
          <div style={{ position: 'relative' }}>
            <input
              type={showPass ? 'text' : 'password'}
              className={`form-input ${errors.password ? 'error' : ''}`}
              style={{ paddingRight: 40 }}
              placeholder="Create a password"
              value={form.password}
              onChange={f('password')}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>
        <Field label="Confirm Password" required error={errors.confirmPassword}>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              style={{ paddingRight: 40 }}
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={f('confirmPassword')}
              autoComplete="new-password"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </Field>
      </div>

      <div className="grid-2">
        <Field label="Phone Number" required error={errors.phone} hint="10-digit Indian mobile number">
          <div style={{ position: 'relative' }}>
            <Phone size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="tel"
              className={`form-input ${errors.phone ? 'error' : ''}`}
              style={{ paddingLeft: 40 }}
              placeholder="9876543210"
              value={form.phone}
              onChange={f('phone')}
              maxLength={10}
            />
          </div>
        </Field>
        <Field label="Roll Number" required error={errors.rollNumber}>
          <div style={{ position: 'relative' }}>
            <Hash size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              className={`form-input ${errors.rollNumber ? 'error' : ''}`}
              style={{ paddingLeft: 40 }}
              placeholder="Your roll/reg number"
              value={form.rollNumber}
              onChange={f('rollNumber')}
            />
          </div>
        </Field>
      </div>

      <Field label="College / Institution" required error={errors.college}>
        <div style={{ position: 'relative' }}>
          <School size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            className={`form-input ${errors.college ? 'error' : ''}`}
            style={{ paddingLeft: 40 }}
            placeholder="Institution name"
            value={form.college}
            onChange={f('college')}
          />
        </div>
      </Field>

      <div className="grid-2">
        <Field label="Department" required error={errors.department}>
          <select
            className={`form-input form-select ${errors.department ? 'error' : ''}`}
            value={form.department}
            onChange={f('department')}
          >
            <option value="">Select department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </Field>
        <Field label="Year of Study" required error={errors.yearOfStudy}>
          <select
            className={`form-input form-select ${errors.yearOfStudy ? 'error' : ''}`}
            value={form.yearOfStudy}
            onChange={f('yearOfStudy')}
          >
            <option value="">Select year</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </Field>
      </div>
    </div>
  );
}

// ─── Step 2: Team Info ────────────────────────────────────────────────────────
function Step2Team({ form, setForm, errors }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      <div>
        <p className="form-label" style={{ marginBottom: 'var(--space-3)' }}>Team Option</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          {[
            { mode: 'CREATE' as TeamMode, icon: <Plus size={18} />, label: 'Create a New Team', desc: 'Start a new team and invite members' },
            { mode: 'JOIN' as TeamMode, icon: <Key size={18} />, label: 'Join Existing Team', desc: 'Enter a team code to join' },
          ].map(opt => (
            <button
              key={opt.mode}
              type="button"
              onClick={() => setForm(prev => ({ ...prev, teamMode: opt.mode }))}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 'var(--space-2)',
                padding: 'var(--space-4)',
                background: form.teamMode === opt.mode ? 'rgba(91,110,245,0.12)' : 'var(--color-bg-tertiary)',
                border: `2px solid ${form.teamMode === opt.mode ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                textAlign: 'left',
              }}
            >
              <div style={{ color: form.teamMode === opt.mode ? 'var(--color-brand-primary)' : 'var(--color-text-muted)' }}>
                {opt.icon}
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>{opt.label}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {form.teamMode === 'CREATE' ? (
        <Field label="Team Name" required error={errors.teamName} hint="Choose a unique, memorable name for your team">
          <div style={{ position: 'relative' }}>
            <Users size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              className={`form-input ${errors.teamName ? 'error' : ''}`}
              style={{ paddingLeft: 40 }}
              placeholder="e.g. Code Crushers"
              value={form.teamName}
              onChange={e => setForm(prev => ({ ...prev, teamName: e.target.value }))}
              maxLength={40}
            />
          </div>
        </Field>
      ) : (
        <Field label="Team Code" required error={errors.teamCode} hint="Ask your team leader for the team code">
          <div style={{ position: 'relative' }}>
            <Key size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              className={`form-input ${errors.teamCode ? 'error' : ''}`}
              style={{ paddingLeft: 40, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}
              placeholder="FUZON-TEAM-XXXX"
              value={form.teamCode}
              onChange={e => setForm(prev => ({ ...prev, teamCode: e.target.value.toUpperCase() }))}
            />
          </div>
        </Field>
      )}

      <div className="card" style={{ background: 'rgba(91,110,245,0.06)', borderColor: 'rgba(91,110,245,0.2)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--color-text-primary)' }}>Note:</strong> All team members must individually register and pay. Team composition can be modified until the hackathon officially begins. The first registered member who creates the team becomes the team leader.
        </p>
      </div>
    </div>
  );
}

// ─── Step 3: Review + Consent ─────────────────────────────────────────────────
function Step3Review({ form, setForm, errors }: {
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  errors: Record<string, string>;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {/* Summary */}
      <div className="card" style={{ background: 'var(--color-bg-tertiary)' }}>
        <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>Registration Summary</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {[
            { label: 'Name', value: form.fullName },
            { label: 'Email', value: form.email },
            { label: 'Phone', value: form.phone },
            { label: 'Roll No.', value: form.rollNumber },
            { label: 'College', value: form.college },
            { label: 'Department', value: form.department },
            { label: 'Year', value: form.yearOfStudy },
            { label: 'Team', value: form.teamMode === 'CREATE' ? `Create: "${form.teamName}"` : `Join: ${form.teamCode}` },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
              <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>{item.label}</span>
              <span style={{ color: 'var(--color-text-primary)', textAlign: 'right' }}>{item.value || '—'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Consent */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {[
          {
            key: 'termsAccepted' as const,
            label: 'I have read and agree to the Terms & Conditions and the Event Rules of FUZON 2K26.',
            error: errors.terms,
          },
          {
            key: 'codeOfConductAccepted' as const,
            label: 'I agree to abide by the Code of Conduct throughout the event and acknowledge that violations may result in disqualification.',
            error: errors.conduct,
          },
        ].map(item => (
          <div key={item.key}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', cursor: 'pointer', padding: 'var(--space-3)', borderRadius: 'var(--radius-lg)', border: `1px solid ${item.error ? 'var(--color-error)' : 'var(--color-border)'}`, background: item.error ? 'var(--color-error-bg)' : 'transparent', transition: 'all var(--transition-fast)' }}>
              <div
                style={{
                  width: 20, height: 20, borderRadius: 4, border: `2px solid ${form[item.key] ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
                  background: form[item.key] ? 'var(--color-brand-primary)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, transition: 'all var(--transition-fast)',
                }}
                onClick={() => setForm(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
              >
                {form[item.key] && <Check size={12} style={{ color: 'white' }} />}
              </div>
              <input
                type="checkbox"
                style={{ display: 'none' }}
                checked={form[item.key]}
                onChange={e => setForm(prev => ({ ...prev, [item.key]: e.target.checked }))}
              />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {item.label}
              </span>
            </label>
            {item.error && <p className="form-error" style={{ marginTop: 'var(--space-1)', marginLeft: 'var(--space-1)' }}><AlertCircle size={12} />{item.error}</p>}
          </div>
        ))}
      </div>

      <div className="card" style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.3)' }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          After submitting, you will be redirected to complete payment. Registration is only confirmed after successful payment verification.
        </p>
      </div>
    </div>
  );
}

// ─── Step Progress Component ──────────────────────────────────────────────────
const STEPS = [
  { number: 1, label: 'Personal Info' },
  { number: 2, label: 'Team Setup' },
  { number: 3, label: 'Review & Consent' },
];

function StepProgress({ current }: { current: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
      {STEPS.map((step, i) => (
        <React.Fragment key={step.number}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: current > step.number ? 'rgba(16,185,129,0.15)' : current === step.number ? 'rgba(91,110,245,0.15)' : 'var(--color-bg-tertiary)',
              border: `2px solid ${current > step.number ? 'var(--color-success)' : current === step.number ? 'var(--color-brand-primary)' : 'var(--color-border)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: current > step.number ? 'var(--color-success)' : current === step.number ? 'var(--color-brand-primary)' : 'var(--color-text-muted)',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-sm)',
              transition: 'all var(--transition-base)',
            }}>
              {current > step.number ? <Check size={16} /> : step.number}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: current === step.number ? 'var(--color-brand-primary)' : 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div style={{ height: 2, flex: 1, background: current > step.number + 0.5 ? 'var(--color-success)' : 'var(--color-border)', margin: '0 var(--space-2)', marginBottom: 'var(--space-6)', transition: 'background var(--transition-base)' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Main Registration Page ───────────────────────────────────────────────────
export function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateCurrent = (): boolean => {
    let errs: Record<string, string> = {};
    if (step === 1) errs = validateStep1(form);
    else if (step === 2) errs = validateStep2(form);
    else if (step === 3) errs = validateStep3(form);
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateCurrent()) setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrent()) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      // Create Firebase auth account + Firestore profile
      await register(form.email, form.password, form.fullName);

      // In full implementation, a Cloud Function will:
      // 1. Create the registration document with DRAFT status
      // 2. Create/join team
      // 3. Create Razorpay order
      // 4. Return orderId for payment
      // For now, navigate to payment page with form data
      navigate(ROUTES.PAYMENT, {
        state: {
          registrationData: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            rollNumber: form.rollNumber,
            college: form.college,
            department: form.department,
            yearOfStudy: form.yearOfStudy,
            teamMode: form.teamMode,
            teamName: form.teamName,
            teamCode: form.teamCode,
          },
        },
      });
    } catch (err: any) {
      const msg =
        err.code === 'auth/email-already-in-use' ? 'An account with this email already exists. Please sign in instead.' :
        err.code === 'auth/invalid-email' ? 'Invalid email address.' :
        err.code === 'auth/weak-password' ? 'Password is too weak.' :
        'Registration failed. Please try again.';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '40vh',
        background: 'radial-gradient(ellipse 80% 80% at 50% -10%, rgba(91,110,245,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: 'var(--space-8) var(--space-4)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)', paddingTop: 'var(--navbar-height)' }}>
          <Link to={ROUTES.HOME} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', textDecoration: 'none', marginBottom: 'var(--space-4)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-lg)', background: 'var(--color-brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <Zap size={18} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'var(--text-xl)', color: 'var(--color-text-primary)' }}>FUZON 2K26</span>
          </Link>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Register for the Hackathon</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Complete all steps to secure your spot. Have your student ID ready.
          </p>
        </div>

        {/* Form Card */}
        <div style={{ width: '100%', maxWidth: 640 }}>
          <div className="card" style={{ padding: 'var(--space-8)' }}>
            <StepProgress current={step} />

            {submitError && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-error-bg)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-5)' }}>
                <AlertCircle size={16} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {step === 1 && <Step1Personal form={form} setForm={setForm} errors={errors} />}
              {step === 2 && <Step2Team form={form} setForm={setForm} errors={errors} />}
              {step === 3 && <Step3Review form={form} setForm={setForm} errors={errors} />}

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)', gap: 'var(--space-4)' }}>
                {step > 1 ? (
                  <button type="button" className="btn btn-secondary" onClick={handleBack}>
                    <ChevronLeft size={16} />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    Next Step
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? <div className="spinner" style={{ width: 16, height: 16 }} /> : null}
                    {submitting ? 'Creating account...' : 'Proceed to Payment'}
                    {!submitting && <ChevronRight size={16} />}
                  </button>
                )}
              </div>
            </form>
          </div>

          <p style={{ textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
            Already registered?{' '}
            <Link to={ROUTES.LOGIN} style={{ color: 'var(--color-brand-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
