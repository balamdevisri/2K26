import { useState } from 'react';
import { CheckCircle2, XCircle, Search, ShieldCheck } from 'lucide-react';
import { PAYMENT_STATUS } from '../../constants/statusEnums';

interface PaymentRecord {
  paymentId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  participantName: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: string;
}

const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    paymentId: 'PAY-8821',
    razorpayOrderId: 'order_Nx8Yq92K11a',
    razorpayPaymentId: 'pay_Nx8Yw01Kl3z',
    participantName: 'Alex Mercer',
    amount: 500,
    currency: 'INR',
    status: PAYMENT_STATUS.SUCCESS,
    timestamp: '2026-09-02 14:32',
  },
  {
    paymentId: 'PAY-8822',
    razorpayOrderId: 'order_Nx8Zp22L14b',
    razorpayPaymentId: 'pay_Nx8Zq12Km4x',
    participantName: 'Rohan Sharma',
    amount: 500,
    currency: 'INR',
    status: PAYMENT_STATUS.SUCCESS,
    timestamp: '2026-09-02 15:10',
  },
  {
    paymentId: 'PAY-8823',
    razorpayOrderId: 'order_Nx9Aa33M15c',
    razorpayPaymentId: '—',
    participantName: 'Vikram Reddy',
    amount: 500,
    currency: 'INR',
    status: PAYMENT_STATUS.PENDING,
    timestamp: '2026-09-03 09:15',
  },
];

export function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>(MOCK_PAYMENTS);
  const [query, setQuery] = useState('');

  const filtered = payments.filter(p =>
    p.participantName.toLowerCase().includes(query.toLowerCase()) ||
    p.paymentId.toLowerCase().includes(query.toLowerCase()) ||
    p.razorpayPaymentId.toLowerCase().includes(query.toLowerCase()) ||
    p.razorpayOrderId.toLowerCase().includes(query.toLowerCase())
  );

  const verifyPaymentManually = (paymentId: string) => {
    setPayments(prev => prev.map(p => {
      if (p.paymentId === paymentId) {
        return {
          ...p,
          status: PAYMENT_STATUS.SUCCESS,
          razorpayPaymentId: 'pay_MANUAL_VERIFIED_' + Math.floor(Math.random() * 10000)
        };
      }
      return p;
    }));
  };

  const totalCollected = payments
    .filter(p => p.status === PAYMENT_STATUS.SUCCESS)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
            Payments & Transactions
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
            Server-side verified Razorpay orders and settlement records.
          </p>
        </div>
        <div className="card" style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Verified Revenue</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-success)' }}>
            ₹{totalCollected.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
        <Search size={16} style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          className="form-input"
          placeholder="Filter by participant, Order ID, or Razorpay Payment ID..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Participant</th>
              <th>Razorpay Order ID</th>
              <th>Razorpay Payment ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.paymentId}>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                  {p.paymentId}
                </td>
                <td style={{ fontWeight: 600 }}>{p.participantName}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {p.razorpayOrderId}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-brand-primary)' }}>
                  {p.razorpayPaymentId}
                </td>
                <td style={{ fontWeight: 700 }}>
                  ₹{p.amount}
                </td>
                <td>
                  <span className={`badge ${p.status === PAYMENT_STATUS.SUCCESS ? 'badge-success' : 'badge-warning'}`}>
                    {p.status === PAYMENT_STATUS.SUCCESS ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.status !== PAYMENT_STATUS.SUCCESS ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => verifyPaymentManually(p.paymentId)}
                    >
                      <ShieldCheck size={14} /> Manually Verify
                    </button>
                  ) : (
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Verified ✓</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminCheckinsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-1)' }}>
          Live Gate Check-in Monitor
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Real-time arrival statistics and check-in station feed.
        </p>
      </div>

      <div className="grid-3">
        <div className="card">
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Confirmed</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-brand-primary)', marginTop: 4 }}>124</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Checked In at Venue</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-success)', marginTop: 4 }}>89</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Check-in Rate</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 800, color: 'var(--color-warning)', marginTop: 4 }}>71.7%</div>
        </div>
      </div>
    </div>
  );
}
