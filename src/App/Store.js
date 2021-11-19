import { configureStore } from '@reduxjs/toolkit';
import { feedReducer } from '../Features/Feed/feedSlice';
import { modalReducer } from '../Features/Modal/ModalSlice';
import { togglerReducer } from '../Features/Toggler/TogglerSlice';
import { subRedditsReducer } from '../Features/subReddits/subRedditsSlice';

export const Store = configureStore({
  reducer: {
    feed: feedReducer,
    modal: modalReducer,
    toggler: togglerReducer,
    subReddits: subRedditsReducer,
  }
});
