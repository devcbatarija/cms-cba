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
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import PositionedMenu from "./positionedMenu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import cbaImage from "../../assets/cba.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// ...

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("900"));
  const [auth, setAuth] = useState(false);
  const authlogin = useSelector((state) => state.login);

  const [anchorEl, setAnchorEl] = useState({
    programas: null,
    publicaciones: null,
  });

  const handleClick = (event) => {
    setAnchorEl({
      ...anchorEl,
      programas: null,
      publicaciones: null,
    });
    setAnchorEl({
      ...anchorEl,
      [event.target.name]: event.currentTarget,
    });
  };

  const handleClose = (event) => {
    setAnchorEl({
      ...anchorEl,
      programas: null,
      publicaciones: null,
    });
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ width: "100%" }}>
      <List>
        {["/", "/calendar", "/about"].map((text, index) => (
          <div
            key={text}
            style={{
              borderBottom: "1px solid #cdd1dc",
              margin: "0 20px 0 20px",
            }}
          >
            <ListItem
              sx={{}}
              onClick={handleDrawerToggle}
              component={Link}
              to={text}
            >
              <ListItemText
                primary={text === "/" ? "Home" : text.replace("/", "")}
                sx={{
                  textTransform: "capitalize",
                }}
              />
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgb(0, 46, 95);",
        color: "white",
        borderBottom: "1px solid #cdd1dc",
        boxShadow: "none",
        top: 0,
        zIndex: 2,
      }}
    >
      <Toolbar
        sx={{
          shadow: "none",
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { width: "900" } }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              sx={{ width: "100%" }}
              anchor={"left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <div className="flex flex-row drawner-css">
                <Typography>hola</Typography>
                <span onClick={handleDrawerToggle}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7 6.29289L12.6464 0.646447C12.8417 0.451184 13.1583 0.451184 13.3536 0.646447C13.5488 0.841709 13.5488 1.15829 13.3536 1.35355L7.70711 7L13.3536 12.6464C13.5488 12.8417 13.5488 13.1583 13.3536 13.3536C13.1583 13.5488 12.8417 13.5488 12.6464 13.3536L7 7.70711L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </div>
              {drawer}
            </Drawer>

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
            ) : (
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  onClick={() => {
                    setAuth(!auth);
                  }}
                  color="inherit"
                >
                  Login
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              className="flex gap-20 sm:gap-8 md:gap-5 lg:gap-10 xl:gap-14 2xl:gap-15"
            >
              CBA
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)', // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop:"4px",
                  textTransform:"none"
                }}
                >
                <Link
                to="/"
                >
                Inicio
                </Link>
              </Button>
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)', // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop:"4px",
                  textTransform:"none"
                }}
                >
                <Link
                to="/calendar"
                >
                Calendario
                </Link>
              </Button>
              {/* inicio */}
              <Button
                name="programas"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)', // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop:"4px",
                  textTransform:"none"
                }}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
              >
                Programas
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl.programas}
                keepMounted
                open={Boolean(anchorEl.programas)}
                name="programas"
                onClose={handleClose}
                sx={{
                  marginTop: "16px",
                }}
              >
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/programs/children"
                >
                  Niños
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/programs/teens"
                >
                  Adolecentes
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/programs/adults"
                >
                  Adultos
                </MenuItem>
              </Menu>
              {/* final */}
              {/* inicio */}
              <Button 
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)', // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop:"4px",
                  textTransform:"none"
                }}
                endIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
                name="publicaciones"
                onClick={handleClick}
              >
                Publicaciones
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl.publicaciones}
                keepMounted
                open={Boolean(anchorEl.publicaciones)}
                onClose={handleClose}
                name="Publicaciones"
                sx={{
                  marginTop: "16px",
                }}
              >
                <MenuItem component={Link}>Eventos</MenuItem>
                <MenuItem component={Link}>Cartelera</MenuItem>
              </Menu>
              {/* final */}
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)', // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop:"4px",
                  textTransform:"none"
                }}
              >
                <Link
                  to="/educationUSA"
                >
                Educacion USA
                </Link>
              </Button>
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)', // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop:"4px",
                  textTransform:"none"
                }}
                >
                <Link
                to="/about"
                >
                Acerca de nosotros
                </Link>
              </Button>
            </Typography>
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
            ) : (
              <Link
                to="/login"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button
                  onClick={() => {
                    setAuth(!auth);
                  }}
                  color="inherit"
                >
                  INICIAR SESION
                </Button>
              </Link>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
