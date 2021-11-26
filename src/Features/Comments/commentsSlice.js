import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Loads comments
export const loadComments = createAsyncThunk('comments/loadComments',
  async (args, thunkAPI) => {


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

// Load more comments
export const loadMoreComments = createAsyncThunk('comments/loadMoreComments',
  async (args, thunkAPI) => {

    /*
      Get the passed in args we need

      parent is the fullname of the topic the comments are from

      children are the child comments of the parent topic that were not part
      of the original comment tree retrieved
    */
    const { parent, children } = args;

    /* set the fecth url options */
    const options = {
      redirect: 'follow',
      'User-Agent': 'CUSTOM-UA'
    };

    /* construct the url */
    let url;
    /* Results array to contain the data */
    let allFetchedComments = [];
    /* vars for the fetch and json data */
    let response;
    let json;

    if(children.length > 100){
      /* loop through the children and create entries in chunks of 100 ready to be
      fetched and placed in the store */
      let i;
      let chunks = [];
      for (i=0; i<children.length; i+=100){
          chunks.push(children.slice(i,i+100));
      }

      /* Now for each chunk generate a url and fetch the data */
      for(i=0; i<chunks.length; i++){

        /* generate a comma separated list of children, no more than a 100 */
        let childs = chunks[i].join();

        url = `https://reddit.com/api/morechildren.json?link_id=${parent}&api_type=json&children=${childs}&limit=100`;
        console.log(url)

        /** fetch **/
        response = await fetch(url, options);
        json = await response.json();
        let replies = json.json.data.things;

        /* Iterate through each child and then add to appropriate array */
        replies.map(reply => {

          if(reply.kind === 't1'){
            allFetchedComments.push(reply)
          }
          return null;
        })

      }

      console.log(allFetchedComments)

    } else {
      url = `https://reddit.com/api/morechildren.json?link_id=${parent}&api_type=json&children=${children}&limit=100`;

      /** fetch **/
      response = await fetch(url, options);
      json = await response.json();
      let replies = json.json.data.things;

      /* Iterate through each child and then add to appropriate array */
      replies.map(reply => {

        if(reply.kind === 't1'){
          allFetchedComments.push(reply)
        }
        return null;
        }
      )
    }

    return allFetchedComments;

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
          //state.more = child.data.children.join(',');
          state.more = child.data.children.map(more => {
            return more;
          })
        }
        return child.data;
      });
    },
    [loadMoreComments.prending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadMoreComments.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadMoreComments.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.comments = action.payload.map((child) => {
        return child.data;
      })
    },
  },
});

// Create the selectors
export const selectComments = (state) => state.comments.comments;
export const selectIsLoading = (state) => state.comments.isLoading;
export const selectHasError = (state) => state.comments.HasError;
export const selectReplies = (state) => state.comments.replies;
export const selectMoreComments = (state) => state.comments.more;

// Export the reducer and actions
export const commentsReducer = commentsSlice.reducer;
