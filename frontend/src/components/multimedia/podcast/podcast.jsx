import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import { Player } from "./player";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPodcastSongs } from "../../../redux-toolkit/actions/podcastActions";
import toast from "react-hot-toast";
import { ErrorAlert } from "../../toastAlerts/errorAlerts";

export const Podcast = () => {
  const songs = useSelector((state) => state.podcasts.podcasts);
  const [selectedSong, setSelectedSong] = useState(null);
  const dispatch = useDispatch();
  const updatePodcasts = async () => {
    await dispatch(getPodcastSongs());
    songs?setSelectedSong(songs[0]):null;
  }; 
  const handleClickAdd = () => {
    toast.custom((t) => (
      <ErrorAlert t={t} w={"w-4/12"} message="La funcionalidad aún no está disponible!." />
    ));
  };
  useEffect(() => {
    updatePodcasts();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#131133",
      }}
      className="flex"
    >
      {songs.length > 0 ? (
        <div className="flex w-12/12 sm:w-12/12 md:w-12/12 lg:w-12/12 xl:w-12/12 p-4">
          <div className="flex flex-row w-full">
            <div
              style={{
                backgroundColor: "white",
              }}
              className="flex flex-col w-full font-bold gap-4 rounded-lg border p-2"
              aria-label="Breadcrumb"
            >
              {selectedSong ? (
                <>
                  <h1
                    style={{
                      color: "#F83153",
                    }}
                  >
                    Selección
                  </h1>
                  <h1
                    style={{
                      color: "black",
                    }}
                  >
                    Reproduciendo
                  </h1>
                  <Player
                    epiNumber={selectedSong.epi_number}
                    description={selectedSong.title}
                    authors={selectedSong.authors}
                    uriSong={selectedSong.url_cloudfront}
                    imgSong={selectedSong.image}
                  ></Player>
                </>
              ) : (
                <h1
                  style={{
                    color: "#F83153",
                  }}
                >
                  No hay selección
                </h1>
              )}
            </div>
            <div
              className="flex flex-col w-full pl-4 gap-2 overflow-y-auto max-h-[100vh]"
              aria-label="Breadcrumb"
            >
              <div className="w-full h-20  p-4">
                <h1
                  style={{
                    color: "#fff",
                    fontSize: "30px",
                  }}
                >
                  Podcasts
                </h1>
              </div>
              {songs &&
                songs.map((s, ind) => {
                  return (
                    <div
                      key={s.id_Podcast}
                      className="hover:cursor-pointer bg-white rounded"
                    >
                      <div className="flex flex-row w-full h-20 rounded-lg shadow shadow-lg border">
                        <div
                          onClick={() => setSelectedSong(s)}
                          className="w-2/12 p-1 rounded-lg"
                        >
                          <div
                            className="w-full h-full rounded-lg"
                            style={{
                              backgroundImage: `url('${s.image}')`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          >
                            <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
                              <abbr title="Episode">Ep.</abbr> {ind + 1}
                            </p>
                          </div>
                        </div>
                        <div
                          onClick={() => setSelectedSong(s)}
                          className="flex flex-col w-8/12 p-2"
                        >
                          <div className=" col-2/2">
                            <h1 className="font-bold">{s.title}</h1>
                            <h1 className="text-gray-500">{s.authors}</h1>
                          </div>
                        </div>
                        <div
                          onClick={handleClickAdd}
                          className="flex w-2/12 items-center justify-center"
                        >
                          <AddIcon></AddIcon>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex w-12/12 h-96 sm:w-3/12 md:w-3/12 lg:w-3/12 xl:w-3/12 p-4
         border-r-1 text-white items-center justify-center"
        >
          <h1>Aún no hay podcasts</h1>
        </div>
      )}
    </div>
  );
};


{
  /* <div className="w-12/12  sm:w-3/12 md:w-3/12 lg:w-3/12 xl:w-3/12 p-4 border-r-1 ">
        <div className="flex flex-col w-full gap-2 p-3 text-white">
          <div className="pl-4 font-bold" aria-label="Breadcrumb">
            <h1>Libreria</h1>
          </div>
          <div className="pl-5">
            <Button
              name="playlist"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                color: "inherit",
                textDecoration: "none",
                fontSize: ".875rem",
                alignContent: "center",
                textTransform: "none",
              }}
              startIcon={<LibraryMusicIcon></LibraryMusicIcon>}
            >
              Lista de reproducción
            </Button>
          </div>
          <div className="pl-5">
            <Button
              name="playlist"
              sx={{
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.2)",
                },
                color: "inherit",
                textDecoration: "none",
                fontSize: ".875rem",
                alignContent: "center",
                textTransform: "none",
              }}
              startIcon={<PlayCircleIcon></PlayCircleIcon>}
            >
              Podcasts
            </Button>
          </div>
        </div>
      </div> */
}