const axios = require("axios");

module.exports = {
  getAccessToken: async (clientId, clientSecret) => {
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
  },
  getArtistId: async (artistName, accessToken) => {
    try {
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
      return id;
    } catch (error) {
    }
  },
  getArtistSongs: async (artistId,accessToken) => {
    try {
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
      console.log(error)
      throw new Error("Error al obtener las canciones del artista");
    }
  },
};
