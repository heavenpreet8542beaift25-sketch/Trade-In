import { allMarkets } from '../../data/markets.js';
import { formatCompact } from '../../utils/format.js';

// Props:
//   prices - current price map { [assetId]: number }
//   onSelectAsset(id) - callback fired when a live-price card is clicked
export default function Hero({ prices, onSelectAsset }) {
  const btc = allMarkets().find((m) => m.id === 'BTC');
  const eth = allMarkets().find((m) => m.id === 'ETH');

  const cards = [
    { key: 'BTC', label: 'BTC / INR', asset: btc, color: 'green' },
    { key: 'cap', label: 'Market Cap', value: '₹48.2L Cr', sub: '+3.1%', color: 'blue' },
    { key: 'vol', label: '24H Volume', value: '₹2,840 Cr', sub: '+12.4%', color: 'gold' },
    { key: 'ETH', label: 'ETH / INR', asset: eth, color: 'red' }
  ];

  return (
    <section className="hero" aria-label="Market statistics">
      {cards.map((card, i) => {
        const isLive = Boolean(card.asset);
        const up = isLive ? card.asset.change >= 0 : true;
        return (
          <article
            key={card.key}
            className={`market-stat-card ${card.color}`}
            style={{ animationDelay: `${i * 0.1}s` }}
            role={isLive ? 'button' : undefined}
            tabIndex={isLive ? 0 : undefined}
            aria-label={isLive ? `${card.asset.id} price` : undefined}
            onClick={isLive ? () => onSelectAsset(card.asset.id) : undefined}
            onKeyDown={isLive ? (e) => e.key === 'Enter' && onSelectAsset(card.asset.id) : undefined}
          >
            <div className="stat-label">{card.label}</div>
            <div className="stat-value" aria-live="polite">
              {isLive ? `₹${formatCompact(prices[card.asset.id])}` : card.value}
            </div>
            <div className={`stat-change ${up ? 'up' : 'down'}`}>
              {isLive ? `${up ? '▲' : '▼'} ${Math.abs(card.asset.change)}%` : card.sub}
            </div>
          </article>
        );
      })}
    </section>
  );
}
