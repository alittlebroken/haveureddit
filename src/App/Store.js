import { configureStore } from '@reduxjs/toolkit';
import { feedReducer } from '../Features/Feed/feedSlice';

export const Store = configureStore({
  reducer: {
    feed: feedReducer,
  }
});
