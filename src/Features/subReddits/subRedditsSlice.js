// Import packages and stylesheets
import { createSlice } from '@reducjs/toolkit';

// Options for the slice
const options = {
  name: 'subreddits',
  initialState: {},
  reducers: {},
};

// create the slice
const subRedditsSlice = createSlice(options);

// create and export the selectors for the slice

// export actions and reducer for the slice
export default subRedditsReducer = subRedditsSlice.reducer;
