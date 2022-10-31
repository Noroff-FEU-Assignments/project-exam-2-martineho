import './sass/styles.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import PrivateRoutes from './utils/PrivateRoutes';

export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={< PrivateRoutes />}>
          <Route path={'*'} element={ < Dashboard /> }></Route>
          <Route path={'/'} element={< Dashboard />}></Route>
          <Route path={'/profile'} element={ < Profile/> }></Route>
        </Route>
        <Route path={'*'} element={ < Login /> }></Route>
        <Route path='/login' element={< Login />} />
        <Route path='/register' element={< Register />}></Route>
      </Routes>
    </Router>
  </>
  );
}
