import React, { useState, useEffect, useRef } from 'react';

const DropDownSelect = ({
    handleFunction,
    datos,
    initialSelected,
    disabled,
    containerClass,
    modalClass,
    inputText
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
        handleFunction(dato.value)
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
            <div
                disabled={disabled}
                id="dropdown-button"
                // onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`${disabled ? 'cursor-not-allowed' : ''} flex flex-row justify-center items-center ${containerClass}`}
            >
                <div className='w-auto flex justify-center items-center'>
                    <input style={{
                        border: 'none',
                        outline: 'none',
                        boxShadow: 'none',
                        padding: 0,
                        appearance:'none'
                    }}
                        className='w-8 bg-transparent flex justify-center items-center' type="text" value={inputText} onChange={(e) => handleFunction(e.target.value)} />
                </div>
                <div className='hover:bg-zinc-100 rounded-full p-[2px] cursor-pointer' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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

            </div>
            {isDropdownOpen && (
                <div id="dropdown-menu" className={`${modalClass} overflow-hidden absolute z-50 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5`}>
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

export default DropDownSelect;
