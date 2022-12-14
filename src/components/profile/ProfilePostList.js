import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { token } from '../../utils/user';
import Loading from '../ux/Loading';
import PostCard from '../posts/PostCard';
import PostMenu from '../posts/PostMenu';

export default function ProfilePostList(name) {
  name = name.name;
  const [authenticated, setAuthenticated] = useState(false);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const loggedIn = JSON.parse(localStorage.getItem('user_name'));
  const url = BASE_URL + 'social/profiles/' + name + '/posts?_reactions=true';

  useEffect(() => {
    if (loggedIn === name) {
      setAuthenticated(true);
    }
  }, [loggedIn, name]);

  const menu = (id) => {
    if (authenticated) {
      return (<PostMenu postId={id} />)
    } else {
      return ''
    }
  }

  useEffect(function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
		async function fetchPosts() {
      try {
        let res = await axios.get(url, config);
        setPostList(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        } if (err.response.status === 429) {
          setError('An error occured while fetching the data 😥');
        }
      } finally {
          setLoading(false);
      }
    } fetchPosts();
	}, [url]);

  if (loading) return ( <Loading /> );
	if (error) return ( <div className='error-text'>{error}</div> );

  return (
    <>
    {(postList.length === 0) ? <div className='no-posts'>No posts yet 🥺</div> : 
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
          menu={menu(post.id)}
          href={post.id}
          reactions={post.reactions}
          />
      ))}
    </div>
    }
    </>
  );
}