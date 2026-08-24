import { useEffect, useState } from 'react';
import { formatINR } from '../../utils/format.js';
import { buildOrderBook } from '../../utils/orderBook.js';

// Props:
//   assetName - display label, e.g. "BTC/INR"
//   price     - current live price to build the book around
//   refreshMs - how often to regenerate the synthetic book (default 1500ms)
export default function OrderBook({ assetName, price, refreshMs = 1500 }) {
  const [book, setBook] = useState(() => buildOrderBook(price || 1));

  useEffect(() => {
    setBook(buildOrderBook(price || 1));
    const timer = setInterval(() => setBook(buildOrderBook(price || 1)), refreshMs);
    return () => clearInterval(timer);
  }, [price, refreshMs]);

  const renderRows = (rows, side) =>
    rows.map((r, i) => (
      <div className={`ob-row ${side}`} key={`${side}-${i}`} style={{ position: 'relative' }}>
        <span>{formatINR(r.p)}</span>
        <span style={{ textAlign: 'center' }}>{r.s}</span>
        <span style={{ textAlign: 'right' }}>{formatINR(r.p * r.s)}</span>
        <div
          className={`ob-bar ${side}`}
          style={{ width: `${((r.s / book.maxSize) * 100).toFixed(0)}%` }}
        />
      </div>
    ));

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📖 Order Book</span>
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{assetName}</span>
      </div>
      <div
        style={{ padding: '4px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', fontSize: 9, color: 'var(--text-muted)', letterSpacing: 1 }}
        aria-hidden="true"
      >
        <span>PRICE</span><span style={{ textAlign: 'center' }}>SIZE</span><span style={{ textAlign: 'right' }}>TOTAL</span>
      </div>
      {renderRows(book.asks, 'ask')}
      <div className="ob-spread" aria-live="polite">Spread: {formatINR(book.spread)}</div>
      {renderRows(book.bids, 'bid')}
    </div>
  );
}
