const Reproductor = ({song}) => {
    return ( 
        <audio controls>
              <source src={song.preview_url} type="audio/mpeg" />
        </audio>
     );
}
 
export default Reproductor;