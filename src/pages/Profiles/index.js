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
import ProfilePostList from "../../components/profile/ProfilePostList";
import Following from "../../components/features/follows/Following";
import Followers from "../../components/features/follows/Followers";
import Follow from "../../components/features/follows/Follow";
import Footer from "../../components/layout/Footer";
import UpdateProfile from "../../components/features/update/UpdateProfile";

export default function ProfilePage() {
  const [user, setUser] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const loggedIn = JSON.parse(localStorage.getItem('user_name'));
 
  let navigate = useNavigate();
  const { name } = useParams();
  if (!name) {
   navigate.push("/");
  }

  useEffect(() => {
    if (loggedIn === name) {
      setAuthenticated(true);
    }
  }, [loggedIn, name]);

  const url = BASE_URL + `social/profiles/${name}?_comments=true&_author=true&_following=true&_followers=true`;
  localStorage.setItem('profile_name', name);

  useEffect(function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
		async function fetchUser() {
      try {
        let res = await axios.get(url, config);
        setUser(res.data);
        setFollowingCount(res.data._count.following);
        setFollowerCount(res.data._count.followers);
        setPostsCount(res.data._count.posts);
      } catch (err) {
        if (!err?.response) {
          setError(err.response.statusText);      
        } if (err.response.status === 500) {
          setError('Sorry, the server did not anwser 😥');
        } if (err.response.status === 429) {
          setError('An error occured while fetching the data 😥');
        }
      } finally {
          setLoading(false);
      }
    } fetchUser();
	}, [url]);
  
  if (loading) { return <Loading />; }
  if (error) { return <div className="error-text">{error}</div> }

  return(
    <>
    <Container>
      {user.banner ? <Banner src={user.banner} alt={user.name} /> : <div className='profile--banner'></div>}
      <div className='profile__header'>
        <div className='group'>
          {user.avatar ? <Avatar className='avatar--big' src={user.avatar} alt='avatar' /> 
            : <AvatarPlaceholder className='avatar-placeholder--big' /> }
          <Heading style={{fontSize: '1.1'}} content={user.name}/>
          {authenticated ? <UpdateProfile /> : null}
        </div>
        <div className='group'>
          <div className='post-count'> {postsCount} posts </div>
          <Following count={followingCount} />
          <Followers count={followerCount} />
          {!authenticated ? 
            <Follow name={user.name} /> : null 
          }
        </div>
      </div>
      <main className="profile-posts">
        <ProfilePostList name={user.name} />
      </main>
    </Container>
    <Footer />
    </>
  )
}
