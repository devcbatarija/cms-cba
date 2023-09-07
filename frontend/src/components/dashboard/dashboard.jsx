import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import DashNavbar from "./DashboardNavbar/DashNavbar";

function DashboardPage() {
  return (
    <div className="containerr">
      <div className="side-container">
        <Sidebar />
      </div>
      <div className="body-container">
        {/* El componente Outlet representa las rutas anidadas */}
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardPage;
