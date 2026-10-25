import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fmt } from '../utils/formatters';

export const AssetDetailPage = () => {
  const { assetId } = useParams();
  const navigate = useNavigate();
  const markets = useSelector((state) => state.market.markets);
  const prices = useSelector((state) => state.market.prices);

  const allAssets = [...markets.crypto, ...markets.forex];
  const asset = allAssets.find((a) => a.id === assetId) || allAssets[0];
  const currentPrice = prices[asset.id] || asset.price;
  const isUp = asset.change >= 0;

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <button className="btn-outline" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        ← Back
      </button>

      <div className="summary-card" style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: '16px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: `${asset.color}22`,
                color: asset.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 800
              }}
            >
              {asset.icon}
            </div>
            <div>
              <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 800 }}>{asset.full}</h1>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{asset.name} • TradingView Market Feed</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '32px', fontWeight: 700, fontFamily: 'Syne, sans-serif' }}>
              {fmt(currentPrice)}
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                background: isUp ? 'var(--green-dim)' : 'var(--red-dim)',
                color: isUp ? 'var(--accent-green)' : 'var(--accent-red)'
              }}
            >
              {isUp ? '+' : ''}{asset.change}%
            </span>
          </div>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>24H High</div>
            <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>{fmt(currentPrice * 1.03)}</div>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>24H Low</div>
            <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>{fmt(currentPrice * 0.97)}</div>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Symbol Code</div>
            <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>{asset.tvSym}</div>
          </div>
        </section>
      </div>
    </div>
  );
};