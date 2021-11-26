// Standard Imports
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

// Custom component imports
import {
  selectLimit,
  setLimit,
  setSortType,
  selectSortType,
  selectSearchTerm,
  selectSearchPerformed
 } from '../../Features/Feed/feedSlice';

// Component Styling
import './feednavigation.css';

// Main Component
const FeedNavigation = () => {

  const dispatch = useDispatch();

  // Gather data from selectors
  const limit = useSelector(selectLimit);
  const sortType = useSelector(selectSortType);

  // Get details of any search being performed
  const searchTerm = useSelector(selectSearchTerm);
  const searchPerformed = useSelector(selectSearchPerformed);

  // Update the limit each time a new oe is selected
  const handleLimitChange = (event) => {
    const newValue = event.target.value;
    dispatch(setLimit(parseInt(newValue)));
  };

  const limitValues = [5,15,25,50,100];
  const limitElement = <div>Show&nbsp;
    <select
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
    </select>
  &nbsp;posts.</div>;

  // Handler for setting the sort type
  const handleSetSortType = (event) => {
    dispatch(setSortType(event.target.value));
  }

  // Determine if we should display search header or navigation header
  let shownHeader;
  if(searchPerformed)
  {
    shownHeader = <div className="feedNavContainer">

      <div className="feedNav-header">

        <h2> Results for {searchTerm}</h2>

      </div>

    </div>;

  }  else {
    shownHeader = <div className="feedNavContainer">


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

    </div>;
  }

  return (
    <div className="feedNavContainer">
      <>{shownHeader}</>
      <>{limitElement}</>
    </div>
  )
};

export default FeedNavigation;
