import React from 'react';
import { Outlet } from 'react-router-dom';
const EventNav = () => {
    return (
        <div style={{ backgroundColor: 'white', color: 'black' }}>
          <Outlet></Outlet>
        </div>
      );
}
 
export default EventNav;
