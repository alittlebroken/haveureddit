// Standard library imports
import React from 'react';
import ReactMarkdown from 'react-markdown';

// Stylesheet
import './post.css';

// Create component
const Post = (props) => {

  // Gather the relevant information from the props
  const data = props.content;
  const {
    title,
    author,
    subreddit,
    num_comments,
    over_18
  } = data;

  console.log(`Post Text: ${data.selftext}`)

  // get the media from the page
  let media;
  if(data.is_video){
    // Video
    const media_src = data.media.reddit_video.fallback_url;
    media = <div className="postContent">
    <video width="100%" height="80%" controls autoplay muted>
      <source src={media_src} />
      Your browser does not support the video tag
    </video>
    </div>;

  } else if(data.is_self){
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

  } else if (!data.is_self && !data.is_video){
    // Check if just an image only
    if(data.media === null && !data.media_embed.length){
      let imgSrc = data.url;
      media = <div className="postContent">
        <img src={imgSrc} width="100%" alt={title}/>
      </div>;
    }
  }

  // Do we have a nsfw post?
  let nsfw;
  if(over_18){
    nsfw = <i
    class="fas fa-exclamation-triangle"
    alt="Over 18s only (NSFW)"
    title="Not Safe for Work ( 18+)"></i>;
  } else {
    nsfw = null;
  }

  console.log(data)

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

          <div className="postSubInfo">
            <i
            class="far fa-comment"
            title="comments" alt="comments"
            ></i>
            &nbsp;{num_comments}
          </div>

        </div>

      </div>

  )
};

// Export the component
export default Post;
