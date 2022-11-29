import React from 'react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { SubHeading } from '../../layout/Headings';
import Wizard from './Wizard';
import ImagePost from './ImagePost';
import TextPost from './TextPost';

const PageOne = () => (
  <div className='introduction'>
    <SubHeading content='Create post' />
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
      id='create-modal'
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
      <button id='create-post-btn' className='nav-button create-post' onClick={() => setModalShow(true)}>
        <ion-icon name="add"></ion-icon>
      </button>

      <CreateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}