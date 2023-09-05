import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
import DemoApp from './components/calendar/calendar';
import Calendario from './components/calendar/calendario';
import Login from './components/auth/auth.login';
import { useEffect } from 'react';
import Register from './components/auth/auth.register';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import axios from 'axios';
import { authValid } from './redux-toolkit/actions/auth.Actions';
import Dashboard from './components/dashboard/dashboard'
import TableUser from './components/dashboard/tableUser';
import { getEvents } from './redux-toolkit/actions/eventActions';
import NotFound from './components/Error/NotFound';

function App() {
  const auth = useSelector((state) => state.login.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const validToken = async () => {
    const token = Cookie.get('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      validation: 'Validation',
    };
    try {
      const response = await axios.post('/users/valid/token', data, config);
      if (response.data.user) {
        dispatch(authValid(response.data.user));
      }
    } catch (error) {
      console.log(error.response.data.messageError);
    }
  }
  const getStates = async () => {
    await dispatch(getEvents());
  }

  useEffect(() => {
    getStates();
    if (Cookie.get('token')) {
      validToken()
    }
  }, [dispatch])
  return (
    <>
      {/* Mostrar NavBar en todas las rutas, excepto en el dashboard */}
      {location.pathname !== '/dashboard' && <NavBar />}
      <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/calendar' element={<DemoApp></DemoApp>}></Route>
      <Route path='/calendario' element={<Calendario></Calendario>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>

      <Route path='/tableuser' element={<TableUser></TableUser>}></Route>
        {/* Ruta del dashboard, sin verificación de autenticación */}
        {/* Ruta para manejar páginas no encontradas */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
  