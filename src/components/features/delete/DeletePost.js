import axios from "axios";
import { token } from "../../utils/user";
import { BASE_URL } from "../../constants/api";

export default function DeleteForm(postId) { 
  const id = postId.postId;
  const url = BASE_URL + 'social/posts/' + id;
  console.log(url);

	async function doDelete() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      let res = await axios.delete(url, config);
      console.log(res);
      alert('Your post has been deleted');
    } catch (err) {
      alert('An error occured');
    } 
  } doDelete ();
}