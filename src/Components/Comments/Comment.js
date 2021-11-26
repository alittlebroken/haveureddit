/* Package imports */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import CommentsList from './CommentsList.js';
import { loadReplies } from '../../Features/Comments/commentsSlice.js';
import { getCommentReplies } from '../../utilities';

/* Style imports */
import './comment.css';

/* Component Creation */
const Comment = (props) => {

  /* deconstruct the passed in props */
  const { comment } = props;

  /* Check if the comment has any replies */
  let commentReplies = [];
  let hasReplies = false;
  let replies = [];

  replies = getCommentReplies(comment);

  /* display this comments replies */
  const showReplies = (commentReplies) => {
    let html = null;
    /* Ensure we have some comments to display */
    if(!commentReplies) return html;

    return html = commentReplies.map(reply => {
      return reply.map(child => {
        if(!child.author){
          return null;
        } else {
          return (
            <article key={child.id} className="card commentCard">
              <span className="commentTitle">{child.author}</span>
              <div className="commentBody">
                <ReactMarkdown>{child.body}</ReactMarkdown>
              </div>
              {showReplies(child.replies)}
            </article>
          )
        }
      })
    }
    )

  };

  commentReplies = showReplies(replies);

  /* Details on proper comments
  The info endpoint's response doesn't seem to include the replies, If you want
  them you need to hit the more specific comments endpoint. The URL format for
  that endpoint is /comments/<link id>/<junk>/<comment id>.json, so you would
  hit https://api.reddit.com/comments/2g2mu2/_/ckgcysa.json.
  */
  /* Render to the screen */
  return (
    <article className="card commentCard">
      <span className="commentTitle">{comment.author}</span>
      <div className="commentBody">
        <ReactMarkdown>{comment.body}</ReactMarkdown>
      </div>
      {commentReplies}
    </article>
  )

};

/* Exports */
export default Comment;
