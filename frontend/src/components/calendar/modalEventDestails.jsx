import dayjs from "dayjs";
import { useEffect } from "react";

const ModalEventDestils = ({
    toggleOpenModalEventDetails,
    event,
    handleChangeEvent
}) => {
    const convertDate = (fech) => {
        const newFecha = new Date(fech);
        return newFecha.toLocaleString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };
    useEffect(() => {
        // console.log(event)
    }, [])
    return (
        <div onClick={toggleOpenModalEventDetails}
            className="z-10 inset-0 backdrop-blur-sm bg-cbaBlue/20 fixed justify-center items-center flex">
            <div className={'bg-white h-[30%] w-[95%] md:w-[65%] lg:w-[50%] rounded-xl shadow-xl relative overflow-hidden'}>                      {/*modal*/}
                <button
                    onClick={toggleOpenModalEventDetails}
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
                <div className={'flex flex-col justify-center items-center py-5 px-5 h-full w-full gap-y-2 text-zinc-600'}>
                    <h2 className={'font-extrabold text-zinc-500 text-xl uppercase mb-3'}
                        style={{ color: event.color }}>{event.title}</h2>
                    {
                        event.start == event.end ?
                            <>
                                <div className="flex flex-row gap-5 items-center sm:text-lg">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>

                                    </span>
                                    <span className="font-bold ">{dayjs(event.start).format('DD')}</span>
                                    <span className="font-bold border-x-2 px-5 capitalize border-zinc-400">{dayjs(event.start).format('MMMM')}</span>
                                    <span className="font-bold ">{dayjs(event.start).format('YYYY')}</span>
                                </div>
                                {
                                    !event.allDay &&
                                    <div className="flex flex-row items-center sm:gap-x-6 md:gap-x-2 sm:mt-2 md:mt-0 text-zinc-500 text-sm font-mono">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </span>
                                        <span className="text-md font-semibold">{
                                            `${event.start_Time} - ${event.end_Time}`
                                        }</span>
                                    </div>
                                }
                            </> :
                            <>
                                <div className="flex flex-col sm:flex-row items-center gap-x-3">
                                    <span className="font-mono capitalize"><span className="font-extrabold font-sans mr-3">Inicia:</span>{convertDate(event.start)}</span>
                                    {
                                        !event.allDay &&
                                        <>
                                            <span className=" hidden sm:block">-</span>
                                            <div className="flex flex-row items-center sm:gap-x-6 md:gap-x-2 sm:mt-2 md:mt-0 text-zinc-500 text-sm font-mono">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </span>
                                                <span className="text-md font-semibold">
                                                    {event.start_Time}
                                                </span>
                                            </div>
                                        </>
                                    }
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-x-3">
                                    <span className="font-mono capitalize"><span className="font-extrabold font-sans mr-3">Termina:</span>{convertDate(event.end)}</span>
                                    {
                                        !event.allDay &&
                                        <>
                                            <span className=" hidden sm:block">-</span>
                                            <div className="flex flex-row items-center sm:gap-x-6 md:gap-x-2 sm:mt-2 md:mt-0 text-zinc-500 text-sm font-mono">
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                </span>
                                                <span className="text-md font-semibold">
                                                    {event.end_Time}
                                                </span>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    );
}

export default ModalEventDestils;