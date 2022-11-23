import axios from "axios";
import React from "react";
import { token } from "../../../utils/user";
import { BASE_URL } from "../../../constants/api";
import Button from "react-bootstrap/Button"

export default function Unfollow(name) { 
  name = name.name;
  const url = BASE_URL + 'social/profiles/' + name + '/unfollow';

	async function doUnfollow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      let res = await axios.put(url, config);
      console.log(res);
      alert('You have unfollowed Kim');
    } catch (err) {
      alert('An error occured');
    } 
  } 
  
  return (
    <Button className='unfollow-btn' variant='secondary' onClick={doUnfollow} >Unfollow</Button>
  )
}