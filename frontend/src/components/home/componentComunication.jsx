import React from 'react'

const ComponentComunication = () => {
  return (
    <div
        style={{ minHeight: "40vh" }}
        className="grid 
        grid-cols-1 sm:grid-cols-2 
        md:grid-cols-3 min-h-full px-2 sm:px-16 bg-white gap-4 bg-zinc-50"
      >
        <div className="rounded-lg shadow-md  bg-white">
          <div className="p-6">
            <h2 className="text-2x1 font-semibold">Comunicación</h2>
            <p className="mb-4 text-gray-700 text-justify">
              Comunícate con nosotros a través de nuestros canales oficiales o
              puedes dirigirte a nuestra oficina central ubicada en la Calle 15
              de Abril entre Junin y Oconnor
            </p>
            <a href="#" className="text-blue-900 font-bold hover:text-blue-700">
              Contactanos
            </a>
          </div>
        </div>

        <div className="rounded-lg shadow-md  bg-white">
          <div className="p-6">
            <h2 className="text-2x1 font-semibold">Soporte</h2>
            <p className="mb-4 text-gray-700 text-justify">
              Comunícate con nosotros a través de nuestros canales oficiales o
              puedes dirigirte a nuestra oficina central ubicada en la Calle 15
              de Abril entre Junin y Oconnor
            </p>
            <a href="#" className="text-blue-900 font-bold hover:text-blue-700">
              Contactanos
            </a>
          </div>
        </div>

        <div className="rounded-lg shadow-md  bg-white">
          <div className="p-6">
            <h2 className="text-2x1 font-semibold">Medios de pago</h2>
            <p className="mb-4 text-gray-700 text-justify ">
              Comunícate con nosotros a través de nuestros canales oficiales o
              puedes dirigirte a nuestra oficina central ubicada en la Calle 15
              de Abril entre Junin y Oconnor
            </p>
            <a href="#" className="text-blue-900 font-bold hover:text-blue-700">
              Contactanos
            </a>
          </div>
        </div>
      </div>
  )
}

export default ComponentComunication
