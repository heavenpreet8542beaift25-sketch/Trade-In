import { formatINR } from '../../utils/format.js';

// Props:
//   title    - card header label, e.g. "🪙 Crypto / INR"
//   items    - array of market instruments to render
//   prices   - current price map
//   onSelect(id) - callback when a row is activated
export default function MarketList({ title, items, prices, onSelect }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">{title}</span>
        <span style={{ fontSize: 10, color: 'var(--accent-green)' }} aria-live="polite">● LIVE</span>
      </div>
      <div role="list">
        {items.map((m) => {
          const up = m.change >= 0;
          return (
            <div
              key={m.id}
              className="market-row"
              role="listitem"
              tabIndex={0}
              onClick={() => onSelect(m.id)}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(m.id)}
              aria-label={`${m.full} ${formatINR(prices[m.id])} ${m.change}%`}
            >
              <div className="market-row-left">
                <div className="market-icon" style={{ background: `${m.color}22`, color: m.color }}>{m.icon}</div>
                <div>
                  <div className="market-row-name">{m.name}</div>
                  <div className="market-row-sub">{m.full}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="market-row-price" aria-live="polite">{formatINR(prices[m.id])}</div>
                <div className={`market-row-change ${up ? 'up' : 'down'}`}>{up ? '+' : ''}{m.change}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
