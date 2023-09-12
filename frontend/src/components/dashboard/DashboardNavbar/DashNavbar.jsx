import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';

function DashNavbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

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
    borderBottom: '1px solid #ACACAC', // Cambia el color y el grosor de la línea inferior
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
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            onClick={handleProfileMenuOpen}
            style={{ marginRight: '20px' }}
          >
            <AccountCircle fontSize="large" />
            <Typography variant="body2" noWrap>
            Limber Tolaba
          </Typography>
          </IconButton>
          
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
