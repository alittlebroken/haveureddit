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

    console.log(`COMMENTS URL`)
    console.log(url)

    // Set options for the fetch command
    const options = {
      redirect: 'follow',
    };

    // Fetch the required data from the url and convert to json
    const response = await fetch(url, options);
    const json = await response.json();

    // Return the json
    console.log(json[1].data.children)
    return json[1].data;

  }
);

// create the slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    more: [],
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
        return child.data;
      });
    },
  },
});

// Create the selectors
export const selectComments = (state) => state.comments.comments;

// Export the reducer and actions
export const commentsReducer = commentsSlice.reducer;
