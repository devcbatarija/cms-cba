import * as React from "react";
import { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const NAVY = "#002E5F";
const RED = "#D50032";

const formatTime = (seconds) => {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
};

const Reproductor = ({ song, name, imgSong, authors }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const value = Number(e.target.value);
    audio.currentTime = value;
    setProgress(value);
  };

  const percent = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl bg-white"
      style={{
        border: "1px solid #DEDEDE",
        boxShadow: "0 1px 4px rgba(0,46,95,0.06)",
      }}
    >
      <audio ref={audioRef} src={song} preload="metadata" />

      {/* Carátula */}
      <div
        className="flex-shrink-0 rounded-lg overflow-hidden flex items-center justify-center"
        style={{
          width: 56,
          height: 56,
          background: "#eef2f8",
        }}
      >
        {imgSong ? (
          <img
            src={imgSong}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <MusicNoteIcon style={{ color: NAVY }} />
        )}
      </div>

      {/* Info + barra */}
      <div className="flex-1 min-w-0">
        <p
          className="truncate font-semibold text-sm"
          style={{ color: NAVY }}
          title={name}
        >
          {name}
        </p>
        <p className="truncate text-xs text-gray-500" title={authors}>
          {authors}
        </p>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[11px] text-gray-400 w-9 text-right">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="flex-1 cursor-pointer"
            style={{
              accentColor: RED,
              height: 4,
            }}
          />
          <span className="text-[11px] text-gray-400 w-9">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Play / Pause */}
      <IconButton
        onClick={togglePlay}
        aria-label={playing ? "pausar" : "reproducir"}
        style={{
          backgroundColor: playing ? RED : NAVY,
          color: "#fff",
          width: 42,
          height: 42,
        }}
      >
        {playing ? (
          <PauseIcon style={{ fontSize: 22 }} />
        ) : (
          <PlayArrowIcon style={{ fontSize: 22 }} />
        )}
      </IconButton>
    </div>
  );
};

export default Reproductor;