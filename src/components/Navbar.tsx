import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, ChevronRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import { ROUTES } from '../constants/routes';
import { USER_ROLE } from '../constants/statusEnums';
import './Navbar.css';

const NAV_LINKS = [
  { to: ROUTES.ABOUT, label: 'About' },
  { to: ROUTES.RULES, label: 'Rules' },
  { to: ROUTES.PROBLEMS, label: 'Problems' },
  { to: ROUTES.SCHEDULE, label: 'Schedule' },
  { to: ROUTES.FAQ, label: 'FAQ' },
  { to: ROUTES.CONTACT, label: 'Contact' },
];

function getDashboardRoute(role: string | null): string {
  switch (role) {
    case USER_ROLE.ADMIN: return ROUTES.ADMIN;
    case USER_ROLE.JUDGE: return ROUTES.JUDGE;
    case USER_ROLE.VOLUNTEER: return ROUTES.VOLUNTEER;
    case USER_ROLE.MENTOR: return ROUTES.MENTOR;
    default: return ROUTES.DASHBOARD;
  }
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="navbar-logo">
            <div className="navbar-logo-icon">
              <Zap size={18} />
            </div>
            <div className="navbar-logo-text">
              <span className="navbar-logo-title">FUZON</span>
              <span className="navbar-logo-sub">2K26</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar-links hide-mobile">
            {NAV_LINKS.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="navbar-actions hide-mobile">
            {user ? (
              <>
                <Link
                  to={getDashboardRoute(user.role)}
                  className="btn btn-secondary"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout} title="Sign out">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="btn btn-ghost btn-sm">
                  <User size={16} />
                  Sign In
                </Link>
                <Link to={ROUTES.REGISTER} className="btn btn-primary">
                  Register Now
                  <ChevronRight size={16} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="navbar-mobile-toggle hide-desktop"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="navbar-mobile-menu hide-desktop">
          <div className="container">
            <ul className="navbar-mobile-links">
              {NAV_LINKS.map(link => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `navbar-mobile-link ${isActive ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="navbar-mobile-actions">
              {user ? (
                <>
                  <Link
                    to={getDashboardRoute(user.role)}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    Go to Dashboard
                  </Link>
                  <button className="btn btn-ghost" style={{ width: '100%' }} onClick={handleLogout}>
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={ROUTES.REGISTER}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => setIsOpen(false)}
                  >
                    Register Now
                  </Link>
                  <Link
                    to={ROUTES.LOGIN}
                    className="btn btn-secondary"
                    style={{ width: '100%' }}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
