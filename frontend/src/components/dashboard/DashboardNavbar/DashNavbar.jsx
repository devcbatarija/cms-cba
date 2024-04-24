import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import PositionedMenu from '../../navBar/positionedMenu';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';

function DashNavbar({
  toggleSideBarOpen
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const [auth, setAuth] = useState(false);
  const authlogin = useSelector((state) => state.login);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  const navbarStyle = {
    background: 'black',
    color: 'black',
    borderBottom: '1px solid #ACACAC', // Cambia el color y el grosor de la línea inferior
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Añade una sombra
  };

  return (
    // <AppBar position="static" style={navbarStyle}>
    //   <Toolbar style={{ justifyContent: "space-between" }}>
    //     <Typography variant="h6 text-white" noWrap>ss</Typography>
    //     <div style={{ display: "flex", alignItems: "center" }}>
    //       {authlogin.auth ? (
    //         <Tooltip>
    //           <IconButton
    //             onClick={() => {
    //               setAuth(!auth);
    //             }}
    //             sx={{ p: 0 }}
    //           >
    //             <PositionedMenu
    //               styles={{
    //                 border: "1px solid white",
    //                 width: "45px",
    //                 height: "45px",
    //                 cursor: "pointer"
    //               }}
    //             ></PositionedMenu>
    //           </IconButton>
    //         </Tooltip>
    //       ) : null}
    //     </div>
    //   </Toolbar>
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{
    //       vertical: "top",
    //       horizontal: "right",
    //     }}
    //     id={menuId}
    //     keepMounted
    //     transformOrigin={{
    //       vertical: "top",
    //       horizontal: "right",
    //     }}
    //     open={isMenuOpen}
    //     onClose={handleMenuClose}
    //   >
    //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    //     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    //   </Menu>
    // </AppBar>

    <div className="sticky w-full top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 shadow-md">
      <button
        type="button"
        className="border-r h-full w-16 border-gray-200 text-gray-500 focus:outline-none lg:hidden"
        onClick={toggleSideBarOpen}
      >
        <span className="sr-only">Open sidebar</span>
        <NotesRoundedIcon sx={{fontSize:30}} />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          {/* <form className="w-full flex lg:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-red-600">
                <SearchIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                placeholder="Search"
                type="search"
                name="search"
              />
            </div>
          </form> */}
        </div>
        <div className="ml-4 flex items-center lg:ml-6 mr-2">
          <div style={{ display: "flex", alignItems: "center" }}>
            {authlogin.auth ? (
              <Tooltip>
                <IconButton
                  onClick={() => {
                    setAuth(!auth);
                  }}
                  sx={{ p: 0 }}
                >
                  <PositionedMenu
                    styles={{
                      border: "1px solid white",
                      width: "45px",
                      height: "45px",
                      cursor: "pointer"
                    }}
                  ></PositionedMenu>
                </IconButton>
              </Tooltip>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashNavbar;
