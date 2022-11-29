import { useState } from "react";
import { XsHeading } from "../layout/Headings";
import { Paragraph } from "../layout/Paragraphs";

export default function PostCard (post) {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);

  const heartEmojiCount = (e) => {
    setCountOne(countOne + 1);
  }
  const handsEmojiCount = (e) => {
    setCountTwo(countTwo + 1);
  }

  return (
    <>
    <div className="post-card" href={`/post/${post.href}`}>

      {post.menu}

      <div className="reactions">
        <div className='reaction-buttons'>
          <button onClick={heartEmojiCount} value={'😍'} className="reaction-btn">😍</button>
          <span className="reaction-count">{countOne}</span>
          <button onClick={handsEmojiCount} value={'🙌'} className="reaction-btn">🙌</button>
          <span className="reaction-count">{countTwo}</span>
        </div>
        <div className="reaction-count">{post.reaction_count}</div>
      </div>

      <div className="post-card__content">

        {post.src ? 
          <div className="post-card__image">
            <img src={post.src} alt={post.alt} />
          </div> 
        : <div className="post-card__content--text">
            <Paragraph content={FormattedBody(post)} />
          </div> }

      </div>
      <a href={`/post/${post.href}`} className="post-card__content--footer">
        <div className="post-card__content--text">
          <XsHeading content={post.title}/>
        </div>
        <div className="comments">
            <button className="btn-light comment-btn">
              <ion-icon name="chatbox"></ion-icon> 
              {post.comment_count}
            </button>
          </div>
      </a>
    </div>
    </>
  )
}

const FormattedBody = (post) => {
  if (post.body) {
    let bodyText = post.body;
    let shortenBody = bodyText.slice(0, 80);
    return (
      shortenBody
    )
  }
}
