import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSession } from "../../redux-toolkit/actions/auth.Actions";
import Cookie from "js-cookie";
import toast from "react-hot-toast";
import { SuccessAlert } from "../toastAlerts/success";

const PositionedMenu = ({ altImg, srcImg, styles, nombres, apellidos }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch(false);
  const navigate = useNavigate();
  const rolUSer = useSelector((state) => state.login.user);
  const authlogin = useSelector((state) => state.login);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    handleClose();
    navigate("/");
    Cookie.remove("token");
    dispatch(logoutSession(false));
    toast.custom((t) => (
      <SuccessAlert t={t} w={"w-4/12"} message="Cierre de sesión exitoso" />
    ));
  };
  const aleatorios = async () => {
    const colors = ["#d59bf6", "#ffc93c", "#42b883", "#cca8e9"];
    const matrandom = Math.floor(Math.random() * 4);
    const localColor = await localStorage.getItem("color");
    if (localColor==null) {
      localStorage.setItem("color", colors[matrandom]);
    }
    const localColorR = await localStorage.getItem("color");
    return localColorR;
  };
  useEffect(()=>{
    aleatorios();
  },[])
  return (
    <div>
      {authlogin && !authlogin.user._profileImage ? (
        <div
          className="border p-2 rounded-[50%] 
          w-[50px] h-[50px] text-white font-bold uppercase"
          style={{
            background: localStorage.getItem("color")
          }}
          onClick={handleClick}
        >
          {authlogin.user.nombres[0]}
          {authlogin.user.apellidos[0]}
        </div>
      ) : (
        <Avatar
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          alt={authlogin.user.correo}
          src={authlogin.user._profileImage}
          style={styles}
        />
      )}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          top: "35px",
          left: "10px",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        {rolUSer.rol && rolUSer.rol == "Admin" ? (
          <MenuItem component={Link} to="/" onClick={handleClose}>
            Vista Cliente
          </MenuItem>
        ) : null}
        {rolUSer.rol && rolUSer.rol == "Admin" ? (
          <MenuItem component={Link} to="/dashboard" onClick={handleClose}>
            Vista Administrador
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};
export default PositionedMenu;
