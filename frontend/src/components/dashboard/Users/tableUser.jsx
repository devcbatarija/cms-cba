import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStateAllUsers,
  deselectAllUsers,
  deselectUser,
  getallusers,
  selectAllUsers,
  selectUser,
} from "../../../redux-toolkit/actions/userActions";
import { Avatar, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalUnstyled from "./modalUsers";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import ModalUnstyledEmail from "./modalEmail";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import toast from "react-hot-toast";
import ModalUnstyledAdd from "./modalAddUser";
import { SuccessAlert } from "../../toastAlerts/success";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function calculateAge(dateString) {
  const userDate = new Date(dateString);
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - userDate;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(ageInYears);
}

function getInitials(nombres, apellidos) {
  return `${nombres?.[0] ?? ""}${apellidos?.[0] ?? ""}`.toUpperCase();
}

const AVATAR_COLORS = ["#002E5F", "#D50032", "#1a6b8a", "#7c3aed", "#059669"];

export default function TableUser() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users.users);
  const selectedUsers = useSelector((state) => state.users.selectedUsers);
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const [selectedUserModal, setSelectedUserModal] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEmail, setOpenEmail] = useState(false);
  const handleOpenEmail = () => setOpenEmail(true);
  const handleCloseEmail = () => setOpenEmail(false);

  const [openAddUser, setOpenAddUser] = useState(false);
  const handleOpenAddUser = () => setOpenAddUser(true);
  const handleCloseAddUser = () => setOpenAddUser(false);

  const handleSelectAll = () => {
    if (!selectAll) {
      dispatch(selectAllUsers(data.map((user) => user.id_Usuario)));
      setSelectAll(true);
    } else {
      dispatch(deselectAllUsers());
      setSelectAll(false);
    }
  };

  const handleModal = (id) => {
    setSelectedUserModal(id);
    handleOpen(true);
  };

  const handleDelete = async () => {
    const response = await axios.post("users/delete/select", { ids: selectedUsers });
    dispatch(getallusers());
    dispatch(deselectAllUsers());
    dispatch(deleteStateAllUsers());
    toast.custom((t) => (
      <SuccessAlert t={t} w={"w-4/12"} message="Borrado exitoso" />
    ));
  };

  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      dispatch(deselectUser(userId));
      setSelectAll(false);
    } else {
      dispatch(selectUser(userId));
    }
  };

  useEffect(() => {
    dispatch(getallusers());
  }, []);

  const filtered = data
    ? data.filter((u) =>
        `${u.nombres} ${u.apellidos} ${u.correo} ${u.ci}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  const totalUsers = data?.length ?? 0;
  const activeUsers = data?.filter((u) => u.estado).length ?? 0;
  const adminUsers = data?.filter((u) => u.rol === "Admin").length ?? 0;

  return (
    <div
      className="p-6 bg-[#F5F6FA] min-h-screen"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Modales */}
      {open && (
        <ModalUnstyled
          id={selectedUserModal}
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
        />
      )}
      {openEmail && (
        <ModalUnstyledEmail
          open={openEmail}
          handleOpen={handleOpenEmail}
          handleClose={handleCloseEmail}
        />
      )}
      {openAddUser && (
        <ModalUnstyledAdd
          open={openAddUser}
          handleOpen={handleOpenAddUser}
          handleClose={handleCloseAddUser}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#002E5F] tracking-tight">
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Administra las cuentas y roles del sistema
          </p>
        </div>
        <button
          onClick={handleOpenAddUser}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#002E5F] text-white text-sm font-semibold rounded-xl hover:bg-[#003f7f] transition-colors shadow-sm"
        >
          <PersonAddAlt1RoundedIcon sx={{ fontSize: 18 }} />
          Nuevo usuario
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002E5F1A] flex items-center justify-center flex-shrink-0">
            <PeopleAltRoundedIcon sx={{ fontSize: 20, color: "#002E5F" }} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#002E5F]">{totalUsers}</p>
            <p className="text-xs text-gray-400 font-medium">Total usuarios</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D500321A] flex items-center justify-center flex-shrink-0">
            <PeopleAltRoundedIcon sx={{ fontSize: 20, color: "#D50032" }} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#D50032]">{activeUsers}</p>
            <p className="text-xs text-gray-400 font-medium">Activos</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#002E5F1A] flex items-center justify-center flex-shrink-0">
            <PeopleAltRoundedIcon sx={{ fontSize: 20, color: "#002E5F" }} />
          </div>
          <div>
            <p className="text-xl font-bold text-[#002E5F]">{adminUsers}</p>
            <p className="text-xs text-gray-400 font-medium">Administradores</p>
          </div>
        </div>
      </div>

      {/* Toolbar: búsqueda + acciones */}
      <div className="bg-white rounded-2xl border border-[#DEDEDE] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-3 px-5 py-4 border-b border-[#DEDEDE]">
          {/* Búsqueda */}
          <div className="relative">
            <SearchRoundedIcon
              sx={{ fontSize: 18 }}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm border border-[#DEDEDE] rounded-xl focus:outline-none focus:border-[#002E5F] bg-[#F5F6FA] w-64 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            />
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-2">
            <button
              disabled={selectedUsers.length === 0}
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl border border-[#DEDEDE] text-gray-500 hover:border-[#D50032] hover:text-[#D50032] hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <DeleteIcon sx={{ fontSize: 16 }} />
              Borrar {selectedUsers.length > 0 ? `(${selectedUsers.length})` : ""}
            </button>
            <button
              onClick={handleOpenEmail}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl border border-[#DEDEDE] text-gray-500 hover:border-[#002E5F] hover:text-[#002E5F] hover:bg-blue-50 transition-all"
            >
              <EmailIcon sx={{ fontSize: 16 }} />
              Escribir
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <thead>
              <tr className="bg-[#F5F6FA] border-b border-[#DEDEDE]">
                <th className="px-4 py-3 text-left w-10">
                  <Checkbox
                    size="small"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    sx={{
                      color: "#DEDEDE",
                      "&.Mui-checked": { color: "#002E5F" },
                    }}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Usuario
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  CI
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Correo
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Edad
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Celular
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Rol
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Estado
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DEDEDE]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-gray-400 text-sm">
                    No se encontraron usuarios.
                  </td>
                </tr>
              ) : (
                filtered.map((row, index) => (
                  <tr
                    key={row.id_Usuario}
                    className="hover:bg-[#F5F6FA] transition-colors"
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3">
                      <Checkbox
                        size="small"
                        checked={selectedUsers.includes(row.id_Usuario)}
                        onChange={() => handleSelectUser(row.id_Usuario)}
                        sx={{
                          color: "#DEDEDE",
                          "&.Mui-checked": { color: "#002E5F" },
                        }}
                      />
                    </td>

                    {/* Usuario: avatar + nombre */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {row.image ? (
                          <img
                            src={row.image}
                            alt={row.nombres}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{
                              background: AVATAR_COLORS[index % AVATAR_COLORS.length],
                            }}
                          >
                            {getInitials(row.nombres, row.apellidos)}
                          </div>
                        )}
                        <span className="font-medium text-gray-700">
                          {row.nombres} {row.apellidos}
                        </span>
                      </div>
                    </td>

                    {/* CI */}
                    <td className="px-4 py-3 text-gray-500">{row.ci}</td>

                    {/* Correo */}
                    <td className="px-4 py-3 text-gray-500">{row.correo}</td>

                    {/* Edad */}
                    <td className="px-4 py-3 text-center text-gray-500">
                      {calculateAge(row.fecha_Nacimiento)}
                    </td>

                    {/* Celular */}
                    <td className="px-4 py-3 text-gray-500">{row.celular}</td>

                    {/* Rol */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          row.rol === "Admin"
                            ? "bg-[#002E5F1A] text-[#002E5F]"
                            : "bg-[#DEDEDE]/60 text-gray-500"
                        }`}
                      >
                        {row.rol}
                      </span>
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          row.estado
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-[#D50032]"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            row.estado ? "bg-emerald-500" : "bg-[#D50032]"
                          }`}
                        />
                        {row.estado ? "Habilitado" : "Deshabilitado"}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleModal(row.id_Usuario)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#002E5F] text-white hover:bg-[#003f7f] transition-colors"
                      >
                        <EditIcon sx={{ fontSize: 14 }} />
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer de la tabla */}
        <div className="px-5 py-3 border-t border-[#DEDEDE] flex items-center justify-between text-xs text-gray-400">
          <span>
            {filtered.length} de {totalUsers} usuarios
            {selectedUsers.length > 0 && (
              <span className="ml-2 text-[#002E5F] font-medium">
                · {selectedUsers.length} seleccionados
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}