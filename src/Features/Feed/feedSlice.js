import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Generate the async thunks for connecting to the Api
export const loadFeed = createAsyncThunk('feed/loadFeed',
  async (options) => {

    // Gte the data from the passed in object
    const { feedName, before, after, pageAction, pageNum } = options;

    // Options for the fetch
    const fetchOptions = {
      //mode: 'no-cors',
      redirect: 'follow'
    }

    // Set the count of posts seen already for pagination
    const count = pageNum * 5;

    // Build the url for the correct API
    let url =`https://www.reddit.com/r/${feedName}.json?limit=5&count=${count}`;

    // Check if we have been asked to paginate at all
    if(pageAction){
        console.log(`We have been asked to paginate`)
        if(before && pageAction === 'prev'){
          console.log(`going back`)
          url = `${url}&before=${before}`
        }

        if(after && pageAction === 'next'){
          console.log(`going forward`)
          url = `${url}&after=${after}`
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
    },
    decrementPage: (state) => {
      state.page = state.page - 1;
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
