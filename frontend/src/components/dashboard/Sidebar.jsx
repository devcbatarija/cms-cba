import React, { useState, useEffect } from "react";
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
import PositionedMenu from "../navBar/positionedMenu";
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';

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

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <>
      <div
        style={{ background: "#131133" }}
        className="min-screen px-1 sm:px-5 md:px-3 py-4"
      >
        <ul className="space-y-2 font-medium">
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
                to: "/dashboard/Calendario/calendario",
                icon: <CalendarTodayRoundedIcon></CalendarTodayRoundedIcon>,
              },
              {
                label: "Crear Evento",
                to: "/dashboard/Calendario/addEvent",
                icon: <AddBoxRoundedIcon></AddBoxRoundedIcon>,
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
    </>
  );
}
