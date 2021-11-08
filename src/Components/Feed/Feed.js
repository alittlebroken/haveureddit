import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import the actions and selects for this components slice
import {
  /* setFeedName, */
  loadFeed,
  selectFeedPosts,
  selectHasError,
  selectIsLoaded,
  selectErrorMessage,
  selectFeedName,
  selectLimit,
  selectPageNum } from '../../Features/Feed/feedSlice.js';

// Import the Post Component
import PostPreview  from '../Post/PostPreview';
import FeedPagination from './FeedPagination';
import FeedNavigation from './FeedNavigation';

// The main feed component
const Feed = () => {
  // Get the feed name
  const subRedditName = useSelector(selectFeedName);
  const limitCount = useSelector(selectLimit);
  const pageNumber = useSelector(selectPageNum);

  // rename the dispatch function
  const dispatch = useDispatch();

  // Load the feed data
  useEffect(() =>{
      dispatch(loadFeed(''))
  },[dispatch, subRedditName, limitCount, selectPageNum]);

  const feedData = useSelector(selectFeedPosts);
  const errors = useSelector(selectHasError);
  const loading = useSelector(selectIsLoaded);
  const errorMessage = useSelector(selectErrorMessage);

  /*
  Future Use for comments
  r/subreddit/comments/post_id.json
  */

  //
  let renderFeed;
  if(loading){
    renderFeed = <h2>Loading</h2>;
  } else if(errors){
    renderFeed = <div><h2>Error</h2><p>{errorMessage}</p></div>;
  } else {
    renderFeed = <div>
    <FeedNavigation />
    <div>
      <FeedPagination />
    </div>
    <div>{feedData.map((post, index) => (
      <PostPreview key={post.id} post={post} />
    ))}
    </div>
    <div>
      <FeedPagination />
    </div>
    </div>;
  }

  return(
    <section className="feed-container">
      {renderFeed}
    </section>
  );
};

// Export the component to the app
export default Feed;
