import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveToken, saveUsername, saveUserEmail } from '../../../utils/storage';
import { BASE_URL } from '../../../constants/api';
import { InputGroup } from 'react-bootstrap';
import { SubHeading } from "../../layout/Headings";
import {Paragraph} from '../../layout/Paragraphs';

const url = BASE_URL + 'social/auth/login';

const schema = yup.object().shape({
  email: yup.string()
  .matches("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+.)?[a-zA-Z]+.)?(noroff|stud.noroff).no$", "Please fill in a valid noroff or stud.noroff email.")
  .required("Please fill in your email address!"),
  password: yup.string()
  .required("Please fill in your password!"),
});

function LoginForm() {
  const new_user = localStorage.getItem('new_user');
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const redirect = () => {
    navigate('/');
  }

  async function onSubmit(data) {
    console.log(data);
    setLoading(true);
    try {
      let res = await axios.post(url, data);
      console.log(res.data);
      saveToken(res.data.accessToken);
      saveUsername(res.data.name);
      saveUserEmail(res.data.email);
      redirect();
      window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Wrong email or password :(');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
      <SubHeading content='Sign in' />

      {new_user ? <Paragraph content={`You have registered, please sign in ????`} /> : null}

      <Form.Group className='form-content'>
        <Form.Group>
          <InputGroup className="" controlid="formEmail">
            <InputGroup.Text 
            className='input-span'>
              <ion-icon name="mail-outline"></ion-icon>
            </InputGroup.Text>
            <Form.Control 
            type="email" 
            placeholder="Enter email" 
            name='email'
            {...register("email")}
            />
          </InputGroup>
          {errors.email && <div className='errmsg--input'>{errors.email.message}</div>}
        </Form.Group>

        <Form.Group>
          <InputGroup className="" controlid="formPassword">
            <InputGroup.Text 
            className='input-span'>
              <ion-icon name="lock-closed-outline"></ion-icon>
            </InputGroup.Text>
            <Form.Control 
            type="password" 
            placeholder="Password" 
            name='password' 
            {...register("password")}
            />
          </InputGroup> 
          {errors.password && <div className='errmsg--input'>{errors.password.message}</div>}
        </Form.Group>
      </Form.Group>

      <Button variant="primary" type="submit" className='btn-w-icon btn--submit'> 
          <div className='btn-text'>Sign in </div>
          {loading ? <div className='load-submit'></div> : null }
      </Button>   

      </Form>
    </>
  );
}
export default LoginForm;