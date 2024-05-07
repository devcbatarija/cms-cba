import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ReportsByStudents = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const idEv = queryParams.get('idEv');
    const paralelo = queryParams.get('paralelo');
    const [students, setStudents] = useState([])
    useEffect(() => {
        axios.get(`QR/report/students/${idEv}/${paralelo}`).then(res => {
            if (res.data.data.length > 0) {
                setStudents(res.data.data)
                console.log(res.data.data);
            }
        })
    }, [])
    return (
        <>
            <div className="w-full min-h-screen bg-zinc-100 px-10 py-5">
                <div className="flex flex-col gap-y-2 items-center justify-center">
                    {
                        students.length > 0 ?
                            students.map((std, index) => (
                                <div key={index} className={`w-full items-center p-2 flex flex-row ${index==0?'h-20':index==1?'h-16':index==2?'h-14':'h-12'} bg-white rounded-lg shadow- text-zinc-500 font-semibold text-xs transition 
                                ease-in-out delay-150 duration-500 hover:scale-[1.0070] hover:shadow-lg`}>
                                    <div className="w-[35%] uppercase flex justify-center">
                                        <span className="text-center">{std.nombre_estudiante}</span>
                                    </div>
                                    <div className="w-[5%] text-sm font-extrabold flex justify-center text-green-300">
                                        <span>{std.cantidad_uso}</span>
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