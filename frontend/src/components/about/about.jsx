import { useEffect, useRef, useState } from 'react';
import americanFondo from '../../assets/american_fondo.png';
import fotoMision from '../../assets/mision.png';
import fotoVision from '../../assets/vision.png';

const valores = [
    {
        id: 1,
        valor: "Excelencia",
        descripcion: "Orientamos nuestras labores institucionales buscando la excelencia en la enseñanza del idioma inglés y en la interrelación personal con nuestros estudiantes.",
        icono: 'estrella',
    },
    {
        id: 2,
        valor: "Integridad",
        descripcion: "Nos caracterizamos por tener principios de honestidad, transparencia, equidad y justicia en todo el trabajo que realizamos. El cumplimiento de las leyes, de las normas educativas bolivianas e internas es lo que caracteriza el trabajo que realizamos.",
        icono: 'escudo',
    },
    {
        id: 3,
        valor: "Compromiso",
        descripcion: "Estamos comprometidos en brindar un trabajo que satisfaga los necesidades y deseos de nuestros clientes por encima de sus expectativas ofreciendo servicios integrales académicos y culturales de calidad.",
        icono: 'manos',
    },
    {
        id: 4,
        valor: "Respeto",
        descripcion: "El trabajo en equipo de las actividades y tareas que realizamos están sobre la base de la confianza, compromiso, sinceridad, eficacia y respeto por los demás.",
        icono: 'corazon',
    },
    {
        id: 5,
        valor: "Innovación",
        descripcion: "Estamos siempre atentos a las innovaciones tecnológicas para aprovechar las oportunidades en la implementación de métodos modernos y creativos en relación a la enseñanza.",
        icono: 'bombilla',
    },
    {
        id: 6,
        valor: "Solidaridad",
        descripcion: "Estamos comprometidos a brindar nuestro apoyo y desarrollo a la comunidad a través de nuestro programa de American Leaders y el servicio social que realizamos.",
        icono: 'personas',
    }
];

const CBA_ROJO = '#D50032';
const CBA_NAVY = '#002E5F';
const CBA_GRIS = '#DEDEDE';

/* ---------- Iconos SVG inline (sin librerías, peso mínimo) ---------- */
const Icono = ({ tipo }) => {
    const p = {
        viewBox: '0 0 24 24', width: 26, height: 26, fill: 'none',
        stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round',
    };
    switch (tipo) {
        case 'estrella':
            return <svg {...p}><path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3.5z" /></svg>;
        case 'escudo':
            return <svg {...p}><path d="M12 3l7 3v5c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></svg>;
        case 'manos':
            return <svg {...p}><path d="M7 12.5l2.5 2.5 3-3M3.5 11.5l3-3 3 3M14.5 8.5l3 3 3-3" /><path d="M7 12.5c0 3 2.5 5.5 5.5 5.5s5.5-2.5 5.5-5.5" /></svg>;
        case 'corazon':
            return <svg {...p}><path d="M12 20s-7-4.3-9.3-8.7C1.4 8.5 2.6 5.4 5.6 4.6 7.7 4 9.8 5 12 7.5 14.2 5 16.3 4 18.4 4.6c3 .8 4.2 3.9 2.9 6.7C19 15.7 12 20 12 20z" /></svg>;
        case 'bombilla':
            return <svg {...p}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-3 11.2c.4.3.6.7.6 1.3v.5h4.8v-.5c0-.5.2-1 .6-1.3A6 6 0 0 0 12 3z" /></svg>;
        case 'personas':
            return <svg {...p}><circle cx="8.5" cy="8" r="2.6" /><circle cx="16" cy="9" r="2.2" /><path d="M3 19c0-2.8 2.5-5 5.5-5s5.5 2.2 5.5 5" /><path d="M14.5 14.3c2.5.3 4.5 2.2 4.5 4.7" /></svg>;
        default:
            return null;
    }
};

