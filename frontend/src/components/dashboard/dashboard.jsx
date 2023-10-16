import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import DashNavbar from "./DashboardNavbar/DashNavbar";

function DashboardPage() {
  return (
    <>
      <DashNavbar />
      <div className="flex flex-cols">
        <div
          style={{ background: "#131133",minHeight:'130vh' }}
          className="h-screen side-container w-1/12 sm:w-1/12 md:w-3/12 lg:w-2/12 xl:w-2/12 "
        >
          <Sidebar />
        </div>
        <div className="body-container w-11/12 sm:w-11/12 md:w-9/12 lg:w-10/12 xl:w-10/12">
          {/* El componente Outlet representa las rutas anidadas */}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
