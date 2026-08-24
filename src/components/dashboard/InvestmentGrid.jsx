import { formatINR } from '../../utils/format.js';

// Props:
//   holdings - array of { id, name, market, invested, buyPrice, icon, color }
//   prices   - live price map
//   onOpen(id) - navigate to the asset detail page
export default function InvestmentGrid({ holdings, prices, onOpen }) {
  return (
    <div className="portfolio-grid">
      {holdings.map((p) => {
        const curr = prices[p.id] || p.buyPrice;
        const units = p.invested / p.buyPrice;
        const currentValue = units * curr;
        const pnl = currentValue - p.invested;
        const pct = ((pnl / p.invested) * 100).toFixed(2);
        const up = pnl >= 0;

        return (
          <article
            key={p.id}
            className="portfolio-mini-card"
            role="button"
            tabIndex={0}
            onClick={() => onOpen(p.id)}
            onKeyDown={(e) => e.key === 'Enter' && onOpen(p.id)}
          >
            <div className="pm-header">
              <div className="pm-asset">
                <div className="pm-icon" style={{ background: `${p.color}22`, color: p.color }}>{p.icon}</div>
                <div>
                  <div className="pm-name">{p.name}</div>
                  <div className="pm-market">{p.market}</div>
                </div>
              </div>
              <span className={`pm-badge ${up ? 'profit' : 'loss'}`}>{up ? '+' : ''}{pct}%</span>
            </div>
            <div className="pm-stats">
              <div><div className="pm-stat-label">Invested</div><div className="pm-stat-value">{formatINR(p.invested)}</div></div>
              <div><div className="pm-stat-label">Current</div><div className="pm-stat-value" style={{ color: up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{formatINR(currentValue)}</div></div>
              <div><div className="pm-stat-label">P&L</div><div className="pm-stat-value" style={{ color: up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{up ? '+' : ''}{formatINR(Math.abs(pnl))}</div></div>
              <div><div className="pm-stat-label">Buy Price</div><div className="pm-stat-value">{formatINR(p.buyPrice)}</div></div>
            </div>
            <div className="pm-footer">
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Live: {formatINR(curr)}</div>
              <div className="view-detail-btn">Detail →</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
