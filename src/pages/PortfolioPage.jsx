import React from 'react';
import { useSelector } from 'react-redux';
import { fmt, fmt2 } from '../utils/formatters';
import { InvestmentCard } from '../components/portfolio/InvestmentCard';

export const PortfolioPage = () => {
  const activeAccountId = useSelector((state) => state.portfolio.activeAccountId);
  const account = useSelector((state) => state.portfolio.accounts[activeAccountId]);
  const prices = useSelector((state) => state.market.prices);

  if (!account) return null;

  const portfolio = account.portfolio;
  let totalInv = 0;
  let totalCurr = 0;

  portfolio.forEach((p) => {
    const curr = prices[p.id] || p.buyPrice;
    const units = p.invested / p.buyPrice;
    totalInv += p.invested;
    totalCurr += units * curr;
  });

  const pnl = totalCurr - totalInv;
  const pct = (pnl / totalInv * 100).toFixed(2);
  const isProfit = pnl >= 0;

  return (
    <div id="portfolioScreen" style={{ display: 'block', padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
      <div className="port-header">
        <div>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '2px', marginBottom: '4px' }}>
            PORTFOLIO OVERVIEW
          </div>
          <h1 className="port-title">My <span>Investments</span></h1>
        </div>
        <div className="port-account-badge" aria-live="polite">
          <div className="port-account-dot" />
          <span style={{ fontSize: '12px', fontWeight: 600 }}>{activeAccountId}</span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>● LIVE</span>
        </div>
      </div>

      <section className="summary-bar">
        <div className="summary-card blue">
          <div className="summary-label">Total Invested</div>
          <div className="summary-value">{fmt(totalInv)}</div>
          <div className="summary-sub" style={{ color: 'var(--text-muted)' }}>{portfolio.length} assets</div>
        </div>
        <div className={`summary-card ${isProfit ? 'green' : 'red'}`}>
          <div className="summary-label">Current Value</div>
          <div className="summary-value" style={{ color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {fmt(totalCurr)}
          </div>
          <div className={`summary-sub ${isProfit ? 'up' : 'down'}`}>
            {isProfit ? '▲ Profit' : '▼ Loss'}
          </div>
        </div>
        <div className={`summary-card ${isProfit ? 'green' : 'red'}`}>
          <div className="summary-label">Total P&L</div>
          <div className="summary-value" style={{ color: isProfit ? 'var(--accent-green)' : 'var(--accent-red)' }}>
            {isProfit ? '+' : ''}{fmt(Math.abs(pnl))}
          </div>
          <div className={`summary-sub ${isProfit ? 'up' : 'down'}`}>
            {isProfit ? '+' : ''}{pct}%
          </div>
        </div>
      </section>

      <section className="investments-grid" style={{ marginTop: '24px' }}>
        {portfolio.map((item) => (
          <InvestmentCard key={item.id} item={item} currentPrice={prices[item.id] || item.buyPrice} />
        ))}
      </section>
    </div>
  );
};