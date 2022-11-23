import { XsHeading } from "../layout/Headings";
import { Paragraph } from "../layout/Paragraphs";
import ReactionForm from "./ReactionForm";


export default function PostCard (post) {
  return (
    <>
    <div className="post-card" href={`/post/${post.href}`}>

      {post.menu}

      <div className="reactions">
        <ReactionForm />
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
              <ion-icon name="chatbox-outline"></ion-icon> 
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
