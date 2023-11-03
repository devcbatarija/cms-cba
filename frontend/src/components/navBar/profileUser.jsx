import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export const Profile = ({ setOpenProfile, userId }) => {
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
      const response = await axios.get(`users/details/${userId}`);
      if (response.data) {
        setUser(response.data.data);
      }
    };
    userId ? update() : null;
  }, []);
  return (
    <div className="fixed z-1 inset-0 overflow-y-hidden">
      <div
        className="flex justify-center pt-1 px-1 pb-20 text-center sm:block sm:p-0"
      >
        <div className="fixed inset-0 transition-opacity" ariaHidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden 
        transform transition-all  w-full  sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="w-full flex justify-between items-center pt-2">
            <div className="mx-auto">
              <h2 className="mt-1 text-lg font-semibold text-cbaBlue md:text-2xl dark:sm:text-white">
                Perfil de usuario
              </h2>
            </div>
            <button
              onClick={() => setOpenProfile(false)}
              className="py-2 px-4 focus:outline-none"
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
            </button>
          </div>
          <div className="bg-white rounded px-2 pt-6 pb-2 mb-1 overflow-y-auto max-h-[500px]">
            <div className="flex flex-col justify-content items-center w-full">
              {user && !user.image ? (
                <div
                  className="border p-2 rounded-[50%] 
          w-[50px] h-[50px] text-white font-bold uppercase text-2xl"
                  style={{
                    background: localStorage.getItem("color"),
                  }}
                >
                  {user.nombres[0]}
                  {user.apellidos[0]}
                </div>
              ) : (
                <Avatar
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  alt={user ? user.correo : null}
                  src={user ? user.image : null}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "20px",
                  }}
                />
              )}
            </div>
            <p className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Nombres: {user ? user.nombres : null}
            </p>
            <p className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Apellidos: {user ? user.apellidos : null}
            </p>
            <p className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Celular: {user ? user.celular : null}
            </p>
            <p className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Email: {user ? user.correo : null}
            </p>
            <p className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Edad: {user ? calculateAge(user.fecha_Nacimiento) : null}
            </p>
            <p className="appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              Rol: {user ? user.rol : null}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
