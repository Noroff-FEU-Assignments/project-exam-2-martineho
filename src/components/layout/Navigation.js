import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { clearStorage } from '../../utils/storage';
import { name } from '../../utils/user';
import { getUsername } from '../../utils/storage';

export default function Navigation() {
  const navigate = useNavigate();
  let authenticated = getUsername();
  const location = useLocation();

  if (authenticated.length === 0) {
    authenticated = false; 
  }

  const logout = () => {
    clearStorage();
    navigate('/login');
  }

  return ( 
    <>
        <Navbar id='navigation-bar' bg="transparent" expand="lg" className='navbar'>
          <Container>
            <NavLink to="/" className='navbar-brand--link'>
                <Navbar.Brand>Substance</Navbar.Brand>
              </NavLink>
              {authenticated && <Navbar.Toggle aria-controls="navbar" /> }
              {authenticated && 
              <Navbar.Collapse id="navbar">
                <Nav className="me-auto">
                  <NavLink className='nav-link' to='/'>Feed</NavLink>
                  <NavLink className='nav-link' to='/'>People</NavLink>
                </Nav>
                <Nav>
                  <NavLink className='profile-link' to='/profile'>
                    <div className='profile-link--avatar'></div>
                    <div className='profile-link--username'>{name}</div>
                  </NavLink>
                  <Button id='logout-btn' className='nav-link--logout' onClick={logout}>
                    <ion-icon className='nav-link--icon' name="log-out-outline"></ion-icon>
                  </Button>
                </Nav>
              </Navbar.Collapse> }
              {!authenticated && 
              <Nav className='non-auth-nav'>
                {location.pathname === '/register' && <NavLink to='/login'>Sign in</NavLink>}
                {location.pathname === '/login' && <NavLink to='/register'>Become a member</NavLink>}
              </Nav> }
            </Container>
          </Navbar>
		</>
  )
}