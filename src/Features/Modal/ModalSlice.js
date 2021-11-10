// Standard Imports
import { createSlice } from '@reduxjs/toolkit';

// slice options
const options = {
  name: 'modal',
  initialState: {
    show: false,
    type: 'info',
    message: {
      title: '',
      content: ''
    },
  },
  reducers: {
    showModal: (state) => {
      state.show = !state.show;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setMessage: (state, action) => {
      state.message = {
        title: action.payload.title,
        content: action.payload.content,
      };
    }
  }
};

// Create the slice
const modalSlice = createSlice(options);

// Create some selectors for the state
export const selectType = state => state.modal.type;
export const selectMessage = state => state.modal.message;
export const selectShow = state => state.modal.show;

// Export the goodness that is the selectors and actions
export const { showModal, setType, setMessage } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
