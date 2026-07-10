import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import PositionedMenu from '../../navBar/positionedMenu';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

function DashNavbar({ toggleSideBarOpen }) {
  const authlogin = useSelector((state) => state.login);
  const [auth, setAuth] = useState(false);

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-[#DEDEDE] shadow-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <button
        type="button"
        className="border-r border-[#DEDEDE] px-4 text-gray-400 hover:text-[#D50032] focus:outline-none lg:hidden transition-colors"
        onClick={toggleSideBarOpen}
      >
        <MenuRoundedIcon sx={{ fontSize: 24 }} />
      </button>

      <div className="flex-1 px-6 flex items-center justify-between">
        <div />
        <div className="flex items-center gap-3">
          {/* Notificaciones */}
          <button className="relative p-2 rounded-full text-gray-400 hover:text-[#D50032] hover:bg-red-50 transition-colors">
            <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D50032] rounded-full" />
          </button>

          <div className="w-px h-6 bg-[#DEDEDE]" />

          {authlogin?.auth && (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-[#002E5F] leading-tight">
                  {authlogin.user?.nombres} {authlogin.user?.apellidos}
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  {authlogin.user?.rol === 'Admin' ? 'Administrador' : authlogin.user?.rol ?? 'Usuario'}
                </p>
              </div>
              <Tooltip title="Mi cuenta">
                <IconButton onClick={() => setAuth(!auth)} sx={{ p: 0 }}>
                  <PositionedMenu
                    styles={{ width: '40px', height: '40px', cursor: 'pointer' }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashNavbar;