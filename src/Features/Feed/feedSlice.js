import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Generate the async thunks for connecting to the Api
export const loadFeed = createAsyncThunk(
  'feed/loadFeedData',
  async (feedName) => {
    // Store fetch result here
    let data;
    // Check if the feedName has been set and if not load a default feed
    if(feedName == null){
      data = await fetch(`https://reddit.com/r/popular.json`)
    }else{
      data = await fetch(`https://reddit.com/r/${feedName}.json`)
    }
    // get the JSON from the response data
    const jsonData = await data.JSON();
    // Return the posts from the json json
    return jsonData;
  }
);

// Generate the options for createSlice
const feedOptions = {
  name: 'feed',
  initialState: {
    posts: [],
    name: '',
    before: null,
    after: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {
    setFeedName: (state, action) => {
      state.name = action.payload;
    }
  },
  extraReducers: {
    [loadFeed.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadFeed.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadFeed.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      // Populate the feed data
      state.posts = action.payload.data.children;
      state.before = action.payload.before;
      state.after = action.payload.after;
    }
  }
};


// Create the feed slice
const feedSlice = createSlice(feedOptions);

// Create some selectors
export const selectFeedPosts = state => state.posts;

// Export the slice reducer and actions
export const { setFeedName } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
