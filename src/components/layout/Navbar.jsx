import { useState } from 'react';
import { useClock } from '../../hooks/useClock.js';

// Props:
//   page       - current active page id ('dashboard' | 'portfolio' | 'detail')
//   isLoggedIn - whether a demo account is signed in (controls Logout button)
//   onNavigate(page) - navigate to a top-level page
//   onLogout() - clear the signed-in account
export default function Navbar({ page, isLoggedIn, onNavigate, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useClock();

  const links = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'portfolio', label: 'Portfolio' }
  ];

  const go = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <nav role="navigation" aria-label="Main navigation">
      <a className="nav-logo" href="#" onClick={(e) => { e.preventDefault(); go('dashboard'); }}>
        Trade<span>IN</span><em>•</em>
      </a>

      <button
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="navMenu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        ☰
      </button>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navMenu" role="menubar">
        {links.map((link) => (
          <li role="none" key={link.id}>
            <a
              href="#"
              role="menuitem"
              aria-current={page === link.id ? 'page' : undefined}
              onClick={(e) => { e.preventDefault(); go(link.id); }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <time className="nav-time">{time}</time>
        {page === 'portfolio' && isLoggedIn && (
          <button className="btn-outline" onClick={onLogout}>← Logout</button>
        )}
        {page !== 'portfolio' && (
          <button className="btn-primary" onClick={() => go('portfolio')}>My Portfolio →</button>
        )}
      </div>
    </nav>
  );
}
