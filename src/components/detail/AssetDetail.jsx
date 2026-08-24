import { allMarkets } from '../../data/markets.js';
import { META } from '../../data/meta.js';
import { NEWS_BY_MARKET } from '../../data/news.js';
import { ACCOUNTS } from '../../data/accounts.js';
import { formatINR } from '../../utils/format.js';
import TradingViewChart from '../dashboard/TradingViewChart.jsx';
import OrderBook from '../dashboard/OrderBook.jsx';
import Footer from '../layout/Footer.jsx';

// Props:
//   assetId - id of the asset being viewed
//   account - signed-in account id, or null if opened from the public dashboard
//   prices  - live price map
//   onBack() - return to whichever page opened the detail view
export default function AssetDetail({ assetId, account, prices, onBack }) {
  const asset = allMarkets().find((m) => m.id === assetId);
  const meta = META[assetId];
  if (!asset || !meta) {
    return (
      <div className="detail-page">
        <button className="btn-outline" onClick={onBack}>← Back</button>
        <p style={{ marginTop: 16 }}>Asset not found.</p>
      </div>
    );
  }

  const curr = prices[assetId] || asset.price;
  const up = asset.change >= 0;
  const f = meta.f;
  const newsItems = NEWS_BY_MARKET[meta.newsTag] || [];

  const holding = account ? ACCOUNTS[account]?.portfolio.find((p) => p.id === assetId) : null;
  let position = null;
  if (holding) {
    const units = holding.invested / holding.buyPrice;
    const currentValue = units * curr;
    const pnl = currentValue - holding.invested;
    const pct = ((pnl / holding.invested) * 100).toFixed(2);
    const posUp = pnl >= 0;
    const gaugeWidth = Math.min(100, Math.max(0, 50 + parseFloat(pct) * 2));
    position = { units, currentValue, pnl, pct, posUp, gaugeWidth };
  }

  return (
    <div id="page-detail" className="page active">
      <div className="detail-page">
        <div style={{ marginBottom: 16 }}>
          <button className="btn-outline" onClick={onBack}>← Back</button>
        </div>

        <header className="asset-header">
          <div className="asset-header-left">
            <div className="asset-big-icon" style={{ background: `${asset.color}22`, color: asset.color }}>{asset.icon}</div>
            <div>
              <h1 className="asset-title">{asset.full || asset.name}</h1>
              <p className="asset-subtitle">{asset.name} — {meta.desc}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="asset-live-price" aria-live="polite">{formatINR(curr)}</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
              <span className={`price-change-badge ${up ? 'up' : 'down'}`}>{up ? '+' : ''}{asset.change}%</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>24H</span>
            </div>
          </div>
        </header>

        <div className="detail-grid">
          <div className="detail-left">
            <section className="card">
              <div className="card-header">
                <span className="card-title">📊 Live Chart — {asset.name} (TradingView)</span>
                <span style={{ fontSize: 10, color: 'var(--accent-green)' }}>● Real Data</span>
              </div>
              <TradingViewChart symbol={meta.tvSym} height={450} />
            </section>

            <section className="card">
              <div className="card-header"><span className="card-title">📋 Fundamentals</span></div>
              <dl className="fund-grid">
                {Object.entries(f).map(([k, v]) => (
                  <div className="fund-cell" key={k}>
                    <dt className="fund-label">{k.replace(/([A-Z])/g, ' $1').trim()}</dt>
                    <dd className="fund-value">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="card">
              <div className="card-header">
                <span className="card-title">📰 News — {asset.full}</span>
                <span style={{ fontSize: 10, color: 'var(--accent-green)' }}>● Live</span>
              </div>
              {newsItems.map((n) => (
                <div className="news-item" tabIndex={0} key={n.title}>
                  <span className={`news-tag ${n.tag}`}>{n.tag.toUpperCase()}</span>
                  <div className="news-title-d">{n.title}</div>
                  <time className="news-time-d">{n.time}</time>
                </div>
              ))}
            </section>
          </div>

          <div className="detail-right">
            {position && (
              <section className="card">
                <div className="card-header"><span className="card-title">💼 Your Position</span></div>
                <div className="pnl-big">
                  <div className="pnl-big-val" style={{ color: position.posUp ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {position.posUp ? '+' : ''}{formatINR(Math.abs(position.pnl))}
                  </div>
                  <div className="pnl-big-label">{position.posUp ? 'UNREALIZED PROFIT' : 'UNREALIZED LOSS'}</div>
                </div>
                <div style={{ padding: '12px 16px 16px' }}>
                  <div className="pnl-gauge-track">
                    <div className="pnl-gauge-fill" style={{ width: `${position.gaugeWidth}%`, background: position.posUp ? 'var(--accent-green)' : 'var(--accent-red)' }} />
                  </div>
                  <div className="pnl-gauge-labels">
                    <span>Loss</span>
                    <span style={{ color: position.posUp ? 'var(--accent-green)' : 'var(--accent-red)' }}>{position.posUp ? '+' : ''}{position.pct}%</span>
                    <span>Profit</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
                  <div className="isg-cell"><div className="isg-label">Invested</div><div className="isg-value">{formatINR(holding.invested)}</div></div>
                  <div className="isg-cell"><div className="isg-label">Current Value</div><div className="isg-value" style={{ color: position.posUp ? 'var(--accent-green)' : 'var(--accent-red)' }}>{formatINR(position.currentValue)}</div></div>
                  <div className="isg-cell"><div className="isg-label">Avg Buy</div><div className="isg-value">{formatINR(holding.buyPrice)}</div></div>
                  <div className="isg-cell"><div className="isg-label">Units</div><div className="isg-value">{position.units.toFixed(4)}</div></div>
                </div>
              </section>
            )}

            <OrderBook assetName={asset.name} price={curr} />

            <section className="card">
              <div className="card-header"><span className="card-title">📐 52W Range</span></div>
              <div style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>
                  <span>Low: {f.atl || '-'}</span><span>High: {f.ath || '-'}</span>
                </div>
                <div style={{ height: 6, background: 'var(--border)', borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                  <div style={{ height: '100%', width: '65%', background: 'linear-gradient(90deg,var(--accent-red),var(--accent-green))', borderRadius: 3 }} />
                  <div style={{ position: 'absolute', top: -4, left: '65%', width: 2, height: 14, background: '#fff', borderRadius: 1 }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>Current: {formatINR(curr)}</div>
              </div>
            </section>

            <section className="card">
              <div className="card-header"><span className="card-title">🔔 Alerts</span></div>
              {[
                { icon: '📈', bg: 'var(--green-dim)', txt: `${asset.name} hit new 24H high`, t: 'Just now' },
                { icon: '⚠️', bg: 'var(--blue-dim)', txt: `RSI at ${f.rsi || 'N/A'} — watch reversal`, t: '15 min ago' },
                { icon: '📉', bg: 'var(--red-dim)', txt: `Volume spike on ${asset.name}`, t: '1 hr ago' }
              ].map((al) => (
                <div className="alert-item" key={al.txt}>
                  <div className="alert-icon" style={{ background: al.bg }}>{al.icon}</div>
                  <div><div className="alert-text">{al.txt}</div><time className="alert-time">{al.t}</time></div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
