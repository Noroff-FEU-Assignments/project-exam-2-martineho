import { XsHeading } from "../layout/Headings";
import { Paragraph } from "../layout/Paragraphs";
import ReactionForm from "./ReactionForm";

export default function PostCard (post) {

  return (
    <>
    <div className="post-card">

      {post.menu}

      <div className="reactions">
        <ReactionForm />
      </div>

      {post.src ? '' : <div className="tag"> Quote </div> }

      <div className="post-card__content">

        {post.src ? 
          <div className="post-card__image">
            <img src={post.src} alt={post.alt} />
          </div> 
        : <div className="post-card__content--text">
            <Paragraph content={post.body} />
          </div> }

      </div>
      <div className="post-card__content--footer">
        <div className="post-card__content--text">
          <XsHeading content={post.title}/>
        </div>
        <div className="comments">
            <button className="btn-light comment-btn">
              <ion-icon name="chatbox-outline"></ion-icon> 
              {post.comment_count}
            </button>
          </div>
      </div>
    </div>
    </>
  )
}
