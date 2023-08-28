import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  Avatar,
  Button,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [auth, setAuth] = useState(false);
  const authlogin=useSelector((state)=>state.login);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {["/", "/about", "/login"].map((text, index) => (
          <ListItem
            key={text}
            onClick={handleDrawerToggle}
            component={Link}
            to={text}
          >
            <ListItemText
              primary={text === "/" ? "Home" : text.replace("/", "")}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              CBA
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <Button color="inherit">Home</Button>
              </Link>
              <Link
                to="/calendar"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button color="inherit">Calendar</Button>
              </Link>
              <Link
                to="/calendario"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button color="inherit">Calendario</Button>
              </Link>
              <Link
                to="/about"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button color="inherit">About</Button>
              </Link>
            </Typography>
            {
            authlogin.auth ? (
              <Tooltip title="Open settings">
                <IconButton onClick={()=>{
                    setAuth(!auth)
                }} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button onClick={()=>{
                    setAuth(!auth)
                }} color="inherit">Login</Button>
              </Link>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
