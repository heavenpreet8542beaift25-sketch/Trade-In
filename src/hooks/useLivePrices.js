import { useEffect, useState } from 'react';
import { allMarkets } from '../data/markets.js';

// Seeds the initial price map once, then nudges every price up/down at a
// fixed interval to simulate a live feed. Returns the current price map.
export function useLivePrices(intervalMs = 1200) {
  const [prices, setPrices] = useState(() => {
    const initial = {};
    allMarkets().forEach((m) => {
      initial[m.id] = m.price;
    });
    return initial;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        allMarkets().forEach((m) => {
          const volatility = ['BTC', 'ETH'].includes(m.id) ? 0.004 : 0.002;
          next[m.id] = next[m.id] * (1 + (Math.random() - 0.49) * volatility);
        });
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  return prices;
}
