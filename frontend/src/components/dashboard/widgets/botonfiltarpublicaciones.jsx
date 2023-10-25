import React, { useState, useEffect, useRef } from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Button, Checkbox } from '@mui/material';
import Dropdown from '../calendario/dropdownButton';
import axios from 'axios';

const meses = [
    { id: 1, txt: 'Enero' },
    { id: 2, txt: 'Febrero' },
    { id: 3, txt: 'Marzo' },
    { id: 4, txt: 'Abril' },
    { id: 5, txt: 'Mayo' },
    { id: 6, txt: 'Junio' },
    { id: 7, txt: 'Julio' },
    { id: 8, txt: 'Agosto' },
    { id: 9, txt: 'Septiembre' },
    { id: 10, txt: 'Octubre' },
    { id: 11, txt: 'Noviembre' },
    { id: 12, txt: 'Diciembre' }
]
const FilterPublications = ({
    ActualizarFiltroPublicaciones
}) => {
    const [all, setAll] = useState(true);
    const [dayFilter, setDayFilter] = useState(false);
    const [monthFilter, setMonthFilter] = useState(false);
    const [isDropdownFilterOpen, setIsDropdownFilterOpen] = useState(false);
    const dropdownFilterRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState(meses[new Date().getMonth()]);
    const [allFilters, setAllFilters] = useState({
        allPublications: all,
        day: {
            day: new Date().getDate(),
            state: dayFilter
        },
        month: {
            month: selectedMonth.id,
            state: monthFilter
        },
        year: {
            year: new Date().getFullYear(),
            state: false
        }
    });

    const handleClickOutside = (event) => {
        if (dropdownFilterRef.current && !dropdownFilterRef.current.contains(event.target)) {
            setIsDropdownFilterOpen(false);
        }
    };
    const handleChangeDayFilter = async () => {
        setAllFilters({
            ...allFilters,
            day: {
                ...allFilters.day,
                state: !dayFilter
            },
            month: {
                ...allFilters.month,
                state: dayFilter == false ? !dayFilter : monthFilter,
            }
        })
        dayFilter == false && setMonthFilter(true);
        setDayFilter(!dayFilter)
    }
    const handleChangeMonthFilter = () => {
        dayFilter == false && (
            setAllFilters({
                ...allFilters,
                month: {
                    ...allFilters.month,
                    state: !monthFilter
                }
            }),
            setMonthFilter(!monthFilter)
        )
    }
    const handleChangeAllFilter = () => {
        setAllFilters({
            allPublications: !all,
            day: {
                day: new Date().getDate(),
                state: false
            },
            month: {
                month: selectedMonth.id,
                state: false
            },
            year: {
                year: new Date().getFullYear(),
                state: !all === true ? false : true
            }
        })
        setAll(!all);
        setDayFilter(false);
        setMonthFilter(false);
    }

    const handleChangeInput = (e) => {
        const property = e.target.name;
        const value = e.target.value;
        setAllFilters({
            ...allFilters,
            [property]: {
                ...allFilters[property],
                [property]: property == 'day' ? (value < 0 || value > new Date(allFilters.year.year, selectedMonth.id, 0).getDate()) ? allFilters.day.day : value :
                    (value < 0 || value > new Date().getFullYear()) ? allFilters.year.year : value,
            }
        })
    }
    const handleSelectMonth = (dato) => {
        setSelectedMonth(dato);
        setAllFilters({
            ...allFilters,
            day: {
                ...allFilters.day,
                day: allFilters.day.day > new Date(allFilters.year.year, dato.id, 0).getDate() ? new Date(allFilters.year.year, dato.id, 0).getDate() : allFilters.day.day,
            },
            month: {
                ...allFilters.month,
                month: dato.id
            }
        })
    }
    const saveFilters = async () => {
        const result = await axios.post(`publication/filters`, allFilters).then(res => {
            ActualizarFiltroPublicaciones(res.data.data);
            setIsDropdownFilterOpen(!isDropdownFilterOpen)
        })
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownFilterRef}>
            <Button
                id='dropdown-button'
                onClick={() => setIsDropdownFilterOpen(!isDropdownFilterOpen)}
            ><TuneRoundedIcon /> Filtros</Button>

            {isDropdownFilterOpen && (
                <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 z-50 w-[330px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className='w-full items-center flex justify-center p-2 border-b-2'>
                        <h1 className='text-cbaBlue font-bold'>Filtros de las publicaciones</h1>
                    </div>
                    <div className="p-3 items-center" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        <div className='flex flex-row items-center'>
                            <span className='w-6/12'>Todo:</span>
                            <div className='w-6/12 ml-[155px]'>
                                <Checkbox
                                    value={all}
                                    checked={all}
                                    onChange={handleChangeAllFilter}
                                />
                            </div>
                        </div>
                        <div className='flex flex-row items-center my-1'>
                            <span className='w-6/12'>Filtrar por dia:</span>
                            <div className='grid grid-cols-7 w-6/12'>
                                <div className='col-span-5 flex flex-row-reverse'>
                                    <input disabled={!dayFilter} min={1} max={new Date(allFilters.year.year, selectedMonth.id, 0).getDate()} type='number' id="small-input"
                                        value={allFilters.day.day}
                                        name='day'
                                        onChange={handleChangeInput}
                                        className={`${!dayFilter ? 'cursor-not-allowed' : ''} w-[70px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                                </div>
                                <div className='col-span-2 flex flex-row-reverse items-center'>
                                    <label className={`${all ? 'cursor-not-allowed' : 'cursor-pointer'} relative  items-center`}>
                                        <input type="checkbox" value={dayFilter} className={`sr-only peer`}
                                            checked={dayFilter}
                                            onChange={handleChangeDayFilter}
                                            disabled={all}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-200"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center my-1'>
                            <span className='w-6/12'>Filtrar por mes:</span>
                            <div className='grid grid-cols-7 w-6/12'>
                                <div className='col-span-5 flex flex-row-reverse'>
                                    <Dropdown
                                        handleFunction={handleSelectMonth}
                                        datos={meses}
                                        initialSelected={selectedMonth}
                                        disabled={!monthFilter}
                                    />
                                </div>
                                <div className='col-span-2 flex flex-row-reverse items-center'>
                                    <label className={`${all ? 'cursor-not-allowed' : 'cursor-pointer'} relative  items-center`}>
                                        <input type="checkbox" value={monthFilter} className="sr-only peer"
                                            checked={monthFilter}
                                            onChange={handleChangeMonthFilter}
                                            disabled={all}
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-200"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row items-center my-1'>
                            <span className='w-6/12'>Ir al año:</span>
                            <div className='w-4/12 flex flex-row-reverse ml-2'>
                                <input value={allFilters.year.year} disabled={all} min={2023} max={new Date().getFullYear()} type='number' id="small-input"
                                    name='year'
                                    onChange={handleChangeInput}
                                    className={`${all ? 'cursor-not-allowed' : ''} w-[70px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row-reverse pr-1 border-t-2'>
                        <button onClick={saveFilters} type="button" className="text-white bg-cbaBlue hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2 mr-2 my-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Listo</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPublications;
