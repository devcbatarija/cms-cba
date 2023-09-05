import React from "react";
import Sidebar from "./Sidebar";
import ComponentForm from "./ComponentForm";
import ComponentPreview from "./ComponentPreview";

import "./Sidebar";
import { useLocation } from "react-router-dom";

function DashboardPage() {
  const location = useLocation();
  location.pathname
  return (
    
    <div className="container">
      <div className="side-container">
        <Sidebar />
      </div>
      <div className="body-container">
      
        <ComponentForm />
        <ComponentPreview />
      </div>
    </div>
  );
}

export default DashboardPage;
