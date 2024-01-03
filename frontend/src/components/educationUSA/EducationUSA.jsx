import React, { useState } from "react";
import CuadroInscripcion from "../inscripcion/incripcion";
import Steps from "./EdUSAComponents/StepsComponent";
import Flecha from "./EdUSAComponents/FlechaComponent";
import ServicioComponent from "./EdUSAComponents/ServicioComponent";
import ImagenFondo from "./EdUSAComponents/ImagenComponent";
import AcercadeNosotros from "./EdUSAComponents/AcercadeComponent";
import InformacionEducacion from "./EdUSAComponents/ImformationComponent";
import Rectangulo from "./EdUSAComponents/RectanguloComponent";



function EducationUSA() {
    const pasos = [
        { id: 1, steps: "Paso", type: "Investigacion", description: "Descubre tus opciones y encuentra una universidad que se adapte a tus necesidades. Visítanos para recibir orientación sobre programas de estudio y universidades." },
        { id: 2, steps: "Paso", type: "Financiamiento", description: "Conoce los requisitos para obtener becas parciales y los costos asociados con tus estudios. Te ayudamos a planificar como financiar tu educacion." },
        { id: 3, steps: "Paso", type: "Solicitud", description: "Completa los formularios y documentos necesarios para las univeridades, incluyendo examenes como TOELF, SAT, GRE, GMAT." },
        { id: 4, steps: "Paso", type: "Visa", description: "Familiarizarte con los requisitos para la visa de estudiante y solicitar la cita de entevista con la embajada." },
        { id: 5, steps: "Paso", type: "Viaja", description: "Organiza tu viaje, asiste a una orientacion en EducationUSA y asegurate de tener todos los documentos necesarios." },
    ];
    const colores = [
        "rgb(3, 121, 137)",   // Turquesa
        "rgb(128, 160, 0)",    // Mostaza
        "rgb(179, 80, 0)",    // Naranja
        "rgb(0, 56, 152)",  // Azul Pastel
        "rgb(0, 22, 60)",      // Azul Marino
    ];

    const imageUrl = "https://th.bing.com/th/id/R.169a44cef96cc4d44c78663afb2a43fd?rik=67VHGtHLvgIFjA&riu=http%3a%2f%2fmidliferoadtrip.tv%2fwp-content%2fuploads%2f2010%2f08%2fpassport-stamps-1.png&ehk=ikz67Xo5MSMjz1IGA2Q1KLU%2ffBOabK%2flvsfZOm5BRpA%3d&risl=&pid=ImgRaw&r=0";
    const imageqr = "https://i.ibb.co/B3HL9vF/R.jpg";
    const imageBanner = "https://i.ibb.co/p0j0nCn/education-USa.png";
    const acercadenos = `En Bolivia estamos ubicados en 5 centros, ubicados en las ciudades de La Paz, Cochabamba, Tarija y Sucre.
    Nos comprometemos a proporcionar informacion precisa y actualizada sobre las oportunidades academicas
    y de financiamiento de unstituciones acreditadas en los Estados Unidos.`;

    const informacionData = {
        titulo: "EDUCATION USA",
        contenido: [
            "Te informamos sobre las distintas ofertas académicas de nivel superior en los Estados Unidos.",
            "Orientamos tu investigación sobre programas de estudio y universidades que se ajustan a tus necesidades y metas académicas.",
            "Asesoramos tu proceso de postulación y búsqueda de financiamiento."
        ],
        serviciosGratis: "Todos estos servicios son gratuitos"
    };
    return (
        <>
            <ImagenFondo imageUrl={imageBanner} />
            <div className="px-2 sm:px4 pt-5 pb-1">
                <div className="flex flex-wrap ">
                    <div className="w-full lg:w-2/6 text-blue-900 text-justify bg-white rounded-lg">
                        <div className="flex flex-wrap p-5">
                            <div className="w-1/6">
                                <br />
                                <br />
                                <Rectangulo color="rgb(3, 121, 137)" /> {/* turquesa */}
                                <Rectangulo color="rgb(128, 160, 0)" /> {/* mostaza */}
                                <Rectangulo color="rgb(179, 80, 0)" /> {/* naranja */}
                                <Rectangulo color="rgb(0, 56, 152)" /> {/* azul pastel */}
                                <Rectangulo color="rgb(0, 22, 60)" /> {/* azul marino */}
                            </div>
                            <div className="w-5/6 pl-5">
                                <h1 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">EDUCATION<span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">USA</span></h1>                                <p>Es tu fuente oficial de informacion sobre informacion superior en EEUU</p>
                                <ul className="list-disc pl-2">
                                    <li><strong style={{ color: 'rgb(128, 160, 0)' }}>Te informamos</strong> sobre las distintas ofertas academicas de nivel superior en los Estados Unidos.</li>
                                    <li><strong style={{ color: 'rgb(179, 80, 0)' }}>Orientamos tu investigacion</strong> sobre programas de estudio y universidades que se ajusten a tus necesidades y metas academicas.</li>
                                    <li><strong style={{ color: 'rgb(0,56,152)' }}>Asesoramos tu proceso</strong> de postulacion y busquedas de financiamiento.</li>
                                </ul>
                                <strong style={{ color: 'rgb(3,121,137)' }}>Todos los servicios son gratuitos</strong>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/6 text-blue-900 text-justify bg-white rounded-lg p-5">
                        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">COMO ESTUDIAR EN LOS ESTADOS UNIDOS?</h1>
                        <p>Estudiar en Estados Unidos a nivel Universitario requiere mucha investigacion y planificacion.
                            En EducationUSA te brindaremos <strong>informacion</strong> relevante sobre universidades y <strong>oportunidades de apoyo financiero</strong>
                            disponibles para estudiantes internacionales.
                        </p>
                        <br />
                        <p>Recuerda que el <strong>proceso de busqueda y postulacion a</strong> universidades requiere esfuerzo y dedicacion, por eso, nuestros <strong>asesores estan aqui
                            para guiarte</strong> y que puedas tener exito en tu busqueda.</p>

                    </div>
                    <div className="w-full lg:w-2/6 text-blue-900  bg-white rounded-lg p-5">
                        <div>
                            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">| NUESTROS SERVICIOS</h1>
                        </div>
                        <div className="text-justify">
                            <div>
                                <Rectangulo color="rgb(3, 121, 137)" text={"ASESORAMIENTO EDUCATIVO"} />
                                <p>Te ayudamos a identificar las <strong>opciones de estudio</strong> mas adecuadas para ti, tanto a nivel tecnico, pregrado, postgrado, investigacion como de ingles intensivo.</p>
                            </div>
                            <div>
                                <Rectangulo color="rgb(128, 160, 0)" text={"TALLERES EDUCATIONUSA"} />
                                <p>De <strong>orientacion general</strong> y preparacion para el proceso de estudiar en los Estados Unidos.</p>
                            </div>
                            <div>
                                <Rectangulo color="rgb(179, 80, 0)" text={"ORIENTACION SOBRE EXAMENES"} />
                                <p>Pruebas de ingles, incluyendo el TOEFL y <strong>recursos para la preparacion.</strong></p>
                            </div>
                            <div>
                                <Rectangulo color="rgb(0, 56, 152)" text={"ACCESO A INFORMACION"} />
                                <p>
                                    Acerca de programas de becas parciales y <strong>oportunidades de apoyo financiero </strong>
                                    en universidades de los Estados Unidos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-2 sm:px4 pt-1 pb-2   ">

                <div className="flex flex-wrap ">
                    <div className="w-full lg:w-2/5 text-blue-900 text-justify bg-white rounded-lg p-5">
                        <h1 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">QUIERES ESTUDIAR EN LOS <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-400 from-sky-400">ESTADOS UNIDOS? </span></h1>

                        {
                            pasos.map((p, index) => {
                                if (index + 1 > 0) {
                                    const color = colores[index % colores.length];  // Seleccionar color basado en el índice
                                    return (
                                        <Steps
                                            key={"key_" + index}
                                            index={index + 1}
                                            steps={p.steps}
                                            type={p.type}
                                            description={p.description}
                                            color={color}  // Pasa el color como una prop a Steps (asegúrate de ajustar el componente Steps para aceptar esta prop)
                                        ></Steps>
                                    );
                                }
                                return null;
                            })
                        }

                    </div>
                    <div className="w-full lg:w-2/5 text-blue-900">

                        <AcercadeNosotros texto={acercadenos} imageUrl={imageUrl} />

                    </div>
                    <div className="w-full lg:w-1/5 flex flex-col md:flex-row lg:flex-col">
                        <div className="imagen pt-6 pb-3 pr-3 pl-3">
                            <img src={imageqr} alt="QR" />
                        </div>
                        <div className="info">
                            <InformacionEducacion {...informacionData} />
                        </div>
                    </div>

                </div>
            </div>
            <CuadroInscripcion />
            <div className="flex-row" >
                {/* <ServicioComponent {...servicioProps} /> */}
            </div>
        </>
    );
}

export default EducationUSA;