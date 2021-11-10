// Standard Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Custom component imports
import {
  selectFeedName,
  selectLimit,
  setLimit,
  restoreOldFeedName,
  setSortType,
  selectSortType
 } from '../../Features/Feed/feedSlice';

// Main Component
const FeedNavigation = () => {

  const dispatch = useDispatch();

  // Gather data from selectors
  const subReddit = useSelector(selectFeedName);
  const limit = useSelector(selectLimit);
  const sortType = useSelector(selectSortType);

  // Update the limit each time a new oe is selected
  const handleLimitChange = (event) => {
    const newValue = event.target.value;
    dispatch(setLimit(parseInt(newValue)));
  };

  const limitValues = [5,15,25,50,100];
  const limitElement = <select onChange={handleLimitChange}>
    {limitValues.map(limitValue => {
      if(limitValue === limit){
        return <option value={limitValue} selected>{limitValue}</option>;
      } else {
        return <option value={limitValue}>{limitValue}</option>;
      }
    })};
  </select>;

  // Handle clicking the back button for getting out of a subreddit
  const handleGoBackClick = () => {
    dispatch(restoreOldFeedName());
  };

  // Handler for setting the sort type
  const handleSetSortType = (event) => {
    dispatch(setSortType(event.target.value));
  }

  return (
    <div className="feedNavContainer">
        <div className="feedNav-header"><h2>r/{subReddit}</h2></div>
        <div className="feedNav-sort">
          <h4>sorted by {sortType} posts.</h4>
        </div>
        <div>
          <button className="button-link" value="hot" onClick={handleSetSortType}>
            Hot
          </button>
          <button className="button-link" value="top" onClick={handleSetSortType}>
            Top
          </button>
          <button className="button-link" value="new" onClick={handleSetSortType}>
            New
          </button>
        </div>
        <div>
          <button className="button-link" onClick={handleGoBackClick}>
            Go Back
          </button>
        </div>
        <div>Show&nbsp;
          {limitElement}
          &nbsp;posts.
        </div>
    </div>
  )
};

export default FeedNavigation;
