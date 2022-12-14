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

function FollowersList() {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  const name = localStorage.getItem('profile_name');
  const url = BASE_URL + 'social/profiles/' + name + '?_following=true&_followers=true';


  useEffect(() => {
    fetchFollowers();
  })
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
      } if (err.response.status === 429) {
        setError('An error occured while fetching the data 😥');
      } if (err.response.status === 500) {
        setError('Sorry, the server did not respond 😥');
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return ( <Loading /> ) ;
	if (error) return ( <div className='error-text'>{error}</div> );

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
      id='followers-modal'
    >
      <Modal.Header closeButton />
      <Modal.Body>
          <SubHeading content='Followers' />
          <FollowersList />
          <div className='overlay'></div>
      </Modal.Body>
    </Modal>
  );
}

export default function Followers(followers) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button id='followers-btn' variant='secondary' onClick={() => setModalShow(true)}>
        Followers {followers.count}
      </Button>

      <FollowersModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}