import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SubHeading } from '../layout/Headings';
import Avatar from '../profile/Avatar';
import AvatarPlaceholder from '../profile/AvatarPlaceholder';
import { token, name } from '../../utils/user';
import { BASE_URL } from '../../constants/api';
import Loading from '../ux/Loading';

const url = BASE_URL + 'social/profiles/' + name + '?_following=true&_followers=true';

function FollowingList() {
  const [following,setFollowing] = useState();
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  useEffect(() => {
    fetchFollowing();
  }, [])
  useEffect(() => {
    console.log(following)
  }, [following])

  const fetchFollowing = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
    }}
    try {
      const response = await axios.get(url, config);
      setFollowing(response.data.following) 
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
    <> {(following.length === 0) ? <div className='no-posts'>Not following anyone :(</div> :
    <ul className='follow-list'>
      {following && following.map((follow) => (
        <div className='follow-list-item'>  
          
          {follow.avatar ? 
            <Avatar className='avatar--medium' src={follow.avatar} alt='avatar' /> 
            : <AvatarPlaceholder className='avatar-placeholder--medium' /> }
            
          <div>{follow.name}</div>
          <Button className='unfollow-btn' variant='secondary'>Unfollow</Button>
        </div>
      ))}
    </ul> }
  </>
  )
}

function FollowingModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body>
          <SubHeading content='Following' />
          <FollowingList />
      </Modal.Body>
    </Modal>
  );
}

export default function Following(following) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button id='following-btn' className='btn-secondary' onClick={() => setModalShow(true)}>
        Following {following.count}
      </Button>

      <FollowingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}