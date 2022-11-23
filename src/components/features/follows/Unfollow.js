import axios from "axios";
import React from "react";
import { token } from "../../../utils/user";
import { BASE_URL } from "../../../constants/api";
import Button from "react-bootstrap/Button"

export default function Unfollow(name) { 
  name = name.name;
  const url = BASE_URL + 'social/profiles/' + name + '/unfollow';

  const unfollowPerson = async () => {
    axios({
      method: 'put',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    .then(function () {
      console.log('You unfollowed', name);
    });
  }
  
  return (
    <Button className='unfollow-btn' variant='secondary' onClick={unfollowPerson} >Unfollow</Button>
  )
}