import { Button } from "react-bootstrap";
import { SmHeading } from "../layout/Headings";
import { Paragraph } from "../layout/Paragraphs";
import ReactionForm from "./ReactionForm";

export default function PostCard (post) {
  return (
    <>
    <div className="post-card">
      {post.src ? <div className="post-card__image">
        <img src={post.src} alt={post.alt} />
      </div> : null }
      <div className="post-card__content">
        <div className="post-card__content--header">
            <div className="post-card__content--timestamp">{post.created}</div>
            <Button className="btn-light">
              <ion-icon name="ellipsis-vertical"></ion-icon>
            </Button>
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
            <Button className="btn-light">
              <ion-icon name="chatbox-outline"></ion-icon> 
              {post.comment_count}
            </Button>
          </div>
      </div>
      </div>
    </div>
    </>
  )
}