// Standard package imports
import { createSlice } from '@reduxjs/toolkit';

// custom package imports

// Slice Options
const options = {
  name: 'toggler',
  initialState: {
    toggles: {}
  },
  reducers: {
    toggleOnOff: (state, action) => {
      state.toggles[action.payload.id] = action.payload.state;
    }
  }
};

// Slice creation
export const togglerSlice = createSlice(options);

// Selectors
export const selectToggleStatus = id => state => state.toggle.toggles[id];

// Exports
export const { toggleOnOff } = togglerSlice.actions;
export const togglerReducer = togglerSlice.reducer;
