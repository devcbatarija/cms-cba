import React, { useEffect, useState } from "react";
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
  Collapse,
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
  const isMobile = useMediaQuery(theme.breakpoints.down("780"));
  const [auth, setAuth] = useState(false);
  const authlogin = useSelector((state) => state.login);
  const [stateRuta, setStateRuta] = useState(true);
  const [anchorEl, setAnchorEl] = useState({
    programas: null,
    publicaciones: null,
    multimedia: null
  });

  const [open, setOpen] = useState(false); //este
  const handleProgramasClick = () => {
    setOpen(!open);
  }; //este

  const handleClick = (event) => {
    setAnchorEl({
      ...anchorEl,
      programas: null,
      publicaciones: null,
      multimedia:null
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
      multimedia:null
    });
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    !isMobile?setMobileOpen(false):null
  }, [isMobile])  
  const drawer = (
    <div style={{ width: "100%" }}>
      <List>
        {[
          { key: "inicio", ruta: "/" },
          { key: "calendario", ruta: "/calendar" },
          {
            key: "programas",
            ruta: "/",
            subRutas: [{key:"Niños",ruta:"/programs/children"},
             {key:"Adolescentes",ruta:"/programs/teens"}, 
             {key:"Adultos",ruta:"/programs/adults"}
            ],
          },
          {
            key: "multimedia",
            ruta: "/",
            subRutas: [{key:"Niños",ruta:"/programs/children"},
             {key:"Adolescentes",ruta:"/programs/teens"}, 
             {key:"Adultos",ruta:"/programs/adults"}
            ],
          },
        ].map((text, index) => (
          <div
            key={index}
            style={{
              borderBottom: "1px solid #cdd1dc",
              margin: "0 20px 0 20px",
            }}
          >
            <ListItem
              sx={{
                display:"flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              component={Link}
              to={text.ruta}
              onClickCapture={() => {
                if (text.subRutas) {
                  handleProgramasClick();
                }
              }}
            >
              <ListItemText
                primary={text.key}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e2e4e9",
                  },
                  display:"flex",
                  paddingLeft:1,
                alignItems: "center",
                  textTransform: "capitalize",
                  height:50,
                  borderRadius:1
                }}
              />
            </ListItem>
            {text.subRutas && (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                >
                  {text.subRutas.map((subRuta, subIndex) => (
                    <ListItem
                    onClickCapture={handleDrawerToggle}
                      key={subIndex}
                      sx={{ 
                        "&:hover": {
                          backgroundColor: "#e5ebff",
                        },
                        marginLeft: 5,
                        width: "91.5%",
                        borderRadius:1,
                        marginRight:10,
                        marginBottom:1

                     }}
                      component={Link}
                      to={subRuta.ruta}
                    >
                      <ListItemText
                       primary={subRuta.key} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
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
                  Iniciar sesion
                </Button>
              </Link>
            )}
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              className="flex gap-20 sm:gap-8 md:gap-5 lg:gap-7 xl:gap-14 2xl:gap-15"
            >
              CBA
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none"
                }}
              >
                <Link to="/">Inicio</Link>
              </Button>
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
                }}
              >
                <Link to="/calendar">Calendario</Link>
              </Button>
              {/* inicio */}
              <Button
                name="programas"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
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
                  sx={{
                    width:"200px",
                    padding:"20px"
                  }}
                >
                  Niños
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/programs/teens"
                  sx={{
                    width:"200px",
                    padding:"20px"
                  }}
                >
                  Adolecentes
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/programs/adults"
                  sx={{
                    width:"200px",
                    padding:"20px"
                  }}
                >
                  Adultos
                </MenuItem>
              </Menu>
              {/* final */}
              {/* inicio */}
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
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
                <MenuItem component={Link}
                sx={{
                  width:"200px",
                  padding:"20px"
                }}>Eventos</MenuItem>
                <MenuItem component={Link}
                sx={{
                  width:"200px",
                  padding:"20px"
                }}>Cartelera</MenuItem>
              </Menu>
              {/* final */}
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
                }}
              >
                <Link to="/educationUSA">Educacion USA</Link>
              </Button>
              <Button
                name="multimedia"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
                }}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon></KeyboardArrowDownIcon>}
              >
                Multimedia
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl.multimedia}
                keepMounted
                open={Boolean(anchorEl.multimedia)}
                name="multimedia"
                onClose={handleClose}
                sx={{
                  marginTop: "16px",
                }}
              >
                <MenuItem
                sx={{
                  width:"200px",
                  padding:"20px"
                }}
                  onClick={handleClose}
                  component={Link}
                  to="/podcast"
                >
                  Podcast
                </MenuItem>
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/programs/teens"
                  sx={{
                    width:"200px",
                    padding:"20px"
                  }}
                >
                  Tutoriales
                </MenuItem>
              </Menu>

              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
                }}
              >
                <Link to="/about">Acerca de nosotros</Link>
              </Button>
              <Button
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)", // o cualquier otro color que desees
                  },
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: ".875rem",
                  alignContent: "center",
                  paddingTop: "4px",
                  textTransform: "none",
                }}
              >
                <Link to="/americanspaces">Espacios Americanos</Link>
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
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                    display: "grid",
                    alignContent: "center",
                  }}
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
