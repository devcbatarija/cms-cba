import React from "react";
import { Link } from "react-router-dom";
import { Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import "./sidebar.css";
import { useState } from "react";

function SidebarItem({ icon: Icon, label, to, subItems }) { // Añadir prop de subItems
  const [open, setOpen] = useState(false); // Nuevo estado para controlar el submenú

  const handleOpen = () => setOpen(!open); // Función para manejar el clic

  return (
    <div>
      <li className="sidebar-link sidebar md:block hidden" onClick={handleOpen}>
        <Icon className="icon" />
        <span>
          <Link to={to}>{label}</Link>
        </span>
      </li>
      {open && subItems && subItems.map(item => ( // Renderizado condicional de subItems
        <li className="sidebar-link" key={item.label}>
          {item.icon}
          <Link to={item.to}>{item.label}</Link>
        </li>
      ))}
    </div>
  );
}

export default function Sidebar() {
  return (
    <Toolbar className="sidebar">
      <ul>
        <SidebarItem
          icon={DashboardIcon}
          label="Dashboard"
          to="/dashboard"
        />
        <SidebarItem
          icon={PersonOutlineOutlinedIcon}
          label="Usuarios"
          subItems={[
            { label: "Tabla", to: "/dashboard/tableuser" }
          ]}
        />
        {/* <Link to='/dashboard/publinav/table'>Tabl</Link>
        <Link to='/dashboard/publinav/add'>table</Link> */}
        <SidebarItem
          icon={AssessmentOutlinedIcon}
          label="Publicaciones"
          subItems={[
            { label: "Tabla", to: "/dashboard/publinav/table" },
            { label: "Crear nueva", to: "/dashboard/publinav/add" }
          ]}
        />
        <SidebarItem
          icon={AssessmentOutlinedIcon}
          label="Espacios USA"
          subItems={[
            { label: "Tabla", to: "/dashboard/gallery/table" },
            { label: "Crear nueva", to: "/dashboard/gallery/add" }
          ]}
        />
        <SidebarItem
          icon={AssessmentOutlinedIcon}
          label="Calendario"
          subItems={[
            { label: "Calendario", to: "/dashboard/Calendario/calendario" },
            { label: "Crear Evento", to: "/dashboard/Calendario/addEvent" }
          ]}
        />
        <SidebarItem
          icon={StoreMallDirectoryOutlinedIcon}
          label="Programas"
          subItems={[
            { label: "Tabla", to: "/dashboard/program/tableprogram" },
            { label: "Crear programa", to: "/dashboard/program/add" },
            { label: "Agregar precio", to: "/dashboard/program/prices" },
          ]}
        />
        <SidebarItem
          icon={StoreMallDirectoryOutlinedIcon}
          label="Podcasts"
          to="/dashboard/spotify/podcast"
        />
        <SidebarItem
          icon={AssessmentOutlinedIcon}
          label="Testimonios"
          to="/dashboard/testimononios"
        />
      </ul>
    </Toolbar>
  );
}