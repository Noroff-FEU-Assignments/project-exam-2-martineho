import axios from "axios";
import React from "react";
import { token } from "../../../utils/user";
import { BASE_URL } from "../../../constants/api";
import { Button } from "react-bootstrap";

export default function Follow(name) { 
  name = name.name; 
  const url = BASE_URL + 'social/profiles/' + name + '/follow';

  const followPerson = async () => {
    axios({
      method: 'put',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }) 
    .then(function () {
      console.log('You followed', name);
      window.location.reload();
    });
  }

  return (
    <>
      <Button class='follow-btn' onClick={followPerson}>Follow</Button>
    </>
  )
}