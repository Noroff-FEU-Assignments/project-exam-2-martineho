import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubHeading} from '../layout/Headings';
import BigParagraph from '../layout/Paragraphs';
import Wizard from '../features/create/Wizard';
import ImagePost from '../features/create/ImagePost';
import TextPost from '../features/create/TextPost';

const PageOne = () => (
  <div>
    <SubHeading content='New post' />
    <BigParagraph content='What would you like to share today?' />
  </div>
)
const PageTwo = () => (
  <ImagePost />
)
const PageThree = () => (
  <TextPost />
)

function CreateModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
          <Wizard>
            <PageOne />
            <PageTwo />
            <PageThree />
          </Wizard>
      </Modal.Body>
    </Modal>
  );
}

export default function CreatePost() {
  const [modalShow, setModalShow] = useState(false);

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