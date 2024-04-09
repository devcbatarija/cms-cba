import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling"
import DropdownTypeQR from "../dashboard/calendario/buttonSelectType";
import axios from "axios";
import { useSelector } from "react-redux";
import dayjs from 'dayjs';

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
    event
}) => {
    const userLogin = useSelector((state) => state.login.user)
    const [qrGenerated, setQrGenerated] = useState(false);
    const qrCodeRef = useRef(null);
    const extensiones = [
        { id: 1, type: 'png', txt: 'PNG' },
        { id: 2, type: 'jpeg', txt: 'JPEG' },
        { id: 3, type: 'webp', txt: 'WEBP' },
        { id: 4, type: 'svg', txt: 'SVG' },
    ]
    const [typeImageQR, setTypeImageQR] = useState(extensiones[1].type)

    const generarQR = () => {
        if (!qrGenerated) {
            const datos = {
                id_Evento: event.datosEvento.id_Evento,
                id_Estudiante: userLogin._userId,
                cantidad_uso: 5,
                fecha_Expiracion: event.General.end,
            }
            const response = axios.post('QR/generarQR', datos).then(res => {
                qrCode.update({
                    data: res.data.data.result.id_QR,
                })
                qrCode.append(qrCodeRef.current)
                setQrGenerated(!qrGenerated)
            }).catch(err => {
                console.log(err)
            });
        }
        else {
            console.log('ya fue generado')
        }

        // const dataQR = {
        //     IdEvento: event.General.id,
        //     IdUsuario: '123456sc'
        // }
        // const jsonEvent = JSON.stringify(dataQR);
        // qrCode.update({
        //     data: jsonEvent,
        // })
        // qrCode.append(qrCodeRef.current)
        // setQrGenerated(!qrGenerated)
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

    useEffect(() => {
        const datos = {
            id_Evento: event.datosEvento.id_Evento,
            id_Estudiante: userLogin._userId,
        }
        const response = axios.post('QR/verificarQR', datos).then(res => {
            if (res.data.data.result != null) {
                qrCode.update({
                    data: res.data.data.result.id_QR,
                })
                qrCode.append(qrCodeRef.current)
                setQrGenerated(!qrGenerated)
            }
        })
        console.log(event)
    }, [])
    const [backModal, setBackModal] = useState(false)
    const toggleBackModal = () => {
        setBackModal(!backModal)
    }

    return (
        <div className="w-full h-screen fixed inset-0 overflow-x-hidden overflow-y-auto z-10">
            <div className="bg-black opacity-50 w-full h-full absolute"></div>
            <div className="absolute w-full h-screen flex justify-center items-center">
                <div className="h-[600px] w-[1000px] rounded-xl bg-white">

                    <div className="relative h-full w-full rounded-xl overflow-hidden" style={{ background: `linear-gradient(-45deg, #000000, #434343` }}>  {/*contenedor del modal*/}

                        <div className={`flex flex-col px-20 relative h-full`} style={{ color: event.General.color }}>
                            <button
                                onClick={toggleOpenModalQr}
                                className="p-1.5 right-0 rounded-full text-white absolute m-3 z-10"
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
                            <div className="flex flex-row h-full items-center py-5">
                                <div className="w-2/3 pr-10 flex flex-col">
                                    <h2 className={`mb-10  text-5xl w-[70%] font-bold`} >{event.General.title}</h2>
                                    <span className="whitespace-pre-wrap text-sm mb-5 text-zinc-50">{event.datosEvento.descripcion}</span>
                                    <div className="flex flex-row justify-between pr-10">
                                        <div className="flex flex-row gap-5 items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                                </svg>

                                            </span>
                                            <span className="text-xl font-bold ">{dayjs(event.General.start).format('DD')}</span>
                                            <span className="text-xl font-bold border-x-2 px-5 capitalize">{dayjs(event.General.start).format('MMMM')}</span>
                                            <span className="text-xl font-bold ">{dayjs(event.General.start).format('YYYY')}</span>
                                        </div>
                                        <div className="flex flex-row items-center gap-x-2">
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
                                    <div className="mt-5">
                                        {
                                            !qrGenerated &&
                                            <button className="bg-cbaBlue text-white rounded-md px-14 py-2 hover:bg-cyan-700"
                                                onClick={toggleBackModal}
                                            >Participar</button>
                                        }
                                    </div>
                                </div>
                                <div className="w-1/3 h-1/1  flex items-center justify-center">
                                    <img className="h-96 w-80 rounded-xl relative" src={event.datosEvento.multimedia[0]} alt="" />
                                </div>
                            </div>

                        </div>
                        {/* para de atras del modal */}
                        <div className={`bg-white absolute top-0 left-0 w-full h-full flex flex-col items-center jutify-center text-center gap-5 text-white rounded-[5px] transform ${backModal ? 'translate-y-[2%]' : 'translate-y-[98%]'} transition-all duration-500 ease-in-out`}>
                            <div className="py-5 flex flex-row h-full w-full bg-red-100"
                                style={{
                                    background: `linear-gradient(135deg, white , ${colorRgb} )`
                                }}
                            >
                                <div className="w-[80%]">
                                    <button onClick={toggleBackModal}>volver</button>
                                </div>
                                <div className="w-[20%] flex items-center flex-col">
                                    <div className="flex flex-row bg-cbaBlue divide-x justify-center items-center text-white rounded-md w-max mb-5 cursor-pointer">
                                        <span className="px-5" onClick={onDownloadClick}>Descargar</span>
                                        <div>
                                            <DropdownTypeQR
                                                handleFunction={handleChageType}
                                                datos={extensiones}
                                                initialSelected={extensiones[1]}
                                                disabled={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-zinc-200 p-10 rounded-lg" ref={qrCodeRef}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalQR;