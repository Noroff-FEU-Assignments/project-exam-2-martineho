import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { name, token } from '../../utils/user';
import Loading from '../ux/Loading';
import PostCard from '../posts/PostCard';
import PostMenu from '../posts/PostMenu';

const url = BASE_URL + 'social/profiles/' + name + '/posts';

export default function ProfilePostList() {
  const [postList, setPostList] = useState([]);
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

  const menu = (id) => {
    return (<PostMenu postId={id} />)
  }


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
          created={post.created}
          menu={menu(post.id)}
          href={post.id}
          />
      ))}
    </div>
    }
    </>
  );
}