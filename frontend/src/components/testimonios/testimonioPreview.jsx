import { Avatar } from "@mui/material";
import React from "react";

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

export const TestimonioPreview = ({ testimonios, nombre, apellidos, cargo, comentario, imagen, type }) => {

  const renderDescription = () => {
    return {
      __html: comentario.replace(/\n/g, "<br>"),
    };
  };

  return (
    <div
      className={`flex w-full ${
        type == "Home"
          ? "sm:w-8/12 md:w-7/12 lg:w-6/12 xl:w-6/12 2xl:w-5/12"
          : ""
      } px-4`}
    >
      <div
        style={{ minHeight: "30vh" }}
        className="relative flex flex-col w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
      >
        {/* Barra de acento superior, igual patrón que el resto del sitio */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${CBA_NAVY} 0%, ${CBA_ROJO} 100%)`,
          }}
        />

        <div className="flex flex-col flex-1 p-6 sm:p-8">
          {/* ---------- Comentario con badge de comillas circular ---------- */}
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${CBA_NAVY}14` }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z"
                  fill={CBA_NAVY}
                />
              </svg>
            </div>
            <blockquote className="flex-1">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                <em dangerouslySetInnerHTML={renderDescription()}></em>
              </p>
            </blockquote>
          </div>

          {/* Separador con acento, mismo patrón que headers de sección */}
          <div
            className="w-10 h-0.5 rounded-full my-5"
            style={{ backgroundColor: CBA_ROJO }}
          />

          {/* ---------- Autor ---------- */}
          <div className="flex items-center gap-3 mt-auto">
            <Avatar
              src={imagen}
              className="shrink-0"
              sx={{
                width: 48,
                height: 48,
                border: `2px solid ${CBA_NAVY}`,
              }}
            />
            <div className="flex flex-col min-w-0">
              <h1
                className="font-bold text-sm truncate"
                style={{ color: CBA_NAVY }}
              >
                {nombre + " " + apellidos}
              </h1>
              <span
                className="inline-block w-fit text-[11px] font-semibold uppercase tracking-wide mt-1 px-2.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${CBA_ROJO}14`, color: CBA_ROJO }}
              >
                {type == "Home"
                  ? cargo
                  : testimonios.cargo == "Otro"
                  ? testimonios.cargoTwo
                  : cargo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};