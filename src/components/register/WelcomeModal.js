import axios from 'axios';
import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BigParagraph from '../layout/Paragraphs';
import { Heading } from '../layout/Headings';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { BASE_URL } from '../../constants/api';

const name = (localStorage.getItem('user_name'));
const url = BASE_URL + 'social/profiles/' + JSON.parse(name) + '/media';
const token = localStorage.getItem('token');

export default function WelcomeModal() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  async function onSubmit(data) {
    data.preventDefault();
    console.log(data);

    const options = {
      data: {
        avatar: 'https://cdn-icons-png.flaticon.com/512/147/147142.png',
        banner: 'https://content.r9cdn.net/rimg/dimg/bf/9d/7594f2c4-city-44167-166c12e16b8.jpg?width=1200&height=630&crop=true',
      },
      headers: {
        Authorization: 'Bearer ' + JSON.parse(token),
      },
    }

    //JUST GETTING NO SERVER RESPONSE ERROR and UNDEFINED.. What happens?

    try {
      let res = await axios.put(url, options);
      console.log(res.data);
      alert('Success');
    } catch (err) {
      if (!err?.response) {
        console.log(err.response);
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
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        show={show} 
        onHide={handleClose} 
        animation={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Heading content='Welcome to Substance!'/>
          <BigParagraph content='Show people  who you are by adding an avatar and banner to your profile. '/>
        
        <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
        
        <Form onSubmit={onSubmit}>
          <Form.Group className='form-content'>
            <Form.Group>
              <Form.Label>Profile picture</Form.Label>
              <InputGroup className="" controlid="formAvatar">
                <InputGroup.Text 
                  className='input-span'>
                    <ion-icon name="person-circle-outline"></ion-icon>
                </InputGroup.Text>
                <Form.Control 
                  type="url" 
                  placeholder="https://" 
                  name='avatar'
                  pattern="https://.*"
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <Form.Label>Banner</Form.Label>
              <InputGroup className="" controlid="formBanner">
                <InputGroup.Text 
                  className='input-span'>
                    <ion-icon name="image-outline"></ion-icon>
                </InputGroup.Text>
                <Form.Control 
                  type="url" 
                  placeholder="https://" 
                  name='banner'
                  pattern="https://.*"
                />
              </InputGroup>
            </Form.Group>
          </Form.Group>

          <Button variant="primary" type="submit" className='btn--submit'>
            Save
          </Button>
        </Form>
        
        </Modal.Body>
        <Modal.Footer>
          <Button className='skip-modal' onClick={handleClose}>Skip this for now</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}