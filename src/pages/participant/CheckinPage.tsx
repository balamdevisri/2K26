import { QRCodeSVG } from 'qrcode.react';
import { QrCode, CheckCircle2, ShieldCheck, Printer, AlertCircle } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

export function CheckinPage() {
  const { user } = useAuth();
  const registrationId = 'FUZON-2K26-DEMO';
  const isCheckedIn = false;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 680, margin: '0 auto' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Digital Check-in Pass
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Present this pass to volunteers at the registration desk upon campus arrival.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 'var(--space-8)' }}>
        {isCheckedIn ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'var(--color-success-bg)', color: 'var(--color-success)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-4)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
            <CheckCircle2 size={16} /> Successfully Checked In
          </div>
        ) : (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', background: 'rgba(91,110,245,0.15)', color: 'var(--color-brand-primary)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-4)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
            <QrCode size={16} /> Ready for Volunteer Scan
          </div>
        )}

        <div style={{ padding: 'var(--space-4)', background: 'white', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', marginBottom: 'var(--space-4)' }}>
          <QRCodeSVG value={registrationId} size={220} level="H" includeMargin={false} />
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-brand-primary)', letterSpacing: '0.05em' }}>
          {registrationId}
        </div>

        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginTop: 4 }}>
          {user?.displayName || 'Registered Participant'}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
          <button className="btn btn-secondary" onClick={handlePrint}>
            <Printer size={16} /> Print Pass / Save PDF
          </button>
        </div>
      </div>

      {/* Fallback & Offline instructions */}
      <div className="card card-brand">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <ShieldCheck size={20} style={{ color: 'var(--color-brand-primary)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
              Security & Privacy Guarantee
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.6 }}>
              Per FUZON security protocols, this QR code payload contains <strong>strictly non-sensitive identifiers</strong> (Registration ID) and zero personally identifiable information (PII).
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ background: 'var(--color-bg-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <AlertCircle size={20} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-warning)' }}>
              Venue Offline Fallback
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.6 }}>
              In the event of camera or Wi-Fi failure at the entrance, volunteers have exported registration manifests and can manually verify you using your <strong>Registration ID</strong> and College Student ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
