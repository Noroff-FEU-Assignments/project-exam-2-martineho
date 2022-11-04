import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { clearStorage } from '../../utils/storage';
import { name } from '../../utils/user';

export default function Navigation() {
  const initial = name.substring(0, 1).toUpperCase();
  const navigate = useNavigate();

  const logout = () => {
    clearStorage();
    navigate('/login');
  }

  return ( 
    <>
        <Navbar bg="transparent" expand="lg" className='navbar'>
            <NavLink to="/" className='navbar-brand--link'>
                <Navbar.Brand>Substance</Navbar.Brand>
              </NavLink>
              <Navbar.Toggle aria-controls="navbar" />
              <Navbar.Collapse id="navbar">
                <Nav className="me-auto">
                  <NavLink className='nav-link' to='/'>Feed</NavLink>
                  <NavLink className='nav-link' to='/'>People</NavLink>
                </Nav>
                <Nav>
                  <NavLink className='profile-link' to='/profile'>
                    <div className='profile-link--avatar'>{initial}</div>
                    <div className='profile-link--username'>{name}</div>
                  </NavLink>
                  <Button id='logout-btn' className='nav-link--logout' onClick={logout}>
                    <ion-icon className='nav-link--icon' name="log-out-outline"></ion-icon>
                  </Button>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
		</>
  )
}