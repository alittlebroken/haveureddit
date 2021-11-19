import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// create the slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    more: [],
  },
  reducers: {},
  extraReducers: {},
});

// Create the selectors
const selectComments = (state) => state.comments.comments;

// Export the reducer and actions
export const commentsReducer = commentsSlice.reducer;
