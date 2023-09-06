import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="container">
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
