import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Dashboard from "../../pages/Dashboard"
import Login from "../../pages/Login"
import Register from "../../pages/Register"
import Profile from "../../pages/Profile"

export default function Navigation() {
  return ( 
    <>
      <Router>
        <Container>
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
                    <span className='nav-link--username'>Name</span>
                  </NavLink>
                  <NavLink className='nav-link' to='/'>
                    <ion-icon className='nav-link--icon' name="log-out-outline"></ion-icon>
                  </NavLink>

                  <NavLink className='nav-link' to='/login'>Sign in</NavLink>
                  <NavLink className='nav-link' to='/register'>Become a member</NavLink>

                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </Container>

        <Routes>
          <Route path='/' element={< Dashboard />}></Route>
          <Route path='/login' element={< Login />}></Route>
          <Route path='/register' element={< Register />}></Route>
          <Route path='/profile' element={< Profile />}></Route>
        </Routes>
      </Router>
		</>
  )
}