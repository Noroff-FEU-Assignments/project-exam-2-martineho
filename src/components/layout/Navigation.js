import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  NavLink,
  useNavigate,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { clearStorage } from '../../utils/storage';

export default function Navigation() {
  const name = JSON.parse(localStorage.getItem('user_name'));
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
                  <NavLink className='nav-link' to='/profile'>
                    <span className='nav-link--avatar'>N</span>
                    <span className='nav-link--username'>{name}</span>
                  </NavLink>
                  <Button id='logout-btn' className='nav-link--logout' onClick={logout}>
                    <ion-icon className='nav-link--icon' name="log-out-outline"></ion-icon>
                  </Button>
                </Nav>
                <Nav hidden>
                  <NavLink className='nav-link' to='/login'>Sign in</NavLink>
                  <NavLink className='nav-link' to='/register'>Become a member</NavLink>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
		</>
  )
}