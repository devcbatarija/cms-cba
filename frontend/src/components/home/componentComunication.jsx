import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import americanFondo from "../../assets/american_fondo.png";

const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";
const FOTO_FONDO = americanFondo;

/* ---------- Icono de email inline, mismo estilo que el resto del sitio ---------- */
const IconoEmail = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.7"
    stroke={color}
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

/* ---------- Icono de tarjeta / pago inline ---------- */
const IconoPago = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.7"
    stroke={color}
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-9-9.75h18A2.25 2.25 0 0 1 21.75 9v6.75a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V9a2.25 2.25 0 0 1 2.25-2.25Z"
    />
  </svg>
);

const tarjetas = [
  {
    id: "comunicacion",
    titulo: "Comunicación",
    descripcion:
      "Comunícate con nosotros a través de nuestros canales oficiales o puedes dirigirte a nuestra oficina central ubicada en la Calle 15 de Abril entre Junín y Oconnor.",
    accion: {
      texto: "WhatsApp",
      href: "https://wa.me/59164576363?text=Hola%2C%20¿cómo%20puedo%20ayudarte%20hoy%3F",
      icono: "whatsapp",
    },
  },
  {
    id: "soporte",
    titulo: "Soporte",
    descripcion:
      "Comunícate con nosotros a través de nuestros canales oficiales o puedes dirigirte a nuestra oficina central ubicada en la Calle 15 de Abril entre Junín y Oconnor.",
    accion: {
      texto: "Email",
      href: "mailto:r.leon@cba.org.bo?subject=Asunto del mensaje&body=Texto del mensaje",
      icono: "email",
    },
  },
  {
    id: "pagos",
    titulo: "Medios de pago",
    descripcion:
      "Comunícate con nosotros a través de nuestros canales oficiales o puedes dirigirte a nuestra oficina central ubicada en la Calle 15 de Abril entre Junín y Oconnor.",
    accion: {
      texto: "WhatsApp",
      href: "https://wa.me/59164576363?text=Hola%2C%20¿cómo%20puedo%20ayudarte%20hoy%3F",
      icono: "whatsapp",
    },
  },
];

const IconoTarjeta = ({ tipo, acento }) => {
  if (tipo === "email") return <IconoEmail color={acento} />;
  if (tipo === "pago") return <IconoPago color={acento} />;
  return (
    <WhatsAppIcon
      sx={{
        color: "#4FCE5D",
        transition: "color 0.2s ease",
      }}
    />
  );
};

const ComponentComunication = () => {
  return (
    <div className="relative">
      <img
        src={FOTO_FONDO}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/60" />

      <section
        className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
          px-4 sm:px-16 py-10 gap-6 items-stretch"
      >
        {tarjetas.map((t, i) => {
        const acento = i % 2 === 0 ? CBA_NAVY : CBA_ROJO;
        return (
          <div
            key={t.id}
            className="group flex flex-col rounded-2xl bg-white shadow-sm border border-gray-100
              transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg overflow-hidden"
            style={{ borderTopWidth: "3px", borderTopColor: acento }}
          >
            <div className="p-7 text-center flex flex-col items-center flex-1">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${acento}1A` }}
              >
                <IconoTarjeta
                  tipo={
                    t.id === "soporte" ? "email" : t.id === "pagos" ? "pago" : "whatsapp"
                  }
                  acento={acento}
                />
              </div>

              <h2 className="text-lg font-bold mb-3" style={{ color: CBA_NAVY }}>
                {t.titulo}
              </h2>

              <p className="mb-5 text-sm text-gray-600 text-justify leading-relaxed flex-1">
                {t.descripcion}
              </p>

              <a
                href={t.accion.href}
                className="inline-flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-full
                  border transition-all duration-200"
                style={{
                  color: acento,
                  borderColor: acento,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = acento;
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = acento;
                }}
              >
                {t.accion.icono === "whatsapp" && (
                  <WhatsAppIcon sx={{ fontSize: 18, color: "inherit" }} />
                )}
                {t.accion.icono === "email" && <IconoEmail color="currentColor" />}
                {t.accion.texto}
              </a>
            </div>
          </div>
        );
        })}
      </section>
    </div>
  );
};

export default ComponentComunication;