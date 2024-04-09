import React, { useState, useEffect, useRef } from 'react';

const DropdownTypeQR = ({
    handleFunction,
    datos,
    initialSelected,
    disabled
}) => {
    const [selected, setSelected] = useState(initialSelected)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    const handleClickItem = (dato) => {
        setSelected(dato);
        handleFunction(dato)
        setTimeout(() => { setIsDropdownOpen(false) }, 500)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                disabled={disabled}
                id="dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${disabled ? 'cursor-not-allowed' : ''} flex flex-col justify-center items-center w-full px-3 py-1 text-[10px] font-medium text-white bg-cbaBlue rounded-r-md`}
            >
                {selected.txt}
                <div className=''>
                    {
                        isDropdownOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                            </svg>

                            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>

                    }
                </div>

            </button>
            {isDropdownOpen && (
                <div id="dropdown-menu" className="max-h-72 overflow-auto origin-top-right absolute right-0 mt-2 z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        {datos.map((dato) => (
                            <a key={dato.id} className={`${selected.id === dato.id ? 'bg-blue-100' : ''} flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer`} role="menuitem"
                                onClick={() => handleClickItem(dato)}
                            >
                                {dato.txt}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownTypeQR;
