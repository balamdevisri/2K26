import { useState } from 'react';
import { Search, Download, CheckCircle2, XCircle } from 'lucide-react';
import { REGISTRATION_STATUS, PAYMENT_STATUS } from '../../constants/statusEnums';

interface ParticipantItem {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  rollNumber: string;
  teamName: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const INITIAL_PARTICIPANTS: ParticipantItem[] = [
  {
    id: 'p-1',
    registrationId: 'FUZON-2K26-DEMO',
    fullName: 'Alex Mercer',
    email: 'alex@skucet.ac.in',
    phone: '9876543210',
    college: 'SKUCET, Ananthapuramu',
    rollNumber: '22031A0501',
    teamName: 'CyberKnights',
    status: REGISTRATION_STATUS.CONFIRMED,
    paymentStatus: PAYMENT_STATUS.SUCCESS,
    createdAt: '2026-09-02',
  },
  {
    id: 'p-2',
    registrationId: 'FUZON-2K26-1002',
    fullName: 'Rohan Sharma',
    email: 'rohan.s@skucet.ac.in',
    phone: '9876543211',
    college: 'SKUCET, Ananthapuramu',
    rollNumber: '22031A0502',
    teamName: 'CyberKnights',
    status: REGISTRATION_STATUS.CHECKED_IN,
    paymentStatus: PAYMENT_STATUS.SUCCESS,
    createdAt: '2026-09-02',
  },
  {
    id: 'p-3',
    registrationId: 'FUZON-2K26-1003',
    fullName: 'Vikram Reddy',
    email: 'vikram.r@skucet.ac.in',
    phone: '9876543212',
    college: 'SKUCET, Ananthapuramu',
    rollNumber: '22031A0515',
    teamName: 'ByteBusters',
    status: REGISTRATION_STATUS.PAYMENT_PENDING,
    paymentStatus: PAYMENT_STATUS.PENDING,
    createdAt: '2026-09-03',
  },
];

export function AdminParticipantsPage() {
  const [participants, setParticipants] = useState<ParticipantItem[]>(INITIAL_PARTICIPANTS);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = participants.filter(p => {
    const matchesQuery =
      p.fullName.toLowerCase().includes(query.toLowerCase()) ||
      p.email.toLowerCase().includes(query.toLowerCase()) ||
      p.registrationId.toLowerCase().includes(query.toLowerCase()) ||
      p.rollNumber.toLowerCase().includes(query.toLowerCase()) ||
      p.teamName.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['RegistrationID,FullName,Email,Phone,RollNumber,College,TeamName,Status,PaymentStatus\n'];
    const rows = filtered.map(p =>
      `"${p.registrationId}","${p.fullName}","${p.email}","${p.phone}","${p.rollNumber}","${p.college}","${p.teamName}","${p.status}","${p.paymentStatus}"`
    );
    const blob = new Blob([...headers, ...rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FUZON_Participants_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const toggleCheckin = (id: string) => {
    setParticipants(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === REGISTRATION_STATUS.CHECKED_IN
          ? REGISTRATION_STATUS.CONFIRMED
          : REGISTRATION_STATUS.CHECKED_IN;
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
            Registered Participants ({filtered.length})
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Search, filter status, inspect verification state, and export records.
          </p>
        </div>
        <button className="btn btn-secondary" onClick={exportCSV}>
          <Download size={16} /> Export to CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
          <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: 38 }}
            placeholder="Search by name, ID, roll number, or team..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <select
          className="form-input form-select"
          style={{ width: 'auto' }}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Statuses</option>
          <option value={REGISTRATION_STATUS.CONFIRMED}>Confirmed</option>
          <option value={REGISTRATION_STATUS.CHECKED_IN}>Checked In</option>
          <option value={REGISTRATION_STATUS.PAYMENT_PENDING}>Payment Pending</option>
        </select>
      </div>

      {/* Participants Table */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Reg ID</th>
              <th>Participant</th>
              <th>Roll Number</th>
              <th>Team</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--color-text-muted)' }}>
                  No participants matching your filters.
                </td>
              </tr>
            ) : (
              filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-brand-primary)' }}>
                    {p.registrationId}
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{p.fullName}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{p.email}</div>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>
                    {p.rollNumber}
                  </td>
                  <td>
                    <span style={{ fontWeight: 500 }}>{p.teamName}</span>
                  </td>
                  <td>
                    <span className={`badge ${p.paymentStatus === PAYMENT_STATUS.SUCCESS ? 'badge-success' : 'badge-warning'}`}>
                      {p.paymentStatus === PAYMENT_STATUS.SUCCESS ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {p.paymentStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${p.status === REGISTRATION_STATUS.CHECKED_IN ? 'badge-success' : 'badge-primary'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${p.status === REGISTRATION_STATUS.CHECKED_IN ? 'btn-secondary' : 'btn-success'}`}
                      onClick={() => toggleCheckin(p.id)}
                    >
                      {p.status === REGISTRATION_STATUS.CHECKED_IN ? 'Undo Check-in' : 'Check-in'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
