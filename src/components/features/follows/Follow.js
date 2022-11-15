import axios from "axios";
import { token } from "../../utils/user";
import { BASE_URL } from "../../constants/api";

export default function Follow(name) { 
  const name = 'a users name here';
  const url = BASE_URL + 'social/profiles/' + name + '/follow';
  console.log(url);

	async function doFollow() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      let res = await axios.delete(url, config);
      console.log(res);
      alert('You have unfollowed Kim');
    } catch (err) {
      alert('An error occured');
    } 
  } doFollow ();
}