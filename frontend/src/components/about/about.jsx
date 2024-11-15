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
            <>
                <div>

                    <div className="">
                        <div className="flex flex-wrap ">
                            <div className="w-full lg:w-4/6 flex flex-col md:flex-row lg:flex-col pl-20 pr-20 pt-10 ">
                                <div className="p-15">
                                    <h1 class="mb-4 text-2xl font-bold  text-gray-900 dark:text-white md:text-1xl lg:text-2xl">
                                        <span class="text-transparent  bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                            NUESTRA MISION
                                        </span>
                                    </h1>

                                    <p className='text-justify'>
                                        Somos un centro binacional que busca el desarrollo social, integral y cultural de nuestros estudiantes a través de la enseñanza del idioma inglés, para el acceso a mejores oportunidades de vida contribuyendo con excelencia a la comunidad.
                                    </p>
                                </div>

                            </div>
                            <div className="w-full lg:w-2/6 flex flex-col md:flex-row lg:flex-col pt-5 pb-5">

                                <img src="https://www.ldasistencia.com/documents/727685/727822/misionVisionValores.jpg/980516b4-1c28-8f25-caef-995e98fa3ebb?t=1624428275202" alt="" />
                            </div>
                        </div>
                        <div className="flex flex-wrap ">
                            <div className="w-full lg:w-3/6 flex flex-col md:flex-row lg:flex-col pt-5 pb-5">
                                <img src="https://www.billin.net/blog/wp-content/uploads/2020/09/Mision-y-vision-de-una-empresa-1140x760.jpg" alt="" />
                            </div>
                            <div className="w-full lg:w-3/6 flex flex-col md:flex-row lg:flex-col pl-20 pr-20 pt-10 ">
                                <div>
                                    <h1 class="mb-4 text-2xl font-bold  text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
                                        <span class="text-transparent  bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                            NUESTRA VISION
                                        </span>
                                    </h1>
                                    <p className='text-justify'>
                                        Ser el centro binacional líder y competitivo reconocido entre la comunidad educativa por brindar una enseñanza integral del idioma inglés con excelencia académica, fomentando la interacción cultural y calidad en el servicio.
                                    </p>

                                </div>
                            </div>

                        </div>
                        <div className="w-full lg:w-1/5 flex flex-col md:flex-row lg:flex-col">
                        </div>
                    </div>

                    <div class="px-5 md:px-20 lg:px-32 xl:px-60 relative grid grid-cols-1 gap-6 rounded-lg shadow-sm bg-white p-5 bg-zinc-50">
                        <div class="flex flex-col justify-center items-center">
                            <h1 class="text-2xl font-bold text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
                                <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                    VALORES
                                </span>
                            </h1>
                        </div>
                        <div class="relative overflow-auto">
                            <div class="flex flex-nowrap gap-4 w-full py-5 px-2">  {
                                valores.map((v) => (
                                    <div key={v.id} class="w-60 h-68 rounded-lg shadow-lg p-1">
                                        <h1 class="text-2xl text-center text-gray-900 dark:text-white md:text-1xl lg:text-1xl">
                                            <span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                                {v.valor}
                                            </span>
                                        </h1>
                                        <p class="mt-4 text-center text-sm leading-6 dark:text-slate-700">
                                            {v.descripcion}
                                        </p>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div> 
                </div> 
            </> 
        </>
    );
}

export default About;