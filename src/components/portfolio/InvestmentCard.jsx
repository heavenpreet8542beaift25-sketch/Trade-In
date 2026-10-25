import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fmt } from '../../utils/formatters';

export const InvestmentCard = ({ item, currentPrice }) => {
  const navigate = useNavigate();
  const units = item.invested / item.buyPrice;
  const currentValue = units * currentPrice;
  const pnl = currentValue - item.invested;
  const pnlPct = ((pnl / item.invested) * 100).toFixed(2);
  const isProfit = pnl >= 0;

  return (
    <article
      className="invest-card"
      style={{ opacity: 1, cursor: 'pointer' }}
      onClick={() => navigate(`/asset/${item.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/asset/${item.id}`)}
    >
      <div className="ic-header">
        <div className="ic-asset">
          <div className="ic-icon" style={{ background: `${item.color}22`, color: item.color }}>
            {item.icon}
          </div>
          <div>
            <div className="ic-name">{item.name}</div>
            <div className="ic-mkt">{item.market}</div>
          </div>
        </div>
        <div>
          <div className={`ic-pnl-pct ${isProfit ? 'up' : 'down'}`}>
            {isProfit ? '+' : ''}{pnlPct}%
          </div>
          <div className="ic-pnl-abs">
            {isProfit ? '+' : ''}{fmt(Math.abs(pnl))}
          </div>
        </div>
      </div>

      <div className="ic-stats">
        <div>
          <div className="ic-stat-label">Invested</div>
          <div className="ic-stat-val">{fmt(item.invested)}</div>
        </div>
        <div>
          <div className="ic-stat-label">Current</div>
          <div className="ic-stat-val" style={{ color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {fmt(currentValue)}
          </div>
        </div>
      </div>

      <div className="ic-footer">
        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Live: {fmt(currentPrice)}</div>
        <div className="ic-view-btn">View Detail →</div>
      </div>
    </article>
  );
};