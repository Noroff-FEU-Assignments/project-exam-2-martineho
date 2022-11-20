import axios from 'axios';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BASE_URL } from '../../../constants/api';
import { token } from '../../../utils/user';
import { SmHeading, SubHeading } from '../../layout/Headings';

const schema = yup.object().shape({
  title: yup.string()
  .max(60, 'Your title is too long. Maximum 60 characters.')
  .min(3, 'Please make a title with at least 3 characters.')
  .required('Please provide a title for your post!'),
  media: yup.string()
    .matches("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$", "You need to fill in a valid image url.")
    .required('You need to fill inn a image url.'),
  body: yup.string()
});

export default function UpdatePostModal(postid) {
  const id = postid.postid;
  const url = BASE_URL + 'social/posts/' + id;
  const [post, setPost] = useState([]);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const mediaRef = useRef(post.media);
  const titleRef = useRef(post.title);
  const bodyRef = useRef(post.body);

  useEffect(function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
		async function getPost() {
      try {
        let res = await axios.get(url, config);
        console.log(res.data);
        setPost(res.data);
      } catch (err) {
        if (!err?.response) {
          console.log(err.response);      
        }
      }
    } getPost();
	}, [url, id]);

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
      let res = await axios.put(url, data, config);
      console.log(res);
      window.location.reload();
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
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={modalShow}
      onHide={() => setModalShow(false)}
    >
      <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>    
          <SubHeading content='Edit post' />
          <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>

            <Form.Group className='form-content'>

            <Form.Group>
              <Form.Label>
                <SmHeading 
                content='Title' />
              </Form.Label>
              <InputGroup className="" controlid="formTitle">
                <Form.Control 
                  ref={titleRef}
                  type="text" 
                  placeholder={post.title}
                  defaultValue={post.title}
                  name='title'
                  {...register("title")}
                  />
                </InputGroup>
                {errors.title && <div className='errmsg--input'>{errors.title.message}</div>}
            </Form.Group>

            {post.media ? 
            <Form.Group >
              <div className='group form-group'>
                  <div className='input-span'>
                      <div className='form-placeholder-icons'><ion-icon name="image"></ion-icon></div>
                  </div>
              <InputGroup className="" controlid="formMedia">
                <InputGroup.Text 
                  className='input-span'>
                    <ion-icon name="link-outline"></ion-icon>
                  </InputGroup.Text>
                <Form.Control 
                  ref={mediaRef}
                  type="url" 
                  placeholder={post.media}
                  defaultValue={post.media}
                  name='media'
                  {...register("media")}
                  />
              </InputGroup>
            </div>
            {errors.media && <div className='errmsg--input'>{errors.media.message}</div>}
           </Form.Group> 
           :
           <Form.Group>
              <InputGroup className="" controlid="formBody">
                <InputGroup.Text 
                  className='input-span--textarea'>
                  <ion-icon name="create"></ion-icon>
                </InputGroup.Text>
                <Form.Control 
                  as="textarea" 
                  ref={bodyRef}
                  rows={2}
                  placeholder={post.body}
                  name='body'
                  {...register("body")}
                  />
              </InputGroup>
            {errors.body && <div className='errmsg--input'>{errors.body.message}</div>}
           </Form.Group> }
              
            </Form.Group>
            <div className='group modal-btns'>
              <Button variant="primary" type="submit" className='btn--submit'> Save </Button>
              <Button variant="light" className='skip-modal' onClick={() => setModalShow(false)}>Cancel</Button>
            </div>
          </Form>
      </Modal.Body>
    </Modal>

    <button className="post-btn edit" onClick={() => setModalShow(true)}>
      <ion-icon name="create"></ion-icon>
    </button>
    </>
  );
}