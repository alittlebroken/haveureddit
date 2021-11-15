// Library imports
import React from 'react';
//import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

// Component Imports
import { setFeedName } from '../../Features/Feed/feedSlice.js';
import Post from './Post'
import Toggler from '../Toggler/Toggler';
import { toggleOnOff } from '../../Features/Toggler/TogglerSlice'

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
    renderMedia = '';
  } else {
    renderMedia = <img
    width={props.post.thumbnail_width}
    height={props.post.thumbnail_height}
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
        <div>

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
            <i
            className="far fa-comment"
            title="comments" alt="comments"
            ></i>
            &nbsp;{postComments}
          </button>

          <button className="post-preview-button-info">
            <i
            className="fas fa-angle-double-up"
            title="upVote" alt="upVote"></i>
            &nbsp;{upVotes}&nbsp;
            <i
            className="fas fa-angle-double-down"
            title="downVote" alt="downVote"></i>
          </button>

          <button className="post-preview-button-info">
            <i className="fas fa-trophy"
            title="Awards" alt="Awards"></i>
            &nbsp;{awards}
          </button>

        </span>

      </div>

      <div className="post-info">
        <div>
          <span className="post-subreddit">
            <button
              className="button-link"
              onClick={handleSetNameClick}>
              r/{postSubReddit}
            </button>
          </span>
        </div>
      </div>
    </div>
    </div>
  )
};

export default PostPreview;
