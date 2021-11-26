// Standard library imports
import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import CommentsList from '../Comments/CommentsList.js';
import {
  selectComments,
  loadComments,
  selectIsLoading,
  selectHasError } from '../../Features/Comments/commentsSlice'

// Stylesheet
import './post.css';

// Create component
const Post = (props) => {

  const dispatch = useDispatch();

  // Gather the relevant information from the props
  const data = props.content;
  const {
    title,
    author,
    subreddit,
    over_18,
    id
  } = data;

  // load the initial comments
  useEffect(() => {
    dispatch(loadComments({
      name: subreddit,
      id: id,
    }))
  },[dispatch, id, subreddit]);

  /* loop through and load more comments in batches of 100
  for( let i = 0; i <= moreComments.length; 1 + 100){
    let chunk = [];
    chunk.push(moreComments.slice(i,i + 100));
    console.log(chunk)
  }
  */

  // Get list of comments
  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  // Various vars for the post
  let nsfw;
  let media;
  let imagePost = false;
  let externalPost = false;

  if(isLoading){
    media = <div
    id="loading"
    className="loading">
      <div className="loadingContent">
        <img
        src="/loading_001.svg"
        title="loading content"
        alt="loading content" />
        <h2 className="loadingHeader">
          Loading please wait...
        </h2>
      </div>
    </div>;
  } else if(hasError){

  } else {
    // Work out if post is image, video,
    const videoPost = data.is_video;
    const textPost = data.is_self;
    const galleryPost = data.is_gallery;

    if(data.domain === 'i.redd.it' || data.domain === 'i.imgur.com'){
      imagePost = true;
    }

    if(data.domain !== 'i.redd.it' || data.domain !== 'v.redd.it' || data.domain !== 'i.imgur.com'|| data.domain !== 'reddit.com'){
      externalPost = true;
    }

    // get the media from the page
    if(videoPost){
      // Video
      const media_src = data.media.reddit_video.fallback_url;
      media = <div className="postContent">
      <video width="100%" height="80%" controls autoPlay muted>
        <source src={media_src} />
        Your browser does not support the video tag
      </video>
      </div>;

    } else if(textPost){
      // Text post
      media = <div
      className={data.is_self ? "postContent postContentText": "postContent"}>
      <pre><ReactMarkdown>
        {data.selftext}
      </ReactMarkdown></pre>
      </div>;

      // Do not display the element if no text has been entered
      if(!data.selftext){
        media = null;
      }

    } else if (imagePost){

        let imgSrc = data.url;
        media = <div className="postContent">
          <img src={imgSrc} width="100%" alt={title}/>
        </div>;

    } else if(galleryPost){

      /* Extract the ids and then extract the images associated with those
       ids */
      media = data.gallery_data.items.map(item => {

        let id = item.media_id;
        let imgUrl = data.media_metadata[id].s.u;

        // Extract the image name from the url
        let imgPattern = /\w*\.\w{3}(?=\?)/g;
        let imgSrc = imgUrl.match(imgPattern);
        // Pass in the image name to the reddit image server
        let finalUrl = `https://i.redd.it/${imgSrc[0]}`;

        return <img
        src={finalUrl}
        className="postImgGallery"
        alt="Gallery of random images"/>

      });

    } else if(externalPost){
      media = <div className="postExternalLink"><h2>Warning</h2><p>
      The link below is to an external site of which we have no control over. <br /><br />
      As such we can not guarantee the content that will greet you once the link
      has been clicked.<br /><br />
      Proceed at your own risk.
      </p>
      <br />
      <a href={data.url} target="_blank" rel="noreferrer">Link</a>
      </div>;
    }

    // Do we have a nsfw post?
    if(over_18){
      nsfw = <i
      class="fas fa-exclamation-triangle"
      alt="Over 18s only (NSFW)"
      title="Not Safe for Work ( 18+)"></i>;
    } else {
      nsfw = null;
    }
  }

  /* Only display comments if we have any to display */
  let showComments = null;
  if(comments.length > 0) {
    showComments = <div className="postSubInfo">
      <CommentsList comments={comments}/>
    </div>;
  }


  return(

      <div className="postContainer">

        <div className="postTopBar">
            <i
            className="fas fa-angle-double-left"
            title="back"
            onClick={props.onClick}
            alt="back"></i>
          <p>&nbsp;</p>
        </div>

        <div className="postDataContainer">

          <div className="postHeaderContainer">
            <div className="postHeader">
              <h2>{title} {nsfw}</h2>
            </div>

            <div className="postInfoTitle">
              <p>
                Posted by: {author} in r/{subreddit}
              </p>
            </div>
          </div>

          {media}

          {showComments}

        </div>

      </div>

  )
};

// Export the component
export default Post;
