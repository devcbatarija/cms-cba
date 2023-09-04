import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
import DemoApp from './components/Calendar/Calendar';
import Calendario from './components/calendar/calendario';
import Login from './components/auth/auth.login';
import { useEffect } from 'react';
import Register from './components/auth/auth.register';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import axios from 'axios';
import { authValid } from './redux-toolkit/actions/auth.Actions';
import { getEvents } from './redux-toolkit/actions/eventActions';
import Dashboard from './components/dashboard/dashboard';
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
      <NavBar />
      {/* Mostrar NavBar en todas las rutas, excepto en el dashboard */}
      {location.pathname !== '/dashboard' && <NavBar />}
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/calendar' element={<DemoApp />}></Route>
        <Route path='/calendario' element={<Calendario />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        {/* Ruta del dashboard, sin verificación de autenticación */}
        <Route path='/dashboard' element={<Dashboard />}></Route>
        {/* Ruta para manejar páginas no encontradas */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
