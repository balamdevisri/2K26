import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('FUZON 2K26 — Unhandled error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070B14',
          padding: '2rem',
          fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{ maxWidth: 480, textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>⚡</div>
            <h1 style={{ color: '#F1F5F9', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              Something went wrong
            </h1>
            <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
              The application encountered an unexpected error. Check the browser console for details.
            </p>
            <pre style={{
              background: '#0F1929',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 8,
              padding: '12px 16px',
              color: '#EF4444',
              fontSize: 12,
              textAlign: 'left',
              overflow: 'auto',
              marginBottom: 24,
              maxHeight: 200,
            }}>
              {this.state.error?.message || 'Unknown error'}
            </pre>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #5B6EF5 0%, #7C3AED 100%)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '10px 24px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
