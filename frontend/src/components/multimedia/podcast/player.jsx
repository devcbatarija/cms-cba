import React, { useEffect, useRef, useState } from "react";
import "./player.css";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import Forward5RoundedIcon from "@mui/icons-material/Forward5Rounded";
import Replay5RoundedIcon from "@mui/icons-material/Replay5Rounded";
export const Player = ({
  uriSong,
  imgSong,
  description,
  authors,
  epiNumber,
}) => {
  const audioRef = useRef();
  const [audioState, setAudioState] = useState(false);
  const [duration, setDuration] = useState(0);
  const [formattedDuration, setFormattedDuration] = useState("0:00"); //sirve para el tiempo que dura la cancion
  const [currentTime, setCurrentTime] = useState(0); //sirve para el timelapse
  const [formattedTime, setFormattedTime] = useState("0:00"); //sirve para el tiempo en minutos:segundos transcurridos
  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };
  const playAudio = () => {
    //funciona
    audioState ? audioRef.current.pause() : audioRef.current.play();
    setAudioState(!audioState);
  };

  const pauseAudio = () => {
    //funciona
    audioRef.current.pause();
    setAudioState(false);
  };

  const changeVolume = (e) => {
    //funciona
    audioRef.current.volume = e.target.value;
  };

  const changeTime = (e) => {
    //funciona
    audioRef.current.currentTime = e.target.value;
  };
  const changeTime5 = (e) => {
    //funciona
    audioRef.current.currentTime = e.target.value - 5;
  };
  const changeTimeRange = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    audioRef.current.currentTime = time;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };
  useEffect(() => {
    setFormattedTime(formatTime(currentTime));
  }, [currentTime]);

  useEffect(() => {
    setFormattedDuration(formatTime(audioRef.current?.duration || 0));
  }, [audioRef.current?.duration]);
  const renderDescription = () => {
    return {
      __html: description.replace(/\n/g, "<br>"),
    };
  };
  return (
    <div>
      {/* <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        style={{ display: "none" }}
        src={uriSong}
        controls
      ></audio> */}
      <div>
        {/* <button onClick={playAudio}>
          {audioState ? (
            <PauseRoundedIcon sx={{ color: "red", fontSize: "100px" }} />
          ) : (
            <PlayArrowRoundedIcon sx={{ color: "red", fontSize: "100px" }} />
          )}
        </button> */}
      </div>
      <video
        className="h-w-full rounded-lg"
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        src={uriSong}
        controls
        poster={imgSong}
      >
        <source src={uriSong} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex items-center space-x-4">
        <div className="min-w-0 flex-auto space-y-1 font-semibold">
          <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
            <abbr title="Episode">Ep.</abbr> {epiNumber}
          </p>
          <h2 className="text-slate-900 dark:text-slate-50 text-lg">
            {authors}
          </h2>
          <p
            className="text-gray-700"
            dangerouslySetInnerHTML={renderDescription()}
          ></p>
        </div>
      </div>
    </div>
  );
};
