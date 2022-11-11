import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { token } from '../../utils/user';
import Loading from '../ux/Loading';
import PostCard from './PostCard';

const url = BASE_URL + 'social/posts?';

export default function PostList() {
  const [postList, setPostList] = useState(null);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
 
  useEffect(function () {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

		async function getPosts() {
      try {
        let res = await axios.get(url, config);
        console.log(res.data);
        setPostList(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        }
      } finally {
          setLoading(false);
      }
    } getPosts();
	}, []);

  if (loading) return <Loading />;
	if (error) return <div>{}</div>;

  return (
    <>
    <div className='post-list'>
      {postList.map((post) => (
        <PostCard 
        key={post.id} 
        title={post.title} 
        body={post.body} 
        src={post.media} 
        comment_count={post._count.comments}
        created={post.created}
        />
      ))}
    </div>
    </>
  );
}