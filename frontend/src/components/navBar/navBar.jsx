import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import PositionedMenu from "./positionedMenu";
import cbaImageHorizontal from "../../assets/logoCbaHorizontal.png";
import icono from "../../assets/cba_logo_horizontal.png";

const CBA_NAVY = "#002E5F";
const CBA_ROJO = "#D50032";

const Chevron = ({ open }) => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L5 4.29289L8.64645 0.646447C8.84171 0.451184 9.15829 0.451184 9.35355 0.646447C9.54882 0.841709 9.54882 1.15829 9.35355 1.35355L5 5.70711L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
      fill="currentColor"
    />
  </svg>
);

const NavPill = ({ to, children, onClick, name, showChevron, open }) => {
  const base =
    "relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 whitespace-nowrap";

  if (!to) {
    return (
      <button
        name={name}
        onClick={onClick}
        className={`${base} ${
          open
            ? "bg-white shadow-sm text-[#002E5F]"
            : "text-gray-500 hover:bg-[#002E5F] hover:text-white"
        }`}
      >
        {children}
        {showChevron && <Chevron open={open} />}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `${base} ${
          isActive
            ? "bg-white shadow-sm text-[#002E5F] pointer-events-none"
            : "text-gray-500 hover:bg-[#002E5F] hover:text-white"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("946"));
  const [auth, setAuth] = useState(false);
  const authlogin = useSelector((state) => state.login);
  const [anchorEl, setAnchorEl] = useState({
    programas: null,
    publicaciones: null,
    multimedia: null,
    becas: null,
  });

  const [openProgramas, setOpenProgramas] = useState(false);
  const [openMultimedia, setOpenMultimedia] = useState(false);

  const handleProgramasClick = () => {
    setOpenProgramas(!openProgramas);
  };

  const handleMultimediaClick = () => {
    setOpenMultimedia(!openMultimedia);
  };

  const handleClick = (event) => {
    setAnchorEl({
      programas: null,
      publicaciones: null,
      multimedia: null,
      becas: null,
      [event.target.name]: event.currentTarget,
    });
  };

  const handleClose = () => {
    setAnchorEl({
      programas: null,
      publicaciones: null,
      multimedia: null,
      becas: null,
    });
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    !isMobile ? setMobileOpen(false) : null;
  }, [isMobile]);

  const menuSx = {
    marginTop: "10px",
    "& .MuiPaper-root": {
      borderRadius: "14px",
      boxShadow: "0 12px 32px -8px rgba(0,46,95,0.18)",
      overflow: "hidden",
      minWidth: "200px",
    },
  };

  const menuItemSx = {
    padding: "12px 20px",
    fontSize: "0.875rem",
    fontWeight: 500,
    color: "#374151",
    "&:hover": {
      backgroundColor: `${CBA_NAVY}0D`,
      color: CBA_NAVY,
    },
  };

  const drawerRoutes = [
    { key: "Inicio", ruta: "/" },
    { key: "Cronograma", ruta: "/calendar" },
    {
      key: "programas",
      label: "Programas",
      ruta: "/",
      subRutas: [
        { key: "Para niños", ruta: "/programs/children" },
        { key: "Para adolescentes", ruta: "/programs/teens" },
        { key: "Para adultos", ruta: "/programs/adults" },
        { key: "Becas CBA", ruta: "/becas" },
      ],
    },
    { key: "Educacion USA", ruta: "/educationUSA" },
    {
      key: "multimedia",
      label: "Multimedia",
      ruta: "/",
      subRutas: [{ key: "Podcast", ruta: "/podcast" }],
    },
    { key: "Espacios Americanos", ruta: "/americanSpaces" },
    { key: "Acerca de nosotros", ruta: "/about" },
  ];

  const drawer = (
    <div style={{ width: "100%" }}>
      <List sx={{ py: 0 }}>
        {drawerRoutes.map((text, index) => {
          const label = text.label || text.key;
          const isSubOpen =
            text.key === "programas" ? openProgramas : openMultimedia;

          return (
            <div key={index} className="mx-3">
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: 0,
                  my: 0.5,
                }}
                component={text.subRutas ? "div" : Link}
                to={text.subRutas ? undefined : text.ruta}
                onClick={() => {
                  if (text.key === "programas") {
                    handleProgramasClick();
                  } else if (text.key === "multimedia") {
                    handleMultimediaClick();
                  } else {
                    handleDrawerToggle();
                  }
                }}
              >
                <ListItemText
                  primary={label}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: CBA_NAVY,
                    },
                    display: "flex",
                    paddingLeft: 1.5,
                    alignItems: "center",
                    height: 46,
                    borderRadius: 1,
                  }}
                />
                {text.subRutas && (
                  <span className="pr-3" style={{ color: CBA_NAVY }}>
                    <Chevron open={isSubOpen} />
                  </span>
                )}
              </ListItem>

              {text.subRutas && (
                <Collapse in={isSubOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 2, pb: 1 }}>
                    {text.subRutas.map((subRuta, subIndex) => (
                      <ListItem
                        key={subIndex}
                        onClick={() => {
                          if (text.key === "programas") handleProgramasClick();
                          else handleMultimediaClick();
                          handleDrawerToggle();
                        }}
                        component={Link}
                        to={subRuta.ruta}
                        sx={{
                          borderLeft: `2px solid ${CBA_ROJO}`,
                          borderRadius: "0 8px 8px 0",
                          mb: 0.5,
                          py: 0.75,
                          "&:hover": {
                            backgroundColor: `${CBA_ROJO}0D`,
                          },
                        }}
                      >
                        <ListItemText
                          primary={subRuta.key}
                          sx={{
                            "& .MuiListItemText-primary": {
                              fontSize: "0.85rem",
                              color: "#4B5563",
                              fontWeight: 500,
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          );
        })}
      </List>
    </div>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        color: CBA_NAVY,
        borderBottom: "1px solid #E5E7EB",
        boxShadow: "none",
        top: 0,
        zIndex: 2,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
          py: 1,
        }}
      >
        {isMobile ? (
          <>
            <div className="flex items-center justify-between w-full">
              <NavLink to="/" className="flex items-center">
                <img className="w-28" src={icono} alt="CBA" />
              </NavLink>
              <div className="flex items-center gap-2">
                {authlogin.auth ? (
                  <Tooltip title="Cuenta">
                    <IconButton
                      onClick={() => setAuth(!auth)}
                      sx={{ p: 0 }}
                    >
                      <PositionedMenu
                        altImg={authlogin.user.correo}
                        srcImg={authlogin.user._profileImage}
                        nombres={authlogin.user.nombres}
                        apellidos={authlogin.user.apellidos}
                      />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <button
                      onClick={() => setAuth(!auth)}
                      className="text-xs font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: CBA_NAVY }}
                    >
                      Iniciar sesión
                    </button>
                  </Link>
                )}
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ color: CBA_NAVY }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>

            <Drawer
              sx={{
                width: "100%",
                "& .MuiDrawer-paper": { width: "85%", borderRadius: "0 20px 20px 0" },
              }}
              anchor={"left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
            >
              <div className="flex flex-row drawner-css items-center justify-between">
                <img src={cbaImageHorizontal} alt="CBA" className="h-12" />
                <span
                  onClick={handleDrawerToggle}
                  className="p-2.5 rounded-full hover:bg-zinc-100 cursor-pointer transition-colors"
                  style={{ color: CBA_NAVY }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L7 6.29289L12.6464 0.646447C12.8417 0.451184 13.1583 0.451184 13.3536 0.646447C13.5488 0.841709 13.5488 1.15829 13.3536 1.35355L7.70711 7L13.3536 12.6464C13.5488 12.8417 13.5488 13.1583 13.3536 13.3536C13.1583 13.5488 12.8417 13.5488 12.6464 13.3536L7 7.70711L1.35355 13.3536C1.15829 13.5488 0.841709 13.5488 0.646447 13.3536C0.451184 13.1583 0.451184 12.8417 0.646447 12.6464L6.29289 7L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
              {drawer}
            </Drawer>
          </>
        ) : (
          <>
            <NavLink to="/" className="flex items-center shrink-0">
              <img className="w-36" src={icono} alt="CBA" />
            </NavLink>

            {/* ---------- Grupo de navegación en píldora ---------- */}
            <div
              className="flex items-center gap-1 rounded-full p-1.5 mx-2"
              style={{ backgroundColor: "#F3F4F6" }}
            >
              <NavPill to="/">Inicio</NavPill>
              <NavPill to="/calendar">Calendario</NavPill>

              <NavPill
                name="programas"
                onClick={handleClick}
                showChevron
                open={Boolean(anchorEl.programas)}
              >
                Programas
              </NavPill>
              <Menu
                anchorEl={anchorEl.programas}
                keepMounted
                open={Boolean(anchorEl.programas)}
                onClose={handleClose}
                sx={menuSx}
              >
                  <MenuItem sx={menuItemSx} onClick={handleClose} component={Link} to="/programs/children">
                    Children
                  </MenuItem>
                  <MenuItem sx={menuItemSx} onClick={handleClose} component={Link} to="/programs/teens">
                    Teens
                  </MenuItem>
                  <MenuItem sx={menuItemSx} onClick={handleClose} component={Link} to="/programs/adults">
                    Adults
                  </MenuItem>
                  <MenuItem sx={menuItemSx} onClick={handleClose} component={Link} to="/becas">
                    Becas CBA
                  </MenuItem>
              </Menu>

              <NavPill to="/educationUSA">Estudia en EEUU</NavPill>

              <NavPill
                name="multimedia"
                onClick={handleClick}
                showChevron
                open={Boolean(anchorEl.multimedia)}
              >
                Multimedia
              </NavPill>
              <Menu
                anchorEl={anchorEl.multimedia}
                keepMounted
                open={Boolean(anchorEl.multimedia)}
                onClose={handleClose}
                sx={menuSx}
              >
                <MenuItem sx={menuItemSx} onClick={handleClose} component={Link} to="/podcast">
                  Podcast
                </MenuItem>
              </Menu>

              <NavPill to="/americanSpaces">Espacios Americanos</NavPill>
              <NavPill to="/about">Acerca de nosotros</NavPill>
            </div>

            {/* ---------- Zona de sesión ---------- */}
            <div className="shrink-0">
              {authlogin.auth ? (
                <Tooltip title="Cuenta">
                  <IconButton onClick={() => setAuth(!auth)} sx={{ p: 0 }}>
                    <PositionedMenu
                      altImg={authlogin.user.correo}
                      srcImg={authlogin.user._profileImage}
                      nombres={authlogin.user.nombres}
                      apellidos={authlogin.user.apellidos}
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <button
                    onClick={() => setAuth(!auth)}
                    className="text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
                    style={{ backgroundColor: CBA_NAVY }}
                  >
                    Iniciar sesión
                  </button>
                </Link>
              )}
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;