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
import { useEffect, useState } from "react";
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
import ProgramaPrecios from "./components/dashboard/Programas/ProgramPrices";
import GalleryContainer from "./components/americanSpaces/Gallery360/GalleryContainer";
import { getAllProgram } from "./redux-toolkit/actions/programActions";
import { getAllProgramPrices } from "./redux-toolkit/actions/programPricesActions";
import GalleryNav from "./components/dashboard/Gallery360/Navegacion";
import GalleryAddComponent from "./components/dashboard/Gallery360/GalleryAdd";
import GalleryTable from "./components/dashboard/Gallery360/GalleryTable";
import AmbienteAddComponent from "./components/dashboard/Gallery360/AmbienteAdd";
import TestimonioNav from "./components/dashboard/Testimonios/Nav";
import TestimonioTable from "./components/dashboard/Testimonios/TestimoniosTable";

function App() {
  const auth = useSelector((state) => state.login.auth);
  const rol = useSelector((state) => state.login.user.rol);
  const [tokenValidated, setTokenValidated] = useState(false);

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
      setTokenValidated(true);
      console.log(tokenValidated);
    } catch (error) {
      if (error.response.data.messageError) {
        setTokenValidated(true);
        Cookie.remove("token");
      }
    }
  };
  const ValidateRedir = ({ auth, validate, redirecTo, children }) => {
    //RUTAS REDIRECT
    if (auth && validate) {
      return <Navigate to={redirecTo}></Navigate>;
    }
    if (!auth) return children;
  };

  const ProtectedRouteRoles = ({ rol, auth, validate, children }) => {
    if (auth && rol == "Admin" && validate) {
      return children;
    }
    if (validate) return <Navigate to={"/"}></Navigate>;
  };

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getAllTestimonio());
    dispatch(getEventsPredefinidos());
    dispatch(getAllProgram());
    dispatch(getAllProgramPrices());

    if (Cookie.get("token")) {
      validToken();
    }
  }, []);

  // Verificar si estamos en la ruta /dashboard
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const isLoginRoute = location.pathname === "/login";
  const isRegisterRoute = location.pathname === "/register";

  return (
    <>
      {/* min-h-screen */}
      <div className="flex flex-col ">
        {!isDashboardRoute && !isLoginRoute && !isRegisterRoute && <NavBar />}
        <div className="flex-grow min-h-[50vh]">
          <Routes>
            <Route exact index path="/" element={<Home />} />
            <Route path="/about" element={<About />}></Route>
            <Route path="/calendar" element={<CalendarioClient />} />
            {
              <Route
                path="/login"
                element={
                  <ValidateRedir
                    auth={auth}
                    validate={tokenValidated}
                    redirecTo={"/"}
                  >
                    <Login />
                  </ValidateRedir>
                }
              />
            }
            <Route
              path="/register"
              element={
                <ValidateRedir
                  auth={auth}
                  validate={tokenValidated}
                  redirecTo={"/"}
                >
                  <Register />
                </ValidateRedir>
              }
            />
            <Route path="/programs/children" element={<ProgramChildren />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/programs/adults" element={<ProgramAdults />} />
            <Route path="/programs/teens" element={<ProgramTeens />} />
            <Route path="/educationUSA" element={<EducationUSA />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/americanSpaces" element={<GalleryContainer />} />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteRoles
                  rol={rol}
                  auth={auth}
                  validate={tokenValidated}
                >
                  <Dashboard />
                </ProtectedRouteRoles>
              }
            >
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
                path="/dashboard/spaces"
                element={
                    <GalleryNav />
                }
              >
                <Route
                  path="/dashboard/spaces/ambienteadd"
                  element={
                      <AmbienteAddComponent />
                  }
                />
                <Route
                  path="/dashboard/spaces/imageadd"
                  element={
                      <GalleryAddComponent />
                  }
                />
                <Route
                  path="/dashboard/spaces/table"
                  element={
                      <GalleryTable />
                  }
                />
              </Route>
              <Route
                path="/dashboard/testimononios"
                element={<TestimoniosContainer />}
              />


              <Route path="/dashboard/testimonio" element={<TestimonioNav />}>
                <Route
                  path="/dashboard/testimonio/table"
                  element={<TestimonioTable />}
                />
                <Route
                  path="/dashboard/testimonio/add"
                  element={<TestimoniosContainer />}
                />
              </Route>

              ///
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
              <Route
                path="/dashboard/program/precio"
                element={<ProgramaPrecios></ProgramaPrecios>}
              ></Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {!isDashboardRoute && !isLoginRoute && !isRegisterRoute && <Footer />}
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
