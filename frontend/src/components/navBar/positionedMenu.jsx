import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutSession } from "../../redux-toolkit/actions/auth.Actions";
import Cookie from "js-cookie";
import toast from "react-hot-toast"; 


const PositionedMenu = ({ altImg, srcImg,styles }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch=useDispatch(false)
  const navigate=useNavigate();
  const rolUSer=useSelector((state)=>state.login.user)
  const authlogin = useSelector((state) => state.login);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout=async()=>{
    handleClose()
    navigate("/");
    Cookie.remove('token');
    dispatch(
      logoutSession(false)
    )
    toast.success("Cierre de sesion exitoso")
  }
  return (
    <div>
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
