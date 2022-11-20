import axios from 'axios';
import React, { useState } from "react";
import { BASE_URL } from '../../constants/api';
import { token } from '../../utils/user';
import { SmHeading } from '../layout/Headings';
import { Button } from 'react-bootstrap';
import UpdatePostModal from '../features/update/UpdatePost';

const url = BASE_URL + 'social/posts/';

export default function PostMenu(postId) {
  const [valMsg, setValMsg] = useState(false);
  const id = postId.postId;

  async function doDelete(e) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      let res = await axios.delete(url + id, config);
      console.log(res);
      window.location.reload();
    } catch (err) {
      alert('An error occured');
    } 
  } 

  return (
    <>
    <div className='post-menu'>
      <UpdatePostModal postid={id} />
      <button className="post-btn delete" onClick={() => setValMsg(true)}>
        <ion-icon name="trash"></ion-icon>
      </button>
    </div>
    
    {valMsg ? 
    <div className='delete-msg'>
      <SmHeading content='Delete this post' />
      <div className='group'>
        <Button variant='light' onClick={() => setValMsg(false)}>No</Button>
        <Button variant='primary' onClick={doDelete}>Yes</Button>
      </div>
    </div> : null }
    </>
  );
}