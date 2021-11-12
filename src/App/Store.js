import { configureStore } from '@reduxjs/toolkit';
import { feedReducer } from '../Features/Feed/feedSlice';
import { modalReducer } from '../Features/Modal/ModalSlice';
import { togglerReducer} from '../Features/Toggler/TogglerSlice';

export const Store = configureStore({
  reducer: {
    feed: feedReducer,
    modal: modalReducer,
    toggler: togglerReducer,
  }
});
