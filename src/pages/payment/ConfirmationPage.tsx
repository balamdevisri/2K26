import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {
  CheckCircle, LayoutDashboard, Calendar, MapPin,
  Copy, Printer
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export function ConfirmationPage() {
  const location = useLocation();
  const state = (location.state as any) || {};
  const { registrationId = 'FUZON-2K26-DEMO', registrationData } = state;

  const printRef = useRef<HTMLDivElement>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      padding: 'var(--space-8) var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '60%',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(16,185,129,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 600, position: 'relative', zIndex: 1, paddingTop: 'calc(var(--navbar-height) + var(--space-8))' }} ref={printRef}>
        {/* Success Banner */}
        <div className="card" style={{ background: 'var(--color-success-bg)', borderColor: 'rgba(16,185,129,0.3)', textAlign: 'center', padding: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', margin: '0 auto var(--space-4)' }}>
            <CheckCircle size={36} />
          </div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)', color: 'var(--color-success)' }}>
            Registration Confirmed!
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Your payment has been verified and your spot is secured for FUZON 2K26.
          </p>
        </div>

        {/* Registration ID */}
        <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            Your Registration ID
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: 'var(--color-brand-primary)',
              background: 'rgba(91,110,245,0.1)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(91,110,245,0.25)',
              flex: 1,
              letterSpacing: '0.05em',
            }}>
              {registrationId}
            </div>
            <button
              onClick={() => handleCopy(registrationId)}
              className="btn btn-secondary btn-icon"
              title="Copy Registration ID"
            >
              <Copy size={16} />
            </button>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            Keep this ID safe — you'll need it for check-in on the event day.
          </p>
        </div>

        {/* QR Code */}
        <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-6)', textAlign: 'center' }}>
          <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-5)' }}>
            Check-in QR Code
          </p>
          <div style={{ display: 'inline-block', padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
            <QRCodeSVG
              value={registrationId}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 'var(--space-3)' }}>
            Show this QR code to the volunteer at check-in. QR code contains only your Registration ID — no personal data.
          </p>
        </div>

        {/* Participant details */}
        {registrationData && (
          <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-6)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-4)', fontSize: 'var(--text-base)' }}>
              Participant Details
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { label: 'Name', value: registrationData.fullName },
                { label: 'Email', value: registrationData.email },
                { label: 'Phone', value: registrationData.phone },
                { label: 'Roll No.', value: registrationData.rollNumber },
                { label: 'College', value: registrationData.college },
                { label: 'Department', value: registrationData.department },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', gap: 'var(--space-4)' }}>
                  <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>{item.label}</span>
                  <span style={{ color: 'var(--color-text-primary)', textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-6)', background: 'rgba(91,110,245,0.06)', borderColor: 'rgba(91,110,245,0.2)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-4)', fontSize: 'var(--text-base)' }}>
            What's Next?
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { step: '1', text: 'Log in to your dashboard to manage your team and track your registration status.' },
              { step: '2', text: 'Invite teammates — each member must individually register and pay.' },
              { step: '3', text: 'Select your problem statement before the hackathon begins.' },
              { step: '4', text: 'Arrive at the venue on the event day with your student ID and this QR code.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(91,110,245,0.15)', border: '1px solid rgba(91,110,245,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'var(--text-xs)', flexShrink: 0 }}>
                  {item.step}
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <Link to={ROUTES.DASHBOARD} className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }}>
            <LayoutDashboard size={18} />
            Go to My Dashboard
          </Link>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
            <button className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={16} />
              Print / Save
            </button>
            <Link to={ROUTES.SCHEDULE} className="btn btn-secondary">
              <Calendar size={16} />
              View Schedule
            </Link>
          </div>
        </div>

        {/* Event info */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-8)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <Calendar size={12} />
            Dates TBD
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            <MapPin size={12} />
            SKUCET Campus, Ananthapuramu
          </div>
        </div>
      </div>
    </div>
  );
}
