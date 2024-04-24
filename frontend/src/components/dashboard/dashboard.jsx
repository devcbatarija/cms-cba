import React from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import DashNavbar from "./DashboardNavbar/DashNavbar";
import { InitDashboardGrafics } from "./InitDashboardGrafics";
import LayoutGrafics from "./LayoutGrafics";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import TocRoundedIcon from "@mui/icons-material/TocRounded";

function DashboardPage() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSideBarOpen = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <div className="min-h-screen flex">
        {/* espacio para sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSideBarOpen={toggleSideBarOpen}
        />
        {/* este es el contenedor de navbar y outlet */}
        <div className="lg:pl-64 flex flex-col w-0 flex-1">
          {/* navbar y contenedor */}
          <DashNavbar
            toggleSideBarOpen={toggleSideBarOpen}
          />
          {/* main es contenedor de todo el centro */}
          <main className="flex-1">
            <div className="">
              {/* El componente Outlet representa las rutas anidadas */}
              {location.pathname == "/dashboard" ? (
                <LayoutGrafics />
              ) : (
                <Outlet />
              )}
            </div>
          </main>
        </div>
      </div>


      {/* <DashNavbar />
      <div className="flex flex-cols">
        <div
          style={{ background: "#131133" }}
          className="side-container w-1/12 sm:w-1/12 md:w-3/12 lg:w-2/12 xl:w-2/12 min-h-screen"
        >
          <Sidebar />
        </div>
        <div className=" w-11/12 sm:w-11/12 md:w-9/12 lg:w-10/12 xl:w-10/12">
          {location.pathname == "/dashboard" ? (
            <LayoutGrafics />
          ) : (
            <Outlet />
          )}
        </div>
      </div> */}
    </>
  );
}

export default DashboardPage;
