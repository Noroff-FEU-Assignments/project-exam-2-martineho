import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { token } from '../../utils/user';
import Loading from '../ux/Loading';

const url = BASE_URL + 'social/profiles';

export default function ProfileList() {
  const [profileList, setProfileList] = useState([]);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
 
  useEffect(function () {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

		async function getProfiles() {
      try {
        let res = await axios.get(url, config);
        //console.log(res.data);
        setProfileList(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        } if (err.response.status === 429) {
          setError('An error occured while fetching the data 😥');
        } if (err.response.status === 500) {
          setError('Sorry, the server did not anwser 😥');
        }
      } finally {
          setLoading(false);
      }
    } getProfiles();
	}, );

  if (loading) return <Loading />;
	if (error) return <div className='error-text'>{error}</div>;

  const list = profileList.slice(0, 9);

  return (
    <>
    <div className='profile-list'>
      {list.map((user) => (
        <a key={user.name} className='profile-item' href={`/profiles/${user.name}`}>
          {user.avatar ? 
          <img className='profile-item--avatar' src={user.avatar} alt={''} /> : 
            <div className='profile-item--avatar'>
             <ion-icon name="person"></ion-icon>
            </div> }
          <div className='profile-item--name'>{user.name}</div>
        </a> 
      ))}
    </div>
    </>
  );
}