import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import { saveToken, saveUsername, saveUserEmail } from '../../utils/storage';
import { BASE_URL } from '../../constants/api';
import { InputGroup } from 'react-bootstrap';
import { SubHeading } from "../../components/layout/Headings";

const url = BASE_URL + 'social/auth/register?=';

const schema = yup.object().shape({
  name: yup.string()
  .required("Please provide a name!"),
  email: yup.string()
  .matches("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])", "Not a valid email address!")
  .required("Please fill in your email address!"),
  password: yup.string()
  .required("Please fill in your password!"),
  confirm_password: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match!')
  .required("Please write your password again!"),
});

function RegisterForm() {
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
      //saveToken(res.data.accessToken);
      //saveUsername(res.data.name);
      //saveUserEmail(res.data.email);
      alert('You have successfully created a user. Now login :-)');
  } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Email or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('We had problems with the authorization :(');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    } 
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='login-form'>

      <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
      <SubHeading content='Become a member' />

      <Form.Group className='form-content'>
        <Form.Group>
          <InputGroup className="" controlid="formUsername">
            <InputGroup.Text 
              className='input-span'>
                <ion-icon name="person-outline"></ion-icon>
            </InputGroup.Text>
            <Form.Control 
              type="text" 
              placeholder="Name" 
              name='name'
              {...register("name")}
            />
          </InputGroup>
          {errors.name && <div className='errmsg--input'>{errors.name.message}</div>}
        </Form.Group>

        <Form.Group>
          <InputGroup className="" controlid="formEmail">
            <InputGroup.Text 
              className='input-span'>
                <ion-icon name="mail-outline"></ion-icon>
            </InputGroup.Text>
            <Form.Control 
              type="email" 
              placeholder="Email" 
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
                <ion-icon name="lock-open-outline"></ion-icon>
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

        <Form.Group>
            <InputGroup className="" controlid="formConfirmPassword">
              <InputGroup.Text 
              className='input-span'>
                <ion-icon name="lock-closed-outline"></ion-icon>
              </InputGroup.Text>
              <Form.Control 
              type="password" 
              placeholder="Confirm password" 
              name='confirm_password' 
              {...register("confirm_password")}
              />
            </InputGroup> 
            {errors.confirm_password && <div className='errmsg--input'>{errors.confirm_password.message}</div>}
        </Form.Group>
      </Form.Group>
      
      <Button variant="primary" type="submit" className='btn--submit'>
        Sign up
      </Button>
      
    </Form>
  );
}
export default RegisterForm;