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
import { SubHeading } from '../layout/Headings';
import { BASE_URL } from '../../constants/api';
import { name, token } from '../../utils/user';

const url = BASE_URL + 'social/profiles/' + name + '/media';

const schema = yup.object().shape({
  avatar: yup.string()
  .matches("(https?:\/\/.*\.(?:png|jpg|jpeg))", "You need to fill in a valid image url."),
  banner: yup.string()
  .matches("(https?:\/\/.*\.(?:png|jpg|jpeg))", "You need to fill in a valid image url."),
});

function UpdateForm(props) {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const avatarRef = useRef(null);
  const bannerRef = useRef(null);

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
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SubHeading content='Update your profile'/>
      
          <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>

            <Form.Group className='form-content'>
              <Form.Group>
                <Form.Label>Profile picture</Form.Label>
                <InputGroup className="" controlid="formAvatar">
                  <InputGroup.Text 
                    className='input-span'>
                      <ion-icon name="person-circle-outline"></ion-icon>
                  </InputGroup.Text>
                  <Form.Control 
                    ref={avatarRef}
                    type="url" 
                    placeholder={'https://'}
                    name='avatar'
                    {...register("avatar")}
                    />
                  </InputGroup>
                  {errors.avatar && <div className='errmsg--input'>{errors.avatar.message}</div>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Banner</Form.Label>
                <InputGroup className="" controlid="formBanner">
                  <InputGroup.Text 
                    className='input-span'>
                      <ion-icon name="image-outline"></ion-icon>
                  </InputGroup.Text>
                  <Form.Control 
                    ref={bannerRef}
                    type="url" 
                    placeholder={'https://'}
                    name='banner'
                    {...register("banner")}
                    />
                  </InputGroup>
                  {errors.banner && <div className='errmsg--input'>{errors.banner.message}</div>}
              </Form.Group>
            </Form.Group>

            <Button variant="primary" type="submit" className='btn--submit'>
              Save
            </Button>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function RenderUpdateFrom() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <ion-icon name="settings-sharp"></ion-icon>
      </Button>

      <UpdateForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}