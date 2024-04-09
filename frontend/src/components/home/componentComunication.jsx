import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
const ComponentComunication = () => {
  return (
    <div
      style={{ minHeight: "40vh" }}
      className="grid 
        grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 min-h-full px-2 sm:px-16 bg-white gap-4 bg-zinc-50 items-center"
    >
      <div className="rounded-lg shadow-md  bg-white">
        <div className="p-6 text-center">
          <h2 className="text-2x1 font-semibold">Comunicación</h2>
          <p className="mb-4 text-gray-700 text-justify">
            Comunícate con nosotros a través de nuestros canales oficiales o
            puedes dirigirte a nuestra oficina central ubicada en la Calle 15 de
            Abril entre Junin y Oconnor
          </p>
          <div className="flex w-full items-center justify-center">
            <a
              href="https://wa.me/59176192765?text=Hola%2C%20¿cómo%20puedo%20ayudarte%20hoy%3F"
              className="flex gap-1 text-blue-900 font-bold hover:text-blue-700"
            >
              <WhatsAppIcon
                sx={{
                  color: "#4FCE5D", // Color del ícono
                  "&:hover": {
                    color: "green", // Color al pasar el cursor
                  },
                }}
              ></WhatsAppIcon>
              <p>WhatsApp</p>
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-md  bg-white">
        <div className="p-6 text-center">
          <h2 className="text-2x1 font-semibold">Soporte</h2>
          <p className="mb-4 text-gray-700 text-justify">
            Comunícate con nosotros a través de nuestros canales oficiales o
            puedes dirigirte a nuestra oficina central ubicada en la Calle 15 de
            Abril entre Junin y Oconnor
          </p>
          <div className="flex w-full items-center justify-center">
            <a
              href="mailto:correolivitocabezas@gmail.com?subject=Asunto del mensaje&body=Texto del mensaje"
              className="flex gap-1 text-blue-900 font-bold hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <p>Email</p>
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow-md  bg-white">
        <div className="p-6 text-center">
          <h2 className="text-2x1 font-semibold">Medios de pago</h2>
          <p className="mb-4 text-gray-700 text-justify ">
            Comunícate con nosotros a través de nuestros canales oficiales o
            puedes dirigirte a nuestra oficina central ubicada en la Calle 15 de
            Abril entre Junin y Oconnor
          </p>
          <div className="flex w-full items-center justify-center">
            <a
              href="https://wa.me/59176192765?text=Hola%2C%20¿cómo%20puedo%20ayudarte%20hoy%3F"
              className="flex gap-1 text-blue-900 font-bold hover:text-blue-700"
            >
              <WhatsAppIcon
                sx={{
                  color: "#4FCE5D", // Color del ícono
                  "&:hover": {
                    color: "green", // Color al pasar el cursor
                  },
                }}
              ></WhatsAppIcon>
              <p>WhatsApp</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentComunication;
