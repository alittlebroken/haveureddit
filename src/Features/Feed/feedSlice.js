import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Populate a feed with posts
export const populateFeed = createAsyncThunk('feed/populateFeed',
  async (feedType, thunkAPI) => {

    // Get the store state
    const state = thunkAPI.getState();

    // Set any options for the fetch statement
    const fetchOptions = {
      redirect: 'follow',
    };

    // Set variables for paging through the records returned
    const pageBefore = state.feed.before;
    const pageAfter = state.feed.after;
    const pageMode = state.feed.pageAction;
    const pageLimit = state.feed.limit;
    const pageNum = state.feed.page;
    const sortType = state.feed.sort;

    // Set the count of posts seen already for pagination
    const count = pageNum * pageLimit;

    // This is used to determine where to fetch the results from
    let url;

    // search term
    const term = state.feed.searchTerm;
    console.log(term)

    /* We now need to determine if we are perforing a search or just a normal
    subreddits posts */
    if(term){
      console.log('SEARCH')
      // create the url to pull searches from
      url = `https://api.reddit.com/search.json?q=${term}&limit=${pageLimit}&count=${count}`;

    } else {
      console.log('FEED')
      // Lets get some specific data from the store
      const feedName = state.feed.name ? state.feed.name : 'popular';

      url =`https://www.reddit.com/r/${feedName}/${sortType}.json?limit=${pageLimit}&count=${count}`;

    }

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

    /* Now fetch the data from the specified URL and convert to json and then
    return it */
    const response = await fetch(url, fetchOptions);
    // get the JSON from the response data
    const json = await response.json();

    console.log(json)
    return json.data;

  }
);

// Generate the options for createSlice
const feedOptions = {
  name: 'feed',
  initialState: {
    posts: [],
    name: 'popular',
    prevFeedName: '',
    page: 1,
    limit: 25,
    before: null,
    after: null,
    pageAction: '',
    sort: 'top',
    isLoading: false,
    hasError: false,
    errMsg: '',
    searchTerm: '',
  },
  reducers: {
    setFeedName: (state, action) => {
      /*
      Do not change the name if they are the same
      */
      if(state.name !== action.payload){
        state.prevFeedName = state.name;
        state.page = 1;
        state.name = action.payload;
        state.before = null;
        state.after = null;
      }
    },
    restoreOldFeedName: (state) => {
      // Only restore if we a previous feed to restore to
      if(state.prevFeedName !== ''){
        state.name = state.prevFeedName;
        state.prevFeedName = '';
        state.page = 1;
        state.before = null;
        state.after = null;
      }
    },
    incrementPage: (state) => {
      state.page = state.page + 1;
      state.pageAction = 'next';
    },
    decrementPage: (state) => {
      state.page = state.page - 1;
      /* Avoid a bug with prev button to not go below page 1 and set before state
       to null */
      if(state.page < 1){
        state.page = 1;
        state.before = null;
      }
      state.pageAction = 'prev';
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
      // Set paging info back to 1 to avoid bug
      state.page = 1;
      state.after = null;
      state.before = null;
      // clear out any search terms
      state.searchTerm = '';
      // Double check a feed name has been set
      state.name = state.name ? state.name : 'popular';
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      // Set paging info back to 1 to avoid bug
      state.page = 1;
      state.after = null;
      state.before = null;
      if(action.payload !== null || action.payload !== '' || action.payload !== undefined){
        state.name = 'popular';
      } else {
        state.name = '';
      }
    }
  },
  extraReducers: {
    [populateFeed.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [populateFeed.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
    [populateFeed.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.posts = action.payload.children.map(post => post.data);
      state.before = action.payload.before;
      state.after = action.payload.after;
    }
  }
};

// populateFeed

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
export const selectSortType = state => state.feed.sort;
export const selectSearchTerm = state => state.feed.searchTerm;

// Export the slice reducer and actions
export const {
  setFeedName,
  incrementPage,
  decrementPage,
  setLimit,
  restoreOldFeedName,
  setSortType,
  setSearchTerm } = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
