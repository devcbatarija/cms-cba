import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

function Beca() {

  return (
    <div style={{ backgroundColor: 'white', color: 'black'}}>
      <Outlet></Outlet>
    </div>
  );
}

export default Beca;
