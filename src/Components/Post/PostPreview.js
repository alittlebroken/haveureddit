// Library imports
import React from 'react';
//import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

// Component Imports
import { setFeedName } from '../../Features/Feed/feedSlice.js';
import Post from './Post'
import Toggler from '../Toggler/Toggler';
import { toggleOnOff } from '../../Features/Toggler/TogglerSlice'

// Slice imports

// Component
const PostPreview = (props) => {

  // Dispatcher
  const dispatch = useDispatch();

  // Format some of the post entities for the preview
  const postTitle = props.post.title;
  const postSubReddit = props.post.subreddit;
  const postAuthor = props.post.author;
  const postComments = props.post.num_comments;

  // Media rendering
  //const hasVideo = props.post.is_video;
  const thumb = props.post.thumbnail;
  const thumbWidth = props.post.thumbnail_width;
  const thumbHeight = props.post.thumbnail_height;

  let renderMedia;
  if(thumbWidth === null || thumbHeight === null || thumb === 'default'){
    renderMedia = '';
  } else {
    renderMedia = <img
    width={props.post.thumbnail_width}
    height={props.post.thumbnail_height}
    src={props.post.thumbnail}
    alt={props.post.title} />;
  }

    // Plain text post
    // Check if the text post has some text
    /*
    if(props.post.selftext){
      renderMedia = <ReactMarkdown children={props.post.selftext} />;
    } else {
      renderMedia = <p></p>;
    }
    */

    // handle click for setting the subreddit name
    const handleSetNameClick = () => {
      dispatch(setFeedName(postSubReddit));
    };


    const handleClose = (payload) => {
      dispatch(toggleOnOff({
        id: payload.id,
        state: payload.state,
      }));
    };

    const handleOpen = (payload) => {
      dispatch(toggleOnOff({
        id: payload.id,
        state: payload.state,
      }));
    };

  return (
    <div
    className="post-card">
      <Toggler id={props.post.id}>
        <Post key={props.post.id}
        content={props.post}
        onClick={() => {
          handleClose({id:props.post.id, state: false})
        }} />
      </Toggler>
      <div className="post-preview-data" onClick={() => {
        handleOpen({id:props.post.id, state: true})
      }}>
        <div>
          <h4>{postTitle}</h4>
          <span className="post-author">Posted by: {postAuthor}</span>
        </div>
        <div className="post-center-media">
          {renderMedia}
        </div>
      </div>
      <div className="post-info">
        <div>
          <span className="post-subreddit">From: <button className="button-link" onClick={handleSetNameClick}>r/{postSubReddit}</button></span>
        </div>
        <div>
          <span className="post-comment-count">Comments: {postComments}</span>
        </div>
      </div>
    </div>
  )
};

export default PostPreview;
