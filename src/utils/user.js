import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../constants/api";
import Loading from '../components/ux/Loading';

export const name = JSON.parse((localStorage.getItem('user_name')));
export const token = JSON.parse(localStorage.getItem('token'));

const url = BASE_URL + 'social/profiles/' + name + '?_following=true&_followers=true';

export default function User() {
  const [user, setUser] = useState({
    avatar: '', 
    banner: '', 
  });
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

		async function getDetails() {
      try {
        let res = await axios.get(url, config);
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    } getDetails();
	}, []);


  if (loading) return <Loading />;
	if (error) return <div>{}</div>;

  return (
    user
  );
}