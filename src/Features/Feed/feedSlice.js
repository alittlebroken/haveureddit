import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Generate the async thunks for connecting to the Api
export const loadFeed = createAsyncThunk('feed/loadFeed',
  async (junk,thunkAPI) => {

    const state = thunkAPI.getState();

    // Options for the fetch
    const fetchOptions = {
      //mode: 'no-cors',
      redirect: 'follow'
    }

    // Get the data from state
    const feedName = state.feed.name;
    const pageBefore = state.feed.before;
    const pageAfter = state.feed.after;
    const pageMode = state.feed.pageAction;
    const pageLimit = state.feed.limit;
    const pageNum = state.feed.page;

    // Set the count of posts seen already for pagination
    const count = pageNum * pageLimit;


    // Build the url for the correct API
    let url =`https://www.reddit.com/r/${feedName}.json?limit=${pageLimit}&count=${count}`;

    // Check if we have been asked to paginate at all
    if(pageMode){
        if(pageBefore && pageMode === 'prev'){
          url = `${url}&before=${pageBefore}`
        }

        if(pageAfter && pageMode === 'next'){
          url = `${url}&after=${pageAfter}`
        }

    }

    console.log(`URL: ${url}`)

    // Attempt to get the data
    const response = await fetch(url, fetchOptions);

    // get the JSON from the response data
    const jsonData = await response.json();

    // Return the posts from the json json
    // return jsonData.data.children.map(post => post.data);
    console.log(jsonData)
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
    page: 1,
    limit: 25,
    before: null,
    after: null,
    pageAction: '',
    isLoading: false,
    hasError: false,
    errMsg: '',
  },
  reducers: {
    setFeedName: (state, action) => {
      state.name = action.payload;
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
      state.pageAction = 'next';
    },
    decrementPage: (state) => {
      state.page = state.page - 1;
      state.pageAction = 'prev';
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
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
export const selectPageNum = state => state.feed.page;
export const selectLimit = state => state.feed.limit;

// Export the slice reducer and actions
export const { setFeedName, incrementPage, decrementPage, setLimit } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
