import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { token } from '../../utils/user';
import Loading from '../ux/Loading';
import { SubHeading } from '../../components/layout/Headings';

const url = BASE_URL + 'social/profiles';

export default function ProfileList() {
  const [profileList, setProfileList] = useState(null);
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
        console.log(res.data);
        setProfileList(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        }
      } finally {
          setLoading(false);
      }
    } getProfiles();
	}, );

  if (loading) return <Loading />;
	if (error) return <div>{}</div>;

  return (
    <>
    <div className='profile-list'>
      <SubHeading content='People' />
      {profileList.map((user) => (
        <div key={user.name} className='profile-item'>
          {user.avatar ? 
          <img className='profile-item--avatar' src={user.avatar} alt={user.name} /> : 
            <div className='profile-item--avatar'>
             <ion-icon name="person"></ion-icon>
            </div> }
          <div className='profile-item--name'>{user.name}</div>
        </div> 
      ))}
    </div>
    </>
  );
}