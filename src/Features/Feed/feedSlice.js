import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Generate the async thunks for connecting to the Api
export const loadFeed = createAsyncThunk('feed/loadFeed',
  async (options) => {

    // Gte the data from the passed in object
    const { feedName } = options;

    // Options for the fetch
    const fetchOptions = {
      //mode: 'no-cors',
      redirect: 'follow'
    }
    // Check if the feedName has been set and if not load a default feed
    let url;
    if(feedName === null){
      url = `https://www.reddit.com/r/popular.json`;
    } else {
      url = `https://www.reddit.com/r/${feedName}.json`;
    };

    // Attempt to get the data
    const response = await fetch(url, fetchOptions);

    // get the JSON from the response data
    const jsonData = await response.json();

    // Return the posts from the json json
    // return jsonData.data.children.map(post => post.data);
    console.log(jsonData)
    console.log(jsonData.data.children)
    //return jsonData.data.children.map(post => post.data);
    return jsonData.data;
  }
);

// Generate the options for createSlice
const feedOptions = {
  name: 'feed',
  initialState: {
    posts: [],
    name: 'popular',
    before: null,
    after: null,
    isLoading: false,
    hasError: false,
    errMsg: '',
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
      state.errMsg = action.error.message;
    },
    [loadFeed.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      // Populate the feed data
      state.posts = action.payload.children.map(post => post.data);
      state.before = action.payload.before;
      state.after = action.payload.after;
    }
  }
};


// Create the feed slice
const feedSlice = createSlice(feedOptions);

// Create some selectors
export const selectFeedPosts = state => state.feed.posts;
export const selectHasError = state => state.feed.hasError;
export const selectIsLoaded = state => state.feed.isLoading;
export const selectErrorMessage = state => state.feed.errMsg;
export const selectFeedName = state => state.feed.name;
export const selectBefore = state => state.feed.before;
export const selectAfter = state => state.feed.after;

// Export the slice reducer and actions
export const { setFeedName } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
