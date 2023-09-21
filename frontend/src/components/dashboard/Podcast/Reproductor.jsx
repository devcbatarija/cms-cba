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

const Reproductor = ({song, name,album}) => {
    const [play,setPlay]=useState(false);
    const theme = useTheme();
    const audioRef = useRef();
    const handlePlayPause = (value) => {
        if(value){
            setPlay(value)
            audioRef.current.play()
        }else
        {
            setPlay(value)
            audioRef.current.pause()
        }
    }
    return (
        <Card sx={{ display: 'flex',width: '100%'}}>
          <audio ref={audioRef} src={song} type="audio/mpeg" />
          <Box sx={{ display: 'flex', flexDirection: 'column',width: '100%'}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {name}
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              {/* <IconButton aria-label="previous">
                {song === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
              </IconButton> */}
              {
                !play?
                <IconButton aria-label="play/pause" onClick={()=>handlePlayPause(true)}>
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              </IconButton>:
              <IconButton aria-label="stop" onClick={() =>handlePlayPause(false)}>
              <StopIcon sx={{ height: 38, width: 38 }} />
            </IconButton>
              }
              {/* <IconButton aria-label="next">
                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
              </IconButton> */}
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={album.images[1].url}
            alt="Live from space album cover"
          />
        </Card>
    );
}

export default Reproductor;
