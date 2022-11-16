import axios from "axios";
import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { Heading } from "../../components/layout/Headings";
import { token } from "../../utils/user";
import { BASE_URL } from "../../constants/api"
import Container from 'react-bootstrap/Container';
import Banner from '../../components/profile/Banner';
import Avatar from '../../components/profile/Avatar';
import AvatarPlaceholder from "../../components/profile/AvatarPlaceholder";
import Loading from "../../components/ux/Loading";
import RenderUpdateFrom from "../../components/profile/UpdateForm";
import ProfilePostList from "../../components/profile/ProfilePostList";
import Following from "../../components/features/follows/Following";
import Followers from "../../components/features/follows/Followers";

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  let navigate = useNavigate();
 
  const { name } = useParams();
 
  if (!name) {
   navigate.push("/");
  }

  const url = BASE_URL + `social/profiles/${name}?_comments=true&_author=true`;

  useEffect(function () {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

		async function getPosts() {
      try {
        let res = await axios.get(url, config);
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        }
      } finally {
          setLoading(false);
      }
    } getPosts();
	}, [url]);
  
  if (loading) { return <Loading />; }
  if (error) { return <div>An error occured: {error}</div> }
  console.log(user);

  return(
    <>
    <Container>
      {user.banner ? <Banner src={user.banner} alt={user.name} /> : <div className='profile--banner'></div>}
      <div className='profile__header'>
        <div className='group'>
          {user.avatar ? <Avatar className='avatar--big' src={user.avatar} alt='avatar' /> 
            : <AvatarPlaceholder className='avatar-placeholder--big' /> }
          <Heading style={{fontSize: '1.1'}} content={user.name}/>
          <RenderUpdateFrom />
        </div>
        <div className='group'>
          <div className='post-count'> {user._count.posts} posts </div>
          <Following count={user._count.following} />
          <Followers count={user._count.followers} />
        </div>
      </div>
      <main className="profile-posts">
        <ProfilePostList />
      </main>
    </Container>
    </>
  )
}
