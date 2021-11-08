// Standard Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Custom component imports
import {
  selectFeedName,
  selectLimit,
  setLimit,
  restoreOldFeedName
 } from '../../Features/Feed/feedSlice';

// Main Component
const FeedNavigation = () => {

  const dispatch = useDispatch();

  // Gather data from selectors
  const subReddit = useSelector(selectFeedName);
  const limit = useSelector(selectLimit);

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

  return (
    <div className="feedNavContainer">
        <div className="feedNav-header"><h2>r/{subReddit}</h2></div>
        <div>
          Hot Top New
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
