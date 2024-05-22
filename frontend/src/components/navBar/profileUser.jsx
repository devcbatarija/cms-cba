import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ErrorAlert } from "../toastAlerts/errorAlerts";
import { altBaseUrl_Axios } from "../../services/functions";
import dayjs from "dayjs";

export const Profile = ({ setOpenProfile, userId, openProfile, userLogin }) => {
  const [user, setUser] = useState(null);
  function calculateAge(dateString) {
    const userDate = new Date(dateString);
    const currentDate = new Date();

    const ageInMilliseconds = currentDate - userDate;
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    return Math.floor(ageInYears);
  }
  useEffect(() => {
    const update = async () => {
      if (userLogin.from && userLogin.from === 'CBA PLUS') {
        const response = await axios.get(`${altBaseUrl_Axios.apiplus}/api/v1/std/profile`, {
          headers: {
            'Authorization': `Bearer ${userLogin.accessTokenCbaPlus}`
          }
        })
        if (response.data) {
          setUser(response.data);
        }
        else {
          toast.custom((t) => {
            <ErrorAlert t={t} w={'w-4/12'} message={'Hubo un error al cargar los datos'} />
          })
        }
      }
      else {
        const response = await axios.get(`users/details/${userId}`);
        if (response.data) {
          setUser(response.data.data);
        }
        else {
          toast.custom((t) => {
            <ErrorAlert t={t} w={'w-4/12'} message={'Hubo un error al cargar los datos'} />
          })
        }
      }
    };
    userLogin ? update() : null;
  }, []);
  return (
    <>
      <div className="fixed z-1 inset-0 overflow-y-hidden ">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={() => setOpenProfile(false)}>
          <div className="absolute inset-0 backdrop-blur-sm bg-cbaBlue/20"></div>
        </div>
        <div className="h-screen flex justify-center items-center">
          <div className="h-[500px] w-[700px] bg-zinc-50 transform rounded-xl overflow-hidden relative p-2 shadow-xl m-2">
            <div className={`rounded-xl overflow-hidden h-[30%] w-full relative`}>
              <div
                onClick={() => setOpenProfile(false)}
                className="cursor-pointer z-10 p-1.5 m-1.5 focus:outline-none absolute text-white right-0 hover:shadow-xl rounded-full hover:bg-zinc-100 hover:text-zinc-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="gray"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <span className="absolute z-10 text-white font-bold text-sm font-mono mt-2">Perfil</span>
              <svg className="absolute" preserveAspectRatio="none" xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 1600 800'><rect fill='#004E92' width='1600' height='800' /><g stroke='#000' strokeWidth='100' strokeOpacity='0.05' ><circle fill='#004E92' cx='0' cy='0' r='1800' /><circle fill='#034a8b' cx='0' cy='0' r='1700' /><circle fill='#044584' cx='0' cy='0' r='1600' /><circle fill='#06417e' cx='0' cy='0' r='1500' /><circle fill='#073c77' cx='0' cy='0' r='1400' /><circle fill='#073870' cx='0' cy='0' r='1300' /><circle fill='#07346a' cx='0' cy='0' r='1200' /><circle fill='#073063' cx='0' cy='0' r='1100' /><circle fill='#062c5d' cx='0' cy='0' r='1000' /><circle fill='#062857' cx='0' cy='0' r='900' /><circle fill='#052451' cx='0' cy='0' r='800' /><circle fill='#04204a' cx='0' cy='0' r='700' /><circle fill='#031c44' cx='0' cy='0' r='600' /><circle fill='#02193e' cx='0' cy='0' r='500' /><circle fill='#021539' cx='0' cy='0' r='400' /><circle fill='#021133' cx='0' cy='0' r='300' /><circle fill='#020b2d' cx='0' cy='0' r='200' /><circle fill='#000428' cx='0' cy='0' r='100' /></g></svg>
              <div className="absolute bottom-0 left-[35%] sm:left-[31%] md:left-[29.5%] flex justify-start pb-[2px] sm:pb-1.5">
                {
                  user &&
                  <span className="leading-[20px] text-start font-extrabold uppercase text-sm sm:text-lg text-white">{
                    userLogin.from === 'CBA PLUS' ?
                      `${user.nombre} ${user.paterno} ${user.materno}`
                      : `${user.nombres} ${user.apellidos}`
                  }</span>
                }
              </div>
            </div>
            <div className="flex justify-center  items-center absolute left-[7%] top-[20%] sm:top-[15%]">
              {user && userLogin._profileImage === '' ? (
                <div
                  className="border-[7px] border-white rounded-full w-[100px] h-[100px] text-5xl sm:w-[150px] sm:h-[150px] text-white font-bold uppercase sm:text-[70px] flex justify-center items-center"
                  style={{
                    background: localStorage.getItem("color"),
                  }}
                >
                  <span>{`${user.nombres ? user.nombres[0] : user.nombre[0]}${user.apellidos ? user.apellidos[0] : user.paterno[0]}`}</span>
                </div>
              ) : (
                <Avatar
                  id="demo-positioned-button"
                  // aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                  alt={userLogin.correo}
                  src={user ? userLogin._profileImage : null}
                  sx={{ width: '150px', height: '150px', border: '7px solid white' }}
                />
              )}
            </div>
            <div className="w-full h-[70%] relative">
              <div className="absolute top-0 left-[35%] sm:left-[31%] md:left-[29.5%] flex justify-start">
                <span className="text-start font-extrabold text-xs mt-[2px] sm:text-base ">{userLogin.correo}</span>
              </div>
              <div className="absolute bg-white rounded-xl shadow-md w-full sm:top-[28%] top-[18%] h-[82%] sm:h-[72%] py-4 px-8 flex flex-col items-start">
                <span className="text-zinc-500 font-bold text-sm sm:text-lg">Informacion General</span>
                {
                  user &&
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col items-start text-xs sm:text-sm font-bold mt-2 gap-y-2 text-zinc-500 w-[40%]">
                      <span>Ci:</span>
                      <span>Telefono:</span>
                      {
                        userLogin.from === 'CBA PLUS' ?
                          null : <span>Fecha de nacimiento:</span>
                      }
                    </div>
                    <div className="flex flex-col items-start text-xs sm:text-sm font-semibold mt-2 gap-y-2">
                      <span>{user.ci}</span>
                      <span>{user.celular}</span>
                      {
                        userLogin.from === 'CBA PLUS' ?
                          null : <span>{dayjs(user.fecha_Nacimiento).format('DD [de] MMMM [de] YYYY')}</span>
                      }
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
