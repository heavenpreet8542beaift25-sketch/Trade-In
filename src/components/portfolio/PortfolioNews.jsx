import { useMemo } from 'react';
import { NEWS_BY_MARKET } from '../../data/news.js';

export default function PortfolioNews() {
  const items = useMemo(() => {
    const all = [...NEWS_BY_MARKET.crypto, ...NEWS_BY_MARKET.forex];
    return [...all].sort(() => Math.random() - 0.5).slice(0, 8);
  }, []);

  return (
    <div className="news-scroll">
      {items.map((n) => (
        <article className="news-mini" tabIndex={0} key={n.title}>
          <span className={`news-tag ${n.tag}`}>{n.tag.toUpperCase()}</span>
          <h4 className="news-mini-title">{n.title}</h4>
          <time className="news-mini-time">{n.time}</time>
        </article>
      ))}
    </div>
  );
}
