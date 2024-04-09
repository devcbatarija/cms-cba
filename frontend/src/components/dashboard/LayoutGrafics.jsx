import React, { useState } from "react";
import { InitDashboardGrafics } from "./InitDashboardGrafics";
import { useEffect } from "react";
import axios from "axios";
export const LayoutGrafics = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
      try {
      const response = await axios.get("/users/range/ages");
      if (response) {
        console.log(response);
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <header className="flex w-full bg-red-200 h-32">
        hola mundo soy el header!
      </header>
      <main className="flex-grow w-full  ">
        <InitDashboardGrafics></InitDashboardGrafics>
      </main>
    </div>
  );
};

export default LayoutGrafics;
