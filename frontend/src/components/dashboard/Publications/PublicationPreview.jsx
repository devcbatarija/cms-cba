import React from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'
import { useState } from 'react';
import { useRef } from 'react';

const PreviewContainer = styled.div`
  margin: 0 auto;
  padding-left: 200px ;
  background-color: #f8f9fa;
  border-radius: 1px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  max-width: 100%;
`;


const Title = styled.h2`
  color: #343a40;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const PropertyLabel = styled.strong`
  color: #00000;
  display: block;
  font-size: 18px;
  margin-top: 10px;
`;

const PropertyValue = styled.p`
  font-size: 16px;
`;

const MultimediaContainer = styled.div`
  margin-top: 20px;
`;

const MultimediaList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
function PublicationPreview() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const playerRef = useRef(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  }

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  }

  return (
    <PreviewContainer>
      <Title>Vista Previa</Title>
      <PropertyLabel>Título:</PropertyLabel>
      <PropertyValue>El senor de los anillos</PropertyValue>
      <MultimediaContainer>
        <PropertyLabel>Multimedia:</PropertyLabel>
        <MultimediaList>
          <img src="https://www.camarapiracicaba.sp.gov.br/Artigos/Imagens/t620/76616.jpg" alt="" srcset="" />
          <div>
      <button onClick={handlePlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <input 
        type="range" 
        min={0} 
        max={1} 
        step={0.01} 
        value={volume} 
        onChange={handleVolumeChange} 
      />
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=TJJk66LZLsE"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </div>

        </MultimediaList>
      </MultimediaContainer>

      <PropertyLabel>Descripción:</PropertyLabel>
      <PropertyValue>El arte del camuflaje</PropertyValue>
      <PropertyLabel>Estado:</PropertyLabel>
      <PropertyValue>Agotado</PropertyValue>
      <PropertyLabel>Tipo:</PropertyLabel>
      <PropertyValue>Cartelera</PropertyValue>

    </PreviewContainer>
  );
}
// function PublicationPreview({ post }) {
//   return (
//     <PreviewContainer>
//       <Title>Vista Previa de la Publicación</Title>
//       <PropertyLabel>Título:</PropertyLabel>
//       <PropertyValue>{post.title}</PropertyValue>
//       <PropertyLabel>Descripción:</PropertyLabel>
//       <PropertyValue>{post.description}</PropertyValue>
//       <PropertyLabel>Estado:</PropertyLabel>
//       <PropertyValue>{post.status}</PropertyValue>
//       <PropertyLabel>Tipo:</PropertyLabel>
//       <PropertyValue>{post.type}</PropertyValue>
//       {post.multimedia.length > 0 && (
//         <MultimediaContainer>
//           <PropertyLabel>Multimedia:</PropertyLabel>
//           <MultimediaList>
//             {post.multimedia.map((file, index) => (
//               <MultimediaItem key={index}>{file.name}</MultimediaItem>
//             ))}
//           </MultimediaList>
//         </MultimediaContainer>
//       )}
//     </PreviewContainer>
//   );
// }

export default PublicationPreview;
