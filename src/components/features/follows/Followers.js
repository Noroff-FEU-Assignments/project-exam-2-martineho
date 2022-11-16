import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubHeading } from '../../layout/Headings';
import Avatar from '../../profile/Avatar';
import AvatarPlaceholder from '../../profile/AvatarPlaceholder';
import { token } from '../../../utils/user';
import { BASE_URL } from '../../../constants/api';
import Loading from '../../ux/Loading'

const name = localStorage.getItem('profile_name');
const url = BASE_URL + 'social/profiles/' + name + '?_following=true&_followers=true';

function FollowersList() {
  const [followers, setFollowers] = useState();
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(() => {
    fetchFollowers();
  }, [])
  useEffect(() => {
    console.log(followers)
  }, [followers])

  const fetchFollowers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
    }}
    try {
      const response = await axios.get(url, config);
      setFollowers(response.data.followers) 
    } catch (err) {
      if (!err?.response) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return ( <Loading /> ) ;
	if (error) return ( <div>An error occured while fetching the data :(</div> );

  return (
    <>
    {(followers.length === 0) ? <div className='no-posts'>No followers</div> :
    <ul className='follow-list'>
      {followers && followers.map((follow) => (
        <div key={follow.name} className='follow-list-item'>  
           
           <a className='follow-list-item--link' href={`/profiles/${follow.name}`}>
            {follow.avatar ? 
              <Avatar className='avatar--medium' src={follow.avatar} alt='avatar' /> 
              : <AvatarPlaceholder className='avatar-placeholder--medium' /> }
            
            <div>{follow.name}</div>
          </a>

          <Button className='unfollow-btn' variant='secondary'>Unfollow</Button>
        </div>
      ))} 
    </ul> }
  </>
  )
}

function FollowersModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
          <SubHeading content='Followers' />
          <FollowersList />
      </Modal.Body>
    </Modal>
  );
}

export default function Followers(followers) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button id='followers-btn' className='btn-secondary' onClick={() => setModalShow(true)}>
        Followers {followers.count}
      </Button>

      <FollowersModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}