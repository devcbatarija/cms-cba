import React from 'react';

const CBA_NAVY = '#002E5F';
const CBA_ROJO = '#D50032';

const ListaPreciosCursos = ({ preciosCursos }) => {
  if (!preciosCursos || !preciosCursos.columns || preciosCursos.columns.length === 0) {
    return null;
  }

  const { columns, rows } = preciosCursos;

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold uppercase tracking-wide text-center" style={{ color: CBA_NAVY }}>
        Precios
      </h3>
      <span
        className="block w-12 h-1 rounded-full mx-auto mt-2 mb-6"
        style={{ backgroundColor: CBA_ROJO }}
      />

      <div className="w-full overflow-x-auto rounded-xl shadow-md border border-gray-100">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: CBA_NAVY }}>
              {columns.map((col, i) => (
                <th key={i} className="p-3 text-white text-sm font-semibold uppercase tracking-wide">
                  {typeof col === 'string' ? col : col?.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows && rows.map((row, ri) => (
              <tr
                key={ri}
                className={`${ri % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-red-50/40 transition-colors`}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="p-3 text-center border-b border-gray-200 text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaPreciosCursos;