// Package and styling imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './subreddits.css';

import { selectSubReddits } from '../../Features/subReddits/subRedditsSlice.js';
import {
  setFeedName,
  selectFeedName,
  restoreOldFeedName
 } from '../../Features/Feed/feedSlice.js';

// Component
const SubReddits = () => {

  const dispatch = useDispatch();

  // Gather data needed from the store
  const subRedditList = useSelector(selectSubReddits);
  const currentSubReddit = useSelector(selectFeedName);

  console.log(currentSubReddit)

  // Handle change of value
  const onChange = (event) => {
    let value = event.target.value;
    dispatch(setFeedName(value));
  };

  // Handle if the user wishes to go back to a previous subreddit
  const onClick = () => {
    dispatch(restoreOldFeedName());
  };

  return (
    <div className="subRedditsContainer">
      <select
      className="selectSubReddits"
      onChange={onChange}
      name="subRedditsSelect"
      value={currentSubReddit} >
        {subRedditList.map( subreddit => {
          return <option
          value={subreddit.name}>
            r/{subreddit.name}
          </option>
        })}
      </select>
      <button
      className="button-link"
      onClick={onClick}>Back</button>
    </div>
  )
};

// Export Component
export default SubReddits;
