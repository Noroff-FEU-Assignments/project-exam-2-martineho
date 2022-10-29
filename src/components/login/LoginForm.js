import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveToken, saveUsername, saveUserEmail } from '../../utils/storage';
import { BASE_URL } from '../../constants/api';
import { InputGroup } from 'react-bootstrap';
import { SubHeading } from "../../components/layout/Headings";

const url = BASE_URL + 'social/auth/login';

const schema = yup.object().shape({
  email: yup.string()
  .matches("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])", "Not a valid email address!")
  .required("Please fill in your email address!"),
  password: yup.string()
  .required("Please fill in a password!"),
});

function LoginForm() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    console.log(data);
    try {
      let res = await axios.post(url, data);
      console.log(res.data);
      saveToken(res.data.accessToken);
      saveUsername(res.data.name);
      saveUserEmail(res.data.email);
      alert('Hello you are successfully logged in.');
  } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('This user is does not exist :(');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    } 
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='login-form'>

      <SubHeading content='Sign in' />
      <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>

      <Form.Group className='form-group'>
        <InputGroup className="" controlId="formEmail">
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

        <InputGroup className="" controlId="formPassword">
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

      <Button variant="primary" type="submit" className='btn--submit'>
        Sign in
      </Button>
      
    </Form>
  );
}
export default LoginForm;