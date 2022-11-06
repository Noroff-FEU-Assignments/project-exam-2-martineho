import { SmHeading } from "../layout/Headings";
import { Paragraph } from "../layout/Paragraphs";
import ReactionForm from "./ReactionForm";

export default function PostCard (post) {
  return (
    <>
    <div key={post.key} className="post-card">
      <div className="post-card__image">
        <img src={post.src} alt={post.alt} />
      </div>
      <div className="post-card__content">
        <div className="post-card__content--header">
            <div className="post-card__content--timestamp">{post.time}</div>
            <button className="post-card__content--btn"><ion-icon name="ellipsis-vertical"></ion-icon></button>
        </div>
        <div className="post-card__content--text">
          <SmHeading content={post.title} />
          <Paragraph content={post.body} />
        </div>
        <div className="post-card__content--footer">
        <div className="reactions">
          <ReactionForm />
        </div>
        <div className="comments">
          <button><ion-icon name="chatbox-outline"></ion-icon> {post.comment_count}</button>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}