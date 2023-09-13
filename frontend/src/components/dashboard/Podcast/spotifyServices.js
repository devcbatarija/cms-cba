import axios from "axios";
const clientId = "3b4b4a1e26fc4767bdb4bb40acaee569";
const clientSecret = "eaf2c9ea6827466d93b0f2cd6dee7f00";

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      null,
      {
        params: {
          grant_type: "client_credentials",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    const accessToken = response.data.access_token;

    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener el token de acceso");
  }
};
export const getArtistId = async (artistName) => {
  try {
    const accessToken = await getAccessToken();
    // console.log(accessToken)
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const artistId = response.data.artists.items[0];

    const artistIdParts = artistId.uri.split(":");
    const id = artistIdParts[artistIdParts.length - 1];

    // console.log("ID del artista:", artistId.name, id);
    return getArtistSongs(id);
  } catch (error) {
    console.error(error);
  }
};
export const getArtistSongs = async (artistId) => {
    try {
      const accessToken = await getAccessToken();
  
      const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      const songs = response.data.tracks;
  
      return songs;
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener las canciones del artista");
    }
  };
