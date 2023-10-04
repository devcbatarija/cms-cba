import React, { useState, useEffect, useRef } from 'react';

const views = [
    { id: 1, view: 'dayGridMonth', name: 'Mes' },
    { id: 2, view: 'timeGridWeek', name: 'Semana' },
    { id: 3, view: 'multiMonthYear', name: 'Año' }
]

const Dropdown = ({
    calendarRef
}) => {
    const [selected, setSelected] = useState(views[0])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    const changeView = (view) => {
        setIsDropdownOpen(false);
        setSelected(view);
        let calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view.view);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                id="dropdown-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex justify-center w-full px-4 py-1 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
            >
                {selected.name}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isDropdownOpen && (
                <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        {views.map((view) => (
                            <a key={view.id} className={`${selected == view ? 'bg-blue-100' : ''} flex block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer`} role="menuitem"
                                onClick={() => changeView(view)}
                            >
                                {view.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
