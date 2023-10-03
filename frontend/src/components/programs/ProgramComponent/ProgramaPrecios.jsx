import React from 'react';

const ListaPreciosCursos = (props) => {
    const { preciosCursos } = props;

    return (
        <div>
            <br />
            <h2 className="text-2xl font-bold">PRECIOS DE NUESTROS CURSOS</h2>
            <table className="border-collapse w-full sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto text-center">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-300 text-black">Curso</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-black">Horario</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-black">Modalidad</th>
                        <th className="py-2 px-4 border-b border-gray-300 text-black">Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {preciosCursos.map((curso, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b border-gray-300">{curso.nombre}</td>
                            <td className="py-2 px-4 border-b border-gray-300">{curso.horario}</td>
                            <td className="py-2 px-4 border-b border-gray-300">{curso.modalidad}</td>
                            <td className="py-2 px-4 border-b border-gray-300">{curso.costo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListaPreciosCursos;
