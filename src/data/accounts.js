// Demo login accounts. In a production build this would come from an auth API;
// here it models the "props/state" flow for the Portfolio Access feature.
export const ACCOUNTS = Object.freeze({
  TRADER001: {
    label: 'Crypto-heavy • ₹8L invested',
    portfolio: [
      { id: 'BTC', name: 'Bitcoin', market: 'Crypto', invested: 300000, buyPrice: 5100000, icon: '₿', color: '#f7931a' },
      { id: 'ETH', name: 'Ethereum', market: 'Crypto', invested: 200000, buyPrice: 285000, icon: 'Ξ', color: '#627eea' },
      { id: 'SOL', name: 'Solana', market: 'Crypto', invested: 120000, buyPrice: 11000, icon: '◎', color: '#9945ff' },
      { id: 'BNB', name: 'BNB', market: 'Crypto', invested: 80000, buyPrice: 48000, icon: 'B', color: '#f3ba2f' },
      { id: 'XRP', name: 'XRP', market: 'Crypto', invested: 50000, buyPrice: 600, icon: '✕', color: '#00aae4' },
      { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 50000, buyPrice: 82.0, icon: '$', color: '#85bb65' }
    ]
  },
  TRADER002: {
    label: 'Mixed Crypto + Forex • ₹4.4L',
    portfolio: [
      { id: 'BTC', name: 'Bitcoin', market: 'Crypto', invested: 150000, buyPrice: 5400000, icon: '₿', color: '#f7931a' },
      { id: 'ETH', name: 'Ethereum', market: 'Crypto', invested: 100000, buyPrice: 310000, icon: 'Ξ', color: '#627eea' },
      { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 80000, buyPrice: 83.0, icon: '$', color: '#85bb65' },
      { id: 'EUR', name: 'EUR/INR', market: 'Forex', invested: 60000, buyPrice: 90.5, icon: '€', color: '#4a6fa5' },
      { id: 'GBP', name: 'GBP/INR', market: 'Forex', invested: 50000, buyPrice: 106.2, icon: '£', color: '#cf142b' }
    ]
  },
  TRADER003: {
    label: 'Forex-focused • ₹3.1L',
    portfolio: [
      { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 100000, buyPrice: 82.8, icon: '$', color: '#85bb65' },
      { id: 'EUR', name: 'EUR/INR', market: 'Forex', invested: 80000, buyPrice: 91.0, icon: '€', color: '#4a6fa5' },
      { id: 'GBP', name: 'GBP/INR', market: 'Forex', invested: 70000, buyPrice: 105.5, icon: '£', color: '#cf142b' },
      { id: 'JPY', name: 'JPY/INR', market: 'Forex', invested: 40000, buyPrice: 0.56, icon: '¥', color: '#bc002d' },
      { id: 'AED', name: 'AED/INR', market: 'Forex', invested: 20000, buyPrice: 22.6, icon: 'د', color: '#00732f' }
    ]
  }
});

// Shown on the dashboard's "My Investments" preview before a user logs in.
export const DEMO_PORTFOLIO = [
  { id: 'BTC', name: 'Bitcoin', market: 'Crypto', invested: 250000, buyPrice: 5200000, icon: '₿', color: '#f7931a' },
  { id: 'ETH', name: 'Ethereum', market: 'Crypto', invested: 150000, buyPrice: 290000, icon: 'Ξ', color: '#627eea' },
  { id: 'SOL', name: 'Solana', market: 'Crypto', invested: 80000, buyPrice: 12500, icon: '◎', color: '#9945ff' },
  { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 100000, buyPrice: 82.5, icon: '$', color: '#85bb65' },
  { id: 'EUR', name: 'EUR/INR', market: 'Forex', invested: 60000, buyPrice: 91.2, icon: '€', color: '#4a6fa5' },
  { id: 'XRP', name: 'XRP', market: 'Crypto', invested: 40000, buyPrice: 600, icon: '✕', color: '#00aae4' }
];
