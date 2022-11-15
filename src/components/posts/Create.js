import axios from 'axios';
import React from 'react';
import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SubHeading, SmHeading } from '../layout/Headings';
import BigParagraph from '../layout/Paragraphs';
import { BASE_URL } from '../../constants/api';
import { token } from '../../utils/user';

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
          <SubHeading content='New post' />
          <BigParagraph content='What would you like to share today?' />
          <div className='group'>
            <button id='show-image-btn' className='create-btn'>
              <ion-icon name="image"></ion-icon> 
              Image</button>
            <button className='create-btn'>
              <ion-icon name="create"></ion-icon> 
              Text</button>
          </div>
          <ImageForm />
      </Modal.Body>
    </Modal>
  );
}

const schema = yup.object().shape({
  title: yup.string()
  .max(60, 'Your title is too long. Maximum 60 characters.')
  .min(3, 'Please make a title with at least 3 characters.')
  .required('Please provide a title for your post!'),
  media: yup.string()
  .required('You need to fill inn a image url.')
  .matches("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$", "You need to fill in a valid image url."),
});


function ImageForm() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const url = BASE_URL + 'social/posts';

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    try {
      let res = await axios.post(url, data, config);
      console.log(res);
      alert('updated content');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('400');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized :(');
      } else {
        setErrMsg('Failed');
      }
      errRef.current.focus();
    } 
  }

  return (
    <>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='form-content'>
      <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
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
            {...register("title")}
            />
          </InputGroup>
          {errors.title && <div className='errmsg--input'>{errors.title.message}</div>}
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
                name='media'
                {...register("media")}
                />
            </InputGroup>
            {errors.media && <div className='errmsg--input'>{errors.media.message}</div>}
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