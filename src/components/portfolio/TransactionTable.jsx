import { useMemo } from 'react';
import { formatINR } from '../../utils/format.js';

// Props: portfolio - array of holdings
// Builds a simple BUY history per holding (a top-up row when a seeded flag
// on the id makes it "eligible", so the table stays stable across renders).
export default function TransactionTable({ portfolio }) {
  const rows = useMemo(() => {
    const txs = [];
    portfolio.forEach((p, idx) => {
      txs.push({ date: '12 Mar 2026', asset: p.name, type: 'BUY', amount: formatINR(p.invested), price: formatINR(p.buyPrice) });
      if (idx % 2 === 0) {
        txs.push({ date: '8 Mar 2026', asset: p.name, type: 'BUY', amount: formatINR(p.invested * 0.3), price: formatINR(p.buyPrice * 0.98) });
      }
    });
    return txs.slice(0, 10);
  }, [portfolio]);

  return (
    <div className="tx-card">
      <div className="section-title-sm">Transaction History</div>
      <table className="tx-table" aria-label="Transactions">
        <thead>
          <tr>
            <th scope="col">DATE</th><th scope="col">ASSET</th><th scope="col">TYPE</th>
            <th scope="col">AMOUNT</th><th scope="col">PRICE</th><th scope="col">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t, i) => (
            <tr key={i}>
              <td style={{ color: 'var(--text-muted)' }}>{t.date}</td>
              <td style={{ fontWeight: 600 }}>{t.asset}</td>
              <td><span className={`tx-type ${t.type.toLowerCase()}`}>{t.type}</span></td>
              <td>{t.amount}</td>
              <td>{t.price}</td>
              <td><span style={{ color: 'var(--accent-green)', fontSize: 10 }}>● Executed</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
