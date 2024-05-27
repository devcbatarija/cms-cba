import { useLocation, useNavigate, useParams } from "react-router-dom";
import back from '../../../assets/backgroundSVG/radiant-gradient.svg';
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "./widgets/noData";
import DownloadReports from "./widgets/downloadReport";
import BtnGoBack from "./widgets/btnGoBack";

const Reportes = () => {
    const colors = [
        '#CED3F2',
        '#D0F2E9',
        '#F2E8C9',
        '#F2D8CE',
        '#EED4F2',
        '#DAFBF8',
        '#CDFAE2',
        '#FFF5D2',
        '#E1F0F6'
    ]
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const eventTitle = queryParams.get('event');
    const navigate = useNavigate()
    const { eventId } = useParams()
    const [paralels, setParalels] = useState([])
    useEffect(() => {
        axios.get(`QR/report/parallels/${eventId}`).then(res => {
            if (res.data.data) {
                setParalels(res.data.data)
            }
        })
    }, [])

    const verEstudiantes = (paralelo) => {
        navigate(`/dashboard/Calendario/ReportsByStudents?idEv=${eventId}&paralelo=${paralelo}&event=${eventTitle}`)
    }

    return (
        <>
            <div className="w-full min-h-screen bg-zinc-100">
                <div className="px-5 sm:px-10 md:px-20 py-5">
                    <div className="py-2 flex sm:justify-center items-center relative mb-5">
                        <BtnGoBack defaultPage={'/dashboard/Calendario/eventsTable'} />
                        <span className="grow font-extrabold uppercase text-zinc-500 text-sm sm:text-base md:text-lg text-center">Paralelos que participaron en el evento</span>
                    </div>
                    {
                        paralels.length > 0 &&
                        <div className="flex justify-end mb-5">
                            <DownloadReports
                                requestUrl={'QR/report/downloadReportParalels'}
                                FileName={`Paralels_Report_event_${eventTitle}`}
                                data={{ paralels, eventId }}
                            />
                        </div>
                    }
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                        {
                            paralels.length > 0 ?
                                paralels.map((p, index) => (
                                    <div key={index}
                                        className="h-60 w-60 rounded-3xl bg-white shadow-lg  relative overflow-hidden p-2"
                                        onClick={() => verEstudiantes(p.nombre_paralelo)}
                                        style={{ backgroundColor: colors[Math.floor(Math.random() * colors.length)] }}
                                    >

                                        {/* <div className="h-[60%] flex flex-col items-center justify-center">
                                            <span className="text-sm font-mono font-extrabold text-zinc-200 uppercase">Referidos</span>
                                            <span className="text-5xl font-extrabold text-green-200">{p.cantidad_uso}</span>
                                        </div>
                                        <div className="h-[40%] flex justify-center flex flex-col gap-y-2 z-10">
                                            <span className="font-semibold text-zinc-200 text-[10px]">{p.mes}</span>
                                            <span className="font-semibold text-zinc-200 text-xs">{p.profesor}</span>
                                            <span className="font-bold text-zinc-50 ">{p.nombre_paralelo}</span>
                                        </div> */}
                                        <div
                                            className="h-full w-full absolute top-0 left-0 z-0 py-4 px-4"
                                            style={{ backgroundImage: `url(${back})` }}
                                        >
                                            <div className="h-[60%] flex flex-col items-center justify-center">
                                                <span className="text-sm font-mono font-extrabold text-zinc-500 uppercase">Referidos</span>
                                                <span className="text-5xl font-extrabold text-emerald-400">{p.cantidad_uso}</span>
                                            </div>
                                            <div className="h-[40%] flex justify-center flex flex-col gap-y-2 z-10">
                                                <span className="font-bold text-zinc-500 text-[10px]">{p.mes}</span>
                                                <span className="font-bold text-zinc-500 text-xs">{p.profesor}</span>
                                                <span className="font-bold text-cbaBlue font-mono text-center">{p.nombre_paralelo}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) :
                                <div className="w-full h-96">
                                    <NoData
                                        fontSize={''}
                                        text={'No hay participaciones para este evento'}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Reportes;