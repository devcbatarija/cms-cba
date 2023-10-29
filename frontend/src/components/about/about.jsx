import ImagenFondo from "../educationUSA/EdUSAComponents/ImagenComponent";
import ServicioComponent from "../educationUSA/EdUSAComponents/ServicioComponent";
import CuadroInscripcion from "../inscripcion/incripcion";

const valores = [
    {
        id: 1,
        valor: "Excelencia",
        descripcion: "Orientamos nuestras labores institucionales buscando la excelencia en la enseñanza del idioma inglés y en la interrelación personal con nuestros estudiantes."
    },
    {
        id: 2,
        valor: "Integridad",
        descripcion: "Nos caracterizamos por tener principios de honestidad, transparencia, equidad y justicia en todo el trabajo que realizamos. El cumplimiento de las leyes, de las normas educativas bolivianas e internas es lo que caracteriza el trabajo que realizamos."
    },
    {
        id: 3,
        valor: "Compromiso",
        descripcion: "Estamos comprometidos en brindar un trabajo que satisfaga los necesidades y deseos de nuestros clientes por encima de sus expectativas ofreciendo servicios integrales académicos y culturales de calidad."
    },
    {
        id: 4,
        valor: "Respeto",
        descripcion: "El trabajo en equipo de las actividades y tareas que realizamos están sobre la base de la confianza, compromiso, sinceridad, eficacia y respeto por los demás."
    },
    {
        id: 5,
        valor: "Innovación",
        descripcion: "Estamos siempre atentos a las innovaciones tecnológicas para aprovechar las oportunidades en la implementación de métodos modernos y creativos en relación a la enseñanza."
    },
    {
        id: 6,
        valor: "Solidaridad",
        descripcion: "Estamos comprometidos a brindar nuestro apoyo y desarrollo a la comunidad a través de nuestro programa de American Leaders y el servicio social que realizamos."
    }
];


const Banner = "https://formaciontecnicabolivia.org/sites/default/files/institutos/cbatarija.jpg"
const About = () => {

    return (
        <>
            <ImagenFondo imageUrl={Banner} />
            <div className="flex flex-col gap-6 justify-center py-8 px-5 md:px-20 lg:px-56 xl:px-96 bg-zinc-50">
                <div className="grid grid-cols-1 gap-6 justify-center items-center rounded-lg bg-white p-5">
                    <div className="justify-center flex flex-col">
                        <h1 className="text-center text-lg font-semibold text-cbaBlue md:text-4xl dark:sm:text-white">Misión</h1>
                        <p className="mt-4 text-center text-sm leading-6 dark:text-slate-400">
                            “Somos un centro binacional que busca el desarrollo social, integral y cultural de nuestros estudiantes a través de la enseñanza del idioma inglés, para el acceso a mejores oportunidades de vida contribuyendo con excelencia a la comunidad”
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            className="rounded-lg w-96 h-72"
                            src="https://www.questionpro.com/blog/wp-content/uploads/2018/08/Encuestas-estudiantes.jpg" alt="" />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 justify-center items-center rounded-lg shadow-sm bg-white p-5">
                    <div className="justify-center flex flex-col">
                        <h1 className="text-center text-lg font-semibold text-cbaBlue md:text-4xl dark:sm:text-white">Visión</h1>
                        <p className="mt-4 text-center text-sm leading-6 dark:text-slate-400">
                            Ser el centro binacional líder y competitivo reconocido entre la comunidad educativa por brindar una enseñanza integral del idioma inglés con excelencia académica, fomentando la interacción cultural y calidad en el servicio.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img
                            className="rounded-lg w-96 h-72"
                            src="https://www.questionpro.com/blog/wp-content/uploads/2018/08/Encuestas-estudiantes.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="px-5 md:px-20 lg:px-32 xl:px-60 relative grid grid-cols-1 gap-6 rounded-lg shadow-sm bg-white p-5 bg-zinc-50">
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-center text-lg font-semibold text-cbaBlue md:text-4xl dark:sm:text-white">Valores</h1>
                        <div className="w-60 h-px bg-zinc-300 mt-2"></div>
                    </div>
                        <div className="relative overflow-auto">
                            <div className="flex flex-nowrap gap-4 w-max py-5 px-2">
                            {
                                valores.map((v) => (
                                    <div key={v.id} className="w-60 h-72 rounded-lg shadow-lg p-5">
                                        <h1 className="text-center text-lg font-semibold text-cbaBlue md:text-xl dark:sm:text-white">{v.valor}</h1>
                                        <p className="mt-4 text-center text-sm leading-6 dark:text-slate-400">
                                            {v.descripcion}
                                        </p>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    {/* <div className="flex justify-center">
                        <img
                            className="rounded-lg w-96 h-72"
                            src="https://www.questionpro.com/blog/wp-content/uploads/2018/08/Encuestas-estudiantes.jpg" alt="" />
                    </div> */}
                </div>
            <CuadroInscripcion />
        </>
    );
}

export default About;