/* ---------- Wrapper liviano para animar al entrar en viewport ---------- */
const AlAparecer = ({ children, className = '', retraso = 0 }) => {
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
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${className}`}
            style={{ transitionDelay: `${retraso}ms` }}
        >
            {children}
        </div>
    );
};

/**
 * Recuadro Misión/Visión: ASIMÉTRICO, como en el boceto de referencia —
 * la columna de texto es más angosta (2/5) y la de la foto más ancha (3/5).
 * Tarjeta con bordes redondeados y sombra, más una barrita de acento
 * roja sobre el título. `imagenAIzquierda` decide el orden (alterna
 * como en el boceto: bloque 1 = texto izq/foto der, bloque 2 = foto izq/texto der).
 */
const BloqueInstitucional = ({ imagenAIzquierda, fotoPersona, titulo, texto, fondoPanel }) => {
    const Imagen = (
        <div className="relative h-[220px] md:h-full md:col-span-3 overflow-hidden">
            <img
                src={fotoPersona}
                alt={titulo}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
    );

    const Panel = (
        <div
            className="h-full md:col-span-2 flex flex-col justify-center gap-4 px-7 sm:px-9 md:px-10 py-9"
            style={{ backgroundColor: fondoPanel }}
        >
            <div className="w-10 h-1 rounded-full" style={{ backgroundColor: CBA_ROJO }} />
            <h2 className="text-xl md:text-2xl font-bold" style={{ color: CBA_NAVY }}>
                {titulo}
            </h2>
            <p className="text-sm md:text-[15px] leading-relaxed text-gray-700 text-justify">
                {texto}
            </p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 md:h-[380px] rounded-2xl shadow-lg border border-gray-100 overflow-hidden bg-white">
            {imagenAIzquierda ? (
                <>{Panel}{Imagen}</>
            ) : (
                <>{Imagen}{Panel}</>
            )}
        </div>
    );
};


const FOTO_FONDO = americanFondo;
const FOTO_MISION = fotoMision;
const FOTO_VISION = fotoVision;

const About = () => {
    return (
        <div className="bg-white">

            {/* ---------- MISION / VISION, con el fondo institucional detrás ---------- */}
            <div className="relative">
                {/* Fondo institucional compartido */}
                <img
                    src={FOTO_FONDO}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Capa blanca que atenúa el fondo para que no compita con las tarjetas */}
                <div className="absolute inset-0 bg-white/40" />

                <div className="relative max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16 space-y-8">
                    <AlAparecer>
                        <BloqueInstitucional
                            imagenAIzquierda={true}
                            fotoPersona={FOTO_MISION}
                            titulo="Nuestra Misión"
                            texto="Somos un centro binacional que busca el desarrollo social, integral y cultural de nuestros estudiantes a través de la enseñanza del idioma inglés, para el acceso a mejores oportunidades de vida contribuyendo con excelencia a la comunidad."
                            fondoPanel="#FFFFFF"
                        />
                    </AlAparecer>

                    <AlAparecer retraso={100}>
                        <BloqueInstitucional
                            imagenAIzquierda={false}
                            fotoPersona={FOTO_VISION}
                            titulo="Nuestra Visión"
                            texto="Ser el centro binacional líder y competitivo reconocido entre la comunidad educativa por brindar una enseñanza integral del idioma inglés con excelencia académica, fomentando la interacción cultural y calidad en el servicio."
                            fondoPanel={CBA_GRIS}
                        />
                    </AlAparecer>
                </div>
            </div>

            {/* ---------- VALORES: se mantiene igual ---------- */}
            <section className="px-5 md:px-16 lg:px-24 py-16 bg-white">
                <AlAparecer className="flex flex-col justify-center items-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold" style={{ color: CBA_NAVY }}>
                        Nuestros Valores
                    </h2>
                    <div className="w-12 h-1 mt-3 rounded-full" style={{ backgroundColor: CBA_ROJO }} />
                </AlAparecer>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {valores.map((v, i) => {
                        const acento = i % 2 === 0 ? CBA_NAVY : CBA_ROJO;
                        return (
                            <AlAparecer key={v.id} retraso={i * 70}>
                                <div
                                    className="group h-full rounded-xl bg-white border border-gray-100 shadow-sm p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                                    style={{ borderTopWidth: '3px', borderTopColor: acento }}
                                >
                                    <div
                                        className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 transition-colors duration-300"
                                        style={{ backgroundColor: `${acento}1A`, color: acento }}
                                    >
                                        <Icono tipo={v.icono} />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3" style={{ color: CBA_NAVY }}>
                                        {v.valor}
                                    </h3>
                                    <p className="text-sm leading-6 text-gray-600">
                                        {v.descripcion}
                                    </p>
                                </div>
                            </AlAparecer>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default About;