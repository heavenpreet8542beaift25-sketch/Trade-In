import { useState } from 'react';
import { ACCOUNTS } from '../../data/accounts.js';

// Props: onLogin(accountId) - called once a valid demo account id is submitted
export default function Login({ onLogin }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const id = value.trim().toUpperCase();
    if (!ACCOUNTS[id]) {
      setError(true);
      return;
    }
    setError(false);
    onLogin(id);
  };

  return (
    <div id="loginScreen">
      <article className="login-card">
        <div className="login-glow" />
        <div className="login-icon">🔐</div>
        <h1 className="login-title">Portfolio <span>Access</span></h1>
        <p className="login-sub">
          Enter your TradeIN account ID to view<br />your investment portfolio &amp; analytics.
        </p>
        <form onSubmit={submit} noValidate>
          <div className="login-input-wrap">
            <span className="login-input-icon">👤</span>
            <input
              className="login-input"
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="TRADER001"
              maxLength={12}
              aria-label="Account ID"
              aria-required="true"
              aria-invalid={error}
              autoComplete="username"
              spellCheck="false"
            />
          </div>
          {error && (
            <div className="login-error" role="alert" aria-live="assertive" style={{ display: 'block' }}>
              ❌ Invalid account. Try TRADER001, TRADER002, or TRADER003.
            </div>
          )}
          <button type="submit" className="login-btn">Access Portfolio →</button>
        </form>
        <nav className="login-accounts" aria-label="Demo accounts">
          <div className="login-accounts-title">Demo Accounts</div>
          {Object.entries(ACCOUNTS).map(([id, acc]) => (
            <div
              className="demo-account"
              key={id}
              tabIndex={0}
              role="button"
              onClick={() => setValue(id)}
              onKeyDown={(e) => e.key === 'Enter' && setValue(id)}
            >
              <div>
                <div className="demo-id">{id}</div>
                <div className="demo-desc">{acc.label}</div>
              </div>
              <span>→</span>
            </div>
          ))}
        </nav>
      </article>
    </div>
  );
}
