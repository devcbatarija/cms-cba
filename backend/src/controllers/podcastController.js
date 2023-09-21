const { Credencial, Podcast } = require("../db");
const {
  getAccessToken,
  getArtistId,
  getArtistSongs,
} = require("../services/spotifyservice");

module.exports = {
  getCredentials: async () => {
    try {
      const response = await Credencial.findAll();
      return { results: response };
    } catch (error) {
      return error;
    }
  },
  createCredentials: async (data) => {
    try {
      const credToken = await getAccessToken(
        data.cliente_Id,
        data.client_Secret
      );
      console.log(credToken);
      if (!credToken) {
        throw new Error("No es posible obtener el token de acceso.");
      }
      const response = await Credencial.create({
        identificador: data.identificador,
        cliente_Id: data.cliente_Id,
        client_Secret: data.client_Secret,
        token_Access: credToken,
      });
      return { token: credToken, results: response };
    } catch (error) {
      return error;
    }
  },
  editCredentials: async (id, data) => {
    console.log(id, data);
    try {
      const response = await Credencial.findByPk(id);
      if (!response) {
        throw new Error("La credencial no existe.");
      }
      const updateCredential = await Credencial.update(
        {
          cliente_Id: data.cliente_Id ? data.cliente_Id : response.cliente_Id,
          client_Secret: data.client_Secret
            ? data.client_Secret
            : response.client_Secret,
        },
        {
          where: {
            id_Credencial: id,
          },
        }
      );
      console.log(updateCredential);
      if (updateCredential[0] === 1) {
        const dataUpdate = await Credencial.findAll();
        return { message: "update success", results: dataUpdate };
      }
      return "Error!";
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  deleteCredentials: async (id) => {
    try {
      const response = await Credencial.findByPk(id);
      if (!response) {
        throw new Error("La credencial no existe.");
      }
      response.destroy();
      const data = await Credencial.findAll();
      return { results: data };
    } catch (error) {}
  },
  getPodcasts: async ({ artistName, token, idUsuario }) => {
    try {
        console.log(artistName)
        console.log(token)
        console.log(idUsuario)
      const idArtist = await getArtistId(artistName, token);
      const response = await getArtistSongs(idArtist, token);
      return response;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },
  getPodcastsBd: async () => {
    try {
      const response = await Podcast.findAll();
      if (!response) {
        throw new Error("Couldn't find");
      }
    //   for (let [index,p] of data.results.entries()) {
    //     if (p.preview_url) {
    //       const obj = {
    //         name: p.name,
    //         preview_url: p.preview_url,
    //         images: p.album.images,
    //         id_song: p.id,
    //         state: true,
    //       };
    //       Podcast.create(obj);
    //     }
    //   }
      return { results: response };
    } catch (error) {
      throw error;
    }
  },
};
