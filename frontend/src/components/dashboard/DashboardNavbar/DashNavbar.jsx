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

function DashNavbar() {
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
    background: 'white',
    color: 'black',
    borderBottom: '1px solid #000000', // Cambia el color y el grosor de la línea inferior
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Añade una sombra
  };

  return (
    <AppBar position="static" style={navbarStyle}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap>
          <img
            src="https://www.pagoexpress.com.bo/sitioweb/assets/images/cba.png"
            style={{ width: '80px', height: '60px', vertical:'top', horizontal:'left' }}
            alt=""
            srcSet=""
          />
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {authlogin.auth ? (
              <Tooltip>
                <IconButton
                  onClick={() => {
                    setAuth(!auth);
                  }}
                  sx={{ p: 0 }}
                >
                  <PositionedMenu
                    altImg={authlogin.user.correo}
                    srcImg={authlogin.user._profileImage}
                  ></PositionedMenu>
                </IconButton>
              </Tooltip>
            ):null
            }
        </div>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default DashNavbar;
