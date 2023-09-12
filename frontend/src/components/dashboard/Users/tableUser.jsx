import Table from "@mui/material/Table";  // Importa el componente de tabla de Material-UI.
import TableBody from "@mui/material/TableBody";  // Importa el componente de cuerpo de tabla.
import TableCell from "@mui/material/TableCell";  // Importa el componente de celda de tabla.
import TableContainer from "@mui/material/TableContainer";  // Importa el componente de contenedor de tabla.
import TableHead from "@mui/material/TableHead";  // Importa el componente de encabezado de tabla.
import TableRow from "@mui/material/TableRow";  // Importa el componente de fila de tabla.
import Paper from "@mui/material/Paper";  // Importa el componente de papel para envolver la tabla.
import { useEffect, useState } from "react";  // Importa hooks de React.
import { useDispatch, useSelector } from "react-redux";  // Importa funciones para interactuar con el estado global de Redux.
import {
  deleteStateAllUsers,
  deselectAllUsers,
  deselectUser,
  getallusers,
  selectAllUsers,
  selectUser,
} from "../../../redux-toolkit/actions/userActions";  // Importa acciones de Redux relacionadas con usuarios.
import {
  Avatar,
  Button,
  Checkbox,
  Grid
} from "@mui/material";  // Importa componentes de Material-UI como botones y avatares.
import DeleteIcon from "@mui/icons-material/Delete";  // Importa un ícono de Material-UI.
import ModalUnstyled from "./modalUsers";  // Importa un componente modal personalizado.
import EditIcon from '@mui/icons-material/Edit';  // Importa un ícono de edición.
import EmailIcon from '@mui/icons-material/Email';  // Importa un ícono de correo electrónico.
import ModalUnstyledEmail from "./modalEmail";  // Importa un componente modal personalizado para correos electrónicos.
import AddIcon from '@mui/icons-material/Add';  // Importa un ícono de agregar.
import axios from "axios";  // Importa axios para hacer peticiones HTTP.
import toast from "react-hot-toast";  // Importa una librería para mostrar notificaciones emergentes.
import ModalUnstyledAdd from "./modalAddUser";  // Importa un componente modal personalizado para agregar usuarios.

// Función para calcular la edad a partir de una fecha.
function calculateAge(dateString) {
  const userDate = new Date(dateString);
  const currentDate = new Date();

  const ageInMilliseconds = currentDate - userDate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(ageInYears);
}

