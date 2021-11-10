import { configureStore } from '@reduxjs/toolkit';
import { feedReducer } from '../Features/Feed/feedSlice';
import { modalReducer } from '../Features/Modal/ModalSlice';

export const Store = configureStore({
  reducer: {
    feed: feedReducer,
    modal: modalReducer,
  }
});
