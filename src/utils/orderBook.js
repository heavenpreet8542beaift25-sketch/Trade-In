// Generates a small synthetic order book (5 asks + 5 bids) around a price.
// Pure function so it's easy to call from either the sidebar widget or the
// asset detail page without duplicating logic.
export function buildOrderBook(price, spreadStep = 0.0003) {
  const asks = [];
  const bids = [];
  for (let i = 5; i >= 1; i--) {
    asks.push({ p: price * (1 + i * spreadStep + Math.random() * spreadStep * 0.6), s: +(Math.random() * 2 + 0.1).toFixed(4) });
  }
  for (let i = 1; i <= 5; i++) {
    bids.push({ p: price * (1 - i * spreadStep - Math.random() * spreadStep * 0.6), s: +(Math.random() * 2 + 0.1).toFixed(4) });
  }
  const maxSize = Math.max(...[...asks, ...bids].map((x) => x.s));
  const spread = asks[asks.length - 1].p - bids[0].p;
  return { asks, bids, maxSize, spread };
}
