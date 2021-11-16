// Package imports
import { createSlice  } from '@reduxjs/toolkit';

// Slice options
const options = {
  name: 'search',
  initialState: {
    term: '',
    results: [],
    after: '',
    before: '',
    limit: 25,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload;
    },
    setAfter: (state, action) => {
      state.after = action.payload;
    },
    setBefore: (state, action) => {
      state.before = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: {

  }
};

// Create the slice
const searchSlice = createSlice(options);

// Create the selectors
export const selectTerm = state => state.search.term;
export const selectResults = state => state.search.results;
export const selectAfter = state => state.search.after;
export const selectBefore = state => state.search.after;
export const selectLimit = state => state.search.limit;
export const selectIsLoading = state => state.seach.isLoading;
export const selectHasError = state => state.search.hasError;

// Export actions and default reducer
const { setTerm,
        setAfter,
        setBefore,
        setLimit } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
