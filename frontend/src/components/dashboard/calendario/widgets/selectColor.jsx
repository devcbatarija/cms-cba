import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const colors = [
  { nombre: 'Azul', color: '#0000FF' },
  { nombre: 'Verde', color: '#00FF00' },
  { nombre: 'Rojo', color: '#FF0000' },
  { nombre: 'Amarillo', color: '#FFFF00' },
  { nombre: 'Rosa', color: '#FF00FF' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SelectColorList({
  data,
  setData
}) {
  const [selected, setSelected] = useState(colors[0])
  useEffect(() => {
    setData({
      ...data,
      color: selected.color
    })
  }, [selected])
  useEffect(() => {
    if (data.color != '') {
      const color = colors.find(color => color.color === data.color);
      if (color) {
        setSelected(color);
      }
    }
  }, [])
  return (
    <Listbox value={selected} onChange={setSelected} >
      {({ open }) => (
        <>
          <div className="relative" style={{ flex: 1 }}>
            <Listbox.Button className="h-full relative w-full cursor-pointer rounded-md bg-white py-3 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="h-8 w-8 flex-shrink-0 rounded-full" style={{ backgroundColor: selected.color }} />
                <span className="ml-3 block truncate">{selected.nombre}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="grid grid-cols-3 absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {colors.map((color) => (
                  <Listbox.Option
                    key={color.color}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-zinc-200 text-white' : 'text-gray-900',
                        'relative cursor-pointer select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={color}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span className="h-5 w-5 flex-shrink-0 rounded-full" style={{ backgroundColor: color.color }} />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-white',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
