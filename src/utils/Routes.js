import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Register from "../pages/Register"
import PrivateRoutes from './PrivateRoutes';
import Navigation from '../components/layout/Navigation';
import Post from '../pages/Post';
import ProfilePage from '../pages/Profiles';
import People from '../pages/People';

export default function AppRoutes () {
  return (
    <>
    <Router>
      <Navigation />
      <Routes>
        <Route element={< PrivateRoutes />}>
          <Route path={'*'} element={ < Dashboard /> }></Route>
          <Route path={'/'} element={< Dashboard />}></Route>
          <Route path={'/people'} element={< People />}></Route>
          <Route path={'/profiles/:name'} element={< ProfilePage /> }></Route>
          <Route path="/post/:id" element={<Post />}></Route>
        </Route>
        <Route path={'*'} element={ < Login /> }></Route>
        <Route path='/login' element={< Login />} />
        <Route path='/register' element={< Register />}></Route>
      </Routes>
    </Router>
  </>
  )

}