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
import { BASE_URL } from '../../constants/api';
import { name, token } from '../../utils/user';
import User from '../../utils/user';
import { SmHeading, SubHeading } from '../layout/Headings';
import ValidationMsg from '../ux/ValidationMsg';

const url = BASE_URL + 'social/profiles/' + name + '/media';

const schema = yup.object().shape({
  avatar: yup.string()
  .matches('[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$', {
    excludeEmptyString: true,
    message: 'You need to fill in a valid image url',
  })
  .min(0)
  .nullable(true),
  banner: yup.string()
  .matches('[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$', {
    excludeEmptyString: true,
    message: 'You need to fill in a valid image url',
  })
  .min(0)
  .nullable(true),
});

function UpdateForm(props) {
  const user = User();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [hideForm, setHideForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const avatarRef = useRef(user.avatar);
  const bannerRef = useRef(user.banner);
  const handleClose = () => {
    window.location.reload();
  };

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
      setHideForm(true);
      setSuccessMsg(ValidationMsg(handleClose, 'Your profile was updated 🤩'));
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
      {successMsg}
      {!hideForm ? 
      <Modal.Body>
      <Form onSubmit={handleSubmit(onSubmit)}>    
          <SubHeading content='Update profile' />
          <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>

            <Form.Group className='form-content'>

              <Form.Group>
                <Form.Label>
                  <SmHeading 
                  content='Banner' />
                </Form.Label>
                <div className='input-header'>
                  {user.banner ?  <img className='input--banner' src={user.banner} alt='a' /> 
                    : <div className='input--banner'></div> }
                </div>
                <InputGroup className="" controlid="formBanner">
                  <InputGroup.Text 
                    className='input-span'>
                      <ion-icon name="link-outline"></ion-icon>
                    </InputGroup.Text>
                  <Form.Control 
                    ref={bannerRef}
                    type="url" 
                    placeholder={'Paste image url'}
                    name='banner'
                    defaultValue={user.banner}
                    {...register("banner")}
                    />
                  </InputGroup>
                  {errors.banner && <div className='errmsg--input'>{errors.banner.message}</div>}
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <SmHeading 
                    content='Avatar' />
                </Form.Label>
                <div className='group form-group'>
                  <div className='input-span'>
                    {user.avatar ?  <img className='avatar--medium' src={user.avatar} alt='a' />
                      : <div className='avatar--medium'><ion-icon name="person"></ion-icon></div> }
                  </div>
                  <InputGroup className="" controlid="formAvatar">
                    <InputGroup.Text 
                      className='input-span'>
                        <ion-icon name="link-outline"></ion-icon>
                      </InputGroup.Text>
                    <Form.Control 
                      ref={avatarRef}
                      type="url" 
                      placeholder={'Paste image url'}
                      name='avatar'
                      defaultValue={user.avatar}
                      {...register("avatar")}
                      />
                  </InputGroup>
                </div>
                  {errors.avatar && <div className='errmsg--input'>{errors.avatar.message}</div>}
              </Form.Group>
              
            </Form.Group>
            <div className='group modal-btns'>
              <Button variant="primary" type="submit" className='btn--submit'> Save </Button>
              <Button variant="light" className='skip-modal' onClick={props.onHide}>Cancel</Button>
            </div>
          </Form>
      </Modal.Body> : null }
    </Modal>
  );
}

export default function RenderUpdateFrom() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button id='settings-btn' variant='light' onClick={() => setModalShow(true)}>
        <ion-icon name="settings-sharp"></ion-icon>
      </Button>

      <UpdateForm
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}