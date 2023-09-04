import React from "react";
import { Link } from "react-router-dom";
import { Toolbar } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import "./sidebar.css";

function SidebarItem({ icon: Icon, label, to }) {
  return (
    <li>
      <Icon className="icon" />
      <span>
        <Link to={to}>{label}</Link>
      </span>
    </li>
  );
}

export default function Sidebar() {
  return (
    <Toolbar className="sidebar">
      <ul>
        <SidebarItem icon={DashboardIcon} label="Dashboard" to="/dashboard" />
        <SidebarItem icon={PersonOutlineOutlinedIcon} label="Usuarios" to="/users" />
        <SidebarItem icon={StoreMallDirectoryOutlinedIcon} label="Programas" to="/programs" />
        <SidebarItem icon={CreditCardIcon} label="Education USA" to="/education" />
        <SidebarItem icon={AssessmentOutlinedIcon} label="Publicaciones" to="/dashboard/publication" />
      </ul>
    </Toolbar>
  );
}
