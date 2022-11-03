import axios from 'axios';
import { BASE_URL } from "../../constants/api";
import { name, token } from '../../utils/user';

const url = BASE_URL + 'social/profiles/' + JSON.parse(name) + '?_following=true&_followers=true';

export default async function getDetails() {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  try {
    let res = await axios.get(url, config);
    console.log(res.data);
  } catch (err) {
    if (!err?.response) {
      alert('error');
    }
  } 
}