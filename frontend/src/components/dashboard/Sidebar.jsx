import React, { useState, useEffect, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import "./sidebar.css";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import SchoolIcon from "@mui/icons-material/School";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import { Dialog, Transition } from "@headlessui/react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import cbaLogo from '../../assets/logo_cba_white.png'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function SidebarItem({ icon: Icon, label, to, subItems }) {
  const [open, setOpen] = useState(false); // Nuevo estado para controlar el submenú
  const handleOpen = () => setOpen(!open); // Función para manejar el clic

  return (
    <li>
      <button
        type="button"
        onClick={handleOpen}
        className="flex hover:bg-purple-600 hover:text-white items-center w-full py-2 px-0 text-base text-white transition    gap-4 duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <Icon className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white" />
        <span className="flex-1 ml-3 text-left whitespace-nowrap">{label}</span>
      </button>
      {open && subItems && (
        <ul className={` ${open ? "" : "hidden"}`}>
          {subItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="flex items-center w-full py-2 px-0 hover:text-purple-900 text-white transition 
                duration-75 rounded-lg pl-1 sm:pl-2 md:pl-11  gap-6   sm:gap-4
                 group hover:bg-green-300 dark:text-white dark:hover:bg-gray-700"
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Sidebar({
  sidebarOpen,
  toggleSideBarOpen
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 " style={{ background: `linear-gradient(135deg, #000000, #434343` }}>
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex items-center h-16 flex-shrink-0 px-4 justify-center border-b-[1px] ">
          <img
            className="h-10 w-auto"
            src={cbaLogo}
            alt="cba"
          />
        </div>
        <ul className="space-y-2 font-medium sm:px-5 md:px-3 py-4">
          <NavLink to="/dashboard">
            <button
              type="button"
              className="hover:bg-purple-600 flex items-center w-full py-2 px-0 text-base text-white transition  gap-4 duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <DashboardIcon className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"></DashboardIcon>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Dashboard
              </span>
            </button>
          </NavLink>
          <SidebarItem
            icon={PersonOutlineOutlinedIcon}
            label="Usuarios"
            subItems={[
              {
                label: "Table",
                to: "/dashboard/tableuser",
                icon: <TocRoundedIcon></TocRoundedIcon>,
              },
            ]}
          />
          <SidebarItem
            icon={BookRoundedIcon}
            label="Publicaciones"
            subItems={[
              {
                label: "Tabla",
                to: "/dashboard/publinav/table",
                icon: <TocRoundedIcon></TocRoundedIcon>,
              },
              {
                label: "Crear nueva",
                to: "/dashboard/publinav/add",
                icon: <BookmarkAddRoundedIcon></BookmarkAddRoundedIcon>,
              },
            ]}
          />
          <SidebarItem
            icon={BookRoundedIcon}
            label="Becas"
            subItems={[
              {
                label: "Tabla",
                to: "/dashboard/becanav/table",
                icon: <TocRoundedIcon></TocRoundedIcon>,
              },
              {
                label: "Crear nueva",
                to: "/dashboard/becanav/add",
                icon: <BookmarkAddRoundedIcon></BookmarkAddRoundedIcon>,
              },
            ]}
          />
          <SidebarItem
            icon={CalendarMonthRoundedIcon}
            label="Calendario"
            subItems={[
              {
                label: "Calendario",
                to: "/dashboard/Calendario/",
                icon: <CalendarTodayRoundedIcon></CalendarTodayRoundedIcon>,
              },
              {
                label: "Crear Evento",
                to: "/dashboard/Calendario/addEvent",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
              },
              {
                label: "Tabla de eventos",
                to: "/dashboard/Calendario/eventsTable",
                icon: <StorageRoundedIcon />,
              },
            ]}
          />
          <SidebarItem
            icon={SchoolIcon}
            label="Programas"
            subItems={[
              {
                label: "Tabla",
                to: "/dashboard/program/tableprogram",
                icon: <TocRoundedIcon></TocRoundedIcon>,
              },
              {
                label: "Crear nuevo",
                to: "/dashboard/program/add",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
              },
              {
                label: "Crear precios",
                to: "/dashboard/program/precio",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
              },
            ]}
          />
          <SidebarItem
            icon={CollectionsRoundedIcon}
            label="American Spaces"
            subItems={[
              {
                label: "Tabla",
                to: "/dashboard/spaces/table",
                icon: <TocRoundedIcon></TocRoundedIcon>,
              },
              {
                label: "Crear ambiente",
                to: "/dashboard/spaces/ambienteAdd",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
              },
              {
                label: "Agregar imagen",
                to: "/dashboard/spaces/imageadd",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
              }
            ]}
          />
          <NavLink to="/dashboard/spotify/podcast">
            <button
              type="button"
              className="hover:bg-purple-600 flex items-center w-full py-2 px-0 text-base text-white transition   gap-4  duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <PlayCircleRoundedIcon className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"></PlayCircleRoundedIcon>
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Podcasts
              </span>
            </button>
          </NavLink>
          <SidebarItem
            icon={AssessmentOutlinedIcon}
            label="Testimonios"
            subItems={[
              {
                label: "Tabla",
                to: "/dashboard/testimonio/table",
                icon: <TocRoundedIcon></TocRoundedIcon>,
              },
              {
                label: "Crear testimonio",
                to: "/dashboard/testimonio/add",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
              }
            ]}
          />
        </ul>

      </div>

      {/* 
      <div
        style={{ background: "#131133" }}
        className="min-screen px-1 sm:px-5 md:px-3 py-4"
      >
        
      </div> */}



      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={toggleSideBarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-64 w-full pb-4" style={{ background: `linear-gradient(135deg, #000000, #434343` }}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 text-white flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={toggleSideBarOpen}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <CloseRoundedIcon />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex items-center h-16 flex-shrink-0 px-4 justify-center border-b-[1px]">
                <img
                  className="h-10 w-auto"
                  src={cbaLogo}
                  alt="cba"
                />
              </div>
              <ul className="space-y-2 font-medium sm:px-5 md:px-3 py-4">
                <NavLink to="/dashboard">
                  <button
                    type="button"
                    className="hover:bg-purple-600 flex items-center w-full py-2 px-0 text-base text-white transition  gap-4 duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <DashboardIcon className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"></DashboardIcon>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Dashboard
                    </span>
                  </button>
                </NavLink>
                <SidebarItem
                  icon={PersonOutlineOutlinedIcon}
                  label="Usuarios"
                  subItems={[
                    {
                      label: "Table",
                      to: "/dashboard/tableuser",
                      icon: <TocRoundedIcon></TocRoundedIcon>,
                    },
                  ]}
                />
                <SidebarItem
                  icon={BookRoundedIcon}
                  label="Publicaciones"
                  subItems={[
                    {
                      label: "Tabla",
                      to: "/dashboard/publinav/table",
                      icon: <TocRoundedIcon></TocRoundedIcon>,
                    },
                    {
                      label: "Crear nueva",
                      to: "/dashboard/publinav/add",
                      icon: <BookmarkAddRoundedIcon></BookmarkAddRoundedIcon>,
                    },
                  ]}
                />
                <SidebarItem
                  icon={BookRoundedIcon}
                  label="Becas"
                  subItems={[
                    {
                      label: "Tabla",
                      to: "/dashboard/becanav/table",
                      icon: <TocRoundedIcon></TocRoundedIcon>,
                    },
                    {
                      label: "Crear nueva",
                      to: "/dashboard/becanav/add",
                      icon: <BookmarkAddRoundedIcon></BookmarkAddRoundedIcon>,
                    },
                  ]}
                />
                <SidebarItem
                  icon={CalendarMonthRoundedIcon}
                  label="Calendario"
                  subItems={[
                    {
                      label: "Calendario",
                      to: "/dashboard/Calendario/",
                      icon: <CalendarTodayRoundedIcon></CalendarTodayRoundedIcon>,
                    },
                    {
                      label: "Crear Evento",
                      to: "/dashboard/Calendario/addEvent",
                      icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
                    },
                    {
                      label: "Tabla de eventos",
                      to: "/dashboard/Calendario/eventsTable",
                      icon: <StorageRoundedIcon />,
                    },
                  ]}
                />
                <SidebarItem
                  icon={SchoolIcon}
                  label="Programas"
                  subItems={[
                    {
                      label: "Tabla",
                      to: "/dashboard/program/tableprogram",
                      icon: <TocRoundedIcon></TocRoundedIcon>,
                    },
                    {
                      label: "Crear nuevo",
                      to: "/dashboard/program/add",
                      icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
                    },
                    {
                      label: "Crear precios",
                      to: "/dashboard/program/precio",
                      icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
                    },
                  ]}
                />
                <SidebarItem
                  icon={CollectionsRoundedIcon}
                  label="American Spaces"
                  subItems={[
                    {
                      label: "Tabla",
                      to: "/dashboard/spaces/table",
                      icon: <TocRoundedIcon></TocRoundedIcon>,
                    },
                    {
                      label: "Crear ambiente",
                      to: "/dashboard/spaces/ambienteAdd",
                      icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
                    },
                    {
                      label: "Agregar imagen",
                      to: "/dashboard/spaces/imageadd",
                      icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
                    }
                  ]}
                />
                <NavLink to="/dashboard/spotify/podcast">
                  <button
                    type="button"
                    className="hover:bg-purple-600 flex items-center w-full py-2 px-0 text-base text-white transition   gap-4  duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <PlayCircleRoundedIcon className="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white dark:text-gray-400 dark:group-hover:text-white"></PlayCircleRoundedIcon>
                    <span className="flex-1 ml-3 text-left whitespace-nowrap">
                      Podcasts
                    </span>
                  </button>
                </NavLink>
                <SidebarItem
                  icon={AssessmentOutlinedIcon}
                  label="Testimonios"
                  subItems={[
                    {
                      label: "Tabla",
                      to: "/dashboard/testimonio/table",
                      icon: <TocRoundedIcon></TocRoundedIcon>,
                    },
                    {
                      label: "Crear testimonio",
                      to: "/dashboard/testimonio/add",
                      icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
                    }
                  ]}
                />
              </ul>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
