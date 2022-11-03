import { SubHeading } from "../layout/Headings";
import BigParagraph from "../layout/Paragraphs";
import Button from 'react-bootstrap/Button';

export function SucessMsg(handleClose) {
  return ( 
    <>
    <div className="success-msg">
      <SubHeading content='Yay you updated your profile :)' />
      <BigParagraph content='Now start playing around.' />
      <Button className='skip-modal' onClick={handleClose}>Close</Button>
    </div>
    </>
  ) 
}
