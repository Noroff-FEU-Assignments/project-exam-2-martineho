import Button from "react-bootstrap/Button";
import BigParagraph from "../layout/Paragraphs";

export default function PostLine () {
  return (
    <>
    <div className="postline">
      <BigParagraph content='Share your thoughts, inpiration and ideas!' />
      <Button className="btn postline--button">
        <ion-icon name="create-outline"></ion-icon> 
         New post</Button>
    </div>
    </>
  )
}