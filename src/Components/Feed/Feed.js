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
  selectPageNum,
  selectSortType } from '../../Features/Feed/feedSlice.js';

import {
  showModal,
  setType,
  setMessage
} from '../../Features/Modal/ModalSlice.js';

// Import custom Components
import PostPreview  from '../Post/PostPreview';
import FeedPagination from './FeedPagination';
import FeedNavigation from './FeedNavigation';
import Modal from '../Modal/Modal';

// Component Styling
import './feed.css';

// The main feed component
const Feed = () => {
  // Get the feed name
  const subRedditName = useSelector(selectFeedName);
  const limitCount = useSelector(selectLimit);
  const pageNumber = useSelector(selectPageNum);
  const sortType = useSelector(selectSortType);

  // rename the dispatch function
  const dispatch = useDispatch();

  // Load the feed data
  useEffect(() =>{
      dispatch(loadFeed())
  },[subRedditName, limitCount, pageNumber, sortType]);

  // Get data from the store
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

    renderFeed = <div id="loading" className="loading">
      <div className="loadingContent">
        <img
        src="/loading.gif"
        title="loading content"
        alt="loading content" />
      </div>
    </div>;

  } else if(errors){

    dispatch(setMessage({
      title: 'Error loading feed',
      content: `Apologies it appears something has gone very very wrong loading the requested subreddit feed. \n\nPlease contact the site administrator.\n\n`
    }));

    dispatch(setType('error'));
    dispatch(showModal());

    renderFeed = <Modal />;

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
      <Modal />
      {renderFeed}
    </section>
  );
};

// Export the component to the app
export default Feed;
