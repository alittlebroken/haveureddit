/* Package imports */
import React from 'react';
import { useDispatch } from 'react-redux';

import {
  loadMoreComments } from '../../Features/Comments/commentsSlice.js';

import Comment from './Comment.js';

import './commentlist.css';

/* Create the component */
const CommentsList = (props) => {

  const dispatch = useDispatch();

  // Take out the props passed in
  const { comments } = props;

  /* Will either holf a list of comments or ber null */
  let commentList;

  /* handle click for loading more comments */
  const handleClickMoreComments = (parent, children) => {

    dispatch(loadMoreComments({
      parent: parent,
      children: children,
    }));
  };

  /*  The html code to return */
  let htmlDisplay;

  if(comments.length > 0) {
    commentList = comments.map(cmt => {
      if(cmt.count){
        return <button
        key={cmt.id}
        className="button-link card"
        onClick={ () => { handleClickMoreComments(cmt.parent_id, cmt.children) } }>
          Load More Comments
        </button>
      } else {
        return <Comment key={cmt.id} comment={cmt} />;
      }
    });

    htmlDisplay = <section className="commentsListContainer">
      {commentList}
    </section>;

  } else {
    commentList = null;
    htmlDisplay = null;
  };

  /* render the component to the screen */
  return htmlDisplay;
};

/* Export the component */
export default CommentsList;
