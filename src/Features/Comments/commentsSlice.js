import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Loads comments
export const loadComments = createAsyncThunk('comments/loadComments',
  async (args, thunkAPI) => {

    // gather the state data
    const state = thunkAPI.getState();

    // Extract the arguments passed to the function
    const { name, id } = args;

    // Generate the url we wish to connect to
    const url = `https://api.reddit.com/r/${name}/comments/${id}.json`;

    // Set options for the fetch command
    const options = {
      redirect: 'follow',
    };

    // Fetch the required data from the url and convert to json
    const response = await fetch(url, options);
    const json = await response.json();

    // Return the json
    return json[1].data;

  }
);

/* Load comment replies */
export const loadReplies = createAsyncThunk('comments/loadReplies',
  async (args, thunkAPI) => {

    /* Get the current state */
    const state = thunkAPI.getState();

    /* Extract the args we need */
    const { postId, commentId} = args;

    /* Craft the url to be used */
    const url = `https://api.reddit.com/comment/{postId}/_/{commentId}.json`;

    /* Set the options for the fetch command */
    const options = {
      redirect: 'follow',
    };

    /* Fetch the data and convert to json */
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json)
    return json;

  }
);

// create the slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    more: [],
    replies: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    [loadComments.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      /* Loop through the returned data and add it to either the comments
      array or the more array */
      state.comments = action.payload.children.map((child) => {
        if(!child.data.subreddit_id){
          state.more = child.data.children.join(',');
        }
        return child.data;
      });
    },
    [loadReplies.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadReplies.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadReplies.pending]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
    },
  },
});

// Create the selectors
export const selectComments = (state) => state.comments.comments;
export const selectIsLoading = (state) => state.comments.isLoading;
export const selectHasError = (state) => state.comments.HasError;
export const selectReplies = (state) => state.comments.replies;

// Export the reducer and actions
export const commentsReducer = commentsSlice.reducer;
