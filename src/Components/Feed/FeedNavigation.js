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

// Component Styling
import './feednavigation.css';

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
  const limitElement = <select
  onChange={handleLimitChange}>
    {limitValues.map(limitValue => {
      if(limitValue === limit){
        return <option
        key={limitValue}
        value={limitValue}
        selected>{limitValue}</option>;
      } else {
        return <option
        key={limitValue}
        value={limitValue}>{limitValue}</option>;
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

        <div className="feedNav-header">
          <h2>r/{subReddit}</h2>
          <div>
            <button
            className="button-link"
            onClick={handleGoBackClick}>
              <i
              className="fas fa-angle-double-left"></i>
              &nbsp;Go Back
            </button>
          </div>
        </div>

        <div className="feedNav-sort">
          <button
          className="button-link"
          value="hot"
          onClick={handleSetSortType}>
            <i className="fab fa-hotjar"></i>&nbsp; Hot
          </button>
          <button
          className="button-link"
          value="top"
          onClick={handleSetSortType}>
            <i className="far fa-compass"></i>&nbsp;Top
          </button>
          <button
          className="button-link"
          value="new"
          onClick={handleSetSortType}>
            <i className="fas fa-air-freshener"></i>&nbsp;New
          </button>
          <h4>sorted by {sortType}</h4>
        </div>

        <div>Show&nbsp;
          {limitElement}
          &nbsp;posts.
        </div>
    </div>
  )
};

export default FeedNavigation;
