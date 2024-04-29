import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSession } from "../../redux-toolkit/actions/auth.Actions";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { SuccessAlert } from "../toastAlerts/success";
import { Profile } from "./profileUser";
import axios from 'axios'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LaptopChromebookRoundedIcon from '@mui/icons-material/LaptopChromebookRounded';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';

const PositionedMenu = ({ altImg, srcImg, styles, nombres, apellidos }) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const divRef = useRef(null);

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const dispatch = useDispatch(false);
  const navigate = useNavigate();
  const rolUSer = useSelector((state) => state.login.user);
  const authlogin = useSelector((state) => state.login);
  const [openProfile, setOpenProfile] = useState(false);
  const handleLogout = async () => {
    try {
      navigate("/");
      const response = await axios.get('/users/logout')
      console.log(response);
      dispatch(logoutSession(false));
      toast.custom((t) => (
        <SuccessAlert t={t} w={"w-4/12"} message="Cierre de sesión exitoso" />
      ));
    } catch (error) {
      console.log(error);
    }
  };
  const aleatorios = async () => {
    const colors = ["#d59bf6", "#ffc93c", "#42b883", "#cca8e9"];
    const matrandom = Math.floor(Math.random() * 4);
    const localColor = await localStorage.getItem("color");
    if (localColor == null) {
      localStorage.setItem("color", colors[matrandom]);
    }
    const localColorR = await localStorage.getItem("color");
    return localColorR;
  };
  useEffect(() => {
    aleatorios();
  }, [])

  useEffect(() => {
    if (openProfile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [openProfile]);

  return (
    <>
      <div className="relative inline-block" ref={divRef} >
        {/* Dropdown toggle button */}

        {authlogin && !authlogin.user._profileImage ? (
          <div
            className="border p-2 rounded-[50%] 
          w-[50px] h-[50px] text-white font-bold uppercase flex justify-center items-center"
            style={{
              background: localStorage.getItem("color"),
            }}
            onClick={toggleDropdown}
          >
            {authlogin.user.nombres[0]}
            {authlogin.user.apellidos[0]}
          </div>
        ) : (
          <Avatar
            id="demo-positioned-button"
            aria-controls={isOpen ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
            onClick={toggleDropdown}
            alt={authlogin.user.correo}
            src={authlogin.user._profileImage}
            style={styles}
          />
        )}
        {/* Dropdown menu */}
        {isOpen && (
          <div
            className="absolute right-0 z-20 w-60 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800"
          >
            <div className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">

              {authlogin && !authlogin.user._profileImage ? (
                <div
                  className="border p-2 rounded-full
                  w-9 h-9 text-white font-bold uppercase flex justify-center items-center mx-1 flex-shrink-0"
                  style={{
                    background: localStorage.getItem("color"),
                  }}
                >
                  {authlogin.user.nombres[0]}
                  {authlogin.user.apellidos[0]}
                </div>
              ) : (
                <img className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" src={authlogin.user._profileImage} alt={authlogin.user.correo} />
              )}

              <div className="mx-1">
                <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-start">{authlogin.user.nombres} {authlogin.user.apellidos}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all">{authlogin.user.correo}</p>
              </div>
            </div>
            <hr className="border-gray-200 dark:border-gray-700" />

            <div onClick={() => {
              setOpenProfile(true)
              toggleDropdown()
            }} className="m-1.5 rounded-md flex items-center py-2 px-4 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
              <span className="mx-1 ml-5">
                Ver perfil
              </span>
            </div>

            {/* Opciones para el administrador */}
            {rolUSer.rol && rolUSer.rol == "Admin" ? (
              <>
                <div onClick={() => navigate("/dashboard")} className="m-1.5 rounded-md flex items-center py-2 px-4 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <DashboardRoundedIcon />
                  <span className="mx-1 ml-5">
                    Dashboard
                  </span>
                </div>
                <div onClick={() => navigate("/")} className="m-1.5 rounded-md flex items-center py-2 px-4 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                  <LaptopChromebookRoundedIcon />
                  <span className="mx-1 ml-5">
                    Sitio web
                  </span>
                </div>
              </>
            ) : null}
            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="m-1.5 rounded-md flex items-center py-2 px-4 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              <HelpOutlineRoundedIcon />
              <span className="mx-1 ml-5">
                Ayuda
              </span>
            </div>
            <div onClick={handleLogout} className="m-1.5 rounded-md flex items-center py-2 px-4 text-sm text-gray-600  transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
              <PowerSettingsNewRoundedIcon />
              <span className="mx-1 ml-5">
                Cerrar sesion
              </span>
            </div>
          </div>
        )}
      </div>
      {openProfile ? (
        <Profile
          setOpenProfile={setOpenProfile}
          userId={authlogin.user._userId}
          openProfile={openProfile}
        ></Profile>
      ) : null}
    </>
  );
};
export default PositionedMenu;  
