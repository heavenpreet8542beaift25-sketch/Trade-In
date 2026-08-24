import { useEffect, useRef } from 'react';

const SYMBOLS = [
  { proName: 'BITSTAMP:BTCUSD', title: 'BTC/USD' },
  { proName: 'BITSTAMP:ETHUSD', title: 'ETH/USD' },
  { proName: 'FX_IDC:USDINR', title: 'USD/INR' },
  { proName: 'FX_IDC:EURINR', title: 'EUR/INR' },
  { proName: 'FX_IDC:GBPINR', title: 'GBP/INR' },
  { description: 'Solana', proName: 'BINANCE:SOLUSDT' },
  { description: 'BNB', proName: 'BINANCE:BNBUSDT' },
  { description: 'XRP', proName: 'BINANCE:XRPUSDT' },
  { proName: 'NSE:NIFTY', title: 'NIFTY 50' },
  { proName: 'NSE:BANKNIFTY', title: 'BANK NIFTY' },
  { proName: 'COMEX:GC1!', title: 'Gold' },
  { proName: 'MCX:CRUDEOIL1!', title: 'Crude Oil' }
];

export default function TickerTape() {
  const containerRef = useRef(null);

  // Direct DOM manipulation: TradingView ships as a plain <script> widget,
  // so we append/clean it up on the container node ourselves rather than
  // trying to model it as JSX.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    node.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.innerHTML = JSON.stringify({
      symbols: SYMBOLS,
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en'
    });
    node.appendChild(script);

    return () => {
      node.innerHTML = '';
    };
  }, []);

  return (
    <div className="tv-tape-section">
      <div className="tradingview-widget-container" style={{ height: 46 }} ref={containerRef} />
    </div>
  );
}
