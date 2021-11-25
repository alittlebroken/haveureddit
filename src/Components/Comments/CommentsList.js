/* Package imports */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectComments,
  loadComments,
  selectIsLoading,
  selectHasError } from '../../Features/Comments/commentsSlice.js';

import Comment from './Comment.js';

import './commentlist.css';

/* Create the component */
const CommentsList = (props) => {

  const dispatch = useDispatch();

  // Take out the props passed in
  const { comments } = props;
  /* Will either holf a list of comments or ber null */
  let commentList;

  /*  The html code to return */
  let htmlDisplay;

  if(comments.length > 0) {
    commentList = comments.map(cmt => {
      return <Comment key={cmt.id} comment={cmt} />;
    });
    htmlDisplay = <section className="commentsListContainer">
      {commentList}
    </section>;

  } else {
    commentList = null;
    htmlDisplay = null;
  };

  console.log(htmlDisplay)

  /* render the component to the screen */
  return htmlDisplay;
};

/* Export the component */
export default CommentsList;
