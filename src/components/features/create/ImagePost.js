import axios from 'axios';
import React from 'react';
import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { SmHeading } from '../../layout/Headings';
import { BASE_URL } from '../../../constants/api';
import { token } from '../../../utils/user';

const schema = yup.object().shape({
  title: yup.string()
  .max(60, 'Your title is too long. Maximum 60 characters.')
  .min(3, 'Please make a title with at least 3 characters.')
  .required('Please provide a title for your post!'),
  media: yup.string()
  .required('You need to fill inn a image url.')
  .matches("[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$", "You need to fill in a valid image url."),
});

export default function ImagePost(props) {
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

        <Form.Group >
              <div className='group form-group'>
                  <div className='input-span'>
                      <div className='form-placeholder-icons'><ion-icon name="image"></ion-icon></div>
                  </div>
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
            </div>
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