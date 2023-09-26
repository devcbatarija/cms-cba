import * as React from "react";
import axios from "axios";
import { getArtistId } from "./spotifyServices";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Reproductor from "./Reproductor";
import { useDispatch, useSelector } from "react-redux";
import {
  getPodcastSongs,
  getPodcastSongsSpotify,
  getPodcasts,
  hadleDeleteState,
} from "../../../redux-toolkit/actions/podcastActions";
import toast from "react-hot-toast";
import "./Styles.css";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AutorenewIcon from '@mui/icons-material/Autorenew';
//aqui empieza
//aqui finaliza
const SpotifyPlayer = () => {
  const dataCredentials = useSelector((state) => state.podcasts.credentials);
  const userId = useSelector((state) => state.login.user._userId);
  const songs = useSelector((state) => state.podcasts.songs);
  const [selected, setSelected] = useState("");


  const [form, setForm] = useState({
    identificador: "",
    cliente_Id: "",
    client_Secret: "",
    UsuarioIdUsuario: userId ? userId : "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/podcast", form);
      if (response.data.token) {
        dispatch(getPodcasts());
        toast.success("Registro exitoso.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (idCredencial) => {
    try {
      const response = await axios.delete(`/podcast/${idCredencial}`);
      if (response.status == 200) {
        dispatch(getPodcasts());
        dispatch(hadleDeleteState())
        setSelected("");
      }
    } catch (error) {}
  };
  const handleUpdsteSongs = (identif) => {
    const selec = identif.identificador;
    setSelected(identif)
    const accesToken = dataCredentials[0].token_Access;
    const usId = userId;
    dispatch(getPodcastSongsSpotify({ selec, accesToken, usId }));
  };
  const handleCopy = () => {
    navigator.clipboard.writeText("Texto copiado!");
  };

  useEffect(() => {
    dispatch(getPodcasts());
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-full p-2 bg-gray-50 gap-2">
      <div className="bg-zinc-50 w-full h-full md:h-auto md:w-6/12 gap-2 rounded-lg shadow border">
        <form
          onSubmit={handleSubmit}
          className="px-8 pt-6 pb-8 mb-4 border-b-2"
        >
          <div className="flex justify-center w-full">
            <h1 className="text-blue-800 mb-1 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
              Añadir credenciales
            </h1>
          </div>
          <div className="flex mb-4">
            <div className="w-1/2 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Ingrese nombre del canal
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="identificador"
                type="txt"
                name="identificador"
                placeholder="Spotify canal"
                onChange={handleChange}
                value={form.identificador}
              />
            </div>
            <div className="w-1/2 pl-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Ingrese el id de usuario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cliente_Id"
                type="txt"
                name="cliente_Id"
                placeholder="user id"
                onChange={handleChange}
                value={form.cliente_Id}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Ingrese el cliente secreto
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="client_Secret"
              type="text"
              name="client_Secret"
              placeholder="client secret"
              onChange={handleChange}
              value={form.client_Secret}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Agregar
            </button>
            <div className="flex items-center justify-between"></div>
          </div>
        </form>

        <div className="flex justify-center w-full px-8 pt-6 mb-4">
          <h1
            className="
            text-blue-800 
      mb-1
      text-4xl
      font-extrabold
      leading-none
      tracking-tight
      text-gray-900 md:text-2xl lg:text-2xl dark:text-white "
          >
            Lista de credenciales
          </h1>
        </div>

        {/* Separacion */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nro</TableCell>
                <TableCell align="right">Identificador</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCredentials.map((row, index) => (
                <TableRow
                  className="myTableRow"
                  onClick={() => handleUpdsteSongs(row)}
                  key={row.identificador}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.identificador}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={()=>alert("Renovando Token de acceso")} aria-label="delete">
                      <AutorenewIcon titleAccess="Renovar token" sx={{color:"green"}} />
                    </IconButton>
                    <IconButton onClick={()=>handleDelete(row.id_Credencial) } aria-label="delete">
                      <DeleteIcon titleAccess="Eliminar credencial" sx={{color:"crimson"}}/>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div
        className="w-full h-full 
      md:h-auto md:w-6/12 
      gap-2 bg-zinc-50 rounded-lg shadow border bg-red-100"
      >
        <div className="flex justify-center w-full px-8 pt-6 mb-4">
          <h1
            className="
            text-blue-800 
      mb-1
      text-4xl
      font-extrabold
      leading-none
      tracking-tight
      text-gray-900 md:text-2xl lg:text-2xl dark:text-white "
          >
            Lista de canciones
          </h1>
        </div>

        <div className="flex flex-col md:flex-row p-2 gap-2">
          {/* {selected ? (
            <button
              className="bg-blue-800 hover:bg-blue-700 md:w-6/12 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpdsteSongs}
            >
              Listar disponibles
            </button>
          ) : null} */}
          <div className="flex flex-col w-full h-full md:h-auto md:w-12/12 gap-2 gap-2">
            {selected ? 
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-2xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Artista: </span>{selected.identificador }</h1>
            :
          <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-2xl">Ninguno artista seleccionado</h1>
            }
          </div>
        </div>
        <div className="flex flex-col md:flex-row p-2 gap-2">
          <div className="flex flex-col w-full h-full md:h-auto md:w-12/12 gap-2 gap-2 scroll border-b-2">
            {
              //mapeo
              songs &&
                songs.map((s) => {
                  return (
                    <div
                      key={s.name}
                      // className="flex items-center justify-between p-6 border bg-zinc-50 shadow rounded-lg"
                    >
                      {/* <br />
                    <audio controls>
                      <source src={s.preview_url} type="audio/mpeg" />
                    </audio>
                    {s.name} */}
                    {
                      s.preview_url?
                      <Reproductor
                        // key={s.name}
                        song={s.preview_url}
                        name={s.name}
                        album={s.album}
                        songMedatada={s}
                        id_Credencial={selected.id_Credencial}
                      ></Reproductor>:
                      null
                    }
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayer;

// {
//   "cliente_Id":"3b4b4a1e26fc4767bdb4bb40acaee569",
// 	"client_Secret":"eaf2c9ea6827466d93b0f2cd6dee7f00",
// }
