import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { name, token } from '../../utils/user';
import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import Banner from '../../components/profile/Banner';
import Avatar from '../../components/profile/Avatar';
import { Button } from 'react-bootstrap';

const url = BASE_URL + 'social/profiles/' + name + '?_following=true&_followers=true';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(function () {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

		async function userDetails() {
      try {
        let res = await axios.get(url, config);
        console.log(res.data);
          setUser(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    } userDetails();
	}, );

  if (loading) return <div>Loading...</div>;
	if (error) return <div>{}</div>;

  if (user.avatar === '') {
    setAvatar(false)
  }

  return (
    <>
    <Container>
      <Banner src={user.banner} alt={user.name} />
      <div className='profile__header'>
        <div className='group'>
          {avatar ? <Avatar src={user.avatar} alt={user.name} /> 
          : <div className='profile--avatar'><ion-icon name="person"></ion-icon></div> }
          <Heading content={user.name} style={{fontSize: '1.8'}}/>
        </div>
        <div className='group'>
          <Button className='btn'>Following {user._count.following}</Button>
          <Button className='btn'>Followers {user._count.followers}</Button>
          <Button className='btn'>Follow</Button>
        </div>
      </div>
      <main>
        <div className=''>
          {user._count.posts} Posts
        </div>
      </main>
    </Container>
    </>
  );
}
