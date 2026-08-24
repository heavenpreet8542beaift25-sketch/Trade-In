// Props: items - array of { tag, headline, excerpt?, time, featured? }
export default function NewsGrid({ items }) {
  return (
    <div className="news-grid">
      {items.map((n, i) => (
        <article className={`news-card${i === 0 ? ' featured' : ''}`} tabIndex={0} aria-label={n.headline} key={n.headline}>
          <span className={`news-tag ${n.tag}`}>{n.tag.toUpperCase()}</span>
          <h3 className="news-headline">{n.headline}</h3>
          {n.excerpt && <p className="news-excerpt">{n.excerpt}</p>}
          <footer className="news-meta"><time>{n.time}</time></footer>
        </article>
      ))}
    </div>
  );
}
