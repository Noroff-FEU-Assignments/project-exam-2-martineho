import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/api";
import { token } from "../../utils/user";
import { XsHeading } from "../layout/Headings";
import { Paragraph } from "../layout/Paragraphs";

export default function PostCard (post) {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const hearts_url = BASE_URL + 'social/posts/' + post.href + '/react/😍';
  const hands_url = BASE_URL + 'social/posts/' + post.href + '/react/🙌';

  const reactHeartsEmoji = async () => {
    axios({
      method: 'put',
      url: hearts_url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    .then(function () {
      console.log('Reaction ok 😍');
    });
  };

  const reactHandsEmoji = async () => {
    axios({
      method: 'put',
      url: hands_url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    .then(function () {
      console.log('Reaction ok 😍');
    });
  };


  useEffect(() => {
    const heartsEmojiCount = () => {
      let heartsEmoji = 0; 
      post.reactions.map(function (emoji) {
        if (emoji.symbol === '😍') {
          heartsEmoji = emoji.count;
        }
        return heartsEmoji;
      })
      return heartsEmoji;
    }
  
    const handsEmojiCount = () => {
      let handsEmoji = 0; 
      post.reactions.map(function (emoji) {
        if (emoji.symbol === '🙌') {
          handsEmoji = emoji.count;
        } 
        return handsEmoji;
      })
      return handsEmoji;
    }

    setCountOne(heartsEmojiCount());
    setCountTwo(handsEmojiCount());
  }, [post.reactions]);

  const handleHeartsEmojiCount = () => {
    setCountOne(countOne + 1);
    reactHeartsEmoji();
  }
  const handleHandsEmojiCount = () => {
    setCountTwo(countTwo + 1);
    reactHandsEmoji();
  }

  return (
    <>
    <div className="post-card" href={`/post/${post.href}`}>

      {post.menu}

      <div className="reactions">
        <div className='reaction-buttons'>
          <button onClick={handleHeartsEmojiCount} value={'😍'} className="reaction-btn">😍</button>
            <span className="reaction-count">{countOne}
            </span>
          <button onClick={handleHandsEmojiCount} value={'🙌'} className="reaction-btn">🙌</button>
          <span className="reaction-count">{countTwo}
            </span>
        </div>
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
