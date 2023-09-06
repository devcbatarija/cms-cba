import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectAllUsers,
  deselectUser,
  getallusers,
  selectAllUsers,
  selectUser,
} from "../../redux-toolkit/actions/userActions";
import {
  Avatar,
  Button,
  Checkbox,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalUnstyled from "./widgets/modalUsers";
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import ModalUnstyledEmail from "./widgets/modalEmail";


function calculateAge(dateString) {
  const userDate = new Date(dateString);
  const currentDate = new Date();

  const ageInMilliseconds = currentDate - userDate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(ageInYears);
}
export default function TableUser() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const [selectAll, setSelectAll] = useState(false);
  //modal
  const [open, setOpen] = useState(false);
  const [selectedUserModal,setSelectedUserModal]=useState("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal email
  const [openEmail, setOpenEmail] = useState(false);

  const handleOpenEmail = () => setOpenEmail(true);
  const handleCloseEmail = () => setOpenEmail(false);

  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllUsers(data.map((user) => user.id_Usuario)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllUsers());
      setSelectAll(false);
    }
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      dispatch(deselectUser(userId));
      setSelectAll(false);
    } else {
      dispatch(selectUser(userId));
    }
  };
  const handleModal=(id)=>{
    handleOpen()
    setSelectedUserModal(id)
  }
  useEffect(() => {
    dispatch(getallusers());
  }, []);
  return (
    <TableContainer component={Paper}>
      {
        open?<ModalUnstyled 
        id={selectedUserModal} 
        open={open} 
        handleOpen={handleOpen} 
        handleClose={handleClose} ></ModalUnstyled>:null
      }
      {
        openEmail?<ModalUnstyledEmail 
        open={openEmail} 
        handleOpen={handleOpenEmail} 
        handleClose={handleCloseEmail} ></ModalUnstyledEmail>:null
      }
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          style={{ padding: "10px",gap:"10px" }}
        >
          <Button 
            variant="contained"
            sx={{borderRadius:"0px"}}
            startIcon={<EmailIcon sx={{color:'white'}} />}
            onClick={handleOpenEmail}
          >
            Escribir 
          </Button>
          <Button 
            disabled={selectedUsers.length>0?false:true}
            variant="contained" 
            color="error" 
            sx={{borderRadius:"0px"}}
            startIcon={<DeleteIcon />}>
            Borrar {selectedUsers.length}
          </Button>
        </Grid>
        
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
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
            <TableCell align="center">Nombres y Apellidos</TableCell>
            <TableCell align="center">CI</TableCell>
            <TableCell align="center">Correo</TableCell>
            <TableCell align="center">Edad</TableCell>
            <TableCell align="center">Celular</TableCell>
            <TableCell align="center">Rol</TableCell>
            <TableCell align="center">Imagen</TableCell>
            <TableCell align="center">Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedUsers.includes(row.id_Usuario)}
                  onChange={() => handleSelectUser(row.id_Usuario)}
                />
              </TableCell>
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
