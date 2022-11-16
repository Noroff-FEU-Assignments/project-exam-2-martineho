import axios from "axios";
import React from "react";
import { token } from "../../utils/user";
import { BASE_URL } from "../../constants/api";
import UpdatePost from "../features/update/UpdatePost";

export default function PostMenu(postId) { 
  const id = postId.postId;
  const url = BASE_URL + 'social/posts/' + id;

		async function doDelete(e) {
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
    } 

  return (
    <div className='post-menu'>
      <UpdatePost />
      <button onClick={doDelete} className="post-btn delete" ><ion-icon name="trash"></ion-icon></button>
    </div>
  );
}
