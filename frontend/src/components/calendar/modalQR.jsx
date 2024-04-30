import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling"
import DropdownTypeQR from "../dashboard/calendario/buttonSelectType";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';
import './calendarClientStyles.css'
import { useNavigate } from "react-router-dom";

const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    data: '',
    image: 'https://i.ibb.co/fFM4dmk/cba-bar.png',
    qrOptions: {
        // errorCorrectionLevel: 'H',
    },
    dotsOptions: {
        type: 'dots',
        gradient: {
            type: 'linear',
            colorStops: [{ offset: 0, color: 'rgb(0, 46, 95)' }, { offset: 1, color: 'rgb(213, 0, 50)' }],
            rotation: 1
        }
    },
    backgroundOptions: {
        color: 'transparent',
    },
    cornersSquareOptions: {
        type: 'dots',
        gradient: {
            type: 'linear',
            colorStops: [{ offset: 0, color: 'rgb(0, 46, 95)' }, { offset: 1, color: 'rgb(213, 0, 50)' }],
            rotation: 1
        }
    },
    cornersDotOptions: {
        type: 'dots'
    },
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
    }
});
const ModalQR = ({
    toggleOpenModalQr,
    event,
    handleChangeEvent,
}) => {
    const navigate = useNavigate()
    const [informationQr, setInformationQR] = useState(null)
    const [consigna, setConsigna] = useState(null)
    const userLogin = useSelector((state) => state.login.user)
    const isLogged = useSelector((state) => state.login.auth)
    const [qrGenerated, setQrGenerated] = useState(false);
    const qrCodeRef = useRef(null);
    const extensiones = [
        { id: 1, type: 'png', txt: 'PNG' },
        { id: 2, type: 'jpeg', txt: 'JPEG' },
        { id: 3, type: 'webp', txt: 'WEBP' },
        { id: 4, type: 'svg', txt: 'SVG' },
    ]
    const [typeImageQR, setTypeImageQR] = useState(extensiones[1].type)

    const generarQR = (id) => {
        if (isLogged == true) {
            if (!qrGenerated) {
                const datos = {
                    id_Evento: event.datosEvento.id_Evento,
                    id_Estudiante: userLogin._userId.toString(),
                    nombre_estudiante: `${userLogin.nombres} ${userLogin.apellidos}`,
                    paralelo: 'Por-Hacer-Aun',
                    cantidad_uso: 0,
                    fecha_Expiracion: event.General.end,
                }
                const response = axios.post('QR/generarQR', datos).then(res => {
                    qrCode.update({
                        data: res.data.data.result.id_QR,
                    })
                    qrCode.append(qrCodeRef.current)
                    setQrGenerated(true)
                    setTimeout(() => {
                        verifyQR()
                    }, 1000);
                }).catch(err => {
                    console.log(err)
                });
            }
            else {
                console.log('ya fue generado')
            }
        }
        else {
            navigate('/login')
        }
    }
    const onDownloadClick = () => {
        const qrDownload = new QRCodeStyling({
            width: 400,
            height: 400,
            data: qrCode._options.data,
            image: qrCode._options.image,
            qrOptions: qrCode._options.qrOptions,
            dotsOptions: qrCode._options.dotsOptions,
            backgroundOptions: qrCode._options.backgroundOptions,
            cornersSquareOptions: qrCode._options.cornersSquareOptions,
            cornersDotOptions: qrCode._options.cornersDotOptions,
            imageOptions: qrCode._options.imageOptions
        });

        qrDownload.download({
            extension: typeImageQR,
        })
    };
    const handleChageType = (obj) => {
        setTypeImageQR(obj.type)
    }

    const hexToRgb = (hex) => {
        // Elimina el "#" del inicio si está presente
        hex = hex.replace(/^#/, '');

        // Divide el color en sus componentes RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Retorna el color RGB en un objeto
        return `rgb(${r},${g},${b},0.3)`;
    };
    const colorRgb = hexToRgb(event.General.color);
    const verifyQR = () => {
        if (event.datosEvento.Consigna_Eventos.length > 0) {
            setConsigna(event.datosEvento.Consigna_Eventos[0])
        }
        if (isLogged == true) {
            const datos = {
                id_Evento: event.datosEvento.id_Evento,
                id_Estudiante: userLogin._userId.toString(),
            }
            const response = axios.post('QR/existsQR', datos).then(res => {
                if (res.data.data.result != null) {
                    setInformationQR(res.data.data.result)
                    qrCode.update({
                        data: res.data.data.result.id_QR,
                    })
                    if (!qrGenerated) {
                        qrCode.append(qrCodeRef.current)
                        setQrGenerated(true)
                    }
                }
            })
        }
        console.log(event)
    }
    useEffect(() => {
        verifyQR()
    }, [])

    useEffect(() => {
        if (event.datosEvento.Consigna_Eventos.length > 0) {
            setConsigna(event.datosEvento.Consigna_Eventos[0])
        }
        else {
            setConsigna(null)
        }
    }, [event])

    const [backModal, setBackModal] = useState(false)
    const toggleBackModal = () => {
        setBackModal(!backModal)
    }

    return (
        <div className="w-full h-screen fixed inset-0 overflow-x-hidden overflow-y-auto z-10">
            <div className="backdrop-blur-sm bg-cbaBlue/20  w-full h-full absolute"></div>
            <div className="absolute w-full h-screen flex justify-center items-center">
                <div className="h-[650px] md:h-[600px] w-[1000px] rounded-xl bg-white">

                    <div className="relative h-full w-full rounded-xl overflow-hidden" >  {/*contenedor del modal style={{ background: `linear-gradient(-45deg, #000000, #434343` }}*/}

                        <div className="h-10 w-10 bg-orange-100 absolute right-[37%] top-[10%] rounded-full"></div>
                        <div className="h-5 w-5 bg-green-100 absolute right-[10%] top-[5%] rotate-[25deg]"></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>

                        <div className={`flex flex-col px-8 md:px-12 lg:px-20 relative h-full`} style={{ color: event.General.color }}>
                            <button
                                onClick={toggleOpenModalQr}
                                className="p-1.5 right-0 rounded-full text-zinc-500 absolute m-3 z-10"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="gray"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <div className="flex flex-col sm:flex-row h-full items-center py-5">
                                <div className="w-2/3 pr-10 flex flex-col">
                                    <h2 className={`sm:mb-5 md:mb-10 sm:text-3xl md:text-4xl lg:text-5xl w-[70%] font-extrabold`} >{event.General.title}</h2>
                                    <span className="whitespace-pre-wrap text-sm mb-5 text-zinc-500">{event.datosEvento.descripcion}</span>
                                    <div className="flex flex-row sm:flex-col md:flex-row justify-between md:pr-6 lg:pr-10">
                                        <div className="flex flex-row gap-5 items-center sm:text-lg md:text-xl">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                </svg>

                                            </span>
                                            <span className="font-bold ">{dayjs(event.General.start).format('DD')}</span>
                                            <span className="font-bold border-x-2 px-5 capitalize border-zinc-400">{dayjs(event.General.start).format('MMMM')}</span>
                                            <span className="font-bold ">{dayjs(event.General.start).format('YYYY')}</span>
                                        </div>
                                        <div className="flex flex-row items-center sm:gap-x-6 md:gap-x-2 sm:mt-2 md:mt-0">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                </svg>
                                            </span>
                                            <span className="text-md font-semibold">{
                                                event.General.allDay ?
                                                    <>Todo el dia</>
                                                    :
                                                    event.General.start_Time
                                            }</span>
                                        </div>
                                    </div>
                                    {
                                        consigna != null &&
                                        <div className="mt-5">
                                            <button className="bg-cbaBlue text-white rounded-md w-[220px] py-2"
                                                onClick={toggleBackModal}
                                            >Referir</button>
                                        </div>
                                    }
                                </div>
                                <div className="w-full bg-red-100 sm:w-1/3 sm:h-1/1  flex items-center justify-center order-first sm:order-none">
                                    <img className="h-100 w-full sm:h-80 md:h-96 sm:w-80 rounded-xl relative" src={event.datosEvento.multimedia[0]} alt="" />
                                </div>
                            </div>

                        </div>
                        {/* parte de atras del modal */}
                        {
                            consigna != null &&
                            <div className={`bg-white absolute top-0 left-0 w-full h-full flex flex-col items-center justify-between text-zinc-500 rounded-[5px] transform ${backModal ? 'translate-y-[2%]' : 'translate-y-[98%]'} transition-all duration-500 ease-in-out`}>
                                <div className="pt-5 flex flex-row w-full sm:px-8 md:px-10 lg:px-20 grow items-center"
                                    style={{
                                        // background: `linear-gradient(135deg, white , ${colorRgb} )`
                                    }}
                                >
                                    <div className="w-2/3 flex flex-col items-start justify-center sm:mr-10 lg:mr-0">
                                        {/* <span className="mb-3  text-5xl w-[70%] font-bold">{event.datosEvento.categoria}</span> */}
                                        <span className="sm:mb-5 md:mb-10 sm:text-3xl md:text-4xl lg:text-5xl w-[70%] font-bold">Consigna</span>
                                        <span className="whitespace-pre-wrap text-sm mb-5 text-zinc-400">{consigna.descripcion}</span>
                                        <div className="flex flex-row items-center ">
                                            <span className="text-xl font-bold text-zinc-400">Referidos:</span>
                                            <div className="mx-5 bg-green-100 border-2 h-10 w-10 flex items-center justify-center border-green-400 rounded-xl text-green-400">
                                                <span>{consigna.cantidad_Referidos}</span>
                                            </div>
                                            {
                                                informationQr != null &&
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                                    </svg>

                                                    <div className={`mx-5 border-2 h-10 w-10 flex items-center justify-center rounded-xl ${informationQr.cantidad_uso >= consigna.cantidad_Referidos ? 'text-green-400 bg-green-100 border-green-400' : 'text-red-400 bg-red-100 border-red-400'}`}>
                                                        <span>{informationQr.cantidad_uso}</span>
                                                    </div>
                                                    <span className={`whitespace-pre-wrap text-sm font-semibold ${informationQr.cantidad_uso >= consigna.cantidad_Referidos ? 'text-green-400' : 'text-red-400'}`}>
                                                        {
                                                            informationQr.cantidad_uso < consigna.cantidad_Referidos ? `¡Aun te faltan ${consigna.cantidad_Referidos - informationQr.cantidad_uso} referidos!` :
                                                                informationQr.cantidad_uso == consigna.cantidad_Referidos ? "¡Listo! ¡Gracias por tu compromiso!" : '¡Increíble! Tu dedicación hace la diferencia'
                                                        }
                                                    </span>
                                                </>
                                            }
                                        </div>
                                        <button onClick={toggleBackModal}>volver</button>
                                    </div>
                                    <div className="w-1/3 flex items-center flex-col justify-center items-center h-full">
                                        {
                                            qrGenerated &&
                                            <span className="sm:text-[10px] md:text-xs text-center text-zinc-400">Descarga y comparte este QR y asegúrate de escanearlo en la institución el día del evento para registrar tus referidos.</span>
                                        }
                                        <div className="bg-white sm:p-5 md:p-8 rounded-lg shadow-xl" ref={qrCodeRef}>
                                            {
                                                !qrGenerated &&
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="w-[200px] h-[200px]">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
                                                </svg>

                                            }
                                        </div>
                                        {
                                            qrGenerated ?
                                                <div className="mt-5 flex flex-row bg-cbaBlue divide-x justify-center items-center text-white rounded-md w-[220px] cursor-pointer">
                                                    <span className="px-5 w-full text-center" onClick={onDownloadClick}>Descargar</span>
                                                    <div>
                                                        <DropdownTypeQR
                                                            handleFunction={handleChageType}
                                                            datos={extensiones}
                                                            initialSelected={extensiones[1]}
                                                            disabled={false}
                                                        />
                                                    </div>
                                                </div> :
                                                <button onClick={() => generarQR(event.General.id)} className="my-5 bg-cbaBlue  text-white rounded-md w-[220px] py-2">Generar Qr</button>
                                        }
                                    </div>
                                </div>
                                <div className="w-full sm:px-3 md:px-10 lg:px-20 pt-5 pb-8 flex flex-row gap-x-5">
                                    <div className="w-3/6">
                                        {
                                            event.prev != null &&
                                            <div onClick={() => handleChangeEvent(event.prev.id)} className="prev-event transition duration-700 ease-in-out hover:scale-[1.07] flex flex-row w-full h-[110px] rounded-lg shadow-lg bg-zinc-50 items-center">
                                                <div className="w-1/5 flex items-center p-2 h-full">
                                                    <img className="rounded-md h-full w-full" src={event.prev.image} alt="" />
                                                </div>
                                                <div className="w-4/5 flex flex-col overflow-hidden p-3">
                                                    <span className="font-bold text-sm">{event.prev.title}</span>
                                                    <span className="truncate text-zinc-400 text-xs">{event.prev.descripcion}</span>
                                                    <div className="flex flex-row gap-x-5">
                                                        <button class="flex flex-row items-center mt-2 reverse-btn">
                                                            <svg
                                                                id="arrow-horizontal"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="30"
                                                                height="10"
                                                                viewBox="0 0 46 16"
                                                            >
                                                                <path
                                                                    id="Path_10"
                                                                    data-name="Path 10"
                                                                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                                                    transform="translate(30)"
                                                                ></path>
                                                            </svg>
                                                            <span class="hover-underline-animation-prev text-xs"> Anterior </span>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className="w-3/6">
                                        {
                                            event.next != null &&
                                            <div onClick={() => handleChangeEvent(event.next.id)} className="next-event transition duration-500 ease-in-out hover:scale-[1.07] flex flex-row w-full h-[110px] rounded-lg shadow-lg bg-zinc-50 items-center">
                                                <div className="w-4/5 flex flex-col overflow-hidden p-3">
                                                    <span className="font-bold text-sm ">{event.next.title}</span>
                                                    <span className="truncate text-zinc-400 text-xs">{event.next.descripcion}</span>
                                                    <div className="flex flex-row gap-x-5">
                                                        <button class="cta flex flex-row items-center mt-2">
                                                            <span class="hover-underline-animation text-xs"> Siguiente </span>
                                                            <svg
                                                                id="arrow-horizontal"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="30"
                                                                height="10"
                                                                viewBox="0 0 46 16"
                                                            >
                                                                <path
                                                                    id="Path_10"
                                                                    data-name="Path 10"
                                                                    d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
                                                                    transform="translate(30)"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-1/5 flex items-center justify-end p-2 h-full">
                                                    <img className="rounded-md h-full w-full" src={event.next.image} alt="" />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalQR;