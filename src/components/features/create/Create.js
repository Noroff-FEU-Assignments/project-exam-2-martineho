import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubHeading} from '../../layout/Headings';
import { Paragraph } from '../../layout/Paragraphs';
import Wizard from './Wizard';
import ImagePost from './ImagePost';
import TextPost from './TextPost';

const PageOne = () => (
  <div className='introduction'>
    <SubHeading content='Share' />
    <Paragraph content="What's on your mind today?" />
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
      <Modal.Body>
          <Wizard>
            <PageOne />
            <PageTwo />
            <PageThree />
          </Wizard>
          <Button variant="light" className='skip-modal' onClick={props.onHide}>Cancel</Button>
      </Modal.Body>
    </Modal>
  );
}

export default function CreatePost() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button id='create-post-btn' className='nav-button' onClick={() => setModalShow(true)}>
        <ion-icon name="add"></ion-icon>
      </button>

      <CreateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}