import React, { useState } from "react";
import "./inscripcion.css";
import Form from "../formPreregister/form";

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

// TODO: reemplazar por el número real, formato 591XXXXXXXX (sin + ni espacios)
const WHATSAPP_NUMBER = "59164576363";
const WHATSAPP_MENSAJE = encodeURIComponent(
  "Hola, quisiera recibir asesoría gratuita sobre los programas del CBA."
);

const CuadroInscripcion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <section
        className="relative w-full overflow-hidden py-12 md:py-14 px-6 sm:px-10 lg:px-16"
        style={{
          background: `linear-gradient(115deg, ${CBA_ROJO} 0%, #B8002A 55%, ${CBA_NAVY} 130%)`,
        }}
      >
        {/* Decoración: círculos sutiles, look más "diseñado" que un bloque plano */}
        <div
          className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />
        <div
          className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full pointer-events-none"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        />

        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* ---------- Texto ---------- */}
          <div className="max-w-xl">
            <div
              className="w-12 h-1.5 rounded-full mb-4"
              style={{ backgroundColor: "#fff" }}
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
              ¿Estás listo para potenciar tus estudios?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-white/90 font-medium">
              Inscríbete hoy y no dejes pasar esta increíble oportunidad.
            </p>
          </div>

          {/* ---------- Botones ---------- */}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            {/* Botón principal: abre el formulario (misma lógica de siempre)
            <button
              onClick={() => setIsOpen(true)}
              className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
                         font-semibold text-sm sm:text-base bg-white transition-all duration-300
                         hover:shadow-lg"
              style={{ color: CBA_NAVY }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = CBA_NAVY;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.color = CBA_NAVY;
              }}
            >
              Inscribirse
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
             */}

            {/* Botón secundario: WhatsApp, reciclando el estilo del botón "Asesoría gratuita" */}
            
            <a  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MENSAJE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
                         font-semibold text-sm sm:text-base border-2 border-white text-white
                         transition-all duration-300 hover:bg-white"
              onMouseEnter={(e) => (e.currentTarget.style.color = CBA_ROJO)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M12.04 0C5.4 0 .01 5.39.01 12.05c0 2.12.55 4.19 1.6 6.02L0 24l6.09-1.6a11.98 11.98 0 0 0 5.95 1.58h.01c6.64 0 12.03-5.39 12.03-12.05C24.08 5.39 18.68 0 12.04 0Zm0 21.87h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-3.61.95.96-3.52-.24-.36a9.86 9.86 0 0 1-1.51-5.3c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.13 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.9-9.9 9.9Zm5.42-7.42c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.19-.24-.58-.48-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35Z" />
              </svg>
              Asesoría gratuita
            </a>
          </div>
        </div>
      </section>

      {isOpen ? <Form setIsOpen={setIsOpen}></Form> : null}
    </div>
  );
};

export default CuadroInscripcion;