import RegistrationForm from './RegistrationForm';
import { useState } from 'react';
import { BASE_URL } from '../../constants/api';

const REGISTER_URL = BASE_URL + 'social/auth/register?=';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  return (
    <RegistrationForm />
  );
}