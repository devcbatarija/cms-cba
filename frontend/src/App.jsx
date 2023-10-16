import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import ProgramTable from "./components/dashboard/Programas/ProgramTables";
import PublicationNav from "./components/dashboard/Publications/Nav";
import ProgramaNav from "./components/dashboard/Programas/Nav";
import TableUser from "./components/dashboard/Users/tableUser";
import {
  getEvents,
  getEventsPredefinidos,
} from "./redux-toolkit/actions/eventActions";
import { Toaster } from "react-hot-toast";
import Calendario from "./components/dashboard/calendario/calendario";
import CalendarioClient from "./components/calendar/calendar";
import PodcastDashboard from "./components/dashboard/Podcast/PodcastDashboard";
import ProgramChildren from "./components/programs/children";
import TablePublication from "./components/dashboard/Publications/PublicationTable";
import ContarinerNewPublication from "./components/dashboard/Publications/containerNewPublication";
import Footer from "./components/footer/footer";
import { Publications } from "./components/publications/publications";
import { TestimoniosContainer } from "./components/testimonios/testimoniosContainer";
import ProgramAdults from "./components/programs/adults";
import ProgramTeens from "./components/programs/teens";
import ContarinerNewEvent from "./components/dashboard/calendario/containerEvent";
import EventNav from "./components/dashboard/calendario/eventNav";
import EducationUSA from "./components/educationUSA/EducationUSA";
import { getAllTestimonio } from "./redux-toolkit/actions/testimonioActions";
import { Podcast } from "./components/multimedia/podcast/podcast";
import ContarinerNewPrograma from "./components/dashboard/Programas/ContainerNewProgram";
import { getPodcastSongs } from "./redux-toolkit/actions/podcastActions";

function App() {
  const auth = useSelector((state) => state.login.auth);
  const rol = useSelector((state) => state.login.user.rol);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
  const ProtectedRoute = ({ children }) => {
    //RUTAS POTEGIDAS
    if (!auth) {
      return <Navigate to={"/login"}></Navigate>;
    }
    return children;
  };
  const ProtectedRouteRoles = ({ children }) => {
    //RUTAS POTEGIDAS
    if(auth && rol=="Admin") {
      return children;
    } 
    return <Navigate to={"/"}></Navigate>;
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
    {/* min-h-screen */}
      <div className="flex flex-col">
        {!isDashboardRoute && <NavBar />}
        <div className="flex-grow">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/calendar" element={<CalendarioClient />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/programs/children" element={<ProgramChildren />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/programs/adults" element={<ProgramAdults />} />
            <Route path="/programs/teens" element={<ProgramTeens />} />
            <Route path="/educationUSA" element={<EducationUSA />} />
            <Route path="/podcast" element={<Podcast />} />
            {/* Protected */}
            <Route path="/dashboard" element={<ProtectedRouteRoles><Dashboard></Dashboard></ProtectedRouteRoles>}>
              <Route path="/dashboard/Calendario" element={<ProtectedRouteRoles><EventNav /></ProtectedRouteRoles>}>
                <Route
                  path="/dashboard/Calendario/calendario"
                  element={<ProtectedRouteRoles><Calendario /></ProtectedRouteRoles>}
                />
                <Route
                  path="/dashboard/Calendario/addEvent"
                  element={<ProtectedRouteRoles><ContarinerNewEvent /></ProtectedRouteRoles>}
                />
              </Route>
              <Route path="/dashboard/publinav" element={<ProtectedRouteRoles><PublicationNav /></ProtectedRouteRoles>}>
                <Route
                  path="/dashboard/publinav/table"
                  element={<ProtectedRouteRoles><TablePublication /></ProtectedRouteRoles>}
                />
                <Route
                  path="/dashboard/publinav/add"
                  element={<ProtectedRouteRoles><ContarinerNewPublication /></ProtectedRouteRoles>}
                />
              </Route>
              <Route path="/dashboard/program" element={<ProtectedRouteRoles><ProgramaNav /></ProtectedRouteRoles>}>
                <Route
                  path="/dashboard/program/tableprogram"
                  element={<ProtectedRouteRoles><ProgramTable /></ProtectedRouteRoles>}
                />
                <Route
                  path="/dashboard/program/add"
                  element={<ProtectedRouteRoles><ContarinerNewPrograma /></ProtectedRouteRoles>}
                />
              </Route>
              <Route
                path="/dashboard/testimononios"
                element={<ProtectedRouteRoles><TestimoniosContainer /></ProtectedRouteRoles>}
              />
              <Route
                path="/dashboard/tableuser"
                element={<ProtectedRouteRoles><TableUser></TableUser></ProtectedRouteRoles>}
              />
              <Route
                path="/dashboard/tableprogram"
                element={<ProtectedRouteRoles><ProgramTable></ProgramTable></ProtectedRouteRoles>}
              />
              <Route
                path="/dashboard/spotify/podcast"
                element={<ProtectedRouteRoles><PodcastDashboard></PodcastDashboard></ProtectedRouteRoles>}
              ></Route>
            </Route>
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
