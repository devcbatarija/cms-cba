import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

/*
 * Antes usábamos un texto superpuesto (etiqueta + título + botón) sobre la
 * imagen central para casos donde la imagen fuera "genérica" sin texto propio.
 * Por ahora está desactivado porque las imágenes del carrusel ya traen su
 * propio diseño y texto. Si más adelante quieres reactivarlo para alguna
 * imagen sin texto, descomenta el bloque marcado abajo y pasa la prop
 * `captions` con el array de datos.
 */
// const CAPTIONS_DEFECTO = [
//   { etiqueta: "CBA Tarija", titulo: "Aprende inglés con nosotros", cta: "Conocer más" },
//   { etiqueta: "Cultura", titulo: "Intercambio y becas culturales", cta: "Conocer más" },
//   { etiqueta: "Comunidad", titulo: "Eventos para toda la familia", cta: "Conocer más" },
// ];

const CarouselHome = ({ multimedia, captions }) => {
  const [current, setCurrent] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const location = useLocation();
  const isHome = location.pathname.startsWith("/dashboard");

  const total = multimedia.length;

  const nextSlide = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }, [total]);

  const prevSlide = () => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  };

  const goTo = (i) => setCurrent(i);

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide, total]);

  if (total === 0) return null;

  const distancia = (index) => {
    let d = index - current;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const estiloSlide = (index) => {
    const d = distancia(index);
    const abs = Math.abs(d);

    if (abs > 2) {
      return {
        transform: `translateX(${d > 0 ? 1 : -1}00%) scale(0.5)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
      };
    }

    const traslado = d * 58;
    const escala = 1 - abs * 0.14;
    const opacidad = 1 - abs * 0.3;

    return {
      transform: `translateX(${traslado}%) scale(${escala}) rotateY(${d * -8}deg)`,
      opacity: opacidad,
      zIndex: 10 - abs,
      filter: abs === 0 ? "none" : "brightness(0.8)",
    };
  };

  return (
    <div
      className="relative w-full py-6 sm:py-8 px-4 sm:px-10 overflow-hidden"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <div
        className="relative h-64 sm:h-80 md:h-96 lg:h-[26rem] xl:h-[30rem] mx-auto max-w-6xl"
        style={{ perspective: "1400px" }}
      >
        {multimedia.map((img, index) => {
          // const cap = captions?.[index] ?? CAPTIONS_DEFECTO[index % CAPTIONS_DEFECTO.length];
          const esCentro = distancia(index) === 0;

          return (
            <div
              key={index}
              onClick={() => !esCentro && goTo(index)}
              className={`absolute inset-0 mx-auto w-[92%] sm:w-[78%] rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ease-out ${
                esCentro ? "cursor-default" : "cursor-pointer"
              }`}
              style={{
                ...estiloSlide(index),
                backgroundImage: `url("${img}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay de texto desactivado por ahora — ver comentario arriba */}
              {/* {esCentro && (
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-7 text-white">
                  ...
                </div>
              )} */}
            </div>
          );
        })}

        {total > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Anterior"
              className={`absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border bg-white/90 backdrop-blur-sm transition-opacity duration-300 ${
                showArrows ? "opacity-100" : "opacity-0 sm:opacity-100"
              }`}
              style={{ borderColor: CBA_NAVY, color: CBA_NAVY }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = CBA_NAVY;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.9)";
                e.currentTarget.style.color = CBA_NAVY;
              }}
            >
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
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              aria-label="Siguiente"
              className={`absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 flex items-center justify-center rounded-full border bg-white/90 backdrop-blur-sm transition-opacity duration-300 ${
                showArrows ? "opacity-100" : "opacity-0 sm:opacity-100"
              }`}
              style={{ borderColor: CBA_NAVY, color: CBA_NAVY }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = CBA_NAVY;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.9)";
                e.currentTarget.style.color = CBA_NAVY;
              }}
            >
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
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {multimedia.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Ir a la imagen ${index + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: index === current ? "22px" : "8px",
                height: "8px",
                backgroundColor: index === current ? CBA_ROJO : "#D1D5DB",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarouselHome;