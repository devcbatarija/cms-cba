import React, { useState, Fragment, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BookRoundedIcon from "@mui/icons-material/BookRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import SchoolIcon from "@mui/icons-material/School";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import TocRoundedIcon from "@mui/icons-material/TocRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { useSelector } from "react-redux";
import cbaLogo from "../../assets/logo_cba_white.png";

function SidebarItem({ icon: Icon, label, subItems }) {
  const location = useLocation();
  const isAnySubActive = subItems?.some((item) =>
    location.pathname.startsWith(item.to)
  );
  const [open, setOpen] = useState(isAnySubActive);

  useEffect(() => {
    if (isAnySubActive) setOpen(true);
  }, [location.pathname, isAnySubActive]);

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center w-full px-4 py-3 rounded-full transition-all duration-200 group gap-3 ${
          isAnySubActive
            ? "bg-white text-[#002E5F] shadow-md"
            : "text-[#B8C4D9] hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon
          sx={{ fontSize: 20 }}
          className={`flex-shrink-0 ${isAnySubActive ? "text-[#D50032]" : "text-[#B8C4D9] group-hover:text-white"}`}
        />
        <span className="flex-1 text-sm text-left font-medium">{label}</span>
        <ExpandMoreRoundedIcon
          sx={{ fontSize: 16 }}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""} ${
            isAnySubActive ? "text-[#002E5F]/50" : "text-[#B8C4D9]/50"
          }`}
        />
      </button>

      {open && subItems && (
        <ul className="mt-1 ml-4 space-y-1 border-l border-white/10 pl-4 py-1">
          {subItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-150 ${
                    isActive
                      ? "text-white bg-[#D50032]"
                      : "text-[#B8C4D9] hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <span className="[&>*]:!text-[14px]">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function SidebarLink({ icon: Icon, label, to, end = false }) {
  return (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 cursor-pointer ${
            isActive
              ? "bg-white text-[#002E5F] shadow-md"
              : "text-[#B8C4D9] hover:bg-white/10 hover:text-white"
          }`}
        >
          <Icon sx={{ fontSize: 20 }} className={`flex-shrink-0 ${isActive ? "text-[#D50032]" : ""}`} />
          <span className="text-sm font-medium">{label}</span>
        </div>
      )}
    </NavLink>
  );
}

const NAV_ITEMS = [
  { type: "link", icon: DashboardIcon, label: "Dashboard", to: "/dashboard", end: true },
  {
    type: "group", icon: PersonOutlineOutlinedIcon, label: "Usuarios",
    subItems: [{ label: "Tabla", to: "/dashboard/tableuser", icon: <TocRoundedIcon /> }],
  },
  {
    type: "group", icon: BookRoundedIcon, label: "Publicaciones",
    subItems: [
      { label: "Tabla", to: "/dashboard/publinav/table", icon: <TocRoundedIcon /> },
      { label: "Crear nueva", to: "/dashboard/publinav/add", icon: <BookmarkAddRoundedIcon /> },
    ],
  },
  {
    type: "group", icon: BookRoundedIcon, label: "Becas",
    subItems: [
      { label: "Tabla", to: "/dashboard/becanav/table", icon: <TocRoundedIcon /> },
      { label: "Crear nueva", to: "/dashboard/becanav/add", icon: <BookmarkAddRoundedIcon /> },
    ],
  },
  {
    type: "group", icon: CalendarMonthRoundedIcon, label: "Calendario",
    subItems: [
      { label: "Calendario", to: "/dashboard/Calendario/", icon: <CalendarTodayRoundedIcon /> },
      { label: "Crear Evento", to: "/dashboard/Calendario/addEvent", icon: <AddBoxRoundedIcon /> },
      { label: "Tabla de eventos", to: "/dashboard/Calendario/eventsTable", icon: <StorageRoundedIcon /> },
    ],
  },
  {
    type: "group", icon: SchoolIcon, label: "Programas",
    subItems: [
      { label: "Tabla", to: "/dashboard/program/tableprogram", icon: <TocRoundedIcon /> },
      { label: "Crear nuevo", to: "/dashboard/program/add", icon: <AddBoxRoundedIcon /> },
      { label: "Crear precios", to: "/dashboard/program/precio", icon: <AddBoxRoundedIcon /> },
    ],
  },
  {
    type: "group", icon: CollectionsRoundedIcon, label: "American Spaces",
    subItems: [
      { label: "Tabla", to: "/dashboard/spaces/table", icon: <TocRoundedIcon /> },
      { label: "Crear ambiente", to: "/dashboard/spaces/ambienteAdd", icon: <AddBoxRoundedIcon /> },
      { label: "Agregar imagen", to: "/dashboard/spaces/imageadd", icon: <AddBoxRoundedIcon /> },
    ],
  },
  { type: "link", icon: PlayCircleRoundedIcon, label: "Podcasts", to: "/dashboard/spotify/podcast" },
  {
    type: "group", icon: AssessmentOutlinedIcon, label: "Testimonios",
    subItems: [
      { label: "Tabla", to: "/dashboard/testimonio/table", icon: <TocRoundedIcon /> },
      { label: "Crear testimonio", to: "/dashboard/testimonio/add", icon: <AddBoxRoundedIcon /> },
    ],
  },
];

function SidebarContent() {
  return (
    <>
      <div className="flex items-center h-20 flex-shrink-0 px-4 justify-center border-b border-white/10">
        <img className="h-11 w-auto" src={cbaLogo} alt="CBA" />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <ul className="space-y-1.5">
          {NAV_ITEMS.map((item, i) =>
            item.type === "link" ? (
              <li key={i}>
                <SidebarLink icon={item.icon} label={item.label} to={item.to} end={item.end} />
              </li>
            ) : (
              <SidebarItem key={i} icon={item.icon} label={item.label} subItems={item.subItems} />
            )
          )}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-[#B8C4D9]/40 text-center">CBA Tarija © 2026</p>
      </div>
    </>
  );
}

export default function Sidebar({ sidebarOpen, toggleSideBarOpen }) {
  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-[#0A1F44]">
        <SidebarContent />
      </div>

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={toggleSideBarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0" enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full" enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0" leaveTo="-translate-x-full"
          >
            <div className="relative flex flex-col w-72 pb-4 bg-[#0A1F44]">
              <div className="absolute top-2 -right-12">
                <button
                  type="button"
                  onClick={toggleSideBarOpen}
                  className="flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-white/10 focus:outline-none"
                >
                  <CloseRoundedIcon />
                </button>
              </div>
              <SidebarContent />
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true" />
        </Dialog>
      </Transition.Root>
    </>
  );
}