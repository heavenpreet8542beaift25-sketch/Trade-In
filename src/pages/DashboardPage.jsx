import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedAsset } from '../store/slices/marketSlice';
import { fmt, fmt2 } from '../utils/formatters';

export const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const markets = useSelector((state) => state.market.markets);
  const prices = useSelector((state) => state.market.prices);

  const handleAssetClick = (id) => {
    dispatch(setSelectedAsset(id));
    navigate(`/asset/${id}`);
  };

  return (
    <div className="dashboard-page" style={{ padding: '32px', maxWidth: '1600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800 }}>
          Market <span>Dashboard</span>
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Real-time tracking for Indian market indices, Crypto, and Forex pairs.
        </p>
      </header>

      {/* HERO STATS */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className="summary-card blue" style={{ cursor: 'pointer' }} onClick={() => handleAssetClick('BTC')}>
          <div className="summary-label">BTC / INR</div>
          <div className="summary-value">{fmt(prices.BTC)}</div>
          <div className="summary-sub up">▲ Live Update</div>
        </div>
        <div className="summary-card green">
          <div className="summary-label">Market Cap</div>
          <div className="summary-value">₹48.2L Cr</div>
          <div className="summary-sub up">+3.1% 24h</div>
        </div>
        <div className="summary-card blue">
          <div className="summary-label">24H Volume</div>
          <div className="summary-value">₹2,840 Cr</div>
          <div className="summary-sub up">+12.4%</div>
        </div>
        <div className="summary-card red" style={{ cursor: 'pointer' }} onClick={() => handleAssetClick('ETH')}>
          <div className="summary-label">ETH / INR</div>
          <div className="summary-value">{fmt(prices.ETH)}</div>
          <div className="summary-sub down">▼ Live Update</div>
        </div>
      </section>

      {/* MARKET LISTINGS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* CRYPTO LIST */}
        <section className="summary-card" style={{ background: 'var(--bg-card)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', marginBottom: '16px', color: 'var(--accent-blue)' }}>
            🪙 Crypto / INR
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {markets.crypto.map((coin) => (
              <div
                key={coin.id}
                onClick={() => handleAssetClick(coin.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px', color: coin.color }}>{coin.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{coin.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{coin.full}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{fmt(prices[coin.id] || coin.price)}</div>
                  <div style={{ fontSize: '10px', color: coin.change >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {coin.change >= 0 ? '+' : ''}{coin.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOREX LIST */}
        <section className="summary-card" style={{ background: 'var(--bg-card)' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '16px', marginBottom: '16px', color: 'var(--accent-gold)' }}>
            💱 Forex / INR
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {markets.forex.map((fx) => (
              <div
                key={fx.id}
                onClick={() => handleAssetClick(fx.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '18px', color: fx.color }}>{fx.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{fx.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{fx.full}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: '13px' }}>{fmt(prices[fx.id] || fx.price)}</div>
                  <div style={{ fontSize: '10px', color: fx.change >= 0 ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                    {fx.change >= 0 ? '+' : ''}{fx.change}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};