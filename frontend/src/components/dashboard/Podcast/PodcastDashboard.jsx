import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Reproductor from "./Reproductor";
import { useDispatch, useSelector } from "react-redux";
import {
  getPodcastSongs,
  postPodcastSongsSpotify,
} from "../../../redux-toolkit/actions/podcastActions";
import toast from "react-hot-toast";
import "./Styles.css";
import Uploader from "../Publications/Uploader";
import Percents from "../../progressBar/Percents";
import styled from "styled-components";


const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ced4da;
  min-height: 100px;
  overflow-y: hidden;
`;
const PodcastDashboard = () => {
  const dataCredentials = useSelector((state) => state.podcasts.credentials);
  const userId = useSelector((state) => state.login.user._userId);
  const songs = useSelector((state) => state.podcasts.podcasts);
  const [textAreaHeight, setTextAreaHeight] = useState("100px"); // Estado para controlar la altura del TextArea

  const [selected, setSelected] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showProgress, setShowProgress] = useState({
    message: false,
    bar: false,
  });
  const [form, setForm] = useState({
    epi_number: "",
    description: "",
    authors: "",
    imageUrl: "",
    multimedia: [],
    state: false,
    file: "",
    url_cloudfront: "",
    UsuarioIdUsuario: userId ? userId : "",
  });
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    const property = e.target.name;
    const value = e.target.value;
    setForm({
      ...form,
      [property]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      setShowProgress({
        ...showProgress,
        message: true,
      });
      const response = await axios.post("/files/upload", {
        filePath: form.multimedia,
        type: "image",
      });
      if (response.data) {
        setForm({
          ...form,
          imageUrl: response.data.results[0],
        });
        formData.append("media", form.file);
        eventsSSE();
        setShowProgress({
          ...showProgress,
          bar: true,
        });
        const res = await axios.post("podcast/song/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.data.data.Key) {
          const registerEnd = await axios.post("podcast/song/upload/database", {
            epi_number: form.epi_number,
            description: form.description,
            authors: form.authors,
            url_cloudfront: res.data.data.Key,
            image: response.data.results[0],
            state: true,
            UsuarioIdUsuario: form.UsuarioIdUsuario,
          });
          if (registerEnd.data.data) {
            updateState();
          }
        }
      }
    } catch (error) {}
  };
  const eventsSSE = () => {
    const eventSource = new EventSource(
      "http://localhost:3001/api/podcast/song/events"
    );
    eventSource.onmessage = (event) => {
      const progress = parseInt(event.data);
      setUploadProgress(progress);
    };

    return () => {
      eventSource.close();
    };
  };
  const updateState = () => {
    dispatch(getPodcastSongs());
  };
  useEffect(() => {
    updateState();
  }, []);
  useEffect(() => {
    if (form.descripcion) {
      setTextAreaHeight(`${form.descripcion.split("\n").length * 25}px`);
    }
  }, [form.descripcion]);
  return (
    <div className="flex flex-col md:flex-row min-h-full p-2 bg-gray-50 gap-2">
      <div className="bg-zinc-50 w-full h-full md:h-auto md:w-6/12 gap-2 rounded-lg shadow border">
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4">
          <div className="flex justify-center w-full">
            <h1 className="text-blue-800 mb-1 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
              Datos del podcast
            </h1>
          </div>
          <div className="flex mb-4">
            <div className="w-3/12 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="epi_number"
              >
                Nro Episodio
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="epi_number"
                type="number"
                name="epi_number"
                placeholder="Numero"
                onChange={handleChange}
                value={form.epi_number}
              />
            </div>
            <div className="w-9/12 pr-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="formFile"
              >
                Archivo audio
              </label>
              <input
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                type="file"
                id="formFile"
                name="file"
                onChange={(e) =>
                  setForm({
                    ...form,
                    file: e.target.files[0],
                  })
                }
              />
            </div>
          </div>
          <div className="w-2/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Descripcion
            </label>
            <TextArea
              id="description"
              name="description"
              value={form.descripcion}
              onChange={handleChange}
              style={{ height: textAreaHeight }}
              required
            ></TextArea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="authors"
            >
              Ingrese uno o más autores
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="authors"
              type="text"
              name="authors"
              placeholder="Pablo Duarte,Maria Salgado,Joaquin Saavedra"
              onChange={handleChange}
              value={form.authors}
            />
          </div>
          <div className="w-12/12 pr-2">
            <Uploader publicacion={form} setPublicacion={setForm}></Uploader>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Subir
            </button>
          </div>
        </form>
        <div className="flex flex-cols- items-center justify-center w-full">
          <h1 className="text-blue-800 mb-1 text-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-sm lg:text-sm dark:text-white">
            {showProgress.message ? "Preparando la subida de archivos." : null}
          </h1>
        </div>
        {showProgress.bar ? (
          <Percents
            funcional={"Subiendo archivos"}
            uploadProgress={uploadProgress}
          />
        ) : null}
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
          <div className="flex flex-col w-full h-full md:h-auto md:w-12/12 gap-2 gap-2 scroll border-b-2">
            {songs &&
              songs.map((s) => {
                return (
                  <div key={s.id_Podcast}>
                    {s.url_cloudfront ? (
                      <Reproductor
                        // key={s.name}
                        song={s.url_cloudfront}
                        name={s.description}
                        album={s.album}
                        imgSong={s.image}
                        authors={s.authors}
                      ></Reproductor>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastDashboard;
