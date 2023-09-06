import './App.css';
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
import Dashboard from './components/dashboard/dashboard';
import NotFound from './components/Error/NotFound';

import PublicationAdd from './components/dashboard/Publications/PublicationAdd.jsx';

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

  useEffect(() => {
    if (Cookie.get('token')) {
      validToken();
    }
  }, []);

  return (
    <>
      {/* Mostrar NavBar en todas las rutas, excepto en el dashboard */}
      {<NavBar />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/calendar' element={<DemoApp />} />
        <Route path='/calendario' element={<Calendario />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Ruta del dashboard, sin verificación de autenticación */}
        <Route path='/dashboard' element={<Dashboard></Dashboard>}>
          <Route path='/dashboard/publicaciones' element={<PublicationAdd />} />
          
        </Route>
        {/* Ruta para manejar páginas no encontradas */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      {/* <Routes>
        <Route path='/dashboard' element={<PublicationAdd />} />
        </Routes> */}
    </>
  );
}

export default App;
