import { SubHeading } from "../layout/Headings";
import BigParagraph from "../layout/Paragraphs";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function SucessMsg(handleClose) {
  return ( 
    <>
    <Modal.Body>
      <SubHeading content='Yay you updated your profile :)' />
      <BigParagraph content='Now start playing around.' />
      <Button className='skip-modal' onClick={handleClose}>Close</Button>
    </Modal.Body>
    </>
  ) 
}
