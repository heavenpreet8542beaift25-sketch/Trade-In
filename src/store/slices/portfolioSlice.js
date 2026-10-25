import { createSlice } from '@reduxjs/toolkit';

const mockAccounts = {
  TRADER001: {
    id: 'TRADER001',
    portfolio: [
      { id: 'BTC', name: 'Bitcoin', market: 'Crypto', invested: 300000, buyPrice: 5100000, icon: '₿', color: '#f7931a' },
      { id: 'ETH', name: 'Ethereum', market: 'Crypto', invested: 200000, buyPrice: 285000, icon: 'Ξ', color: '#627eea' },
      { id: 'SOL', name: 'Solana', market: 'Crypto', invested: 120000, buyPrice: 11000, icon: '◎', color: '#9945ff' },
      { id: 'BNB', name: 'BNB', market: 'Crypto', invested: 80000, buyPrice: 48000, icon: 'B', color: '#f3ba2f' },
      { id: 'XRP', name: 'XRP', market: 'Crypto', invested: 50000, buyPrice: 600, icon: '✕', color: '#00aae4' },
      { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 50000, buyPrice: 82.00, icon: '$', color: '#85bb65' }
    ]
  },
  TRADER002: {
    id: 'TRADER002',
    portfolio: [
      { id: 'BTC', name: 'Bitcoin', market: 'Crypto', invested: 150000, buyPrice: 5400000, icon: '₿', color: '#f7931a' },
      { id: 'ETH', name: 'Ethereum', market: 'Crypto', invested: 100000, buyPrice: 310000, icon: 'Ξ', color: '#627eea' },
      { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 80000, buyPrice: 83.00, icon: '$', color: '#85bb65' },
      { id: 'EUR', name: 'EUR/INR', market: 'Forex', invested: 60000, buyPrice: 90.50, icon: '€', color: '#4a6fa5' },
      { id: 'GBP', name: 'GBP/INR', market: 'Forex', invested: 50000, buyPrice: 106.20, icon: '£', color: '#cf142b' }
    ]
  },
  TRADER003: {
    id: 'TRADER003',
    portfolio: [
      { id: 'USD', name: 'USD/INR', market: 'Forex', invested: 100000, buyPrice: 82.80, icon: '$', color: '#85bb65' },
      { id: 'EUR', name: 'EUR/INR', market: 'Forex', invested: 80000, buyPrice: 91.00, icon: '€', color: '#4a6fa5' },
      { id: 'GBP', name: 'GBP/INR', market: 'Forex', invested: 70000, buyPrice: 105.50, icon: '£', color: '#cf142b' },
      { id: 'JPY', name: 'JPY/INR', market: 'Forex', invested: 40000, buyPrice: 0.56, icon: '¥', color: '#bc002d' },
      { id: 'AED', name: 'AED/INR', market: 'Forex', invested: 20000, buyPrice: 22.60, icon: 'د', color: '#00732f' }
    ]
  }
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    accounts: mockAccounts,
    activeAccountId: null
  },
  reducers: {
    setActiveAccount: (state, action) => {
      state.activeAccountId = action.payload;
    },
    logoutUser: (state) => {
      state.activeAccountId = null;
    }
  }
});

export const { setActiveAccount, logoutUser } = portfolioSlice.actions;
export default portfolioSlice.reducer;