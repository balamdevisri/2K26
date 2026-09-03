import { useState, type FormEvent } from 'react';
import { Search, CheckCircle2, AlertTriangle, QrCode, UserCheck, ShieldAlert, PackageCheck } from 'lucide-react';
import { REGISTRATION_STATUS, PAYMENT_STATUS } from '../../constants/statusEnums';

interface ParticipantRecord {
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  teamName: string;
  status: string;
  paymentStatus: string;
  kitIssued: boolean;
}

const MOCK_REGISTRATIONS: Record<string, ParticipantRecord> = {
  'FUZON-2K26-DEMO': {
    registrationId: 'FUZON-2K26-DEMO',
    fullName: 'Alex Mercer',
    email: 'alex@skucet.ac.in',
    phone: '9876543210',
    college: 'SKUCET, Ananthapuramu',
    teamName: 'CyberKnights',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.SUCCESS,
    kitIssued: false,
  },
  'FUZON-2K26-1002': {
    registrationId: 'FUZON-2K26-1002',
    fullName: 'Rohan Sharma',
    email: 'rohan.s@skucet.ac.in',
    phone: '9876543211',
    college: 'SKUCET, Ananthapuramu',
    teamName: 'CyberKnights',
    status: REGISTRATION_STATUS.CHECKED_IN,
    paymentStatus: PAYMENT_STATUS.SUCCESS,
    kitIssued: true,
  },
};

export function VolunteerCheckinPage() {
  const [query, setQuery] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<ParticipantRecord | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [kitChecked, setKitChecked] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSearchedRecord(null);

    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;

    const record = MOCK_REGISTRATIONS[cleanQuery];
    if (record) {
      setSearchedRecord(record);
      setKitChecked(record.kitIssued);
    } else {
      setError(`No verified participant found with ID "${cleanQuery}". Please verify the ID or check the printed backup roster.`);
    }
  };

  const handleConfirmCheckin = () => {
    if (!searchedRecord) return;

    if (searchedRecord.status === REGISTRATION_STATUS.CHECKED_IN) {
      setError('Duplicate Check-in Alert: This participant is ALREADY marked as checked in!');
      return;
    }

    if (searchedRecord.paymentStatus !== PAYMENT_STATUS.SUCCESS) {
      setError('Payment Incomplete: This registration does not have verified payment.');
      return;
    }

    // Success transition
    searchedRecord.status = REGISTRATION_STATUS.CHECKED_IN;
    searchedRecord.kitIssued = kitChecked;
    setSuccess(`Check-in complete for ${searchedRecord.fullName} (${searchedRecord.teamName})! Badge & kit authorized.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 760, margin: '0 auto', padding: 'var(--space-6) var(--space-4)' }}>
      <div>
        <div className="badge badge-primary" style={{ marginBottom: 'var(--space-2)' }}>
          Volunteer Check-in Station
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>
          Participant QR & ID Check-in
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Scan QR code or search by Registration ID / Team Code.
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="card" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: 44, fontFamily: 'var(--font-mono)' }}
            placeholder="Scan or type FUZON-2K26-XXXX..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <QrCode size={16} /> Look Up
        </button>
      </form>

      {/* Alert Messages */}
      {error && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-error-bg)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-error)', fontSize: 'var(--text-sm)' }}>
          <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--color-success-bg)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 'var(--radius-lg)', color: 'var(--color-success)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>
          <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>{success}</div>
        </div>
      )}

      {/* Lookup Card Result */}
      {searchedRecord && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <div>
              <span className="font-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {searchedRecord.registrationId}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 2 }}>
                {searchedRecord.fullName}
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <span className={`badge ${searchedRecord.paymentStatus === PAYMENT_STATUS.SUCCESS ? 'badge-success' : 'badge-error'}`}>
                Payment: {searchedRecord.paymentStatus}
              </span>
              <span className={`badge ${searchedRecord.status === REGISTRATION_STATUS.CHECKED_IN ? 'badge-warning' : 'badge-primary'}`}>
                {searchedRecord.status}
              </span>
            </div>
          </div>

          <div className="grid-2">
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Team Name</div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{searchedRecord.teamName}</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>College / Department</div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{searchedRecord.college}</div>
            </div>
          </div>

          <div style={{ padding: 'var(--space-3)', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={kitChecked}
                onChange={e => setKitChecked(e.target.checked)}
              />
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)' }}>
                <PackageCheck size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom', color: 'var(--color-brand-primary)' }} />
                Event ID Card & Swag Kit Handed Over
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={handleConfirmCheckin}
              disabled={searchedRecord.status === REGISTRATION_STATUS.CHECKED_IN}
            >
              <UserCheck size={18} />
              {searchedRecord.status === REGISTRATION_STATUS.CHECKED_IN ? 'Already Checked In' : 'Confirm Check-in'}
            </button>
          </div>
        </div>
      )}

      {/* Manual Fallback Reference */}
      <div className="card" style={{ background: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
          <AlertTriangle size={18} style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: 'var(--text-xs)', color: 'var(--color-warning)', textTransform: 'uppercase' }}>
              Offline Operations & Technical Protocol
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginTop: 2, lineHeight: 1.5 }}>
              If internet access is interrupted at the entry gate, consult the exported physical printout spreadsheet sorted by Roll Number and Student Name. Do not allow check-in without student ID card physical verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VolunteerDashboard() {
  return <VolunteerCheckinPage />;
}
