import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import { Player } from "./player";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPodcastSongs } from "../../../redux-toolkit/actions/podcastActions"; 
export const Podcast = () => {
  const [selectedSong,setSelectedSong]=useState(null)
  const songs=useSelector((state)=>state.podcasts.podcasts)
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getPodcastSongs())
  },[])
  return (
    <div className="flex">
      <div className="w-12/12 sm:w-3/12 md:w-3/12 lg:w-3/12 xl:w-3/12 p-4 border-r-2">
        <div className="flex flex-col w-full gap-2 p-3">
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
      </div>
      <div className=" flex w-9/12 sm:w-9/12 md:w-9/12 lg:w-9/12 xl:w-9/12 p-4">
        <div className="flex flex-row w-full">
          <div
            className="bg-zinc-100 flex flex-col w-full font-bold gap-4 rounded-lg border p-2"
            aria-label="Breadcrumb"
          >
            {
              selectedSong?
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
            <div
              style={{
                backgroundImage: `url('${selectedSong.image}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "containt",
                backgroundPosition: "center",
              }}
              className="w-full bg-red-200 h-64 border rounded-2xl p-4"
            ></div>
            <Player
            epiNumber={selectedSong.epi_number}
            description={selectedSong.description}
            authors={selectedSong.authors}
            uriSong={selectedSong.url_cloudfront}
            imgSong={selectedSong.image}
            ></Player></>:<h1
            style={{
              color: "#F83153",
            }}
          >
            No hay selección
          </h1>
            }
          </div>
          <div
            className="flex flex-col w-full pl-4 gap-2"
            aria-label="Breadcrumb"
          >
            <div className="w-full h-20  p-4 ">
              {/* AQUI VAN BOTONES */}
            </div>
            {songs &&
              songs.map((s) => {
                return (
                  <div key={s.id_Podcast} className="hover:cursor-pointer">
                    <div onClick={()=>setSelectedSong(s)} className="flex flex-row w-full h-20 rounded-lg shadow shadow-lg border">
                      <div className="w-2/12 p-1 rounded-lg">
                        <div
                          className="w-full h-full rounded-lg"
                          style={{
                            backgroundImage: `url('${s.image}')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        >
                        </div>
                      </div>
                      <div className="flex flex-col w-8/12 p-2">
                        <div className=" col-2/2">
                          <h1 className="font-bold">{s.description}</h1>
                          <h1 className="text-gray-500">{s.authors}</h1>
                        </div> 
                      </div>
                      <div className="flex w-2/12 items-center justify-center">
                        <AddIcon></AddIcon>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
