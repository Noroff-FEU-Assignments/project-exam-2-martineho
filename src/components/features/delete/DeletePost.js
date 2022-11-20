import React from "react";
import axios from 'axios';
import { BASE_URL } from '../../../constants/api';
import { token } from '../../../utils/user';

export default async function doDelete(id) {
  const url = BASE_URL + 'social/posts/';

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    let res = await axios.delete(url + id, config);
    console.log(res);
    alert('Your post has been deleted');
  } catch (err) {
    alert('An error occured');
  } 
}