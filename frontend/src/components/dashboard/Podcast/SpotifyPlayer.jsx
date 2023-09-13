import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getArtistId } from './spotifyServices';
import { TextField, Button, Card, CardContent, Typography, Container, Box, CardMedia } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Reproductor from './Reproductor';
const SpotifyPlayer = () => {
  const [name, setName] = useState("nicki nicole");
  const [songs,setSongs]=useState([]);
  
  const handleChange = (e) =>{
    setName(e.target.value)
  }
  
  const handlegetArtistId = async () => {
    setSongs([])
    const response=await getArtistId(name);
    setSongs(response)
    console.log(response)
  }
  
  useEffect(()=>{
    handlegetArtistId()
  },[])
  
  return (
    <Container>
      {songs.map((song, index) => {
        return(
          song.preview_url?<Reproductor key={index} song={song} ></Reproductor>:null
        )
      })}
    </Container>
  );
};

export default SpotifyPlayer;
