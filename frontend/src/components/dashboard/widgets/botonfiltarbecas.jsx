import React, { useState, useEffect, useRef } from 'react';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Button, Checkbox } from '@mui/material';
import Dropdown from '../calendario/dropdownButton';
import axios from 'axios';

/* ---------- Paleta institucional CBA (misma que Home.jsx / About.jsx / Publications.jsx) ---------- */
const CBA_ROJO = "#D50032";
const CBA_NAVY = "#002E5F";
const CBA_GRIS = "#DEDEDE";

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

/* ---------- Switch reutilizable con el acento institucional (mismo markup/comportamiento que el original) ---------- */
const InterruptorAcento = ({ checked, onChange, disabled, acento }) => (
    <label className={`${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} relative inline-flex items-center`}>
        <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
        />
        <div
            className="w-9 h-5 bg-gray-200 rounded-full peer transition-colors duration-200
            peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px]
            after:bg-white after:border after:border-gray-300 after:rounded-full after:h-4 after:w-4 after:transition-all"
            style={checked ? { backgroundColor: acento } : {}}
        />
    </label>
);

const FilterBecas = ({
    ActualizarFiltroBecas
}) => {
    const [all, setAll] = useState(true);
    const [dayFilter, setDayFilter] = useState(false);
    const [monthFilter, setMonthFilter] = useState(false);
    const [isDropdownFilterOpen, setIsDropdownFilterOpen] = useState(false);
    const dropdownFilterRef = useRef(null);
    const [selectedMonth, setSelectedMonth] = useState(meses[new Date().getMonth()]);
    const [allFilters, setAllFilters] = useState({
        allBecas: all,
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
            allBecas: !all,
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
        const result = await axios.post(`beca/filters`, allFilters).then(res => {
            ActualizarFiltroBecas(res.data.data);
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
                sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: isDropdownFilterOpen ? '#fff' : CBA_NAVY,
                    backgroundColor: isDropdownFilterOpen ? CBA_NAVY : 'transparent',
                    border: `1.5px solid ${CBA_NAVY}`,
                    borderRadius: '9999px',
                    px: 2.2,
                    py: 0.7,
                    gap: 0.5,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: CBA_NAVY,
                        color: '#fff',
                        borderColor: CBA_NAVY,
                    },
                }}
            >
                <TuneRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} />
                Filtros
            </Button>

            {isDropdownFilterOpen && (
                <div
                    id="dropdown-menu"
                    className="origin-top-right absolute right-0 mt-2 z-50 w-[330px] rounded-2xl shadow-xl bg-white
                    ring-1 ring-black ring-opacity-5 overflow-hidden animate-[fadeIn_0.15s_ease-out]"
                >
                    {/* Barra superior de acento, mismo criterio que tarjetas/modales del resto del sitio */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: CBA_ROJO }} />

                    <div className='w-full flex flex-col items-center px-4 pt-4 pb-3 border-b border-gray-100'>
                        <h1 className='font-bold text-base' style={{ color: CBA_NAVY }}>
                            Filtros de las becas
                        </h1>
                        <div className="w-8 h-0.5 mt-2 rounded-full" style={{ backgroundColor: CBA_ROJO }} />
                    </div>

                    <div className="p-4 space-y-3" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                        <div className='flex flex-row items-center justify-between'>
                            <span className='text-sm font-medium text-gray-700'>Todo:</span>
                            <Checkbox
                                value={all}
                                checked={all}
                                onChange={handleChangeAllFilter}
                                sx={{
                                    color: CBA_GRIS,
                                    '&.Mui-checked': { color: CBA_NAVY },
                                }}
                            />
                        </div>

                        <div className='flex flex-row items-center justify-between'>
                            <span className='text-sm font-medium text-gray-700'>Filtrar por día:</span>
                            <div className='flex flex-row items-center gap-3'>
                                <input
                                    disabled={!dayFilter}
                                    min={1}
                                    max={new Date(allFilters.year.year, selectedMonth.id, 0).getDate()}
                                    type='number'
                                    id="small-input"
                                    value={allFilters.day.day}
                                    name='day'
                                    onChange={handleChangeInput}
                                    className={`${!dayFilter ? 'cursor-not-allowed opacity-60' : ''} w-[64px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs
                                    focus:outline-none focus:ring-2 transition-shadow`}
                                    style={{ '--tw-ring-color': CBA_NAVY }}
                                    onFocus={(e) => (e.target.style.borderColor = CBA_NAVY)}
                                    onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                                />
                                <InterruptorAcento
                                    checked={dayFilter}
                                    onChange={handleChangeDayFilter}
                                    disabled={all}
                                    acento={CBA_NAVY}
                                />
                            </div>
                        </div>

                        <div className='flex flex-row items-center justify-between'>
                            <span className='text-sm font-medium text-gray-700'>Filtrar por mes:</span>
                            <div className='flex flex-row items-center gap-3'>
                                <Dropdown
                                    handleFunction={handleSelectMonth}
                                    datos={meses}
                                    initialSelected={selectedMonth}
                                    disabled={!monthFilter}
                                />
                                <InterruptorAcento
                                    checked={monthFilter}
                                    onChange={handleChangeMonthFilter}
                                    disabled={all}
                                    acento={CBA_NAVY}
                                />
                            </div>
                        </div>

                        <div className='flex flex-row items-center justify-between'>
                            <span className='text-sm font-medium text-gray-700'>Ir al año:</span>
                            <input
                                value={allFilters.year.year}
                                disabled={all}
                                min={2023}
                                max={new Date().getFullYear()}
                                type='number'
                                id="small-input"
                                name='year'
                                onChange={handleChangeInput}
                                className={`${all ? 'cursor-not-allowed opacity-60' : ''} w-[70px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs
                                focus:outline-none focus:ring-2 transition-shadow`}
                                onFocus={(e) => (e.target.style.borderColor = CBA_NAVY)}
                                onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row-reverse px-4 py-3 border-t border-gray-100 bg-gray-50'>
                        <button
                            onClick={saveFilters}
                            type="button"
                            className="text-white font-semibold rounded-full text-sm px-5 py-2 transition-all duration-200
                            shadow-sm hover:opacity-90 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{ backgroundColor: CBA_NAVY }}
                        >
                            Listo
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterBecas;