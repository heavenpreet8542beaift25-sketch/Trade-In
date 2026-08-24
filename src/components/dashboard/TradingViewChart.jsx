import { useEffect, useRef, useState } from 'react';

// Props:
//   symbol - TradingView symbol string, e.g. "BITSTAMP:BTCUSD"
//   height - pixel height of the chart (default 520)
//   studies - whether to overlay RSI/MACD/Bollinger Bands studies
export default function TradingViewChart({ symbol, height = 520, studies = true }) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    setLoading(true);
    node.innerHTML = '';

    const studyParam = studies
      ? '&studies=RSI%40tv-basicstudies%2CMACD%40tv-basicstudies%2CBB%40tv-basicstudies'
      : '';

    const iframe = document.createElement('iframe');
    iframe.style.cssText = `width:100%;height:${height}px;border:none;display:block;`;
    iframe.title = `TradingView chart ${symbol}`;
    iframe.loading = 'lazy';
    iframe.setAttribute('allowfullscreen', '');
    iframe.src = `https://www.tradingview.com/widgetembed/?frameElementId=tv_${symbol.replace(/[^a-zA-Z0-9]/g, '')}&symbol=${encodeURIComponent(symbol)}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=0f1923${studyParam}&theme=dark&style=1&timezone=Asia%2FKolkata&withdateranges=1&locale=en`;
    iframe.onload = () => setLoading(false);
    node.appendChild(iframe);

    const fallback = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(fallback);
  }, [symbol, height, studies]);

  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <div className={`tv-loader${loading ? '' : ' hidden'}`}>
        <div className="spinner" />
        <p>Loading Live Chart…</p>
      </div>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
