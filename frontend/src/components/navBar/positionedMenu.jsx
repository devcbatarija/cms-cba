import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutSession } from "../../redux-toolkit/actions/auth.Actions";
import toast from "react-hot-toast";
import { SuccessAlert } from "../toastAlerts/success";
import { Profile } from "./profileUser";
import axios from "axios";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import LaptopChromebookRoundedIcon from "@mui/icons-material/LaptopChromebookRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

/* ---------- Ítem de menú reutilizable, mismo patrón en toda la app ---------- */
const MenuAction = ({ icon, label, onClick, acento = CBA_NAVY }) => (
  <div
    onClick={onClick}
    className="mx-2 my-0.5 rounded-lg flex items-center gap-3 py-2.5 px-3 text-sm font-medium text-gray-600 cursor-pointer transition-colors duration-200"
    style={{ "--hover-bg": `${acento}0D` }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${acento}0D`)}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
  >
    <span style={{ color: acento }} className="flex items-center">
      {icon}
    </span>
    <span>{label}</span>
  </div>
);

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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
      localStorage.removeItem("user");
      const response = await axios.get("/users/logout");
      dispatch(logoutSession(false));
      toast.custom((t) => (
        <SuccessAlert t={t} w={"w-4/12"} message="Cierre de sesión exitoso" />
      ));
    } catch (error) {}
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
  }, []);

  useEffect(() => {
    if (openProfile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openProfile]);

  return (
    <>
      <div className="relative inline-block" ref={divRef}>
        {authlogin && !authlogin.user._profileImage ? (
          <div
            className="w-[46px] h-[46px] rounded-full text-white font-bold uppercase flex justify-center items-center cursor-pointer"
            style={{
              background: localStorage.getItem("color"),
              border: `2px solid ${CBA_NAVY}`,
            }}
            onClick={toggleDropdown}
          >
            {authlogin.user.nombres[0]}
            {authlogin.user.apellidos[0]}
          </div>
        ) : (
          <Avatar
            id="demo-positioned-button"
            aria-haspopup="true"
            aria-expanded={isOpen ? "true" : undefined}
            onClick={toggleDropdown}
            alt={authlogin.user.correo}
            src={authlogin.user._profileImage}
            className="cursor-pointer"
            sx={{ border: `2px solid ${CBA_NAVY}`, ...styles }}
          />
        )}

        {isOpen && (
          <div className="absolute right-0 z-50 w-64 py-2 mt-3 overflow-hidden origin-top-right bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* Barra de acento superior, mismo patrón del sitio */}
            <div
              className="h-1 w-full -mt-2 mb-2"
              style={{
                background: `linear-gradient(90deg, ${CBA_NAVY} 0%, ${CBA_ROJO} 100%)`,
              }}
            />

            <div className="flex items-center gap-3 px-4 pb-3">
              {authlogin && !authlogin.user._profileImage ? (
                <div
                  className="w-10 h-10 rounded-full text-white font-bold uppercase flex justify-center items-center shrink-0"
                  style={{ background: localStorage.getItem("color") }}
                >
                  {authlogin.user.nombres[0]}
                  {authlogin.user.apellidos[0]}
                </div>
              ) : (
                <img
                  className="shrink-0 object-cover rounded-full w-10 h-10"
                  src={authlogin.user._profileImage}
                  alt={authlogin.user.correo}
                />
              )}
              <div className="min-w-0">
                <h1
                  className="text-sm font-bold truncate"
                  style={{ color: CBA_NAVY }}
                >
                  {authlogin.user.nombres} {authlogin.user.apellidos}
                </h1>
                <p className="text-xs text-gray-500 truncate">
                  {authlogin.user.correo}
                </p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="pt-1">
              <MenuAction
                icon={<PersonRoundedIcon fontSize="small" />}
                label="Ver perfil"
                onClick={() => {
                  setOpenProfile(true);
                  toggleDropdown();
                }}
              />

              {rolUSer.rol && rolUSer.rol == "Admin" ? (
                <>
                  <MenuAction
                    icon={<DashboardRoundedIcon fontSize="small" />}
                    label="Dashboard"
                    acento={CBA_ROJO}
                    onClick={() => navigate("/dashboard")}
                  />
                  <MenuAction
                    icon={<LaptopChromebookRoundedIcon fontSize="small" />}
                    label="Sitio web"
                    onClick={() => navigate("/")}
                  />
                </>
              ) : null}
            </div>

            <hr className="border-gray-100 my-1" />

            <MenuAction
              icon={<HelpOutlineRoundedIcon fontSize="small" />}
              label="Ayuda"
              onClick={() => {}}
            />
            <MenuAction
              icon={<PowerSettingsNewRoundedIcon fontSize="small" />}
              label="Cerrar sesión"
              acento={CBA_ROJO}
              onClick={handleLogout}
            />
          </div>
        )}
      </div>
      {openProfile ? (
        <Profile
          setOpenProfile={setOpenProfile}
          userId={authlogin.user._userId}
          userLogin={authlogin.user}
          openProfile={openProfile}
        ></Profile>
      ) : null}
    </>
  );
};
export default PositionedMenu;