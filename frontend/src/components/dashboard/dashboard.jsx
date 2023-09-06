import React from "react";
import Sidebar from "./Sidebar";
import ComponentForm from "./ComponentForm";
import ComponentPreview from "./ComponentPreview";

import "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

function DashboardPage() {
  const location = useLocation();
  location.pathname
  return (
    
    <div class="container">
      <div className="side-container">
        <Sidebar />
      </div>
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default DashboardPage;
