import axios from 'axios';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Paragraph} from '../layout/Paragraphs';
import { Heading } from '../layout/Headings';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { BASE_URL } from '../../constants/api';
import { SucessMsg } from './SuccessMsg';
import { name, token } from '../../utils/user';
import ValidationMsg from '../ux/ValidationMsg';

const url = BASE_URL + 'social/profiles/' + name + '/media';

export default function WelcomeModal() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [hideForm, setHideForm] = useState(false);
  const [show, setShow] = useState(true);
  const avatarRef = useRef(null);
  const bannerRef = useRef(null);
  const handleClose = () => {
    localStorage.removeItem('new_user');
    setShow(false)
  };

  async function onSubmit(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const data = {
        avatar: avatarRef.current.value,
        banner: bannerRef.current.value
    }

    try {
      let res = await axios.put(url, data, config);
      console.log(res.data);
      setHideForm(true);
      setSuccessMsg(ValidationMsg(handleClose));
      localStorage.removeItem('new_user');
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
        show={show} 
        onHide={handleClose} 
        animation={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id='welcome-modal'
      >
        {successMsg}
        {!hideForm ? 
        <Modal.Body>        
          <Form onSubmit={onSubmit}>
          
          <div className='introduction'>
            <Heading content={`Hi ${name},`} />
            <Heading content={`welcome to aesocial 👋`} />
            <Paragraph content={`Show people  who you are by adding a banner and avatar to your profile.`} />
          </div>
          
          <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>

          <Form.Group className='form-content'>

            <Form.Group>
                
                <div className='input-header'>
                  <div className='input--banner'></div>
                </div>
                <InputGroup className="" controlid="formBanner">
                  <InputGroup.Text 
                    className='input-span'>
                      <ion-icon name="link-outline"></ion-icon>
                  </InputGroup.Text>
                  <Form.Control 
                    ref={bannerRef}
                    type="url" 
                    placeholder="Paste image url" 
                    name='banner'
                    pattern="(https?:\/\/.*\.(?:png|jpg))"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group>
              
                  <div className='group form-group'>
                    <div className='input-header'>
                      <div className='avatar--medium'><ion-icon name="person"></ion-icon></div>
                    </div>
                  <InputGroup className="" controlid="formAvatar">
                  <InputGroup.Text 
                    className='input-span'>
                      <ion-icon name="link-outline"></ion-icon>
                  </InputGroup.Text>
                  <Form.Control 
                    ref={avatarRef}
                    type="url" 
                    placeholder="Paste image url" 
                    name='avatar'
                    pattern="(https?:\/\/.*\.(?:png|jpg))"
                    />
                  </InputGroup>
                </div>
              </Form.Group>

            </Form.Group>

            <Button variant="primary" type="submit" className='btn--submit'>
              Save
            </Button>
          </Form>
          <button className='skip-modal' onClick={handleClose}>Skip this for now</button>
        </Modal.Body> : null }
      </Modal>
    </>
  )
}
