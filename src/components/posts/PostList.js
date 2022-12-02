import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { token } from '../../utils/user';
import Loading from '../ux/Loading';
import PostCard from './PostCard';

export default function PostList() {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
 
  useEffect(function () {
    const url = BASE_URL + 'social/posts?_author=true&_reactions=true';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
		async function getPosts() {
      try {
        let res = await axios.get(url, config);
        setPostList(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err.response);       
        } if (err.response.status === 429) {
          setError('An error occured while fetching the data 😥');
        } if (err.response.status === 500) {
          setError('Sorry, the server did not anwser 😥');
        }
      } finally {
          setLoading(false);
      }
    } getPosts();
	}, []);

  if (loading) return <Loading />;
	if (error) return <div className='error-text'>{error}</div>;
  console.log(postList);

  return (
    <div className='post-list'>
        {postList.map((post) => (
          <PostCard 
          key={post.id} 
          title={post.title} 
          body={post.body} 
          src={post.media} 
          comment_count={post._count.comments}
          reaction_count={post._count.reactions}
          created={post.created}
          href={post.id}
          author={post.author.name}
          />
        ))}
    </div>
  );
}