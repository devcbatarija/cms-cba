import React from 'react';

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
    }
];

const About = () => {
    return (
        <>
            <div>
                <div className="">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-4/6 flex flex-col pl-20 pr-20 pt-10 order-1 lg:order-none">
                            <div className="p-15">
                                <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-1xl lg:text-2xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                        NUESTRA MISION
                                    </span>
                                </h1>
                                <p className="text-justify">
                                    Somos un centro binacional que busca el desarrollo social, integral y cultural de nuestros estudiantes a través de la enseñanza del idioma inglés, para el acceso a mejores oportunidades de vida contribuyendo con excelencia a la comunidad.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-2/6 flex flex-col pt-5 pb-5 order-2 lg:order-none">
                            <img className="w-full h-64 object-cover" src="https://i.ibb.co/GcsM9mz/mision-Vision-Valores.jpg" alt="Nuestra Misión" />
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-3/6 flex flex-col pt-5 pb-5 order-4 lg:order-none">
                            <img className="w-full h-64 object-cover" src="https://i.ibb.co/qrRgtcf/Vision.jpg" alt="Nuestra Visión" />
                        </div>
                        <div className="w-full lg:w-3/6 flex flex-col pl-20 pr-20 pt-10 order-3 lg:order-none">
                            <div>
                                <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-2xl lg:text-2xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-blue-700 from-sky-800">
                                        NUESTRA VISION
                                    </span>
                                </h1>
                                <p className="text-justify">
                                    Ser el centro binacional líder y competitivo reconocido entre la comunidad educativa por brindar una enseñanza integral del idioma inglés con excelencia académica, fomentando la interacción cultural y calidad en el servicio.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="bg-white dark:bg-gray-800 mt-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                                Nuestros Valores
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                                {valores.map((valor) => (
                                    <div key={valor.id} className="rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:-translate-y-1 hover:shadow-lg">
                                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center py-4">
                                            {valor.valor}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-center px-6 py-4">
                                            {valor.descripcion}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default About;
