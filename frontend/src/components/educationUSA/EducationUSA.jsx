import React, { useState } from "react";
import CuadroInscripcion from "../inscripcion/incripcion";
import Steps from "./StepsComponent";
import Flecha from "./FlechaComponent";


function EducationUSA() {
    const pasos = [
        { id: 1, steps: "Paso", type: "Investigacion", description: "Descubre tus opciones y encuentra una universidad que se adapte a tus necesidades. Visítanos para recibir orientación sobre programas de estudio y universidades." },
        { id: 2, steps: "Paso", type: "Financiamiento", description: "Conoce los requisitos para obtener becas parciales y los costos asociados con tus estudios. Te ayudamos a planificar como financiar tu educacion." },
        { id: 3, steps: "Paso", type: "Solicitud", description: "Completa los formularios y documentos necesarios para las univeridades, inlcueyendo examenes como TOELF, SAT, GRE, GMAT." },
        { id: 4, steps: "Paso", type: "Visa", description: "Familiarizarte con los requisitos para la visa de estudiante y solicitar la cita de entevista con la embajada." },
        { id: 5, steps: "Paso", type: "Viaja", description: "Organiza tu viaje, siste a una orientacion en EducationUSA y asegurate de tener todos los documentos necesarios." },

    ];
    const colores = [
        "rgb(64, 224, 208)",   // Turquesa
        "rgb(255, 255, 0)",    // Mostaza
        "rgb(255, 165, 0)",    // Naranja
        "rgb(173, 216, 230)",  // Azul Pastel
        "rgb(0, 0, 128)",      // Azul Marino
    ];
    return (
        <>
            <div
                style={{
                    width: "auto",  // 100% del ancho de la ventana
                    height: "500px",  // 100% de la altura de la ventana
                    backgroundImage: `url('https://i.ibb.co/QK7Sdh2/image.png')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",  // Centra la imagen en el contenedor
                }}
            >
            </div>
            
            <div className="px-12 pt-10 pb-10   ">
                <h2 className="font-bold">
                    ¿Quieres estudiar en los Estados Unidos?
                </h2>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-2/5">
                        {
                            pasos.map((p, index) => {
                                if (index + 1 > 0 && index + 1 <= 3) {
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
                        <div className="ImagenPrincipal w-full md:w-1/1  p-0">
                            <div style={{
                                backgroundImage: `url("https://th.bing.com/th/id/R.169a44cef96cc4d44c78663afb2a43fd?rik=67VHGtHLvgIFjA&riu=http%3a%2f%2fmidliferoadtrip.tv%2fwp-content%2fuploads%2f2010%2f08%2fpassport-stamps-1.png&ehk=ikz67Xo5MSMjz1IGA2Q1KLU%2ffBOabK%2flvsfZOm5BRpA%3d&risl=&pid=ImgRaw&r=0   ")`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                                height: "50vh",
                                width: "100%"
                            }}>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5">
                        {
                            pasos.map((p, index) => {
                                if (index + 1 > 3 && index + 1 <= 5) {
                                    const color = colores[index % colores.length];
                                    return (
                                        <Steps
                                            key={"key_" + index}
                                            index={index + 1}
                                            steps={p.steps}
                                            type={p.type}
                                            description={p.description}
                                            color={color}
                                        ></Steps>
                                    );
                                }
                                return null;
                            })
                        }
                        <br />
                        <div className="flex flex-wrap">
                            <div className="textos w-full lg:w-4/5">
                                <div>
                                    <strong><h1>ACERCA DE NOSOTROS</h1></strong>
                                </div>
                                <div className="text-justify p-10">
                                    <p>
                                        En Bolivia estamos ubicados en 5 centros, ubicados en las ciudades de La Paz, Cochabamba, Tarija y Sucre.
                                        <br />
                                        Nos comprometemos a proporcionar informacion precisa y actualizada sobre las oportunidades academicas
                                        y de financiamiento de unstituciones acreditadas en los Estados Unidos.
                                    </p>
                                </div>

                            </div>
                            <div className="figuras lg:w-1/5 flex flex-col items-center">
                                <Flecha color="rgb(64, 224, 208)"></Flecha> {/* Turquesa */}
                                <Flecha color="rgb(255, 255, 0)"></Flecha> {/* Mostaza */}
                                <Flecha color="rgb(255, 165, 0)"></Flecha> {/* Naranja */}
                                <Flecha color="rgb(173, 216, 230)"></Flecha> {/* Azul Pastel */}
                                <Flecha color="rgb(0, 0, 128)"></Flecha> {/* Azul Marino */}
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/5">
                        <div
                            style={{
                                width: "full",  // 100% del ancho de la ventana
                                height: "260px",  // 100% de la altura de la ventana
                                backgroundImage: `url('https://ebusinesspages.com/Raymond-Curtis_axmg5_qrCode.png')`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center center",  // Centra la imagen en el contenedor
                            }}
                        ></div>
                        <div className="p-7 text-justify">
                            <strong><h1>EDUCATION USA</h1></strong>
                            <p>Te informamos sobre las distintas ofertas academicas de nivel superior en los Estados Unidos.</p>
                            <p>Orientamos tu investigacion sobre programas de estudio y universidades que se ajustan a tus necesidades y metas academicas.</p>
                            <p>Asesoramos tu proceso de postulacion y busqueda de financiamiento</p>
                        </div>
                        <strong><h1>Todos estos servicios son gratuitos</h1></strong>
                    </div>
                </div>
            </div>
            <CuadroInscripcion />
            <div id='1' className="program-container flex flex-col p-10 md:flex-row lg:flex-row items-center justify-center border-b border-gray-300">
                <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 md:mt-4 text-justify pb-20 pl-20 pr-20 pt-20">
                    <br />
                    <strong><h2 style={{ color: "red" }}>OTROS SERVICIOS</h2></strong>
                    <br />
                    <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 justify-center flex-col md:flex-row justify-center ' >
                        <p className="text-2xl font-bold text-black">Traduccion de documentos</p>
                        <br />
                        <div className='text-justify'>
                            <p>Recuerda que tambien contamos con el servicio de traduccion de documentos. Los documentos pueden ser traducidos del Ingles al Español y viceversa. El tiempo para la traduccion de un documento es variable dependiendo del tipo y del tamaño del documento.</p>
                        </div>
                    </div>
                </div>
                <div className="ImagenPrincipal w-full md:w-1/2  p-0">
                    <div style={{
                        backgroundImage: `url("https://image.freepik.com/free-photo/beautiful-woman-dressed-formally-office-writing_273609-4786.jpg")`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        height: "50vh",
                        width: "100%"
                    }}>
                    </div>
                </div>

            </div>
        </>
    );
}

export default EducationUSA;




// import React from "react";
// import CuadroInscripcion from "../inscripcion/incripcion";


// function EducationUSA() {
//     const chevronStyle = {
//         width: "0",
//         height: "0",
//         borderTop: "14px solid transparent",
//         borderBottom: "14px solid transparent",
//         position: "absolute",
//     };
//     const rectangleStyle2 = {
//         width: "20px",
//         height: "60px",
//         backgroundColor: "black",
//         position: "relative",
//     };

//     const chevronStyle2 = {
//         width: "0",
//         height: "0",
//         borderTop: "30px solid transparent",
//         borderBottom: "30px solid transparent",
//         position: "absolute",
//         left: "0",
//     };
//     const rectangleStyle1 = {
//         width: "20px",
//         height: "30px",
//         position: "relative",
//     };

//     const chevronStyle1 = {
//         width: "0",
//         height: "0",
//         borderTop: "16px solid transparent",
//         borderBottom: "16px solid transparent",
//         position: "absolute",
//         left: "0"
//     };

//     const circleStyle = {
//         display: "inline-block",
//         backgroundColor: "blue",
//         borderRadius: "50%",
//         width: "32px",
//         height: "32px",
//         margin: "0 10px",
//     };
//     const rectangleStyleRight = {
//         display: "inline-block",
//         backgroundColor: "#0000ff",
//         width: "300px",
//         height: "25px",
//         margin: "0",
//         position: "relative",
//     };
//     const rectangleStyleLefth = {
//         display: "inline-block",
//         backgroundColor: "blue",
//         width: "100px",
//         height: "25px",
//         margin: "0",
//         position: "relative",
//     };
//     const rectangleStyle = {
//         display: "inline-block",
//         backgroundColor: "white",
//         width: "10px",
//         height: "25px",
//         margin: "0",
//         position: "relative",
//     };

//     return (
//         <>
//             <div
//                 style={{
//                     width: "auto",  // 100% del ancho de la ventana
//                     height: "500px",  // 100% de la altura de la ventana
//                     backgroundImage: `url('https://i.ibb.co/QK7Sdh2/image.png')`,
//                     backgroundSize: "cover",
//                     backgroundRepeat: "no-repeat",
//                     backgroundPosition: "center center",  // Centra la imagen en el contenedor
//                 }}
//             >
//             </div>
//             <div className="px-12 pt-10 pb-10   ">
//                 <h2 className="font-bold">
//                     ¿Quieres estudiar en los Estados Unidos?
//                 </h2>
//                 <div className="flex flex-wrap">

//                     <div className="w-full lg:w-2/5">
//                         <div className="text-center">
//                             <div className="Titulo">
//                                 <div style={{ ...rectangleStyleLefth, width: "30%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderRight: "10px solid white",
//                                             right: 0,
//                                         }}
//                                     ></div>
//                                     <p>Paso</p>
//                                 </div>
//                                 <div style={{ ...circleStyle, width: "8%" }}>
//                                     <p>1</p>
//                                 </div>
//                                 <div style={{ ...rectangleStyleRight, width: "50%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderLeft: "10px solid white",
//                                             left: 0,
//                                         }}
//                                     ></div>
//                                     <p>Investigacion</p>
//                                 </div>
//                             </div>
//                             <div className="text-justify  pb-3 pl-10 pr-10 pt-3">
//                                 <p>Descubre tus opciones y encuentra una universidad que se adapte a tus necesidades. Visítanos para recibir orientación sobre programas de estudio y universidades.</p>
//                             </div>
//                         </div>


//                         <div className="text-center">
//                             <div className="Titulo">
//                                 <div style={{ ...rectangleStyleLefth, width: "30%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderRight: "10px solid white",
//                                             right: 0,
//                                         }}
//                                     ></div>
//                                     <p>Paso</p>
//                                 </div>
//                                 <div style={{ ...circleStyle, width: "8%" }}>
//                                     <p>2</p>
//                                 </div>
//                                 <div style={{ ...rectangleStyleRight, width: "50%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderLeft: "10px solid white",
//                                             left: 0,
//                                         }}
//                                     ></div>
//                                     <p>Financiamiento</p>
//                                 </div>
//                             </div>
//                             <div className="text-justify  pb-3 pl-10 pr-10 pt-3">
//                                 <p>Conoce los requisitos para obtener becas parciales y los costos asociados con tus estudios. Te ayudamos a planificar como financiar tu educacion.</p>
//                             </div>
//                         </div>
//                         <div className="text-center">
//                             <div className="Titulo">
//                                 <div style={{ ...rectangleStyleLefth, width: "30%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderRight: "10px solid white",
//                                             right: 0,
//                                         }}
//                                     ></div>
//                                     <p>Paso</p>
//                                 </div>
//                                 <div style={{ ...circleStyle, width: "8%" }}>
//                                     <p>3</p>
//                                 </div>
//                                 <div style={{ ...rectangleStyleRight, width: "50%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderLeft: "10px solid white",
//                                             left: 0,
//                                         }}
//                                     ></div>
//                                     <p>Solicitud</p>
//                                 </div>
//                             </div>
//                             <div className="text-justify  pb-3 pl-10 pr-10 pt-3">
//                                 <p>Completa los formularios y documentos necesarios para las univeridades, inlcueyendo examenes como TOELF, SAT, GRE, GMAT.</p>
//                             </div>
//                         </div>
//                         <div className="ImagenPrincipal w-full md:w-1/1  p-0">
//                             <div style={{
//                                 backgroundImage: `url("https://th.bing.com/th/id/R.169a44cef96cc4d44c78663afb2a43fd?rik=67VHGtHLvgIFjA&riu=http%3a%2f%2fmidliferoadtrip.tv%2fwp-content%2fuploads%2f2010%2f08%2fpassport-stamps-1.png&ehk=ikz67Xo5MSMjz1IGA2Q1KLU%2ffBOabK%2flvsfZOm5BRpA%3d&risl=&pid=ImgRaw&r=0   ")`,
//                                 backgroundPosition: "center",
//                                 backgroundRepeat: "no-repeat",
//                                 backgroundSize: "cover",
//                                 height: "50vh",
//                                 width: "100%"
//                             }}>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full lg:w-2/5">
//                         <div className="text-center">
//                             <div className="Titulo">
//                                 <div style={{ ...rectangleStyleLefth, width: "30%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderRight: "10px solid white",
//                                             right: 0,
//                                         }}
//                                     ></div>
//                                     <p>Paso</p>
//                                 </div>
//                                 <div style={{ ...circleStyle, width: "8%" }}>
//                                     <p>4</p>
//                                 </div>
//                                 <div style={{ ...rectangleStyleRight, width: "50%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderLeft: "10px solid white",
//                                             left: 0,
//                                         }}
//                                     ></div>
//                                     <p>Visa</p>
//                                 </div>
//                             </div>
//                             <div className="text-justify  pb-3 pl-10 pr-10 pt-3">
//                                 <p>Familiarizarte con los requisitos para la visa de estudiante y solicitar la cita de entevista con la embajada.</p>
//                             </div>
//                         </div>
//                         <div className="text-center">
//                             <div className="Titulo">
//                                 <div style={{ ...rectangleStyleLefth, width: "30%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderRight: "10px solid white",
//                                             right: 0,
//                                         }}
//                                     ></div>
//                                     <p>Paso</p>
//                                 </div>
//                                 <div style={{ ...circleStyle }}>
//                                     <p>5</p>
//                                 </div>
//                                 <div style={{ ...rectangleStyleRight, width: "50%" }}>
//                                     <div
//                                         style={{
//                                             ...chevronStyle,
//                                             borderLeft: "10px solid white",
//                                             left: 0,
//                                         }}
//                                     ></div>
//                                     <p>Viaja</p>
//                                 </div>
//                             </div>
//                             <div className="text-justify  pb-3 pl-10 pr-10 pt-3">
//                                 <p>Organiza tu viaje, siste a una orientacion en EducationUSA y asegurate de tener todos los documentos necesarios.</p>
//                             </div>
//                             <br />
//                             <div className="flex flex-wrap">
//                                 <div className="textos w-full lg:w-4/5">
//                                     <div>
//                                         <strong><h1>ACERCA DE NOSOTROS</h1></strong>
//                                     </div>
//                                     <div className="text-justify p-10">
//                                         <p>
//                                             En Bolivia estamos ubicados en 5 centros, ubicados en las ciudades de La Paz, Cochabamba, Tarija y Sucre.
//                                             <br />
//                                             Nos comprometemos a proporcionar informacion precisa y actualizada sobre las oportunidades academicas
//                                             y de financiamiento de unstituciones acreditadas en los Estados Unidos.
//                                         </p>
//                                     </div>

//                                 </div>
//                                 <div className="figuras w-full lg:w-1/5 flex flex-col items-center">

//                                     <div className="flex p-0.5">
//                                         <div style={rectangleStyle1}>
//                                             <div
//                                                 style={{
//                                                     ...chevronStyle1,
//                                                     borderRight: "20px solid black",
//                                                     left: "0",
//                                                 }}
//                                             ></div>
//                                         </div>
//                                         <div className="flex gap-1">
//                                             <div
//                                                 style={{
//                                                     width: "10px",
//                                                     height: "32px",
//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                             <div
//                                                 style={{
//                                                     width: "30px",
//                                                     height: "32px",

//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                     <div className="flex p-0.5">
//                                         <div style={rectangleStyle1}>
//                                             <div
//                                                 style={{
//                                                     ...chevronStyle1,
//                                                     borderRight: "20px solid black",
//                                                     left: "0",
//                                                 }}
//                                             ></div>
//                                         </div>
//                                         <div className="flex gap-1">
//                                             <div
//                                                 style={{
//                                                     width: "10px",
//                                                     height: "32px",
//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                             <div
//                                                 style={{
//                                                     width: "30px",
//                                                     height: "32px",

//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex p-0.5">
//                                         <div style={rectangleStyle1}>
//                                             <div
//                                                 style={{
//                                                     ...chevronStyle1,
//                                                     borderRight: "20px solid black",
//                                                     left: "0",
//                                                 }}
//                                             ></div>
//                                         </div>
//                                         <div className="flex gap-1">
//                                             <div
//                                                 style={{
//                                                     width: "10px",
//                                                     height: "32px",
//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                             <div
//                                                 style={{
//                                                     width: "30px",
//                                                     height: "32px",

//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex p-0.5">
//                                         <div style={rectangleStyle1}>
//                                             <div
//                                                 style={{
//                                                     ...chevronStyle1,
//                                                     borderRight: "20px solid black",
//                                                     left: "0",
//                                                 }}
//                                             ></div>
//                                         </div>
//                                         <div className="flex gap-1">
//                                             <div
//                                                 style={{
//                                                     width: "10px",
//                                                     height: "32px",
//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                             <div
//                                                 style={{
//                                                     width: "30px",
//                                                     height: "32px",

//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>

//                                     <div className="flex p-0.5">
//                                         <div style={rectangleStyle1}>
//                                             <div
//                                                 style={{
//                                                     ...chevronStyle1,
//                                                     borderRight: "20px solid black",
//                                                     left: "0",
//                                                 }}
//                                             ></div>
//                                         </div>
//                                         <div className="flex gap-1">
//                                             <div
//                                                 style={{
//                                                     width: "10px",
//                                                     height: "32px",
//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                             <div
//                                                 style={{
//                                                     width: "30px",
//                                                     height: "32px",

//                                                     backgroundColor: "black"
//                                                 }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>


//                     </div>
//                     <div className="w-full lg:w-1/5">
//                         <div
//                             style={{
//                                 width: "full",  // 100% del ancho de la ventana
//                                 height: "260px",  // 100% de la altura de la ventana
//                                 backgroundImage: `url('https://ebusinesspages.com/Raymond-Curtis_axmg5_qrCode.png')`,
//                                 backgroundSize: "cover",
//                                 backgroundRepeat: "no-repeat",
//                                 backgroundPosition: "center center",  // Centra la imagen en el contenedor
//                             }}
//                         ></div>
//                         <div className="p-7">
//                             <strong><h1>EDUCATION USA</h1></strong>
//                             <p>Te informamos sobre las distintas ofertas academicas de nivel superior en los Estados Unidos.</p>
//                             <p>Orientamos tu investigacion sobre programas de estudio y universidades que se ajustan a tus necesidades y metas academicas.</p>
//                             <p>Asesoramos tu proceso de postulacion y busqueda de financiamiento</p>
//                         </div>
//                         <strong><h1>Todos estos servicios son gratuitos</h1></strong>

//                     </div>

//                 </div>
//             </div>
//             <CuadroInscripcion />
//             <div id='1' className="program-container flex flex-col p-10 md:flex-row lg:flex-row items-center justify-center border-b border-gray-300">
//                 <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 md:mt-4 text-justify pb-20 pl-20 pr-20 pt-20">
//                     <br />
//                     <strong><h2 style={{ color: "red" }}>OTROS SERVICIOS</h2></strong>
//                     <br />
//                     <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 justify-center flex-col md:flex-row justify-center ' >
//                         <p className="text-2xl font-bold text-black">Traduccion de documentos</p>
//                         <br />
//                         <div className='text-justify'>
//                             <p>Recuerda que tambien contamos con el servicio de traduccion de documentos. Los documentos pueden ser traducidos del Ingles al Español y viceversa. El tiempo para la traduccion de un documento es variable dependiendo del tipo y del tamaño del documento.</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="ImagenPrincipal w-full md:w-1/2  p-0">
//                     <div style={{
//                         backgroundImage: `url("https://image.freepik.com/free-photo/beautiful-woman-dressed-formally-office-writing_273609-4786.jpg")`,
//                         backgroundPosition: "center",
//                         backgroundRepeat: "no-repeat",
//                         backgroundSize: "cover",
//                         height: "50vh",
//                         width: "100%"
//                     }}>
//                     </div>
//                 </div>

//             </div>
//         </>
//     );
// }

// export default EducationUSA;
