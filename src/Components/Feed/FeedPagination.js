// Standard Imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Custom component & slices imports
import {
  /* setFeedName, */
  selectBefore,
  selectAfter,
  selectFeedName,
  incrementPage,
  decrementPage,
  selectPageNum } from '../../Features/Feed/feedSlice.js';

// Main Component
const FeedPagination = () => {

  const dispatch = useDispatch();

  // Get selector data for FeedPagination
  const pageBefore = useSelector(selectBefore);
  const pageAfter = useSelector(selectAfter);
  let pageNumber = useSelector(selectPageNum);

  // Handle the buttons being clicked
  const handlePageButton = (event) => {
    const pageAction = event.target.value;

    if(pageAction === 'next'){
      dispatch(incrementPage());
    } else if (pageAction === 'prev'){
      dispatch(decrementPage());
    }

  };

  // Set up the buttons for rendering
  let prevButton;
  let nextButton;

  // Generate the buttons and check if they need to be disabled or not.
  if(pageBefore !== null && pageNumber >= 0){
    prevButton = <button value="prev" onClick={handlePageButton}>Prev</button>;
  } else {
    prevButton = <button disabled>Prev</button>;
  }

  if(pageAfter !== null){
    nextButton = <button value="next"  onClick={handlePageButton}>Next</button>;
  } else {
    nextButton = <button disabled>Next</button>;
  }

  return (
    <div className="feedPaginationContainer">
      <div id="page-back">
        {prevButton}
      </div>
      <div id="page-forward">
        {nextButton}
      </div>
    </div>
  )
};

export default FeedPagination;