// Componente principal TableUser.
export default function TableUser() {
  const dispatch = useDispatch();  // Obtiene la función `dispatch` de Redux para enviar acciones.
  const data = useSelector((state) => state.users.users);  // Obtiene la lista de usuarios del estado global de Redux.
  const selectedUsers = useSelector((state) => state.users.selectedUsers);  // Obtiene la lista de usuarios seleccionados del estado global de Redux.
  const [selectAll, setSelectAll] = useState(false);  // Estado local para el control de selección de todos los usuarios.

  // Variables y funciones para controlar un modal de detalles de usuario.
  const [open, setOpen] = useState(false);  // Estado para abrir/cerrar el modal.
  const [selectedUserModal, setSelectedUserModal] = useState("");  // Estado para almacenar el ID del usuario seleccionado en el modal.

  const handleOpen = () => setOpen(true);  // Función para abrir el modal.
  const handleClose = () => setOpen(false);  // Función para cerrar el modal.

  // Variables y funciones para controlar un modal de correo electrónico.
  const [openEmail, setOpenEmail] = useState(false);  // Estado para abrir/cerrar el modal de correo electrónico.

  const handleOpenEmail = () => setOpenEmail(true);  // Función para abrir el modal de correo electrónico.
  const handleCloseEmail = () => setOpenEmail(false);  // Función para cerrar el modal de correo electrónico.

  // Variables y funciones para controlar un modal de agregar usuario.
  const [openAddUser, setOpenAddUser] = useState(false);  // Estado para abrir/cerrar el modal de agregar usuario.

  const handleOpenAddUser = () => setOpenAddUser(true);  // Función para abrir el modal de agregar usuario.
  const handleCloseAddUser = () => setOpenAddUser(false);  // Función para cerrar el modal de agregar usuario.

  // Función para seleccionar/deseleccionar todos los usuarios.
  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllUsers(data.map((user) => user.id_Usuario)));  // Activa la selección de todos los usuarios.
      setSelectAll(true);  // Actualiza el estado local.
    } else {
      dispatch(deselectAllUsers());  // Deselecciona a todos los usuarios.
      setSelectAll(false);  // Actualiza el estado local.
    }
  };

  // Función para eliminar usuarios seleccionados.
  const handleDelete = async() => {
    const response = await axios.post('/users/delete/select', { ids: selectedUsers });  // Envía una solicitud para eliminar usuarios seleccionados.
    setTimeout(() => {
      dispatch(getallusers());  // Actualiza la lista de usuarios después de la eliminación.
      dispatch(deselectAllUsers());  // Deselecciona a todos los usuarios.
      dispatch(deleteStateAllUsers());  // Elimina el estado de los usuarios seleccionados.
      toast.success("Borrado exitoso!");  // Muestra una notificación de éxito.
    }, 1500);
  }

  // Función para seleccionar/deseleccionar un usuario individual.
  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      dispatch(deselectUser(userId));  // Deselecciona al usuario.
      setSelectAll(false);  // Actualiza el estado local.
    } else {
      dispatch(selectUser(userId));  // Selecciona al usuario.
    }
  };

  // Efecto para cargar la lista de usuarios al cargar el componente.
  useEffect(() => {
    dispatch(getallusers());  // Obtiene la lista de usuarios al montar el componente.
  }, []);

  // Renderizado del componente.
  return (
    <TableContainer 
    sx={{width:"100%",borderRadius:'0', height:"100vh%" }}
    component={Paper}>
      {/* Renderiza un modal de detalles de usuario si está abierto */}
      {
        open ? <ModalUnstyled 
        id={selectedUserModal} 
        open={open} 
        handleOpen={handleOpen} 
        handleClose={handleClose} ></ModalUnstyled> : null
      }
      {/* Renderiza un modal de correo electrónico si está abierto */}
      {
        openEmail ? <ModalUnstyledEmail 
        open={openEmail} 
        handleOpen={handleOpenEmail} 
        handleClose={handleCloseEmail} ></ModalUnstyledEmail> : null
      }
      {/* Renderiza un modal de agregar usuario si está abierto */}
      {
        openAddUser ? <ModalUnstyledAdd
        open={openAddUser} 
        handleOpen={handleOpenAddUser} 
        handleClose={handleCloseAddUser}
        ></ModalUnstyledAdd> : null
      }
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          style={{ padding: "10px",gap:"10px" }}
        >
          {/* Botón para eliminar usuarios seleccionados */}
          <Button 
            disabled={selectedUsers.length > 0 ? false : true}
            variant="contained" 
            color="error" 
            sx={{borderRadius:"0px"}}
            onClick={handleDelete}
            startIcon={<DeleteIcon />}>
            Borrar {selectedUsers.length}
          </Button>
          {/* Botón para agregar un nuevo usuario */}
          <Button 
            variant="contained"
            sx={{borderRadius:"0px"}}
            startIcon={<AddIcon sx={{color:'white'}} />}
            onClick={handleOpenAddUser}
          >
            Añadir 
          </Button>
          {/* Botón para enviar correo electrónico */}
          <Button 
            variant="contained"
            sx={{borderRadius:"0px"}}
            startIcon={<EmailIcon sx={{color:'white'}} />}
            onClick={handleOpenEmail}
          >
            Escribir 
          </Button>
        </Grid>
        
      {/* Tabla de usuarios */}
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* Celda de selección de todos los usuarios */}
            <TableCell align="center">
              <Checkbox
                color="primary"
                inputProps={{
                  "aria-label": "select all users",
                }}
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </TableCell>
            {/* Encabezados de columnas */}
            <TableCell align="center">Nombres y Apellidos</TableCell>
            <TableCell align="center">CI</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Edad</TableCell>
            <TableCell align="center">Celular</TableCell>
            <TableCell align="center">Rol</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Estado</TableCell>
            <TableCell align="center">Edicion</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {/* Celda de selección de usuario individual */}
              <TableCell component="th" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedUsers.includes(row.id_Usuario)}
                  onChange={() => handleSelectUser(row.id_Usuario)}
                />
              </TableCell>
              {/* Datos de usuario */}
              <TableCell component="th" scope="row">
                {row.nombres + " " + row.apellidos}
              </TableCell>
              <TableCell align="center">{row.ci}</TableCell>
              <TableCell align="center">{row.correo}</TableCell>
              <TableCell align="center">
                {calculateAge(row.fecha_Nacimiento)}
              </TableCell>
              <TableCell align="center">{row.celular}</TableCell>
              <TableCell align="center">{row.rol}</TableCell>
              <TableCell align="center">
                <Avatar alt="Remy Sharp" src={row.image ? row.image : null} />
              </TableCell>
              <TableCell align="center">{row.estado?"true":"false"}</TableCell>
              {/* Botón para editar usuario */}
              <TableCell align="center">
                <Button 
                variant="contained" 
                color="success"
                onClick={()=>handleModal(row.id_Usuario)}
                sx={{borderRadius:"0px"}}
                endIcon={<EditIcon></EditIcon>}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
