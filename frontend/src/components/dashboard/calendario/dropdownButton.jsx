import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({
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
        setTimeout(()=>{setIsDropdownOpen(false)},500)
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
                onClick={() =>setIsDropdownOpen(!isDropdownOpen)}
                className={`${disabled?'cursor-not-allowed':''} inline-flex justify-center w-full px-3 py-1 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm ${selected.view ? 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500' : ''}`}
            >
                {selected.txt}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
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

export default Dropdown;
