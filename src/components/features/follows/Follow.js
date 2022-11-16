import axios from "axios";
import React from "react";
import { token } from "../../../utils/user";
import { BASE_URL } from "../../../constants/api";
import { Button } from "react-bootstrap";

export default function Follow(name) { 
  name = name.name; 
  
  const url = BASE_URL + 'social/profiles/' + name + '/follow';

  const doFollow = async () => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
    }}

    try {
      const response = await axios.put(url, config);
      console.log(response);
      alert('You just followed', name);
    } catch (err) {
      alert(err);
    } 
  }

  return (
    <>
      <Button onClick={doFollow}>Follow</Button>
    </>
  )
}