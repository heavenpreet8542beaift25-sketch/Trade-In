import { createSlice } from '@reduxjs/toolkit';

const initialMarkets = {
  crypto: [
    { id: 'BTC', name: 'BTC/INR', full: 'Bitcoin', price: 5842000, icon: '₿', color: '#f7931a', change: 2.34, tvSym: 'BITSTAMP:BTCUSD' },
    { id: 'ETH', name: 'ETH/INR', full: 'Ethereum', price: 318500, icon: 'Ξ', color: '#627eea', change: -1.12, tvSym: 'BITSTAMP:ETHUSD' },
    { id: 'BNB', name: 'BNB/INR', full: 'BNB', price: 52400, icon: 'B', color: '#f3ba2f', change: 0.87, tvSym: 'BINANCE:BNBUSDT' },
    { id: 'SOL', name: 'SOL/INR', full: 'Solana', price: 14800, icon: '◎', color: '#9945ff', change: 3.21, tvSym: 'BINANCE:SOLUSDT' },
    { id: 'XRP', name: 'XRP/INR', full: 'XRP', price: 562, icon: '✕', color: '#00aae4', change: -0.45, tvSym: 'BINANCE:XRPUSDT' },
    { id: 'ADA', name: 'ADA/INR', full: 'Cardano', price: 48, icon: '₳', color: '#0d84ca', change: 1.56, tvSym: 'BINANCE:ADAUSDT' },
  ],
  forex: [
    { id: 'USD', name: 'USD/INR', full: 'US Dollar', price: 83.42, icon: '$', color: '#85bb65', change: 0.12, tvSym: 'FX_IDC:USDINR' },
    { id: 'EUR', name: 'EUR/INR', full: 'Euro', price: 90.18, icon: '€', color: '#4a6fa5', change: -0.08, tvSym: 'FX_IDC:EURINR' },
    { id: 'GBP', name: 'GBP/INR', full: 'Brit. Pound', price: 105.73, icon: '£', color: '#cf142b', change: 0.21, tvSym: 'FX_IDC:GBPINR' },
    { id: 'JPY', name: 'JPY/INR', full: 'Yen', price: 0.557, icon: '¥', color: '#bc002d', change: -0.15, tvSym: 'FX_IDC:JPYINR' },
    { id: 'AED', name: 'AED/INR', full: 'UAE Dirham', price: 22.72, icon: 'د', color: '#00732f', change: 0.05, tvSym: 'FX_IDC:AEDINR' },
  ]
};

const marketSlice = createSlice({
  name: 'market',
  initialState: {
    markets: initialMarkets,
    selectedAssetId: 'BTC',
    prices: {
      BTC: 5842000,
      ETH: 318500,
      BNB: 52400,
      SOL: 14800,
      XRP: 562,
      ADA: 48,
      USD: 83.42,
      EUR: 90.18,
      GBP: 105.73,
      JPY: 0.557,
      AED: 22.72
    }
  },
  reducers: {
    setSelectedAsset: (state, action) => {
      state.selectedAssetId = action.payload;
    },
    updateLivePrices: (state) => {
      Object.keys(state.prices).forEach((id) => {
        const volatility = ['BTC', 'ETH'].includes(id) ? 0.004 : 0.002;
        const delta = (Math.random() - 0.49) * volatility;
        state.prices[id] = Number((state.prices[id] * (1 + delta)).toFixed(4));
      });
    }
  }
});

export const { setSelectedAsset, updateLivePrices } = marketSlice.actions;
export default marketSlice.reducer;