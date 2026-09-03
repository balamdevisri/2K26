import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Shield, CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

// Declare Razorpay on window (loaded via script tag)
declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise(resolve => {
    if (window.Razorpay) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const registrationData = (location.state as any)?.registrationData;

  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'PROCESSING' | 'SUCCESS' | 'FAILED'>('IDLE');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!registrationData) {
      navigate(ROUTES.REGISTER);
    }
  }, [registrationData, navigate]);

  const handlePayment = async () => {
    setStatus('LOADING');
    setError('');

    try {
      // Step 1: Load Razorpay SDK
      const loaded = await loadRazorpay();
      if (!loaded) {
        throw new Error('Payment gateway failed to load. Please check your internet connection.');
      }

      // Step 2: Create Razorpay order via Cloud Function
      // In production, call: httpsCallable(functions, 'createOrder')({ registrationData })
      // For now, simulate with a placeholder response
      // TODO: Replace with actual Cloud Function call when Firebase is configured
      const orderData = {
        orderId: 'order_placeholder',
        amount: 50000, // Will be fetched from eventConfig
        currency: 'INR',
        keyId: import.meta.env.VITE_RAZORPAY_KEY_ID,
      };

      setStatus('PROCESSING');

      // Step 3: Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'FUZON 2K26',
        description: 'Hackathon Registration Fee',
        order_id: orderData.orderId,
        prefill: {
          name: registrationData?.fullName,
          email: registrationData?.email,
          contact: registrationData?.phone,
        },
        theme: {
          color: '#5B6EF5',
        },
        handler: async (response: any) => {
          // Step 4: Send payment response to Cloud Function for server-side verification
          try {
            // In production: call verifyPayment Cloud Function
            // const verify = httpsCallable(functions, 'verifyPayment');
            // const result = await verify({ ...response, registrationData });
            // navigate(ROUTES.CONFIRMATION, { state: { registrationId: result.data.registrationId } });

            // Placeholder: navigate to confirmation
            navigate(ROUTES.CONFIRMATION, {
              state: {
                registrationId: 'FUZON-2K26-DEMO',
                registrationData,
                paymentId: response.razorpay_payment_id,
              },
            });
          } catch (verifyErr) {
            setStatus('FAILED');
            setError('Payment verification failed. Please contact the organizing team with your payment ID.');
          }
        },
        modal: {
          ondismiss: () => {
            setStatus('IDLE');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        setStatus('FAILED');
        setError(`Payment failed: ${response.error.description}. You can retry below.`);
      });
      rzp.open();
    } catch (err: any) {
      setStatus('FAILED');
      setError(err.message || 'Payment initiation failed. Please try again.');
    }
  };

  if (!registrationData) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-8) var(--space-4)',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: '50%',
        background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(91,110,245,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)', paddingTop: 'var(--navbar-height)' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(91,110,245,0.12)', border: '1px solid rgba(91,110,245,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-brand-primary)', margin: '0 auto var(--space-4)' }}>
            <CreditCard size={24} />
          </div>
          <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Complete Payment</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
            Secure your FUZON 2K26 registration with payment
          </p>
        </div>

        {/* Payment Card */}
        <div className="card" style={{ padding: 'var(--space-8)' }}>
          {/* Summary */}
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 'var(--space-4)', fontSize: 'var(--text-base)' }}>
              Registration Summary
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { label: 'Participant', value: registrationData.fullName },
                { label: 'Email', value: registrationData.email },
                { label: 'Team', value: registrationData.teamMode === 'CREATE' ? `Creating: ${registrationData.teamName}` : `Joining team` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', gap: 'var(--space-4)' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
                  <span style={{ color: 'var(--color-text-primary)', textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* Amount */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 'var(--space-5) 0' }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>Registration Fee</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Per participant · Non-refundable</p>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-brand-primary)' }}>
              ₹500
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-error-bg)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-4)' }}>
              <AlertCircle size={16} style={{ color: 'var(--color-error)', flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>{error}</p>
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePayment}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={status === 'LOADING' || status === 'PROCESSING'}
          >
            {status === 'LOADING' || status === 'PROCESSING' ? (
              <div className="spinner" style={{ width: 18, height: 18 }} />
            ) : (
              <Lock size={18} />
            )}
            {status === 'LOADING' ? 'Preparing payment...' :
             status === 'PROCESSING' ? 'Processing...' :
             status === 'FAILED' ? 'Retry Payment' :
             'Pay Securely with Razorpay'}
          </button>

          {/* Trust badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
            {[
              { icon: <Shield size={14} />, text: 'Secure Payment' },
              { icon: <Lock size={14} />, text: 'SSL Encrypted' },
              { icon: <CheckCircle size={14} />, text: 'Razorpay Verified' },
            ].map((badge, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {badge.icon}
                {badge.text}
              </div>
            ))}
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: 'var(--space-4)', lineHeight: 1.6 }}>
            Payment is processed securely through Razorpay. We never store your card details. Registration is confirmed only after server-side payment verification.
          </p>
        </div>
      </div>
    </div>
  );
}
