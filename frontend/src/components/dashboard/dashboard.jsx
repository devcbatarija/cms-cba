import React from "react";
import Sidebar from "./Sidebar";
import ComponentForm from "./ComponentForm";
import ComponentPreview from "./ComponentPreview";
import "./Sidebar";
import { Route, Routes } from "react-router-dom";
import PublicationAdd from "./Publications/PublicationAdd";
import PublicationPreview from "./Publications/PublicationPreview";

function DashboardPage() {
  return (

    <div class="container">
      <div className="side-container">
        <Sidebar />
      </div>
      <div className="body-container">
        <Routes>
          <Route path="/dashboard/*" element={<PublicationAdd/>}></Route>
          <Route path="/dashboard/publication/preview" element={<PublicationPreview/>}></Route>

        </Routes>
      </div>
    </div>
  );
}

export default DashboardPage;
