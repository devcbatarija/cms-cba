import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/home/home";
import NavBar from "./components/navBar/navBar";
import About from "./components/about/about";
import Login from "./components/auth/auth.login";
import { useEffect } from "react";
import Register from "./components/auth/auth.register";
import { useDispatch, useSelector } from "react-redux";
import Cookie from "js-cookie";
import axios from "axios";
import { authValid } from "./redux-toolkit/actions/auth.Actions";
import Dashboard from "./components/dashboard/dashboard";
import NotFound from "./components/Error/NotFound";
import ProgramTable from './components/dashboard/Programas/ProgramTables';
import PublicationNav from './components/dashboard/Publications/Nav';
import ProgramaNav from './components/dashboard/Programas/Nav';
import TableUser from './components/dashboard/Users/tableUser';
import { getEvents, getEventsPredefinidos } from './redux-toolkit/actions/eventActions';
import { Toaster } from 'react-hot-toast';
import Calendario from './components/dashboard/calendario/calendario';
import CalendarioClient from './components/calendar/calendar'; 
import PodcastDashboard from './components/dashboard/Podcast/PodcastDashboard';  
import ProgramChildren from './components/programs/children';
import TablePublication from './components/dashboard/Publications/PublicationTable'
import ContarinerNewPublication from './components/dashboard/Publications/containerNewPublication';
import Footer from './components/footer/footer';
import { Publications } from './components/publications/publications';
import { TestimoniosContainer } from './components/testimonios/testimoniosContainer';
import ProgramAdults from './components/programs/adults';
import ProgramTeens from './components/programs/teens';
import ContarinerNewEvent from './components/dashboard/calendario/containerEvent';
import EventNav from './components/dashboard/calendario/eventNav';
import EducationUSA from './components/educationUSA/EducationUSA';
import { getAllTestimonio } from "./redux-toolkit/actions/testimonioActions";
import { Podcast } from "./components/multimedia/podcast/podcast";
import ContarinerNewPrograma from "./components/dashboard/Programas/ContainerNewProgram";


function App() {
  const auth = useSelector((state) => state.login.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  // Función para validar el token
  const validToken = async () => {
    const token = Cookie.get("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = {
      validation: "Validation",
    };
    try {
      const response = await axios.post("/users/valid/token", data, config);
      if (response.data.user) {
        dispatch(authValid(response.data.user));
      }
    } catch (error) {
      if (error.response.data.messageError) {
        Cookie.remove("token");
      }
    }
  };

  // Validar el token al cargar la página
  useEffect(() => {
    dispatch(getEvents());
    dispatch(getAllTestimonio());
    dispatch(getEventsPredefinidos());
    if (Cookie.get("token")) {
      validToken();
    }
  }, []);

  // Verificar si estamos en la ruta /dashboard
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!isDashboardRoute && <NavBar />}
      <div className="flex-grow">
        <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/calendar' element={<CalendarioClient />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/programs/children' element={<ProgramChildren />} />
        <Route path='/publications' element={<Publications />} />
        <Route path='/programs/adults' element={<ProgramAdults />} />
        <Route path='/programs/teens' element={<ProgramTeens />} />
        <Route path='/educationUSA' element={<EducationUSA />} />
        <Route path='/podcast' element={<Podcast />} />


            {/* Ruta del dashboard, sin verificación de autenticación */}
            {auth && (
              <Route path="/dashboard" element={<Dashboard></Dashboard>}>
                <Route path="/dashboard/Calendario" element={<EventNav />}>
                  <Route
                    path="/dashboard/Calendario/calendario"
                    element={<Calendario />}
                  />
                  <Route
                    path="/dashboard/Calendario/addEvent"
                    element={<ContarinerNewEvent />}
                  />
                </Route>
                <Route path="/dashboard/publinav" element={<PublicationNav />}>
                  <Route
                    path="/dashboard/publinav/table"
                    element={<TablePublication />}
                  />
                  <Route
                    path="/dashboard/publinav/add"
                    element={<ContarinerNewPublication />}
                  />
                </Route>
                <Route path="/dashboard/program" element={<ProgramaNav />}>
                  <Route
                    path="/dashboard/program/tableprogram"
                    element={<ProgramTable />}
                  />
                  <Route
                    path="/dashboard/program/add"
                    element={<ContarinerNewPrograma />}
                  />
                </Route>
                <Route
                  path="/dashboard/testimononios"
                  element={<TestimoniosContainer />}
                />
                <Route
                  path="/dashboard/tableuser"
                  element={<TableUser></TableUser>}
                />
                <Route
                  path="/dashboard/tableprogram"
                  element={<ProgramTable></ProgramTable>}
                />
                <Route
                  path="/dashboard/spotify/podcast"
                  element={<PodcastDashboard></PodcastDashboard>}
                ></Route>
              </Route>
            )}
            {/* Ruta para manejar páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!isDashboardRoute && <Footer />}
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 1500,
          style: {
            background: "white",
            color: "black",
          },
          error: {
            duration: 1500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          dismiss: {
            duration: 1500,
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
