import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ErrorAlert } from "../toastAlerts/errorAlerts";
import { altBaseUrl_Axios } from "../../services/functions";
import dayjs from "dayjs";

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

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
      if (userLogin.from && userLogin.from === "CBA PLUS") {
        const response = await axios.get(
          `${altBaseUrl_Axios.apiplus}/api/v1/std/profile`,
          { headers: { Authorization: `Bearer ${userLogin.accessTokenCbaPlus}` } }
        );
        if (response.data) {
          setUser(response.data);
        } else {
          toast.custom((t) => (
            <ErrorAlert t={t} w={"w-4/12"} message={"Hubo un error al cargar los datos"} />
          ));
        }
      } else {
        const response = await axios.get(`users/details/${userId}`);
        if (response.data) {
          setUser(response.data.data);
        } else {
          toast.custom((t) => (
            <ErrorAlert t={t} w={"w-4/12"} message={"Hubo un error al cargar los datos"} />
          ));
        }
      }
    };
    userLogin ? update() : null;
  }, []);

  return (
    <>
      <div className="fixed z-50 inset-0 overflow-y-hidden">
        <div
          className="fixed inset-0 transition-opacity"
          aria-hidden="true"
          onClick={() => setOpenProfile(false)}
        >
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
        </div>
        <div className="h-screen flex justify-center items-center px-2">
          <div className="h-[500px] w-[700px] max-w-full bg-zinc-50 rounded-2xl overflow-hidden relative shadow-2xl">
            {/* ---------- Header con degradado institucional ---------- */}
            <div
              className="h-[30%] w-full relative"
              style={{
                background: `linear-gradient(120deg, ${CBA_NAVY} 0%, #013e7d 55%, ${CBA_ROJO} 145%)`,
              }}
            >
              <div
                onClick={() => setOpenProfile(false)}
                className="cursor-pointer z-10 p-2 m-2 absolute right-0 rounded-full text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
              <span className="absolute z-10 text-white/80 font-semibold text-xs uppercase tracking-wide top-3 left-6">
                Perfil
              </span>

              <div className="absolute bottom-0 left-[35%] sm:left-[31%] md:left-[29.5%] flex justify-start pb-1.5">
                {user && (
                  <span className="leading-[20px] text-start font-extrabold uppercase text-sm sm:text-lg text-white">
                    {userLogin.from === "CBA PLUS"
                      ? `${user.nombre} ${user.paterno} ${user.materno}`
                      : `${user.nombres} ${user.apellidos}`}
                  </span>
                )}
              </div>
            </div>

            {/* ---------- Avatar flotante ---------- */}
            <div className="flex justify-center items-center absolute left-[7%] top-[20%] sm:top-[15%]">
              {user && userLogin._profileImage === "" ? (
                <div
                  className="border-[6px] border-white rounded-full w-[100px] h-[100px] text-4xl sm:w-[150px] sm:h-[150px] text-white font-bold uppercase sm:text-[64px] flex justify-center items-center shadow-lg"
                  style={{ background: localStorage.getItem("color") }}
                >
                  <span>
                    {`${user.nombres ? user.nombres[0] : user.nombre[0]}${
                      user.apellidos ? user.apellidos[0] : user.paterno[0]
                    }`}
                  </span>
                </div>
              ) : (
                <Avatar
                  id="demo-positioned-button"
                  aria-haspopup="true"
                  alt={userLogin.correo}
                  src={user ? userLogin._profileImage : null}
                  sx={{ width: "150px", height: "150px", border: "6px solid white", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
                />
              )}
            </div>

            {/* ---------- Cuerpo ---------- */}
            <div className="w-full h-[70%] relative">
              <div className="absolute top-0 left-[35%] sm:left-[31%] md:left-[29.5%] flex justify-start">
                <span className="text-start font-bold text-xs mt-[2px] sm:text-sm text-gray-500">
                  {userLogin.correo}
                </span>
              </div>

              <div className="absolute bg-white rounded-2xl shadow-sm border border-gray-100 w-[calc(100%-2rem)] mx-4 sm:top-[28%] top-[18%] h-[calc(82%-1rem)] sm:h-[calc(72%-1rem)] py-5 px-8 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-1.5 h-5 rounded-full"
                    style={{ backgroundColor: CBA_ROJO }}
                  />
                  <span className="font-bold text-sm sm:text-base" style={{ color: CBA_NAVY }}>
                    Información General
                  </span>
                </div>
                {user && (
                  <div className="flex flex-row w-full mt-3">
                    <div className="flex flex-col items-start text-xs sm:text-sm font-semibold gap-y-3 text-gray-400 w-[40%]">
                      <span>Ci:</span>
                      <span>Teléfono:</span>
                      {userLogin.from === "CBA PLUS" ? null : (
                        <span>Fecha de nacimiento:</span>
                      )}
                    </div>
                    <div className="flex flex-col items-start text-xs sm:text-sm font-bold gap-y-3 text-gray-700">
                      <span>{user.ci}</span>
                      <span>{user.celular}</span>
                      {userLogin.from === "CBA PLUS" ? null : (
                        <span>
                          {dayjs(user.fecha_Nacimiento).format(
                            "DD [de] MMMM [de] YYYY"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};