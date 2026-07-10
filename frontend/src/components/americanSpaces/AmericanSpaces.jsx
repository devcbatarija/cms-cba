import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import fondoAmbientes from '../../assets/american_fondo.png';
import CuadroInscripcion from "../inscripcion/incripcion";

/* ---------- Paleta institucional CBA ---------- */
const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRIS = "#DEDEDE";

/* ---------- Estilos para renderizar la descripción rich text de forma limpia ---------- */
const richTextPreviewStyles = `
.rich-text-preview p {
  margin: 0 0 4px;
}

.rich-text-preview p:empty,
.rich-text-preview p:has(> br:only-child) {
  display: none;
}

.rich-text-preview a {
  color: var(--accent-color, #D50032);
  text-decoration: underline;
  word-break: break-all;
}

.rich-text-preview strong {
  font-weight: 700;
  color: #1a1a2e;
}
`;

/* ---------- Wrapper de animación al hacer scroll, mismo patrón que EducationUSA/Becas ---------- */
const AlAparecer = ({ children, className = "", retraso = 0 }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            } ${className}`}
            style={{ transitionDelay: `${retraso}ms` }}
        >
            {children}
        </div>
    );
};

const AmericanSpaces = () => {
    const [ambientes, setAmbientes] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAmbientes = async () => {
            try {
                const response = await axios.get("environment");
                setAmbientes(response.data || []);
            } catch (error) {
                console.error("Error al obtener los ambientes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAmbientes();
    }, []);

    return (
        <>
            <style>{richTextPreviewStyles}</style>

            <div>
                <img
                    className="w-full h-auto"
                    src="https://i.ibb.co/5vfhNFc/American-Spaces-Image.png"
                    alt="Capitolio"
                />

                <div className="max-w-6xl mx-auto px-5 md:px-8">
                    <div className="flex flex-wrap items-center">
                        {/* Texto */}
                        <div className="w-full lg:w-2/5 pl-7 pr-7 pt-10 pb-10 md:pb-14 lg:pt-12 lg:pr-10">
                            <AlAparecer>
                                <span
                                    className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3"
                                    style={{ color: CBA_ROJO }}
                                >
                                    Presencia global
                                </span>
                                <h1
                                    className="text-2xl md:text-3xl font-extrabold leading-tight mb-4"
                                    style={{ color: CBA_NAVY }}
                                >
                                    La Oficina de los Espacios Americanos
                                </h1>
                                <div
                                    className="w-10 h-1 rounded-full mb-5"
                                    style={{ backgroundColor: CBA_ROJO }}
                                />
                                <p className="text-justify text-gray-600 leading-relaxed text-[15px]">
                                    Los Espacios Americanos son centros culturales e informativos del
                                    gobierno de EE. UU. en el extranjero que ofrecen acceso gratuito a
                                    información y programas sobre los Estados Unidos. Con más de 600
                                    ubicaciones en 140 países, promueven el entendimiento mutuo y la
                                    asociación a través de eventos, programas y tecnología avanzada.
                                    Estos espacios muestran los valores estadounidenses de innovación,
                                    diversidad y apertura, y fomentan el aprendizaje, la discusión y la
                                    participación cívica.
                                </p>
                            </AlAparecer>
                        </div>

                        {/* Imagen */}
                        <div className="w-full lg:w-3/5 pt-5 pb-10 md:pb-14">
                            <img
                                src="https://i.ibb.co/89MNbCd/download-image-1714419828264.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Sección de ambientes — fondo institucional + tarjetas, misma línea que Becas/EducationUSA ===== */}
            <div className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-20 overflow-hidden">
                <img
                    src={fondoAmbientes}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: `${CBA_NAVY}F2` }}
                />

                <div className="relative">
                    <AlAparecer>
                        <div className="max-w-3xl mx-auto text-center mb-14">
                            <span
                                className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-3"
                                style={{ color: CBA_ROJO }}
                            >
                                Recorrido por el espacio
                            </span>
                            <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
                                Nuestros Ambientes
                            </h2>
                            <div
                                className="w-10 h-1 mx-auto mt-4 mb-5 rounded-full"
                                style={{ backgroundColor: CBA_ROJO }}
                            />
                            <p className="text-white/70 text-[15px] leading-relaxed">
                                Cada rincón del Espacio Americano está pensado para el encuentro,
                                el aprendizaje y el intercambio cultural.
                            </p>
                        </div>
                    </AlAparecer>

                    {loading ? (
                        <p className="text-center text-white/60 italic">Cargando ambientes...</p>
                    ) : ambientes.length === 0 ? (
                        <p className="text-center text-white/60 italic">Aún no hay ambientes cargados.</p>
                    ) : (
                        <div className="max-w-5xl mx-auto flex flex-col gap-8">
                            {ambientes.map((ambiente, i) => {
                                const isEven = i % 2 === 0;
                                const acento = isEven ? CBA_NAVY : CBA_ROJO;
                                const galeria = ambiente.Galleries || [];
                                const portada = galeria[0]?.image;
                                const resto = galeria.slice(1);

                                return (
                                    <AlAparecer key={ambiente.id_Ambiente} retraso={i * 80}>
                                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                            <div
                                                className={`grid grid-cols-1 lg:grid-cols-2 lg:min-h-[440px] ${
                                                    isEven ? "" : "lg:[direction:rtl]"
                                                }`}
                                            >
                                                {/* Imagen principal */}
                                                <div
                                                    className="relative p-4 lg:[direction:ltr]"
                                                >
                                                    {portada ? (
                                                        <div
                                                            className="relative overflow-hidden rounded-xl cursor-pointer group h-64 sm:h-80 lg:h-full lg:min-h-[380px]"
                                                            onClick={() => setSelectedImage(portada)}
                                                        >
                                                            <img
                                                                src={portada}
                                                                alt={ambiente.nombre}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                            />
                                                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-full h-64 sm:h-80 lg:h-full lg:min-h-[380px] bg-[#eef1f6] rounded-xl flex items-center justify-center border border-dashed border-[#c9d2e0]">
                                                            <span className="text-gray-400 text-sm italic">
                                                                Sin fotografías aún
                                                            </span>
                                                        </div>
                                                    )}

                                                    {/* Filmstrip de miniaturas, solo si hay más de una imagen */}
                                                    {resto.length > 0 && (
                                                        <div className="flex gap-2 mt-3">
                                                            {resto.slice(0, 5).map((g) => (
                                                                <img
                                                                    key={g.id_Gallery}
                                                                    src={g.image}
                                                                    alt={ambiente.nombre}
                                                                    onClick={() => setSelectedImage(g.image)}
                                                                    className="w-16 h-16 object-cover rounded-sm cursor-pointer border border-[#e4e7ed] opacity-80 hover:opacity-100 transition-opacity"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Texto del ambiente */}
                                                <div className="w-full p-6 sm:p-10 flex flex-col justify-center lg:[direction:ltr]">
                                                    <span
                                                        className="block text-xs font-bold uppercase tracking-[0.2em] mb-2"
                                                        style={{ color: acento }}
                                                    >
                                                        Ambiente {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <h3
                                                        className="text-2xl font-bold mb-3"
                                                        style={{ color: CBA_NAVY }}
                                                    >
                                                        {ambiente.nombre}
                                                    </h3>
                                                    <div
                                                        className="w-10 h-1 mb-4 rounded-full"
                                                        style={{ backgroundColor: acento }}
                                                    />
                                                    <div
                                                        className="rich-text-preview text-gray-600 leading-relaxed text-[15px] text-justify"
                                                        style={{ "--accent-color": acento }}
                                                        dangerouslySetInnerHTML={{ __html: ambiente.descripcion }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </AlAparecer>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ===== Lightbox ===== */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-[#001529]/95 flex items-center justify-center z-50 px-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-8 right-8 text-white/70 text-3xl font-light hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        &times;
                    </button>
                    <img
                        src={selectedImage}
                        alt="preview"
                        className="max-w-4xl max-h-[82vh] rounded-sm shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
            <CuadroInscripcion />
        </>
    );
};

export default AmericanSpaces;