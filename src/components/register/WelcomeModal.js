import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BigParagraph from '../layout/Paragraphs';
import { Heading } from '../layout/Headings';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        show={show} 
        onHide={handleClose} 
        animation={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Heading content='Welcome to Substance!'/>
          <BigParagraph content='Show people  who you are by adding an avatar and banner to your profile. '/>
        
        <Form>
          <Form.Group className='form-content'>
            <Form.Group>
              <Form.Label>Profile picture</Form.Label>
              <InputGroup className="" controlid="formAvatar">
                <InputGroup.Text 
                  className='input-span'>
                    <ion-icon name="person-circle-outline"></ion-icon>
                </InputGroup.Text>
                <Form.Control 
                  type="url" 
                  placeholder="https://" 
                  name='avatar'
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Banner</Form.Label>
              <InputGroup className="" controlid="formBanner">
                <InputGroup.Text 
                  className='input-span'>
                    <ion-icon name="image-outline"></ion-icon>
                </InputGroup.Text>
                <Form.Control 
                  type="url" 
                  placeholder="https://" 
                  name='banner'
                />
              </InputGroup>
            </Form.Group>
          </Form.Group>

          <Button variant="primary" type="submit" className='btn--submit'>
            Save
          </Button>
        </Form>
        
        </Modal.Body>
        <Modal.Footer>
          <Button className='skip-modal' onClick={handleClose}>Skip this for now</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}