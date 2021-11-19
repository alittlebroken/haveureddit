// Import packages and stylesheets
import { createSlice } from '@reduxjs/toolkit';

// Options for the slice
const options = {
  name: 'subreddits',
  initialState: {
    subreddits: [
      {name: 'popular', sort: 'hot'},
      {name: 'news', sort: 'hot'},
      {name: 'MostBeautiful', sort: 'hot'},
      {name: 'nasa', sort: 'hot'},
      {name: 'pics', sort: 'hot'},
      {name: 'technology', sort: 'hot'},
      {name: 'ProgrammerHumor', sort: 'hot'},
      {name: 'coding', sort: 'hot'},
      {name: 'science', sort: 'hot'},
      {name: 'IAmA', sort: 'hot'},
    ]
  },
  reducers: {
    addSubReddit: (state, action) => {
      state.subreddits.push(action.payload);
    }
  },
};

// create the slice
const subRedditsSlice = createSlice(options);

// create and export the selectors for the slice
export const selectSubReddits = state => state.subReddits.subreddits;

// export actions and reducer for the slice
export const { addSubReddit } = subRedditsSlice.actions;
export const subRedditsReducer = subRedditsSlice.reducer;
