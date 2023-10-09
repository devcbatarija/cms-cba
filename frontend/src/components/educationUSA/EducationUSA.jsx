import React, { useState } from "react";
import CuadroInscripcion from "../inscripcion/incripcion";
import Steps from "./EdUSAComponents/StepsComponent";
import Flecha from "./EdUSAComponents/FlechaComponent";
import ServicioComponent from "./EdUSAComponents/ServicioComponent";
import ImagenFondo from "./EdUSAComponents/ImagenComponent";
import AcercadeNosotros from "./EdUSAComponents/AcercadeComponent";
import InformacionEducacion from "./EdUSAComponents/ImformationComponent";


function EducationUSA() {
    const pasos = [
        { id: 1, steps: "Paso", type: "Investigacion", description: "Descubre tus opciones y encuentra una universidad que se adapte a tus necesidades. Visítanos para recibir orientación sobre programas de estudio y universidades." },
        { id: 2, steps: "Paso", type: "Financiamiento", description: "Conoce los requisitos para obtener becas parciales y los costos asociados con tus estudios. Te ayudamos a planificar como financiar tu educacion." },
        { id: 3, steps: "Paso", type: "Solicitud", description: "Completa los formularios y documentos necesarios para las univeridades, inlcueyendo examenes como TOELF, SAT, GRE, GMAT." },
        { id: 4, steps: "Paso", type: "Visa", description: "Familiarizarte con los requisitos para la visa de estudiante y solicitar la cita de entevista con la embajada." },
        { id: 5, steps: "Paso", type: "Viaja", description: "Organiza tu viaje, siste a una orientacion en EducationUSA y asegurate de tener todos los documentos necesarios." },
    ];
    const colores = [
        "rgb(3, 121, 137)",   // Turquesa
        "rgb(128, 160, 0)",    // Mostaza
        "rgb(179, 80, 0)",    // Naranja
        "rgb(0, 56, 152)",  // Azul Pastel
        "rgb(0, 22, 60)",      // Azul Marino
    ];
    const servicioProps = {
        titulo: "OTROS SERVICIOS",
        contenido: {
            title: "Traducción de documentos",
            text: "Recuerda que también contamos con el servicio de traducción de documentos. Los documentos pueden ser traducidos del Inglés al Español y viceversa. El tiempo para la traducción de un documento es variable dependiendo del tipo y del tamaño del documento. Recuerda que también contamos con el servicio de traducción de documentos. Los documentos pueden ser traducidos del Inglés al Español y viceversa. El tiempo para la traducción de un documento es variable dependiendo del tipo y del tamaño del documento."
        },
        imagenUrl: "https://image.freepik.com/free-photo/beautiful-woman-dressed-formally-office-writing_273609-4786.jpg"
    };
    const imageUrl = "https://th.bing.com/th/id/R.169a44cef96cc4d44c78663afb2a43fd?rik=67VHGtHLvgIFjA&riu=http%3a%2f%2fmidliferoadtrip.tv%2fwp-content%2fuploads%2f2010%2f08%2fpassport-stamps-1.png&ehk=ikz67Xo5MSMjz1IGA2Q1KLU%2ffBOabK%2flvsfZOm5BRpA%3d&risl=&pid=ImgRaw&r=0";
    const imageqr = "https://traders.studio/wp-content/uploads/2021/04/qr-code-bc94057f452f4806af70fd34540f72ad.png";
    const imageBanner = "https://i.ibb.co/QK7Sdh2/image.png";
    const acercadenos = `En Bolivia estamos ubicados en 5 centros, ubicados en las ciudades de La Paz, Cochabamba, Tarija y Sucre.
    Nos comprometemos a proporcionar informacion precisa y actualizada sobre las oportunidades academicas
    y de financiamiento de unstituciones acreditadas en los Estados Unidos.`;

    const informacionData = {
        titulo: "EDUCATION USA",
        contenido: [
            "Te informamos sobre las distintas ofertas académicas de nivel superior en los Estados Unidos.",
            "Orientamos tu investigación sobre programas de estudio y universidades que se ajustan a tus necesidades y metas académicas.",
            "Asesoramos tu proceso de postulación y búsqueda de financiamiento"
        ],
        serviciosGratis: "Todos estos servicios son gratuitos"
    };
    return (
        <>
            <ImagenFondo imageUrl={imageBanner} />
            <div className="px-2 sm:px4 pt-5 pb-5   ">
                <h2 className="font-bold uppercase text-3xl text-center mb-4 text-blue-900">
                    ¿Quieres estudiar en los Estados Unidos?
                </h2>
                <div className="flex flex-wrap ">
                    <div className="w-full lg:w-2/5 text-blue-900 text-justify bg-white shadow-lg rounded-lg">
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
                            <ImagenFondo imageUrl={imageqr} />
                        </div>
                        <div className="info">
                            <InformacionEducacion {...informacionData} />
                        </div>
                    </div>

                </div>
            </div>
            <CuadroInscripcion />
            <div className="flex-row" >
                <ServicioComponent {...servicioProps} />
            </div>
        </>
    );
}

export default EducationUSA;