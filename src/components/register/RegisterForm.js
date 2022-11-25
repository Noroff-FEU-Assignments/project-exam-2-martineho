import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL } from '../../constants/api';
import { InputGroup } from 'react-bootstrap';
import { SubHeading } from "../../components/layout/Headings";

const url = BASE_URL + 'social/auth/register?=';

const schema = yup.object().shape({
  name: yup.string()
  .required("Please provide a name!")
  .matches(/^\S+$/, 'Name must not contain spaces.'),
  email: yup.string()
  .matches("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(noroff|stud.noroff)\.no$", "Please fill in a valid noroff or stud.noroff email.")
  .required("Please fill in your email address!"),
  password: yup.string()
  .min(8, "Password is too short - should be minimum 8 characters.")
  .required("Please fill in password!"),
  confirm_password: yup.string()
  .oneOf([yup.ref('password'), null], 'Passwords must match!')
  .required("Please write your password again!"),
});

function RegisterForm() {
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const redirect = () => {
    navigate('/login');
  }

  async function onSubmit(data) {
    console.log(data);
    try {
      let res = await axios.post(url, data);
      console.log(res.data);
      localStorage.setItem('new_user', res.data.name);
      redirect();
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
              placeholder="Username" 
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