import { configureStore } from '@reduxjs/toolkit';
import marketReducer from './slices/marketSlice';
import portfolioReducer from './slices/portfolioSlice';

export const store = configureStore({
  reducer: {
    market: marketReducer,
    portfolio: portfolioReducer
  }
});