import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SubHeading, SmHeading } from '../layout/Headings';
import BigParagraph from '../layout/Paragraphs';

function CreateModal(props) {
  const [showImage, setShowImage] = React.useState(false);

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
          <SubHeading content='New post' />
          <BigParagraph content='What would you like to share today?' />
          <div className='group'>
            <button className='create-btn' onClick={() => setShowImage(true)}>
              <ion-icon name="image"></ion-icon> 
              Image</button>
            <button className='create-btn'>
              <ion-icon name="create"></ion-icon> 
              Text</button>
          </div>
          <ImageForm show={showImage} />
      </Modal.Body>
    </Modal>
  );
}

function ImageForm() {
  return (
    <>
    <Form>
      <Form.Group className='form-content'>

      <Form.Group>
        <Form.Label>
          <SmHeading 
          content='Title' />
        </Form.Label>
      
        <InputGroup className="" controlid="formTitle">
          <Form.Control 
            
            type="text" 
            placeholder={'Give your post a title'}
            name='title'

            />
          </InputGroup>
        
      </Form.Group>

        <Form.Group>
          <Form.Label>
            <SmHeading 
              content='Image' />
          </Form.Label>
            <InputGroup className="" controlid="formAvatar">
              <InputGroup.Text 
                className='input-span'>
                  <ion-icon name="link-outline"></ion-icon>
                </InputGroup.Text>
              <Form.Control 
              
                type="url" 
                placeholder={'Paste image url'}
                name='avatar'
            
                />
            </InputGroup>
        </Form.Group>
      </Form.Group>
      <div className='group modal-btns'>
          <Button variant="primary" type="submit" className='btn-w-icon'> 
           <div className='btn-text'>Share </div>
            <ion-icon name="send"></ion-icon>
          </Button>
      </div>
    </Form>
    </>
  )
}

export default function CreatePost() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button id='create-post-btn' className='primary' onClick={() => setModalShow(true)}>
        Create post
      </Button>

      <CreateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}