import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { clearStorage } from '../../utils/storage';
import User from '../../utils/user';
import { getUsername } from '../../utils/storage';
import { name } from '../../utils/user';
import Avatar from '../profile/Avatar';
import AvatarPlaceholder from '../profile/AvatarPlaceholder';
import CreatePost from '../features/create/Create';

export default function Navigation() {
  const navigate = useNavigate();
  let authenticated = getUsername();
  const location = useLocation();
  const loggedIn = {name};
  const user = User();

  if (authenticated.length === 0) {
    authenticated = false; 
  }
  if (authenticated === loggedIn) {
    user.name = loggedIn;
  }

  const logout = () => {
    clearStorage();
    navigate('/login');
  }

  return ( 
    <>
        <Navbar id='navigation-bar' bg="transparent" expand="lg" className='navbar'>
          <Container>
            <Link to="/" className='navbar-brand--link'>
                <Navbar.Brand>
                  <span>ae</span>social
                </Navbar.Brand>
              </Link>
              {authenticated && <Navbar.Toggle aria-controls="navbar" /> }
              {authenticated && 
              <Navbar.Collapse id="navbar">
                <Nav className="me-auto">
                  <NavLink className='nav-link' to='/'>Feed</NavLink>
                  <NavLink className='nav-link' to='/people'>People</NavLink>
                </Nav>
                <Nav>
                  <CreatePost />
                  <NavLink className='profile-link' to={`/profiles/${loggedIn.name}`}>
                    {user.avatar ? <Avatar className='avatar--small' src={user.avatar} alt='avatar' /> 
                    : <AvatarPlaceholder className='avatar-placeholder--small' /> }
                    <div className='profile-link--username'>{user.name}</div>
                  </NavLink>
                  <OverlayTrigger
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Logout
                      </Tooltip>
                    }
                  >
                    <button className='nav-button--logout' onClick={logout}>
                      <ion-icon className='nav-link--icon' name="log-out-outline"></ion-icon>
                    </button>
                  </OverlayTrigger>
                </Nav>
              </Navbar.Collapse> }
              {!authenticated && 
              <Nav className='non-auth-nav'>
                {location.pathname === '/register' && <NavLink className='btn btn-secondary' to='/login'>Sign in</NavLink>}
                {location.pathname === '/login' && <NavLink className='btn btn-primary' to='/register'>Become a member</NavLink>}
              </Nav> }
            </Container>
          </Navbar>
		</>
  )
}