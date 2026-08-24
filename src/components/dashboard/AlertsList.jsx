const ALERTS = [
  { icon: '📈', bg: 'var(--green-dim)', text: '<b>BTC/INR</b> up <b>+2.34%</b> today. Investment in profit.', time: '2 min ago' },
  { icon: '📰', bg: 'var(--blue-dim)', text: '<b>RBI</b> crypto framework update expected this week.', time: '18 min ago' },
  { icon: '📉', bg: 'var(--red-dim)', text: '<b>ETH/INR</b> dropped below ₹3.15L support.', time: '45 min ago' },
  { icon: '✅', bg: 'var(--green-dim)', text: '<b>SOL</b> gained <b>+3.21%</b>. Review position.', time: '1 hr ago' }
];

export default function AlertsList() {
  return (
    <div className="card">
      <div className="card-header"><span className="card-title">🔔 Alerts & Activity</span></div>
      <div role="log" aria-live="polite">
        {ALERTS.map((a) => (
          <div className="alert-item" key={a.time + a.icon}>
            <div className="alert-icon" style={{ background: a.bg }}>{a.icon}</div>
            <div>
              {/* eslint-disable-next-line react/no-danger */}
              <div className="alert-text" dangerouslySetInnerHTML={{ __html: a.text }} />
              <time className="alert-time">{a.time}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
