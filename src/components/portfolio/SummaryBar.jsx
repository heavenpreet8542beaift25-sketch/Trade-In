import { formatINR } from '../../utils/format.js';

// Props: portfolio - array of holdings, prices - live price map
export default function SummaryBar({ portfolio, prices }) {
  let totalInvested = 0;
  let totalCurrent = 0;
  let best = null;
  let worst = null;

  portfolio.forEach((p) => {
    const curr = prices[p.id] || p.buyPrice;
    const units = p.invested / p.buyPrice;
    const currentValue = units * curr;
    totalInvested += p.invested;
    totalCurrent += currentValue;
    const pct = ((currentValue - p.invested) / p.invested) * 100;
    if (!best || pct > best.pct) best = { ...p, pct };
    if (!worst || pct < worst.pct) worst = { ...p, pct };
  });

  const pnl = totalCurrent - totalInvested;
  const pct = ((pnl / totalInvested) * 100).toFixed(2);
  const up = pnl >= 0;

  return (
    <section className="summary-bar" aria-label="Summary stats">
      <div className="summary-card blue">
        <div className="summary-label">Total Invested</div>
        <div className="summary-value">{formatINR(totalInvested)}</div>
        <div className="summary-sub" style={{ color: 'var(--text-muted)' }}>{portfolio.length} assets</div>
      </div>
      <div className={`summary-card ${up ? 'green' : 'red'}`}>
        <div className="summary-label">Current Value</div>
        <div className="summary-value" style={{ color: up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{formatINR(totalCurrent)}</div>
        <div className={`summary-sub ${up ? 'up' : 'down'}`}>{up ? '▲ Profit' : '▼ Loss'}</div>
      </div>
      <div className={`summary-card ${up ? 'green' : 'red'}`}>
        <div className="summary-label">Total P&amp;L</div>
        <div className="summary-value" style={{ color: up ? 'var(--accent-green)' : 'var(--accent-red)' }}>{up ? '+' : ''}{formatINR(Math.abs(pnl))}</div>
        <div className={`summary-sub ${up ? 'up' : 'down'}`}>{up ? '+' : ''}{pct}%</div>
      </div>
      <div className="summary-card gold">
        <div className="summary-label">Best</div>
        <div className="summary-value">{best ? best.name : '-'}</div>
        <div className="summary-sub up">{best ? `+${best.pct.toFixed(2)}%` : '-'}</div>
      </div>
      <div className="summary-card red">
        <div className="summary-label">Worst</div>
        <div className="summary-value">{worst ? worst.name : '-'}</div>
        <div className="summary-sub down">{worst ? `${worst.pct.toFixed(2)}%` : '-'}</div>
      </div>
    </section>
  );
}
