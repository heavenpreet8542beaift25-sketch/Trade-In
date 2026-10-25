import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';
import { AskTradeInAI } from './components/common/AskTradeInAI'; // <-- IMPORTED HERE
import { updateLivePrices } from './store/slices/marketSlice';
import './styles/index.css';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateLivePrices());
    }, 1200);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <nav role="navigation" aria-label="Main navigation">
        <Link className="nav-logo" to="/">Trade-<span>In</span><em>•</em></Link>
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
        </ul>
        <div className="nav-right">
          {isAuthenticated ? (
            <button className="btn-outline" onClick={logout}>← Logout</button>
          ) : (
            <Link to="/login" className="btn-primary">Login →</Link>
          )}
        </div>
      </nav>

      <main id="main-content">
        <AppRoutes />
      </main>

      {/* ASK TRADE-IN AI FLOATING ASSISTANT */}
      <AskTradeInAI />

      <footer>
        <div className="footer-brand">Trade-<span>In</span>•</div>
        <p className="footer-note">Simulated data for educational purposes. © 2026 Trade-In — Chitkara University Project</p>
      </footer>
    </div>
  );
};

export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <MainLayout />
        </Router>
      </AuthProvider>
    </Provider>
  );
};

export default App;