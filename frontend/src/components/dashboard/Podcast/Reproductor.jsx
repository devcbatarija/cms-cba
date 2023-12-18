import * as React from 'react';
import { useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import StopIcon from '@mui/icons-material/Stop';
import { useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import toast from "react-hot-toast";

const Reproductor = ({song, name,imgSong,authors}) => {
    const [play,setPlay]=useState(false);
    const audioRef = useRef();
    const handleAddSong = async (songAdd) => {
      try {
        const response=await axios.post('podcast/song',{
          song:{
            name: songMedatada.name,
            preview_url: songMedatada.preview_url,
            images:songMedatada.album.images,
            id_song: songMedatada.id,
            state: true,
            CredencialIdCredencial: id_Credencial
          }
        });
        if(response.statusText=="OK"){
          toast.success("Agregado con exito.");
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    const handlePlayPause = (value) => {
        if(value){
            setPlay(!value)
            setPlay(value)
            audioRef.current.play()
        }else
        {
            setPlay(value)
            audioRef.current.pause()
        }
    }
    return (
        <Card sx={{ display: 'flex',width: '100%',boxShadow:"5px 1px 6px 1px", border:"1px solid rgba(45,45,45,0.2)"}}>
          <audio ref={audioRef} src={song} type="audio/mpeg" />
          <Box sx={{ display: 'flex', flexDirection: 'column',width: '100%'}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
              <Typography className='text-gray-500' component="div" variant="p">
                {authors}
              </Typography>
            </CardContent>
            {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}> 
              <IconButton
              >
              <AddIcon sx={{color:"gray",border:"1px solid gray",borderRadius:"50%"}} ></AddIcon>
              </IconButton>
              {
                !play?
                <IconButton aria-label="play/pause" onClick={()=>handlePlayPause(true)}>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>:
              <IconButton aria-label="stop" onClick={() =>handlePlayPause(false)}>
              <StopIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
              } 
            </Box> */}
          </Box>
          {/* <CardMedia
            component="img"
            sx={{ width: 148,height:148 }}
            image={imgSong}
            alt="Live from space album cover"
          /> */}
        </Card>
    );
}

export default Reproductor;
