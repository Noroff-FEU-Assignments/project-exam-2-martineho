import Button from "react-bootstrap/Button";
import BigParagraph from "../layout/Paragraphs";
import CreatePost from "./Create";

export default function PostLine () {
  return (
    <>
    <div className="postline">
      <BigParagraph content='Share your thoughts, inpiration and ideas!' />
      <CreatePost />
    </div>
    </>
  )
}