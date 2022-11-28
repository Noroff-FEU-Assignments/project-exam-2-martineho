import axios from 'axios';
import { useState, useEffect } from 'react';
import { BASE_URL } from "../../constants/api";
import { token } from '../../utils/user';
import Loading from '../../components/ux/Loading';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import Footer from '../../components/layout/Footer';
import { Heading } from '../../components/layout/Headings';
import BigParagraph from '../../components/layout/Paragraphs';

const url = BASE_URL + 'social/profiles';

function People() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = allUsers.filter((data) => {
      return data.name.search(value) !== -1;
    });
    setFilteredUsers(result);
  }
 
  useEffect(function () {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
		async function getProfiles() {
      try {
        let res = await axios.get(url, config);
        setAllUsers(res.data);
        setFilteredUsers(res.data);
      } catch (err) {
        if (!err?.response) {
          setError(err)       
        } if (err.response.status === 429) {
          setError('An error occured while fetching the data 😥');
        }
      } finally {
          setLoading(false);
      }
    } getProfiles();
	}, []);

  return (
    <>
    <Container className='user-container'>

      <Heading content='Find people' />
      <BigParagraph content='Search for people and friends and follow them!' />

      <div className='search'>
        <Form className="d-flex">
          <InputGroup className="" controlid="formBanner">
              <InputGroup.Text 
                className='input-span'>
                  <ion-icon name="search"></ion-icon>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(event) =>handleSearch(event)}
                />
              </InputGroup>
        </Form>
      </div>

      <main>

      {loading ? <Loading /> : null }
      {error ? <div className='error-text'>{error}</div> : null }

      <div className='user-grid'>
        {filteredUsers.map((user) => (

          <div key={user.name} className='user-item'>
            <a  href={`/profiles/${user.name}`} class='group'>
            {user.avatar ? 
              <img className='user-item--avatar' src={user.avatar} alt={''} /> : 
                <div className='user-item--avatar'>
                  <ion-icon name="person"></ion-icon>
                </div> }
              <div className='user-item--name'>{user.name}</div>
            </a>
            <Button variant='primary' className='user-item--dets'>Follow</Button>
          </div> 

        ))}
      </div>
      </main>
    </Container>
    <Footer />
    </>
  );
}

export default People;