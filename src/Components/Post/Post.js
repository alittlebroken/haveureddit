// Standard library imports
import React from 'react';

// Create component
const Post = (props) => {

  return(
    <div className="postOverlay">
      <div className="postContainer">
        <div className="postHeader">
          <button
          className="postCloseButton"
          onClick={props.onClick}>
            &#10005;
          </button>
        </div>
        <div><h2>{props.id}</h2></div>
        <div>{props.parent}</div>
        <div className="postContent"></div>
        <div className="postComments"></div>
      </div>
    </div>
  )
};

// Export the component
export default Post;
