import { useNavigate } from "react-router-dom";
import back from '../../../assets/backgroundSVG/radiant-gradient.svg';

const Reportes = () => {
    const navigate = useNavigate()

    const cursos = [
        {
            id: 1,
            nombre: "TEENS-1.2.4-TE-A-CR-02-2022",
            descripcion: "Aprende JavaScript desde cero hasta crear aplicaciones web complejas.",
            instructor: "Cortez Severich Diego",
            duracion: "6 meses",
            fechaInicio: "2024-05-01",
            fechaFin: "2024-10-31",
            precio: 1200,
            estudiantesInscritos: 50,
            estado: "Activo"
        },
        {
            id: 2,
            nombre: "Curso de React para Principiantes",
            descripcion: "Construye aplicaciones web modernas con React.",
            instructor: "Ana Sánchez",
            duracion: "3 meses",
            fechaInicio: "2024-06-01",
            fechaFin: "2024-08-31",
            precio: 800,
            estudiantesInscritos: 35,
            estado: "Activo"
        },
        {
            id: 3,
            nombre: "Curso de Node.js para Desarrolladores",
            descripcion: "Aprende a construir aplicaciones backend con Node.js.",
            instructor: "Carlos García",
            duracion: "4 meses",
            fechaInicio: "2024-07-01",
            fechaFin: "2024-10-31",
            precio: 1500,
            estudiantesInscritos: 40,
            estado: "Activo"
        },
        {
            id: 4,
            nombre: "Curso de Diseño Web Responsivo",
            descripcion: "Diseña sitios web que se vean bien en cualquier dispositivo.",
            instructor: "María Rodríguez",
            duracion: "5 meses",
            fechaInicio: "2024-08-01",
            fechaFin: "2024-12-31",
            precio: 1000,
            estudiantesInscritos: 25,
            estado: "Activo"
        },
        {
            id: 5,
            nombre: "Curso de Introducción a la Inteligencia Artificial",
            descripcion: "Explora los fundamentos de la inteligencia artificial y sus aplicaciones.",
            instructor: "Luis Torres",
            duracion: "6 meses",
            fechaInicio: "2024-09-01",
            fechaFin: "2024-12-31",
            precio: 1800,
            estudiantesInscritos: 30,
            estado: "Activo"
        }
    ];

    return (
        <>
            <div className="w-full min-h-screen bg-zinc-100">
                <div className="px-20 py-8">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                        {
                            cursos.map((c) => (
                                <div key={c.id}
                                    className="h-60 w-60 rounded-3xl bg-white shadow-lg  relative overflow-hidden p-2"

                                >

                                    {/* <div className="h-[25%] flex items-center justify-center flex flex-col gap-y-2 z-10">
                                        <span className="text-center font-bold text-zinc-500">{c.nombre}</span>
                                        <span className="text-center font-semibold text-zinc-400 text-xs">{c.instructor}</span>
                                    </div>
                                    <div className="h-[75%] flex items-center justify-center">
                                        <span className="text-5xl font-extrabold text-green-200">{c.estudiantesInscritos}</span>
                                    </div> */}
                                    <div
                                        className="h-full w-full absolute top-0 left-0 z-0 py-4 px-4"
                                        style={{ backgroundImage: `url(${back})`}}
                                    >
                                        <div className="h-[70%] flex flex-col items-center justify-center">
                                            <span className="font-semibold text-zinc-200 text-sm">Referidos</span>
                                            <span className="text-5xl font-extrabold text-green-200">{c.estudiantesInscritos}</span>
                                        </div>
                                        <div className="h-[30%] flex justify-center flex flex-col gap-y-2 z-10">
                                            <span className="font-semibold text-zinc-200 text-xs">{c.instructor}</span>
                                            <span className="font-bold text-zinc-50 ">{c.nombre}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reportes;