// Library imports
import React from 'react';
//import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

// Component Imports
import { setFeedName } from '../../Features/Feed/feedSlice.js';
import Post from './Post'
import Toggler from '../Toggler/Toggler';
import { toggleOnOff } from '../../Features/Toggler/TogglerSlice';
import { addSubReddit } from '../../Features/subReddits/subRedditsSlice';

// Utility components
import { abbreviateNumber } from '../../utilities.js';
// Component Stylesheet
import './postpreview.css';

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
    renderMedia = null;
  } else {
    renderMedia = <img
    width="150px"
    height="auto"
    className="post-info-image-thumb"
    src={props.post.thumbnail}
    alt={props.post.title} />;
  }


    // handle click for setting the subreddit name
    const handleSetNameClick = () => {
      dispatch(setFeedName(postSubReddit));
    };


    const handleClose = (payload) => {
      dispatch(toggleOnOff({
        id: payload.id,
        state: payload.state,
      }));
      // Enable main page scrolling again
      let windowOffset = window.scrollY;
      window.scrollTo(0, parseInt(windowOffset || '0') * -1);
      document.body.setAttribute('style', '');
    };

    const handleOpen = (payload) => {
      dispatch(toggleOnOff({
        id: payload.id,
        state: payload.state,
      }));
      // disable main page scrolling
      let windowOffset = window.scrollY;
      document.body.setAttribute('style', `position: fixed; top: -${windowOffset}px; left: 0; right: 0;`);
    };

    // Handle clicking on the add button next to the subreddit name button
    const handleAddSubRedditClick = (payload) => {
      dispatch(addSubReddit(postSubReddit));
    };

    // Format information for numerical data like awards and upvotes
    let upVotes = abbreviateNumber(props.post.ups);
    let awards = abbreviateNumber(props.post.total_awards_received);

  return (
    <div>
    <Toggler id={props.post.id}>
      <Post key={props.post.id}
      content={props.post}
      onClick={() => {
        handleClose({id:props.post.id, state: false})
      }} />
    </Toggler>
    <div className="post-card">

      <div className="post-preview-data" onClick={() => {
        handleOpen({id:props.post.id, state: true})
      }}>

        <div className={renderMedia ? "postTitle" : " postTitle postTitleSpan"}>

          <h4>{postTitle}</h4>

          <span className="post-author">
          Posted by: {postAuthor}
          </span>

        </div>

        <div className="post-center-media">
          {renderMedia}
        </div>

        <span className="button-info-container">

          <button className="post-preview-button-info">
          <img
          className='icon'
          alt="comments"
          src={`${process.env.PUBLIC_URL}/resources/icons/comment.svg`} />
            &nbsp;{postComments}
          </button>

          <button className="post-preview-button-info">
          <img
          className='icon'
          alt="Up Votes"
          src={`${process.env.PUBLIC_URL}/resources/icons/angle-double-up.svg`} />
            &nbsp;{upVotes}&nbsp;
            <img
            className='icon'
            alt="Down Votes"
            src={`${process.env.PUBLIC_URL}/resources/icons/angle-double-down.svg`} />
          </button>

          <button className="post-preview-button-info">
          <img
          className='icon'
          alt="Awards given"
          src={`${process.env.PUBLIC_URL}/resources/icons/trophy.svg`} />
            &nbsp;{awards}
          </button>

        </span>

      </div>

      <div className="post-info">
        <div>
          <span className="post-subreddit">

            <button
              className="button-link"
              onClick={handleSetNameClick}
              alt="View subReddit posts"
              title="View subReddit posts">
              r/{postSubReddit}
            </button>

            <button
            className="button-link"
            onClick={handleAddSubRedditClick}
            alt="Add subreddit to subReddit list"
            title="Add subreddit to subReddit list">+</button>
          </span>
        </div>
      </div>
    </div>
    </div>
  )
};

export default PostPreview;
