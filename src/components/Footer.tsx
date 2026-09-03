import { Link } from 'react-router-dom';
import { Zap, Mail, MapPin, ExternalLink } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import './Footer.css';

const FOOTER_LINKS = {
  event: [
    { to: ROUTES.ABOUT, label: 'About FUZON' },
    { to: ROUTES.RULES, label: 'Rules' },
    { to: ROUTES.SCHEDULE, label: 'Schedule' },
    { to: ROUTES.PROBLEMS, label: 'Problem Statements' },
  ],
  participate: [
    { to: ROUTES.REGISTER, label: 'Register Now' },
    { to: ROUTES.FAQ, label: 'FAQ' },
    { to: ROUTES.RESULTS, label: 'Results' },
    { to: ROUTES.CONTACT, label: 'Contact Us' },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="container">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link to={ROUTES.HOME} className="footer-logo">
              <div className="footer-logo-icon">
                <Zap size={20} />
              </div>
              <div>
                <div className="footer-logo-title">FUZON 2K26</div>
                <div className="footer-logo-sub">Mini Hackathon</div>
              </div>
            </Link>
            <p className="footer-tagline">
              Two days. Infinite ideas. One hackathon that pushes boundaries at SKUCET.
            </p>
            <div className="footer-contact-info">
              <a href="mailto:fuzon@skucet.ac.in" className="footer-contact-item">
                <Mail size={14} />
                <span>fuzon@skucet.ac.in</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={14} />
                <span>Dept. of CSE, SKUCET, Ananthapuramu</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links-group">
            <h4 className="footer-links-title">Event</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.event.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-links-title">Participate</h4>
            <ul className="footer-links-list">
              {FOOTER_LINKS.participate.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-links-title">Institution</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="https://www.skucet.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  SKUCET Website
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <span className="footer-link-text">Dept. of CSE</span>
              </li>
              <li>
                <span className="footer-link-text">Sri Krishnadevaraya University</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} FUZON 2K26 · Dept. of CSE, SKUCET · All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span className="footer-legal-text">Built with ❤️ for innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
