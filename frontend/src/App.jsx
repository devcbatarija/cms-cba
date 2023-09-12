import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
import DemoApp from './components/calendar/calendar';
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
import PublicationNav from './components/dashboard/Publications/Nav';
import DashNavbar from './components/dashboard/DashboardNavbar/DashNavbar'; // Importa DashNavbar
import TableUser from './components/dashboard/Users/tableUser';
import { getEvents, getEventsPredefinidos } from './redux-toolkit/actions/eventActions';
import { Toaster } from 'react-hot-toast';
import Calendario from './components/dashboard/calendario/calendario';

function App() {
  const auth = useSelector((state) => state.login.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  // Función para validar el token
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

  // Validar el token al cargar la página
  useEffect(() => {
    dispatch(getEvents());
    dispatch(getEventsPredefinidos());
    if (Cookie.get('token')) {
      validToken();
    }
  }, []);

  // Verificar si estamos en la ruta /dashboard
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {/* Mostrar NavBar en todas las rutas, excepto en el dashboard */}
      {!isDashboardRoute && <NavBar />}
      {isDashboardRoute && <DashNavbar />} {/* Mostrar DashNavbar solo en la ruta /dashboard */}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/calendar' element={<DemoApp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* Ruta del dashboard, sin verificación de autenticación */}
        <Route path='/dashboard' element={<Dashboard></Dashboard>}>
        <Route path='/dashboard/calendario' element={<Calendario />} />
          <Route path='/dashboard/publinav' element={<PublicationNav />} />
          <Route path='/dashboard/tableuser' element={<TableUser></TableUser>}/>
        </Route>
        {/* Ruta para manejar páginas no encontradas */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      {/* <Routes>
        <Route path='/dashboard' element={<PublicationAdd />} />
        </Routes> */}
        <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "white",
            color: "black",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </>
  );
}

export default App;

