import React from 'react';

const ListaPreciosCursos = (props) => {
    const { preciosCursos } = props;
    const columns = preciosCursos.columns;
    const rows = preciosCursos.rows;

    return (
        <div className="overflow-auto sm:overflow-visible">
            <br />
            <h2 className="text-2xl font-bold">PRECIOS DE NUESTROS CURSOS</h2>
            <table className="shadow-lg bg-white border-collapse w-5/6 sm:w-9/10 md:w-8/10 lg:w-7/10 xl:w-6/10 2xl:w-5/10 mx-auto text-center">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} className="bg-gray-200 border text-left px-8 py-4">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-100">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border px-8 py-4">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaPreciosCursos;
