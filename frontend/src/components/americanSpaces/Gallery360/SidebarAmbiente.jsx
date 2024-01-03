const SidebarAmbiente = ({ ambientes, handleSelectedAmbiente }) => {
    return (
        <div>
            {ambientes &&
                ambientes.map((a) => {
                    return (
                        <div key={a.id_ambiente} className="mb-2">
                            <button
                                onClick={() => handleSelectedAmbiente(a)}
                                className="w-full text-center uppercase text-gray-700 font-bold py-2 px-4 border-b border-gray-300"
                            >
                                {a.nombre}
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default SidebarAmbiente;
