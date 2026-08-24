import { formatINR } from '../../utils/format.js';

// Props:
//   holding - { id, name, market, invested, buyPrice, icon, color }
//   currentPrice - live price for this asset
//   delay - animation-delay in seconds, for staggered entrance
//   onOpen() - navigate to the detail page
export default function InvestCard({ holding, currentPrice, delay = 0, onOpen }) {
  const units = holding.invested / holding.buyPrice;
  const currentValue = units * currentPrice;
  const pnl = currentValue - holding.invested;
  const pct = ((pnl / holding.invested) * 100).toFixed(2);
  const up = pnl >= 0;
  const progressWidth = Math.min(100, Math.max(0, 50 + parseFloat(pct) * 2));

  return (
    <article
      className="invest-card"
      style={{ animationDelay: `${delay}s` }}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
    >
      <div className="ic-header">
        <div className="ic-asset">
          <div className="ic-icon" style={{ background: `${holding.color}22`, color: holding.color }}>{holding.icon}</div>
          <div>
            <div className="ic-name">{holding.name}</div>
            <div className="ic-mkt">{holding.market}</div>
          </div>
        </div>
        <div>
          <div className={`ic-pnl-pct ${up ? 'up' : 'down'}`}>{up ? '+' : ''}{pct}%</div>
          <div className="ic-pnl-abs">{up ? '+' : ''}{formatINR(Math.abs(pnl))}</div>
        </div>
      </div>
      <div className="ic-stats">
        <div><div className="ic-stat-label">Invested</div><div className="ic-stat-val">{formatINR(holding.invested)}</div></div>
        <div><div className="ic-stat-label">Current</div><div className="ic-stat-val" style={{ color: up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{formatINR(currentValue)}</div></div>
        <div><div className="ic-stat-label">Units</div><div className="ic-stat-val">{units.toFixed(4)}</div></div>
        <div><div className="ic-stat-label">Avg Buy</div><div className="ic-stat-val">{formatINR(holding.buyPrice)}</div></div>
      </div>
      <div className="ic-prog-label"><span>Progress</span><span style={{ color: up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{up ? '+' : ''}{pct}%</span></div>
      <div className="ic-prog-track" role="progressbar" aria-valuenow={progressWidth} aria-valuemin={0} aria-valuemax={100}>
        <div className="ic-prog-fill" style={{ width: `${progressWidth}%`, background: up ? 'var(--accent-green)' : 'var(--accent-red)' }} />
      </div>
      <div className="ic-footer">
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Live: {formatINR(currentPrice)}</div>
        <div className="ic-view-btn">View Detail →</div>
      </div>
    </article>
  );
}
