import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BtnGoBack from "./widgets/btnGoBack";
import DownloadReports from "./widgets/downloadReport";

const ReportsByStudents = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idEv = queryParams.get('idEv');
    const paralelo = queryParams.get('paralelo');
    const eventTitle = queryParams.get('event');
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get(`QR/report/students/${idEv}/${paralelo}`).then(res => {
            if (res.data.data.length > 0) {
                setStudents(res.data.data)
            }
        })
    }, [])
    return (
        <>
            <div className="w-full min-h-screen bg-zinc-100 px-10 lg:px-10 xl:px-20 py-5">
                <div className="py-2 flex sm:justify-center items-center relative mb-5">
                    <BtnGoBack defaultPage={'/dashboard/Calendario/eventsTable'} />
                    <span className="grow font-extrabold uppercase text-zinc-500 text-sm sm:text-base md:text-lg text-center">Estudiantes que participaron en el evento</span>
                </div>
                {
                    students.length > 0 &&
                    <div className="flex justify-end mb-5">
                        <DownloadReports
                            requestUrl={'QR/report/downloadReportStudents'}
                            FileName={`Students_Report_paralel-${paralelo}_event-${eventTitle}`}
                            data={students}
                        />
                    </div>
                }
                <div className="w-full text-xs flex flex-row items-center uppercase text-zinc-500 font-bold px-2 md:px-10 h-14 mb-2 rounded-tl-2xl rounded-tr-2xl bg-[#F8FAFC] shadow shadow-teal-50">
                    <div className="w-[5%]">
                        <span></span>
                    </div>
                    <div className="w-[30%] justify-center flex px-2">
                        <span className="text-center">Estudiante</span>
                    </div>
                    <div className="w-[25%] flex justify-center text-center px-2">
                        <span>Paralelo</span>
                    </div>
                    <div className="w-[20%] flex justify-center text-center px-2">
                        <span className="">Modulo</span>
                    </div>
                    <div className="w-[20%] px-2">
                        <span className=" ">REFERIDOS</span>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    {
                        students.length > 0 ?
                            students.map((std, index) => (
                                <div key={index} className={` items-center py-2 px-2 md:px-10 flex flex-row ${std.cantidad_uso <= 0 ? 'h-12 w-[95%]' : index == 0 ? 'h-16 hover:shadow-green-200 shadow-green-200 shadow-md w-full' : 'h-12 w-[95%]'} bg-white rounded-lg shadow- text-zinc-500 font-semibold text-xs transition 
                                ease-in-out delay-150 duration-500 hover:scale-[1.0070] hover:shadow-lg tracking-wide`}>
                                    <div className="w-[5%]">
                                        <span>{index + 1}</span>
                                    </div>
                                    <div className="w-[30%] uppercase flex px-2">
                                        <span className="text-center">{std.nombre_estudiante}</span>
                                    </div>
                                    <div className="w-[25%] flex justify-center text-center px-2">
                                        <span>{std.paralelo}</span>
                                    </div>
                                    <div className="w-[20%] flex justify-center text-center px-2">
                                        <span className="capitalize">{std.mes_literal} - {std.gestion}</span>
                                    </div>
                                    <div className="w-[20%] text-base font-mono font-extrabold flex flex-row justify-center items-center gap-x-2 xl:gap-x-[30px] text-green-300 px-2">
                                        <span className="capitalize font-bold text-zinc-500 text-xs">REFERIDOS</span>
                                        <span className={`h-8 w-8 rounded-lg flex justify-center items-center border-2 ${std.cantidad_uso <= 0 ? 'text-red-300  border-red-300' : 'text-green-300 border-green-300 '}`}>{std.cantidad_uso}</span>
                                    </div>
                                </div>
                            )) :
                            <></>
                    }
                </div>
            </div>
        </>
    );
}

export default ReportsByStudents;