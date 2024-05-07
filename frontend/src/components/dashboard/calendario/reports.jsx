import { useNavigate, useParams } from "react-router-dom";
import back from '../../../assets/backgroundSVG/radiant-gradient.svg';
import { useEffect, useState } from "react";
import axios from "axios";
import NoData from "./widgets/noData";

const Reportes = () => {
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
        navigate(`/dashboard/Calendario/ReportsByStudents?idEv=${eventId}&paralelo=${paralelo}`)
    }

    return (
        <>
            <div className="w-full min-h-screen bg-zinc-100">
                <div className="px-20 py-8">
                    <div className="flex flex-row flex-wrap justify-center items-center gap-5">
                        {
                            paralels.length > 0 ?
                                paralels.map((p, index) => (
                                    <div key={index}
                                        className="h-60 w-60 rounded-3xl bg-white shadow-lg  relative overflow-hidden p-2"
                                        onClick={() => verEstudiantes(p.nombre_paralelo)}
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
                                            style={{ backgroundImage: `url(${back})` }}
                                        >
                                            <div className="h-[60%] flex flex-col items-center justify-center">
                                                <span className="font-semibold text-zinc-200 text-sm">Referidos</span>
                                                <span className="text-5xl font-extrabold text-green-200">{p.cantidad_uso}</span>
                                            </div>
                                            <div className="h-[40%] flex justify-center flex flex-col gap-y-2 z-10">
                                                <span className="font-semibold text-zinc-200 text-[10px]">{p.mes}</span>
                                                <span className="font-semibold text-zinc-200 text-xs">{p.profesor}</span>
                                                <span className="font-bold text-zinc-50 ">{p.nombre_paralelo}</span>
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