import { useEffect, useRef, useState } from 'react';

const PANELS = [
  { id: 'crypto', label: 'Crypto', screen: 'top_gainers', market: 'crypto' },
  { id: 'forex', label: 'Forex', screen: 'most_volatile', market: 'forex' },
  { id: 'stocks', label: 'India Stocks', screen: 'most_capitalized', market: 'india' }
];

function ScreenerPanel({ config, active }) {
  const containerRef = useRef(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!active || loadedRef.current || !containerRef.current) return;
    loadedRef.current = true;

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '500px';
    containerRef.current.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.innerHTML = JSON.stringify({
      width: '100%',
      height: '500',
      defaultColumn: 'overview',
      defaultScreen: config.screen,
      market: config.market,
      showToolbar: true,
      colorTheme: 'dark',
      locale: 'en',
      isTransparent: true
    });
    containerRef.current.appendChild(script);
  }, [active, config]);

  return (
    <div className={`tv-panel card${active ? ' active' : ''}`} style={{ height: 500, overflow: 'hidden' }}>
      <div className="tradingview-widget-container" style={{ height: 500 }} ref={containerRef} />
    </div>
  );
}

export default function ScreenerSection() {
  const [tab, setTab] = useState('crypto');

  return (
    <section className="screener-section" id="screenerAnchor" aria-label="Market Screener">
      <div className="section-header">
        <h2 className="section-title">Market <span>Screener</span></h2>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Powered by TradingView</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }} role="tablist" aria-label="Screener market">
        {PANELS.map((p) => (
          <button
            key={p.id}
            className={`tv-tab${tab === p.id ? ' active' : ''}`}
            role="tab"
            aria-selected={tab === p.id}
            onClick={() => setTab(p.id)}
          >
            {p.label}
          </button>
        ))}
      </div>
      {PANELS.map((p) => (
        <ScreenerPanel key={p.id} config={p} active={tab === p.id} />
      ))}
    </section>
  );
}
