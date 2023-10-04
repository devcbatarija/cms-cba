import React from 'react';

const ServicioComponent = ({ titulo, contenido, imagenUrl,numero }) => {
    return (
        <>
        {numero ===2 ?(
            <div className="program-container flex flex-col p-5 md:flex-row lg:flex-row items-center justify-center border-b border-gray-300">
                <div className="ImagenPrincipal w-full md:w-1/2  p-1">
                <div style={{
                    backgroundImage: `url("${imagenUrl}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "50vh",
                    width: "100%"
                }}>
                </div>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 md:mt-4 text-justify pb-3 pl-3 pr-3 pt-3">
                <strong><h2 style={{ color: "red" }}>{titulo}</h2></strong>
                <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 justify-center flex-col md:flex-row justify-center '>
                    <p className="text-2xl font-bold text-black">{contenido.title}</p>
                    <div className='text-justify'>
                        <p>{contenido.text}</p>
                    </div>
                </div>
            </div>
            
        </div>):(
            <div className="program-container flex flex-col p-5 md:flex-row lg:flex-row items-center justify-center border-b border-gray-300">
            <div className="mt-4 md:mt-0 md:ml-4 md:w-1/2 md:mt-4 text-justify pb-3 pl-3 pr-3 pt-3">
                <strong><h2 style={{ color: "red" }}>{titulo}</h2></strong>
                <div className='w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 justify-center flex-col md:flex-row justify-center '>
                    <p className="text-2xl font-bold text-black">{contenido.title}</p>
                    <div className='text-justify'>
                        <p>{contenido.text}</p>
                    </div>
                </div>
            </div>
            <div className="ImagenPrincipal w-full md:w-1/2  p-1">
                <div style={{
                    backgroundImage: `url("${imagenUrl}")`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "50vh",
                    width: "100%"
                }}>
                </div>
            </div>
        </div>
        )}
        </>
    );
}

export default ServicioComponent;
