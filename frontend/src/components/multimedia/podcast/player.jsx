import React, { useEffect, useRef, useState } from "react";
import './player.css'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import Forward5RoundedIcon from '@mui/icons-material/Forward5Rounded';
import Replay5RoundedIcon from '@mui/icons-material/Replay5Rounded';
export const Player = ({ uriSong,imgSong,description,authors,epiNumber }) => {
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
    audioState?audioRef.current.pause():audioRef.current.play()
    setAudioState(!audioState)
  };

  const pauseAudio = () => {
    //funciona
    audioRef.current.pause();
    setAudioState(false)

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
    audioRef.current.currentTime = e.target.value-5;
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

  return (
    <div>
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        style={{ display: "none" }}
        src={uriSong}
        controls
      ></audio>
      <div> 
      </div>

      <div className=" border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
        <div className="flex items-center space-x-4">
          {/* <img
            src={imgSong}
            alt=""
            width="88"
            height="88"
            className="flex-none rounded-lg bg-slate-100"
            loading="lazy"
          /> */}
          <div className="min-w-0 flex-auto space-y-1 font-semibold">
            <p className="text-cyan-500 dark:text-cyan-400 text-sm leading-6">
              <abbr title="Episode">Ep.</abbr> {epiNumber}
            </p>
            <h2 className="text-slate-500 dark:text-slate-400 text-sm leading-6 truncate">
              {description}
            </h2>
            <p className="text-slate-900 dark:text-slate-50 text-lg">
              {authors}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="relative">
            {/* Input progressbar */}
            <div className="bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <input
                type="range"
                min="0"
                max={audioRef.current?.duration || 0}
                onChange={changeTime}
                value={currentTime}
                className="w-full bg-cyan-500 dark:bg-cyan-400 h-2 hover:cursor-pointer"
                style={{
                    textOverflow: 'ellipsis',
                }}
              />
            </div>
            
            <div className="flex flex-between w-full absolute justify-between text-sm leading-6 font-medium tabular-nums">
              <div className="text-cyan-500 dark:text-slate-100">
                {formattedTime}
              </div>
              <div className="text-slate-500 dark:text-slate-400">
                {formattedDuration}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
        <div className="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Add to favorites">
            <svg width="24" height="24">
              <path
                d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button type="button" aria-label="Rewind 10 seconds">
             <Replay5RoundedIcon
             sx={{
                fontSize:'36px', 
            }}
             ></Replay5RoundedIcon>
          </button>
        </div>
        
        <button
          type="button"
          className="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="Pause"
          onClick={playAudio}
        >
            {
            audioState? <PauseRoundedIcon
            sx={{
                fontSize:'50px'
            }}
            ></PauseRoundedIcon>:<PlayArrowRoundedIcon
            sx={{
                fontSize:'50px'
            }}
            ></PlayArrowRoundedIcon>
            }
            
        </button> 
        <div className="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Skip 10 seconds">
             <Forward5RoundedIcon
             sx={{
                fontSize:'36px', 
            }}
             ></Forward5RoundedIcon>
          </button>
          {/* <button
            type="button"
            className="hidden sm:block lg:hidden xl:block"
            aria-label="Next"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M14 12 6 6v12l8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button> */}
          <button
            type="button"
            className="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 dark:text-slate-100 dark:ring-0 dark:bg-slate-500"
          >
            1x
          </button>
        </div>
      </div>
    </div>
  );
};
